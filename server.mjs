import { createReadStream } from "node:fs";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 5177);
const DATA_FILE = path.resolve(process.env.WUQUAN_DB_FILE || path.join(ROOT, ".wuquan-data", "db.json"));
const JWT_SECRET = process.env.JWT_SECRET || "wuquan-dev-secret-change-me";
const TOKEN_TTL_SECONDS = Number(process.env.TOKEN_TTL_SECONDS || 60 * 60 * 24 * 30);
const MAX_BODY_BYTES = Number(process.env.MAX_BODY_BYTES || 10 * 1024 * 1024);
const AI_REQUIRE_AUTH = !["0", "false", "no"].includes(String(process.env.AI_REQUIRE_AUTH || "1").toLowerCase());
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon",
};

const STATIC_BLOCKLIST = new Set([
  ".env",
  ".env.local",
  ".git",
  ".wuquan-data",
  "data",
  "deploy",
  "node_modules",
  "server.mjs",
  "SERVER.md",
  "start-server.bat",
]);

const rateBuckets = new Map();
let db = await loadDb();
let writeQueue = Promise.resolve();

if (JWT_SECRET === "wuquan-dev-secret-change-me") {
  console.warn("JWT_SECRET is using the development default. Set JWT_SECRET in production.");
}

function createEmptyDb() {
  return {
    users: [],
    publicDiaries: [],
    friendMoods: [],
    friendships: [],
    reports: [],
    blocks: [],
    petChats: {},
    userStates: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function normalizeDb(value) {
  const base = createEmptyDb();
  const raw = value && typeof value === "object" ? value : {};
  return {
    ...base,
    ...raw,
    users: Array.isArray(raw.users) ? raw.users : [],
    publicDiaries: Array.isArray(raw.publicDiaries) ? raw.publicDiaries : [],
    friendMoods: Array.isArray(raw.friendMoods) ? raw.friendMoods : [],
    friendships: Array.isArray(raw.friendships) ? raw.friendships : [],
    reports: Array.isArray(raw.reports) ? raw.reports : [],
    blocks: Array.isArray(raw.blocks) ? raw.blocks : [],
    petChats: isPlainObject(raw.petChats) ? raw.petChats : {},
    userStates: isPlainObject(raw.userStates) ? raw.userStates : {},
  };
}

async function loadDb() {
  try {
    const text = await readFile(DATA_FILE, "utf8");
    return normalizeDb(JSON.parse(text));
  } catch (error) {
    if (error.code !== "ENOENT") console.warn(`Could not read ${DATA_FILE}:`, error.message);
    return createEmptyDb();
  }
}

async function persistDb() {
  db.updatedAt = new Date().toISOString();
  const payload = JSON.stringify(db, null, 2);
  writeQueue = writeQueue.catch(() => undefined).then(async () => {
    await mkdir(path.dirname(DATA_FILE), { recursive: true });
    const tmp = `${DATA_FILE}.${process.pid}.tmp`;
    await writeFile(tmp, payload, "utf8");
    await rename(tmp, DATA_FILE);
  });
  await writeQueue;
}

function corsHeaders(extra = {}) {
  return {
    "Access-Control-Allow-Origin": CORS_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
    ...extra,
  };
}

function sendJson(res, statusCode, payload = {}, headers = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, corsHeaders({
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    ...headers,
  }));
  res.end(body);
}

function sendNoContent(res) {
  res.writeHead(204, corsHeaders());
  res.end();
}

function httpError(statusCode, message, code = "request_error") {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}

function clientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return forwarded || req.socket.remoteAddress || "unknown";
}

function enforceRateLimit(req, bucketName, limit, windowMs) {
  const key = `${bucketName}:${clientIp(req)}`;
  const now = Date.now();
  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  current.count += 1;
  if (current.count > limit) {
    throw httpError(429, "Too many requests. Please try again later.", "rate_limited");
  }
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    let rejected = false;

    req.on("data", (chunk) => {
      if (rejected) return;
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        rejected = true;
        reject(httpError(413, "Request body is too large.", "body_too_large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      if (rejected) return;
      const text = Buffer.concat(chunks).toString("utf8").trim();
      if (!text) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(text));
      } catch {
        reject(httpError(400, "Request body must be valid JSON.", "invalid_json"));
      }
    });

    req.on("error", (error) => {
      if (!rejected) reject(error);
    });
  });
}

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

function jsonBase64Url(value) {
  return base64Url(JSON.stringify(value));
}

function hmacBase64Url(value) {
  return crypto.createHmac("sha256", JWT_SECRET).update(value).digest("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

function createToken(user) {
  const now = Math.floor(Date.now() / 1000);
  const header = jsonBase64Url({ alg: "HS256", typ: "JWT" });
  const payload = jsonBase64Url({
    sub: user.id,
    email: user.email,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  });
  const unsigned = `${header}.${payload}`;
  return `${unsigned}.${hmacBase64Url(unsigned)}`;
}

function verifyToken(token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) throw httpError(401, "Invalid login token.", "invalid_token");
  const [header, payload, signature] = parts;
  const expected = hmacBase64Url(`${header}.${payload}`);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(actualBuffer, expectedBuffer)) {
    throw httpError(401, "Invalid login token.", "invalid_token");
  }
  let data;
  try {
    data = JSON.parse(Buffer.from(payload.replaceAll("-", "+").replaceAll("_", "/"), "base64").toString("utf8"));
  } catch {
    throw httpError(401, "Invalid login token.", "invalid_token");
  }
  if (!data.sub || !data.exp || data.exp < Math.floor(Date.now() / 1000)) {
    throw httpError(401, "Login token has expired.", "token_expired");
  }
  return data;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return { salt, hash };
}

function passwordMatches(password, user) {
  if (!user.passwordHash || !user.passwordSalt) return false;
  const { hash } = hashPassword(password, user.passwordSalt);
  const actual = Buffer.from(user.passwordHash, "hex");
  const expected = Buffer.from(hash, "hex");
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function authenticate(req, required = true) {
  const header = String(req.headers.authorization || "");
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    if (required) throw httpError(401, "Please log in first.", "auth_required");
    return null;
  }
  const payload = verifyToken(match[1]);
  const user = db.users.find((item) => item.id === payload.sub);
  if (!user) throw httpError(401, "User no longer exists.", "user_missing");
  return user;
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function cleanText(value, maxLength = 2000) {
  return String(value || "").trim().slice(0, maxLength);
}

function cleanDate(value) {
  const text = cleanText(value, 40);
  return /^\d{4}-\d{2}-\d{2}$/u.test(text) ? text : new Date().toISOString().slice(0, 10);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function boundedObject(value, maxBytes = 1024 * 1024) {
  if (!isPlainObject(value)) return undefined;
  const text = JSON.stringify(value);
  if (Buffer.byteLength(text) > maxBytes) return undefined;
  return JSON.parse(text);
}

function sanitizeImages(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string")
    .slice(0, 4)
    .map((item) => item.slice(0, 2 * 1024 * 1024));
}

function defaultUserName() {
  return "\u543e\u5708\u7528\u6237";
}

function defaultBio() {
  return "\u4eca\u5929\u4e5f\u5728\u8ba4\u771f\u751f\u6d3b";
}

function uniqueWuquanId() {
  for (let index = 0; index < 100; index += 1) {
    const id = `WQ${crypto.randomInt(100000, 1000000)}`;
    if (!db.users.some((user) => user.id === id)) return id;
  }
  return `WQ${Date.now().toString(36).toUpperCase()}`;
}

function normalizePublicIdentity(value, user) {
  const raw = isPlainObject(value) ? value : {};
  const mode = raw.mode === "hidden" ? "hidden" : "real";
  const species = cleanText(raw.species, 20) || cleanText(user?.publicIdentity?.species, 20) || "\u732b\u732b";
  return {
    mode,
    species,
    displayName: mode === "hidden" ? `${species}${user.id}` : cleanText(user.name, 40) || defaultUserName(),
    userId: user.id,
  };
}

function profilePatchFrom(value) {
  const patch = {};
  if (!isPlainObject(value)) return patch;
  if ("name" in value) patch.name = cleanText(value.name, 40) || defaultUserName();
  if ("nickname" in value && !patch.name) patch.name = cleanText(value.nickname, 40) || defaultUserName();
  if ("bio" in value) patch.bio = cleanText(value.bio, 240) || defaultBio();
  if ("avatar" in value) patch.avatar = boundedObject(value.avatar, 2 * 1024 * 1024);
  if ("wallpaper" in value) patch.wallpaper = boundedObject(value.wallpaper, 3 * 1024 * 1024);
  if ("publicIdentity" in value) {
    const raw = isPlainObject(value.publicIdentity) ? value.publicIdentity : {};
    patch.publicIdentity = {
      mode: raw.mode === "hidden" ? "hidden" : "real",
      species: cleanText(raw.species, 20) || "\u732b\u732b",
    };
  }
  if ("todayMood" in value) patch.todayMood = cleanText(value.todayMood, 40);
  if ("todayMoodDate" in value) patch.todayMoodDate = cleanDate(value.todayMoodDate);
  return Object.fromEntries(Object.entries(patch).filter(([, item]) => item !== undefined));
}

function publicUser(user) {
  return {
    id: user.id,
    wuquanId: user.id,
    email: user.email,
    name: user.name,
    nickname: user.name,
    bio: user.bio,
    avatar: user.avatar,
    wallpaper: user.wallpaper,
    publicIdentity: user.publicIdentity,
    todayMood: user.todayMood || "",
    todayMoodDate: user.todayMoodDate || "",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function sanitizeChatMessage(message) {
  if (!isPlainObject(message)) return null;
  const role = message.role === "user" ? "user" : "pet";
  const id = cleanText(message.id, 120) || crypto.randomUUID();
  const text = cleanText(message.text, 2000);
  const images = normalizeImages(message.images);
  const createdAt = cleanText(message.createdAt, 40) || new Date().toISOString();
  return { id, role, text, images, createdAt };
}

function sanitizePetChats(value) {
  if (!isPlainObject(value)) return {};
  return Object.fromEntries(Object.entries(value).map(([petId, messages]) => [
    cleanText(petId, 80),
    Array.isArray(messages) ? messages.map(sanitizeChatMessage).filter(Boolean).slice(-200) : [],
  ]).filter(([petId]) => petId));
}

function sanitizeUserState(value) {
  const raw = isPlainObject(value) ? value : {};
  return {
    diaries: Array.isArray(raw.diaries) ? raw.diaries.slice(0, 500) : [],
    theme: cleanText(raw.theme, 40) || "pink",
    safetyState: boundedObject(raw.safetyState, 512 * 1024) || {},
    friendMatches: Array.isArray(raw.friendMatches) ? raw.friendMatches.slice(0, 60) : [],
    updatedAt: new Date().toISOString(),
  };
}

function friendSummary(user, moodEntry = null) {
  return {
    id: user.id,
    wuquanId: user.id,
    name: user.name,
    nickname: user.name,
    bio: user.bio,
    avatar: user.avatar,
    mood: moodEntry?.mood || user.todayMood || "",
    todayMood: moodEntry?.mood || user.todayMood || "",
    matchedAt: moodEntry?.updatedAt || new Date().toISOString(),
  };
}

function activeFriendIds(userId) {
  const ids = new Set();
  for (const friendship of db.friendships) {
    if (friendship.stoppedAt || !Array.isArray(friendship.userIds) || !friendship.userIds.includes(userId)) continue;
    for (const id of friendship.userIds) {
      if (id !== userId) ids.add(id);
    }
  }
  return ids;
}

function blockedUserIds(userId) {
  return new Set(db.blocks
    .filter((item) => item.userId === userId)
    .map((item) => item.blockedUserId));
}

function blockingUserIds(userId) {
  return new Set(db.blocks
    .filter((item) => item.blockedUserId === userId)
    .map((item) => item.userId));
}

function isBlockedBetween(a, b) {
  return db.blocks.some((item) => (
    (item.userId === a && item.blockedUserId === b) ||
    (item.userId === b && item.blockedUserId === a)
  ));
}

function sortedPair(a, b) {
  return [a, b].sort();
}

function findActiveFriendship(a, b) {
  const pair = sortedPair(a, b);
  return db.friendships.find((item) => (
    !item.stoppedAt &&
    Array.isArray(item.userIds) &&
    item.userIds.length === 2 &&
    item.userIds[0] === pair[0] &&
    item.userIds[1] === pair[1]
  ));
}

function stopFriendship(a, b) {
  const pair = sortedPair(a, b);
  const now = new Date().toISOString();
  for (const friendship of db.friendships) {
    if (
      !friendship.stoppedAt &&
      Array.isArray(friendship.userIds) &&
      friendship.userIds.length === 2 &&
      friendship.userIds[0] === pair[0] &&
      friendship.userIds[1] === pair[1]
    ) {
      friendship.stoppedAt = now;
    }
  }
}

function upsertFriendMood(user, mood, date, profile) {
  if (isPlainObject(profile)) {
    Object.assign(user, profilePatchFrom(profile), { updatedAt: new Date().toISOString() });
  }
  user.todayMood = cleanText(mood, 40);
  user.todayMoodDate = cleanDate(date);
  user.updatedAt = new Date().toISOString();

  let entry = db.friendMoods.find((item) => item.userId === user.id);
  if (!entry) {
    entry = { userId: user.id };
    db.friendMoods.push(entry);
  }
  Object.assign(entry, {
    userId: user.id,
    mood: user.todayMood,
    date: user.todayMoodDate,
    updatedAt: new Date().toISOString(),
  });
  return entry;
}

function safetyIssue(text = "") {
  const value = String(text || "");
  const rules = [
    {
      code: "self_harm",
      message: "\u5185\u5bb9\u53ef\u80fd\u6d89\u53ca\u81ea\u6211\u4f24\u5bb3\uff0c\u4e0d\u9002\u5408\u516c\u5f00\u53d1\u5e03\u3002",
      pattern: /(\u81ea\u6740|\u8f7b\u751f|\u5272\u8155|\u8df3\u697c|\u4e0d\u60f3\u6d3b|\u7ed3\u675f\u751f\u547d|suicide|self[-\s]?harm|kill myself)/iu,
    },
    {
      code: "violence",
      message: "\u5185\u5bb9\u53ef\u80fd\u6d89\u53ca\u66b4\u529b\u6216\u4f24\u5bb3\uff0c\u4e0d\u9002\u5408\u516c\u5f00\u53d1\u5e03\u3002",
      pattern: /(\u6740\u4eba|\u5f04\u6b7b|\u780d\u6b7b|\u62a5\u590d\u793e\u4f1a|murder|terror|bomb|stab)/iu,
    },
    {
      code: "sexual",
      message: "\u5185\u5bb9\u53ef\u80fd\u6d89\u53ca\u8272\u60c5\u6216\u4ea4\u6613\uff0c\u4e0d\u9002\u5408\u516c\u5f00\u53d1\u5e03\u3002",
      pattern: /(\u7ea6\u70ae|\u88f8\u804a|\u5356\u6deb|\u5ad6\u5a3c|\u63f4\u4ea4|porn|escort)/iu,
    },
    {
      code: "privacy",
      message: "\u5185\u5bb9\u5305\u542b\u9690\u79c1\u4fe1\u606f\uff0c\u4e0d\u9002\u5408\u516c\u5f00\u53d1\u5e03\u3002",
      pattern: /(\u8eab\u4efd\u8bc1|\u94f6\u884c\u5361|\u5bb6\u5ead\u4f4f\u5740|\b1[3-9]\d{9}\b|\b\d{15,18}\b)/iu,
    },
  ];
  return rules.find((rule) => rule.pattern.test(value)) || null;
}

function assertSafePublicText(text) {
  const issue = safetyIssue(text);
  if (issue) throw httpError(400, issue.message, issue.code);
}

function publicPostForResponse(post) {
  return {
    id: post.id,
    text: post.text,
    images: post.images || [],
    mood: post.mood || "",
    audience: "public",
    publicStatus: "synced",
    author: post.author,
    commentIdentity: post.commentIdentity,
    publicComments: Array.isArray(post.publicComments) ? post.publicComments : [],
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

function resolveAiUrl() {
  if (process.env.AI_API_URL) {
    const url = process.env.AI_API_URL.replace(/\/+$/u, "");
    return url.endsWith("/v1") ? `${url}/chat/completions` : url;
  }
  if (process.env.AI_BASE_URL) {
    const base = process.env.AI_BASE_URL.replace(/\/+$/u, "");
    return base.endsWith("/v1") ? `${base}/chat/completions` : `${base}/v1/chat/completions`;
  }
  if (process.env.OPENAI_API_KEY) return "https://api.openai.com/v1/chat/completions";
  return "";
}

function latestUserText(messages = []) {
  const message = [...messages].reverse().find((item) => item?.role === "user");
  const content = message?.content;
  if (typeof content === "string") return cleanText(content, 120);
  if (Array.isArray(content)) {
    const textPart = content.find((item) => item?.type === "text");
    return cleanText(textPart?.text, 120);
  }
  return "";
}

function localAiFallback(body) {
  const jsonMode = body?.response_format?.type === "json_object";
  const content = jsonMode
    ? "{\"comments\":[]}"
    : `\u6211\u5728\u3002${latestUserText(body.messages) ? "\u4f60\u521a\u521a\u8bf4\u7684\u6211\u5148\u5e2e\u4f60\u63a5\u4f4f\uff0c\u6211\u4eec\u53ef\u4ee5\u6162\u6162\u8bf4\u3002" : "\u6211\u5148\u966a\u4f60\u5f85\u4e00\u4f1a\u513f\u3002"}`;
  return {
    id: `chatcmpl-local-${crypto.randomUUID()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: body.model || process.env.AI_MODEL || "local-fallback",
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
  };
}

async function proxyAiCompletion(body) {
  const apiUrl = resolveAiUrl();
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || "";
  if (!apiUrl || !apiKey || typeof fetch !== "function") {
    return { status: 200, payload: localAiFallback(body), headers: { "X-Wuquan-AI": "local-fallback" } };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Number(process.env.AI_TIMEOUT_MS || 60000));
  const requestBody = {
    ...body,
    model: process.env.AI_MODEL || body.model || "mimo-v2-omni",
    stream: false,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  if (process.env.AI_API_HEADERS) {
    try {
      Object.assign(headers, JSON.parse(process.env.AI_API_HEADERS));
    } catch {
      console.warn("AI_API_HEADERS is not valid JSON; ignoring it.");
    }
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
    const text = await response.text();
    let payload;
    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      payload = { message: text.slice(0, 500) };
    }
    if (!response.ok) {
      return {
        status: response.status,
        payload: {
          error: "ai_provider_error",
          message: payload?.error?.message || payload?.message || "AI provider request failed.",
        },
      };
    }
    return { status: 200, payload };
  } catch (error) {
    return {
      status: 502,
      payload: {
        error: "ai_provider_unreachable",
        message: error.name === "AbortError" ? "AI provider request timed out." : "AI provider is unreachable.",
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function handleAuth(req, res, segments, body) {
  if (segments[2] === "register" && req.method === "POST") {
    enforceRateLimit(req, "auth", 20, 15 * 60 * 1000);
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");
    const name = cleanText(body.name, 40) || defaultUserName();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) throw httpError(400, "Please enter a valid email.", "invalid_email");
    if (password.length < 6) throw httpError(400, "Password must be at least 6 characters.", "weak_password");
    if (db.users.some((user) => user.email === email)) throw httpError(409, "This email is already registered.", "email_exists");

    const passwordData = hashPassword(password);
    const now = new Date().toISOString();
    const user = {
      id: uniqueWuquanId(),
      email,
      passwordSalt: passwordData.salt,
      passwordHash: passwordData.hash,
      name,
      bio: defaultBio(),
      avatar: { type: "preset", index: crypto.randomInt(0, 60) },
      wallpaper: { type: "preset", index: crypto.randomInt(0, 35) },
      publicIdentity: { mode: "real", species: "\u732b\u732b" },
      todayMood: "",
      todayMoodDate: "",
      createdAt: now,
      updatedAt: now,
    };
    db.users.push(user);
    await persistDb();
    sendJson(res, 201, { token: createToken(user), user: publicUser(user) });
    return true;
  }

  if (segments[2] === "login" && req.method === "POST") {
    enforceRateLimit(req, "auth", 20, 15 * 60 * 1000);
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");
    const user = db.users.find((item) => item.email === email);
    if (!user || !passwordMatches(password, user)) {
      throw httpError(401, "Email or password is incorrect.", "invalid_credentials");
    }
    user.lastLoginAt = new Date().toISOString();
    await persistDb();
    sendJson(res, 200, { token: createToken(user), user: publicUser(user) });
    return true;
  }

  return false;
}

async function handleUser(req, res, segments, body) {
  if (segments[2] !== "me" && segments[2] !== "state") return false;
  const user = authenticate(req);

  if (segments[2] === "state" && req.method === "GET") {
    db.userStates[user.id] = sanitizeUserState(db.userStates[user.id] || {});
    sendJson(res, 200, { state: db.userStates[user.id] });
    return true;
  }

  if (segments[2] === "state" && req.method === "PUT") {
    db.userStates[user.id] = sanitizeUserState(body.state || body);
    await persistDb();
    sendJson(res, 200, { state: db.userStates[user.id] });
    return true;
  }

  if (segments[2] === "me" && req.method === "GET") {
    sendJson(res, 200, { user: publicUser(user) });
    return true;
  }

  if (segments[2] === "me" && req.method === "PATCH") {
    const profile = isPlainObject(body.profile) ? body.profile : body;
    Object.assign(user, profilePatchFrom(profile), { updatedAt: new Date().toISOString() });
    if (user.todayMood && user.todayMoodDate) upsertFriendMood(user, user.todayMood, user.todayMoodDate, null);
    await persistDb();
    sendJson(res, 200, { user: publicUser(user) });
    return true;
  }

  return false;
}

async function handlePetChats(req, res, segments, body) {
  if (segments[1] !== "pet-chats") return false;
  const user = authenticate(req);
  db.petChats[user.id] = sanitizePetChats(db.petChats[user.id] || {});

  if (segments.length === 2 && req.method === "GET") {
    sendJson(res, 200, { chats: db.petChats[user.id] });
    return true;
  }

  if (segments.length === 2 && req.method === "PUT") {
    db.petChats[user.id] = sanitizePetChats(body.chats || body);
    await persistDb();
    sendJson(res, 200, { chats: db.petChats[user.id] });
    return true;
  }

  return false;
}

async function handleAi(req, res, segments, body) {
  if (segments[2] !== "chat" || segments[3] !== "completions" || req.method !== "POST") return false;
  enforceRateLimit(req, "ai", 80, 60 * 60 * 1000);
  if (AI_REQUIRE_AUTH) authenticate(req);
  if (!Array.isArray(body.messages)) throw httpError(400, "messages must be an array.", "invalid_messages");
  const result = await proxyAiCompletion(body);
  sendJson(res, result.status, result.payload, result.headers || {});
  return true;
}

async function handlePublicDiaries(req, res, segments, body) {
  if (segments[1] !== "diaries" || segments[2] !== "public") return false;

  if (segments.length === 3 && req.method === "GET") {
    const user = authenticate(req, false);
    const blocked = user ? blockedUserIds(user.id) : new Set();
    const blockedBy = user ? blockingUserIds(user.id) : new Set();
    const posts = db.publicDiaries
      .filter((post) => !post.deletedAt)
      .filter((post) => !user || (!blocked.has(post.author?.id) && !blockedBy.has(post.author?.id)))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
      .slice(0, 100)
      .map(publicPostForResponse);
    sendJson(res, 200, { posts, diaries: posts });
    return true;
  }

  if (segments.length === 3 && req.method === "POST") {
    enforceRateLimit(req, "public-write", 60, 15 * 60 * 1000);
    const user = authenticate(req);
    const text = cleanText(body.text, 5000);
    if (!text && !Array.isArray(body.images)) throw httpError(400, "Public diary text or image is required.", "empty_diary");
    assertSafePublicText(text);

    const id = cleanText(body.id, 120) || crypto.randomUUID();
    const existing = db.publicDiaries.find((post) => post.id === id);
    if (existing && existing.author?.id !== user.id) throw httpError(403, "You can only edit your own public diary.", "forbidden");

    const now = new Date().toISOString();
    const post = {
      id,
      text,
      images: sanitizeImages(body.images),
      mood: cleanText(body.mood, 40),
      audience: "public",
      publicStatus: "synced",
      author: { id: user.id, name: user.name, avatar: user.avatar },
      commentIdentity: normalizePublicIdentity(body.commentIdentity, user),
      safety: { serverChecked: true, checkedAt: now },
      publicComments: existing?.publicComments || [],
      createdAt: cleanText(body.createdAt, 80) || now,
      updatedAt: now,
      deletedAt: null,
    };

    if (existing) Object.assign(existing, post);
    else db.publicDiaries.unshift(post);
    await persistDb();
    sendJson(res, existing ? 200 : 201, { diary: publicPostForResponse(post), post: publicPostForResponse(post) });
    return true;
  }

  const postId = segments[3];
  if (postId && segments.length === 4 && req.method === "DELETE") {
    const user = authenticate(req);
    const post = db.publicDiaries.find((item) => item.id === postId);
    if (post && post.author?.id !== user.id) throw httpError(403, "You can only delete your own public diary.", "forbidden");
    if (post) {
      post.deletedAt = new Date().toISOString();
      post.updatedAt = post.deletedAt;
      await persistDb();
    }
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (postId && segments[4] === "comments" && segments.length === 5 && req.method === "POST") {
    enforceRateLimit(req, "public-comment", 120, 15 * 60 * 1000);
    const user = authenticate(req);
    const post = db.publicDiaries.find((item) => item.id === postId && !item.deletedAt);
    if (!post) throw httpError(404, "Public diary was not found.", "post_not_found");
    if (isBlockedBetween(user.id, post.author?.id)) throw httpError(403, "This interaction is blocked.", "blocked");

    const text = cleanText(body.text, 2000);
    if (!text) throw httpError(400, "Comment text is required.", "empty_comment");
    assertSafePublicText(text);

    const comment = {
      id: cleanText(body.id, 120) || crypto.randomUUID(),
      text,
      identity: normalizePublicIdentity(body.identity || body.commentIdentity, user),
      authorId: user.id,
      createdAt: cleanText(body.createdAt, 80) || new Date().toISOString(),
    };
    post.publicComments = Array.isArray(post.publicComments) ? post.publicComments : [];
    post.publicComments.push(comment);
    post.updatedAt = new Date().toISOString();
    await persistDb();
    sendJson(res, 201, { comment });
    return true;
  }

  if (postId && segments[4] === "comments" && segments[5] && segments.length === 6 && req.method === "DELETE") {
    const user = authenticate(req);
    const post = db.publicDiaries.find((item) => item.id === postId && !item.deletedAt);
    if (!post) throw httpError(404, "Public diary was not found.", "post_not_found");
    const comment = (post.publicComments || []).find((item) => item.id === segments[5]);
    if (comment && comment.authorId !== user.id && post.author?.id !== user.id) {
      throw httpError(403, "You can only delete your own comment.", "forbidden");
    }
    post.publicComments = (post.publicComments || []).filter((item) => item.id !== segments[5]);
    post.updatedAt = new Date().toISOString();
    await persistDb();
    sendJson(res, 200, { ok: true });
    return true;
  }

  return false;
}

async function handleFriends(req, res, segments, body) {
  if (segments[1] !== "friends") return false;

  if (segments[2] === "match" && req.method === "POST") {
    enforceRateLimit(req, "friend-match", 80, 15 * 60 * 1000);
    const user = authenticate(req);
    const mood = cleanText(body.mood, 40);
    if (!mood) throw httpError(400, "mood is required.", "missing_mood");
    const date = cleanDate(body.date);
    const currentMood = upsertFriendMood(user, mood, date, body.profile);
    const blocked = blockedUserIds(user.id);
    const blockedBy = blockingUserIds(user.id);
    const friends = activeFriendIds(user.id);
    const matches = db.friendMoods
      .filter((entry) => entry.userId !== user.id && entry.date === currentMood.date && entry.mood === currentMood.mood)
      .filter((entry) => !blocked.has(entry.userId) && !blockedBy.has(entry.userId) && !friends.has(entry.userId))
      .map((entry) => {
        const matchedUser = db.users.find((item) => item.id === entry.userId);
        return matchedUser ? friendSummary(matchedUser, entry) : null;
      })
      .filter(Boolean)
      .slice(0, 30);
    await persistDb();
    sendJson(res, 200, { matches, users: matches });
    return true;
  }

  if (segments.length === 2 && req.method === "GET") {
    const user = authenticate(req);
    const friends = [...activeFriendIds(user.id)]
      .map((id) => db.users.find((item) => item.id === id))
      .filter(Boolean)
      .map((friend) => friendSummary(friend, db.friendMoods.find((entry) => entry.userId === friend.id)));
    sendJson(res, 200, { friends });
    return true;
  }

  if (segments.length === 2 && req.method === "POST") {
    enforceRateLimit(req, "friend-add", 60, 15 * 60 * 1000);
    const user = authenticate(req);
    const friendId = cleanText(body.friendId, 120);
    if (!friendId || friendId === user.id) throw httpError(400, "friendId is invalid.", "invalid_friend");
    const friend = db.users.find((item) => item.id === friendId);
    if (!friend) throw httpError(404, "Friend was not found.", "friend_not_found");
    if (isBlockedBetween(user.id, friendId)) throw httpError(403, "This user is blocked.", "blocked");

    const myMood = db.friendMoods.find((entry) => entry.userId === user.id);
    const theirMood = db.friendMoods.find((entry) => entry.userId === friendId);
    if (!myMood || !theirMood || myMood.date !== theirMood.date || myMood.mood !== theirMood.mood) {
      throw httpError(409, "You can only add a friend with the same mood on the same day.", "mood_mismatch");
    }

    let friendship = findActiveFriendship(user.id, friendId);
    if (!friendship) {
      friendship = {
        id: crypto.randomUUID(),
        userIds: sortedPair(user.id, friendId),
        mood: myMood.mood,
        date: myMood.date,
        createdAt: new Date().toISOString(),
        stoppedAt: null,
      };
      db.friendships.push(friendship);
      await persistDb();
    }

    sendJson(res, 201, { friendship, friend: friendSummary(friend, theirMood) });
    return true;
  }

  if (segments[2] && segments.length === 3 && req.method === "DELETE") {
    const user = authenticate(req);
    stopFriendship(user.id, segments[2]);
    await persistDb();
    sendJson(res, 200, { ok: true });
    return true;
  }

  return false;
}

async function handleReports(req, res, segments, body) {
  if (segments[1] !== "reports" || segments.length !== 2 || req.method !== "POST") return false;
  enforceRateLimit(req, "report", 30, 15 * 60 * 1000);
  const user = authenticate(req, false);
  const report = {
    id: cleanText(body.id, 120) || crypto.randomUUID(),
    reporterId: user?.id || null,
    targetId: cleanText(body.targetId, 120),
    targetType: cleanText(body.targetType || body.type, 40) || "unknown",
    reason: cleanText(body.reason, 1000),
    status: "open",
    createdAt: cleanText(body.createdAt, 80) || new Date().toISOString(),
  };
  if (!report.targetId || !report.reason) throw httpError(400, "targetId and reason are required.", "invalid_report");
  db.reports.unshift(report);
  await persistDb();
  sendJson(res, 201, { ok: true, report });
  return true;
}

async function handleBlocks(req, res, segments, body) {
  if (segments[1] !== "blocks" || segments.length !== 2 || req.method !== "POST") return false;
  enforceRateLimit(req, "block", 80, 15 * 60 * 1000);
  const user = authenticate(req);
  const blockedUserId = cleanText(body.userId || body.blockedUserId, 120);
  if (!blockedUserId || blockedUserId === user.id) throw httpError(400, "blocked user id is invalid.", "invalid_block");
  if (!db.blocks.some((item) => item.userId === user.id && item.blockedUserId === blockedUserId)) {
    db.blocks.push({
      id: crypto.randomUUID(),
      userId: user.id,
      blockedUserId,
      createdAt: new Date().toISOString(),
    });
  }
  stopFriendship(user.id, blockedUserId);
  await persistDb();
  sendJson(res, 201, { ok: true });
  return true;
}

function decodeSegment(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

async function handleApi(req, res, url) {
  try {
    const segments = url.pathname.split("/").filter(Boolean).map(decodeSegment);
    const body = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method || "") ? await readJsonBody(req) : {};

    if (segments[1] === "health" && req.method === "GET") {
      sendJson(res, 200, {
        ok: true,
        app: "wuquan",
        storage: path.relative(ROOT, DATA_FILE) || DATA_FILE,
        aiConfigured: Boolean(resolveAiUrl() && (process.env.AI_API_KEY || process.env.OPENAI_API_KEY)),
      });
      return;
    }

    const handled = await handleAuth(req, res, segments, body) ||
      await handleUser(req, res, segments, body) ||
      await handlePetChats(req, res, segments, body) ||
      await handleAi(req, res, segments, body) ||
      await handlePublicDiaries(req, res, segments, body) ||
      await handleFriends(req, res, segments, body) ||
      await handleReports(req, res, segments, body) ||
      await handleBlocks(req, res, segments, body);

    if (!handled) sendJson(res, 404, { error: "not_found", message: "API route was not found." });
  } catch (error) {
    const status = error.statusCode || 500;
    if (status >= 500) console.error(error);
    sendJson(res, status, {
      error: error.code || "server_error",
      message: error.message || "Server error.",
    });
  }
}

function isBlockedStaticPath(relativePath) {
  const segments = relativePath.split(/[\\/]+/u).filter(Boolean);
  return segments.some((segment) => segment.startsWith(".") || STATIC_BLOCKLIST.has(segment));
}

function resolveStaticPath(url) {
  const pathname = decodeSegment(url.pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/u, "");
  if (isBlockedStaticPath(relative)) return { blocked: true };
  const resolved = path.resolve(ROOT, relative);
  if (!resolved.startsWith(`${ROOT}${path.sep}`) && resolved !== ROOT) return { blocked: true };
  return { filePath: resolved };
}

async function handleStatic(req, res, url) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, corsHeaders({ Allow: "GET, HEAD" }));
    res.end("Method Not Allowed");
    return;
  }

  const target = resolveStaticPath(url);
  if (target.blocked) {
    res.writeHead(404, corsHeaders({ "Content-Type": "text/plain; charset=utf-8" }));
    res.end("Not Found");
    return;
  }

  let filePath = target.filePath;
  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = path.join(filePath, "index.html");
  } catch {
    filePath = path.join(ROOT, "index.html");
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("Not a file");
    const ext = path.extname(filePath).toLowerCase();
    const headers = corsHeaders({
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Content-Length": info.size,
    });
    if (path.basename(filePath) === "sw.js" || path.basename(filePath) === "index.html") {
      headers["Cache-Control"] = "no-cache";
    }
    res.writeHead(200, headers);
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404, corsHeaders({ "Content-Type": "text/plain; charset=utf-8" }));
    res.end("Not Found");
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  if (req.method === "OPTIONS") {
    sendNoContent(res);
    return;
  }
  if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
    await handleApi(req, res, url);
    return;
  }
  await handleStatic(req, res, url);
});

server.listen(PORT, HOST, () => {
  console.log(`Wuquan server is running at http://localhost:${PORT}/`);
  console.log(`Static root: ${ROOT}`);
  console.log(`Database file: ${DATA_FILE}`);
  console.log(`AI proxy: ${resolveAiUrl() ? "configured" : "local fallback"}`);
});
