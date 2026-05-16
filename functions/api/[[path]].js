const DB_KEY = "db";
const DEFAULT_SECRET = "wuquan-cloudflare-dev-secret-change-me";
const enc = new TextEncoder();
const dec = new TextDecoder();

function emptyDb() {
  return {
    users: [],
    publicDiaries: [],
    friendMoods: [],
    friendships: [],
    reports: [],
    blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function normalizeDb(value) {
  const base = emptyDb();
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
  };
}

async function loadDb(env) {
  if (env.WUQUAN_KV) {
    const text = await env.WUQUAN_KV.get(DB_KEY);
    return text ? normalizeDb(JSON.parse(text)) : emptyDb();
  }
  globalThis.__WUQUAN_MEMORY_DB ||= emptyDb();
  return normalizeDb(globalThis.__WUQUAN_MEMORY_DB);
}

async function saveDb(env, db) {
  db.updatedAt = new Date().toISOString();
  if (env.WUQUAN_KV) {
    await env.WUQUAN_KV.put(DB_KEY, JSON.stringify(db));
    return;
  }
  globalThis.__WUQUAN_MEMORY_DB = db;
}

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(env, status, payload, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders(env),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function fail(status, message, code = "request_error") {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanText(value, max = 2000) {
  return String(value || "").trim().slice(0, max);
}

function cleanDate(value) {
  const text = cleanText(value, 40);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : new Date().toISOString().slice(0, 10);
}

function normalizeEmail(value) {
  return cleanText(value, 254).toLowerCase();
}

function defaultName() {
  return "\u543e\u5708\u7528\u6237";
}

function defaultBio() {
  return "\u4eca\u5929\u4e5f\u5728\u8ba4\u771f\u751f\u6d3b";
}

function speciesDefault() {
  return "\u732b\u732b";
}

function randomInt(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function newWuquanId(db) {
  for (let index = 0; index < 100; index += 1) {
    const id = `WQ${100000 + randomInt(900000)}`;
    if (!db.users.some((user) => user.id === id)) return id;
  }
  return `WQ${Date.now().toString(36).toUpperCase()}`;
}

function bytesToHex(bytes) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex) {
  const clean = String(hex || "");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i += 1) bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

function bytesToBase64Url(bytes) {
  let raw = "";
  for (const byte of bytes) raw += String.fromCharCode(byte);
  return btoa(raw).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const padded = String(value || "").replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(String(value || "").length / 4) * 4, "=");
  const raw = atob(padded);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

function textToBase64Url(value) {
  return bytesToBase64Url(enc.encode(value));
}

function base64UrlToText(value) {
  return dec.decode(base64UrlToBytes(value));
}

async function hashPassword(password, salt = crypto.randomUUID()) {
  const key = await crypto.subtle.importKey("raw", enc.encode(String(password)), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    salt: enc.encode(salt),
    iterations: 100000,
    hash: "SHA-256",
  }, key, 256);
  return { salt, hash: bytesToHex(new Uint8Array(bits)) };
}

function constantEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function passwordMatches(password, user) {
  const hashed = await hashPassword(password, user.passwordSalt);
  return constantEqual(hexToBytes(hashed.hash), hexToBytes(user.passwordHash));
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

async function createToken(env, user) {
  const now = Math.floor(Date.now() / 1000);
  const header = textToBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = textToBase64Url(JSON.stringify({
    sub: user.id,
    email: user.email,
    iat: now,
    exp: now + Number(env.TOKEN_TTL_SECONDS || 60 * 60 * 24 * 30),
  }));
  const unsigned = `${header}.${payload}`;
  return `${unsigned}.${await hmac(unsigned, env.JWT_SECRET || DEFAULT_SECRET)}`;
}

async function verifyToken(env, token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) throw fail(401, "Invalid login token.", "invalid_token");
  const unsigned = `${parts[0]}.${parts[1]}`;
  const expected = await hmac(unsigned, env.JWT_SECRET || DEFAULT_SECRET);
  if (expected !== parts[2]) throw fail(401, "Invalid login token.", "invalid_token");
  const payload = JSON.parse(base64UrlToText(parts[1]));
  if (!payload.sub || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    throw fail(401, "Login token has expired.", "token_expired");
  }
  return payload;
}

async function authUser(env, db, request, required = true) {
  const header = request.headers.get("Authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    if (required) throw fail(401, "Please log in first.", "auth_required");
    return null;
  }
  const payload = await verifyToken(env, match[1]);
  const user = db.users.find((item) => item.id === payload.sub);
  if (!user) throw fail(401, "User no longer exists.", "user_missing");
  return user;
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

function boundedObject(value, maxBytes = 1024 * 1024) {
  if (!isObject(value)) return undefined;
  const text = JSON.stringify(value);
  if (text.length > maxBytes) return undefined;
  return JSON.parse(text);
}

function profilePatchFrom(value) {
  const patch = {};
  if (!isObject(value)) return patch;
  if ("name" in value) patch.name = cleanText(value.name, 40) || defaultName();
  if ("nickname" in value && !patch.name) patch.name = cleanText(value.nickname, 40) || defaultName();
  if ("bio" in value) patch.bio = cleanText(value.bio, 240) || defaultBio();
  if ("avatar" in value) patch.avatar = boundedObject(value.avatar, 2 * 1024 * 1024);
  if ("wallpaper" in value) patch.wallpaper = boundedObject(value.wallpaper, 3 * 1024 * 1024);
  if ("publicIdentity" in value) {
    const raw = isObject(value.publicIdentity) ? value.publicIdentity : {};
    patch.publicIdentity = {
      mode: raw.mode === "hidden" ? "hidden" : "real",
      species: cleanText(raw.species, 20) || speciesDefault(),
    };
  }
  if ("todayMood" in value) patch.todayMood = cleanText(value.todayMood, 40);
  if ("todayMoodDate" in value) patch.todayMoodDate = cleanDate(value.todayMoodDate);
  return Object.fromEntries(Object.entries(patch).filter(([, item]) => item !== undefined));
}

function sanitizeImages(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === "string").slice(0, 4).map((item) => item.slice(0, 2 * 1024 * 1024));
}

function safetyIssue(text = "") {
  const value = String(text || "");
  const rules = [
    { code: "self_harm", message: "\u5185\u5bb9\u53ef\u80fd\u6d89\u53ca\u81ea\u6211\u4f24\u5bb3\uff0c\u4e0d\u9002\u5408\u516c\u5f00\u53d1\u5e03\u3002", pattern: /(\u81ea\u6740|\u8f7b\u751f|\u5272\u8155|\u8df3\u697c|\u4e0d\u60f3\u6d3b|\u7ed3\u675f\u751f\u547d|suicide|self[-\s]?harm|kill myself)/iu },
    { code: "violence", message: "\u5185\u5bb9\u53ef\u80fd\u6d89\u53ca\u66b4\u529b\u6216\u4f24\u5bb3\uff0c\u4e0d\u9002\u5408\u516c\u5f00\u53d1\u5e03\u3002", pattern: /(\u6740\u4eba|\u5f04\u6b7b|\u780d\u6b7b|\u62a5\u590d\u793e\u4f1a|murder|terror|bomb|stab)/iu },
    { code: "sexual", message: "\u5185\u5bb9\u53ef\u80fd\u6d89\u53ca\u8272\u60c5\u6216\u4ea4\u6613\uff0c\u4e0d\u9002\u5408\u516c\u5f00\u53d1\u5e03\u3002", pattern: /(\u7ea6\u70ae|\u88f8\u804a|\u5356\u6deb|\u5ad6\u5a3c|\u63f4\u4ea4|porn|escort)/iu },
    { code: "privacy", message: "\u5185\u5bb9\u5305\u542b\u9690\u79c1\u4fe1\u606f\uff0c\u4e0d\u9002\u5408\u516c\u5f00\u53d1\u5e03\u3002", pattern: /(\u8eab\u4efd\u8bc1|\u94f6\u884c\u5361|\u5bb6\u5ead\u4f4f\u5740|\b1[3-9]\d{9}\b|\b\d{15,18}\b)/iu },
  ];
  return rules.find((rule) => rule.pattern.test(value));
}

function assertSafePublicText(text) {
  const issue = safetyIssue(text);
  if (issue) throw fail(400, issue.message, issue.code);
}

function normalizePublicIdentity(value, user) {
  const raw = isObject(value) ? value : {};
  const mode = raw.mode === "hidden" ? "hidden" : "real";
  const species = cleanText(raw.species, 20) || user.publicIdentity?.species || speciesDefault();
  return {
    mode,
    species,
    displayName: mode === "hidden" ? `${species}${user.id}` : (cleanText(user.name, 40) || defaultName()),
    userId: user.id,
  };
}

function friendSummary(user, moodEntry) {
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

function sortedPair(a, b) {
  return [a, b].sort();
}

function activeFriendIds(db, userId) {
  const ids = new Set();
  for (const item of db.friendships) {
    if (item.stoppedAt || !Array.isArray(item.userIds) || !item.userIds.includes(userId)) continue;
    for (const id of item.userIds) if (id !== userId) ids.add(id);
  }
  return ids;
}

function blockedUserIds(db, userId) {
  return new Set(db.blocks.filter((item) => item.userId === userId).map((item) => item.blockedUserId));
}

function blockingUserIds(db, userId) {
  return new Set(db.blocks.filter((item) => item.blockedUserId === userId).map((item) => item.userId));
}

function isBlockedBetween(db, a, b) {
  return db.blocks.some((item) => (item.userId === a && item.blockedUserId === b) || (item.userId === b && item.blockedUserId === a));
}

function findFriendship(db, a, b) {
  const pair = sortedPair(a, b);
  return db.friendships.find((item) => !item.stoppedAt && item.userIds?.[0] === pair[0] && item.userIds?.[1] === pair[1]);
}

function stopFriendship(db, a, b) {
  const pair = sortedPair(a, b);
  const now = new Date().toISOString();
  for (const item of db.friendships) {
    if (!item.stoppedAt && item.userIds?.[0] === pair[0] && item.userIds?.[1] === pair[1]) item.stoppedAt = now;
  }
}

function upsertMood(db, user, mood, date, profile) {
  if (isObject(profile)) Object.assign(user, profilePatchFrom(profile), { updatedAt: new Date().toISOString() });
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

function postResponse(post) {
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

function latestUserText(messages = []) {
  const message = [...messages].reverse().find((item) => item?.role === "user");
  const content = message?.content;
  if (typeof content === "string") return cleanText(content, 120);
  if (Array.isArray(content)) return cleanText(content.find((item) => item?.type === "text")?.text, 120);
  return "";
}

function aiFallback(body) {
  const jsonMode = body?.response_format?.type === "json_object";
  return {
    id: `chatcmpl-local-${crypto.randomUUID()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: body.model || "local-fallback",
    choices: [{
      index: 0,
      message: {
        role: "assistant",
        content: jsonMode ? "{\"comments\":[]}" : `\u6211\u5728\u3002${latestUserText(body.messages) ? "\u4f60\u521a\u521a\u8bf4\u7684\u6211\u5148\u5e2e\u4f60\u63a5\u4f4f\uff0c\u6211\u4eec\u53ef\u4ee5\u6162\u6162\u8bf4\u3002" : "\u6211\u5148\u966a\u4f60\u5f85\u4e00\u4f1a\u513f\u3002"}`,
      },
      finish_reason: "stop",
    }],
  };
}

function aiUrl(env) {
  if (env.AI_API_URL) return env.AI_API_URL;
  if (env.AI_BASE_URL) {
    const base = env.AI_BASE_URL.replace(/\/+$/g, "");
    return base.endsWith("/v1") ? `${base}/chat/completions` : `${base}/v1/chat/completions`;
  }
  if (env.OPENAI_API_KEY) return "https://api.openai.com/v1/chat/completions";
  return "";
}

async function proxyAi(env, body) {
  const url = aiUrl(env);
  const key = env.AI_API_KEY || env.OPENAI_API_KEY || "";
  if (!url || !key) return { status: 200, payload: aiFallback(body), headers: { "X-Wuquan-AI": "local-fallback" } };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ ...body, model: env.AI_MODEL || body.model || "mimo-v2-omni", stream: false }),
  });
  const text = await response.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { message: text.slice(0, 500) };
  }
  if (!response.ok) {
    return { status: response.status, payload: { error: "ai_provider_error", message: payload?.error?.message || payload?.message || "AI provider request failed." } };
  }
  return { status: 200, payload };
}

async function readBody(request) {
  if (!["POST", "PATCH", "DELETE"].includes(request.method)) return {};
  const text = (await request.text()).trim();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw fail(400, "Request body must be valid JSON.", "invalid_json");
  }
}

async function handleAuth(env, db, request, segments, body) {
  if (segments[1] === "register" && request.method === "POST") {
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");
    const name = cleanText(body.name, 40) || defaultName();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw fail(400, "Please enter a valid email.", "invalid_email");
    if (password.length < 6) throw fail(400, "Password must be at least 6 characters.", "weak_password");
    if (db.users.some((user) => user.email === email)) throw fail(409, "This email is already registered.", "email_exists");
    const passwordData = await hashPassword(password);
    const now = new Date().toISOString();
    const user = {
      id: newWuquanId(db),
      email,
      passwordSalt: passwordData.salt,
      passwordHash: passwordData.hash,
      name,
      bio: defaultBio(),
      avatar: { type: "preset", index: randomInt(60) },
      wallpaper: { type: "preset", index: randomInt(35) },
      publicIdentity: { mode: "real", species: speciesDefault() },
      todayMood: "",
      todayMoodDate: "",
      createdAt: now,
      updatedAt: now,
    };
    db.users.push(user);
    await saveDb(env, db);
    return json(env, 201, { token: await createToken(env, user), user: publicUser(user) });
  }

  if (segments[1] === "login" && request.method === "POST") {
    const email = normalizeEmail(body.email);
    const user = db.users.find((item) => item.email === email);
    if (!user || !(await passwordMatches(body.password || "", user))) throw fail(401, "Email or password is incorrect.", "invalid_credentials");
    user.lastLoginAt = new Date().toISOString();
    await saveDb(env, db);
    return json(env, 200, { token: await createToken(env, user), user: publicUser(user) });
  }
  return null;
}

async function handleUser(env, db, request, segments, body) {
  if (segments[1] !== "me") return null;
  const user = await authUser(env, db, request);
  if (request.method === "GET") return json(env, 200, { user: publicUser(user) });
  if (request.method === "PATCH") {
    const profile = isObject(body.profile) ? body.profile : body;
    Object.assign(user, profilePatchFrom(profile), { updatedAt: new Date().toISOString() });
    if (user.todayMood && user.todayMoodDate) upsertMood(db, user, user.todayMood, user.todayMoodDate);
    await saveDb(env, db);
    return json(env, 200, { user: publicUser(user) });
  }
  return null;
}

async function handleAi(env, db, request, segments, body) {
  if (segments[1] !== "chat" || segments[2] !== "completions" || request.method !== "POST") return null;
  if (env.AI_REQUIRE_AUTH !== "0") await authUser(env, db, request);
  if (!Array.isArray(body.messages)) throw fail(400, "messages must be an array.", "invalid_messages");
  const result = await proxyAi(env, body);
  return json(env, result.status, result.payload, result.headers || {});
}

async function handlePublicDiaries(env, db, request, segments, body) {
  if (segments[0] !== "diaries" || segments[1] !== "public") return null;

  if (segments.length === 2 && request.method === "GET") {
    const user = await authUser(env, db, request, false);
    const blocked = user ? blockedUserIds(db, user.id) : new Set();
    const blockedBy = user ? blockingUserIds(db, user.id) : new Set();
    const posts = db.publicDiaries
      .filter((post) => !post.deletedAt)
      .filter((post) => !user || (!blocked.has(post.author?.id) && !blockedBy.has(post.author?.id)))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
      .slice(0, 100)
      .map(postResponse);
    return json(env, 200, { posts, diaries: posts });
  }

  if (segments.length === 2 && request.method === "POST") {
    const user = await authUser(env, db, request);
    const text = cleanText(body.text, 5000);
    if (!text && !Array.isArray(body.images)) throw fail(400, "Public diary text or image is required.", "empty_diary");
    assertSafePublicText(text);
    const id = cleanText(body.id, 120) || crypto.randomUUID();
    const existing = db.publicDiaries.find((post) => post.id === id);
    if (existing && existing.author?.id !== user.id) throw fail(403, "You can only edit your own public diary.", "forbidden");
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
    await saveDb(env, db);
    return json(env, existing ? 200 : 201, { diary: postResponse(post), post: postResponse(post) });
  }

  const postId = segments[2];
  if (postId && segments.length === 3 && request.method === "DELETE") {
    const user = await authUser(env, db, request);
    const post = db.publicDiaries.find((item) => item.id === postId);
    if (post && post.author?.id !== user.id) throw fail(403, "You can only delete your own public diary.", "forbidden");
    if (post) {
      post.deletedAt = new Date().toISOString();
      post.updatedAt = post.deletedAt;
      await saveDb(env, db);
    }
    return json(env, 200, { ok: true });
  }

  if (postId && segments[3] === "comments" && segments.length === 4 && request.method === "POST") {
    const user = await authUser(env, db, request);
    const post = db.publicDiaries.find((item) => item.id === postId && !item.deletedAt);
    if (!post) throw fail(404, "Public diary was not found.", "post_not_found");
    if (isBlockedBetween(db, user.id, post.author?.id)) throw fail(403, "This interaction is blocked.", "blocked");
    const text = cleanText(body.text, 2000);
    if (!text) throw fail(400, "Comment text is required.", "empty_comment");
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
    await saveDb(env, db);
    return json(env, 201, { comment });
  }

  if (postId && segments[3] === "comments" && segments[4] && segments.length === 5 && request.method === "DELETE") {
    const user = await authUser(env, db, request);
    const post = db.publicDiaries.find((item) => item.id === postId && !item.deletedAt);
    if (!post) throw fail(404, "Public diary was not found.", "post_not_found");
    const comment = (post.publicComments || []).find((item) => item.id === segments[4]);
    if (comment && comment.authorId !== user.id && post.author?.id !== user.id) throw fail(403, "You can only delete your own comment.", "forbidden");
    post.publicComments = (post.publicComments || []).filter((item) => item.id !== segments[4]);
    post.updatedAt = new Date().toISOString();
    await saveDb(env, db);
    return json(env, 200, { ok: true });
  }

  return null;
}

async function handleFriends(env, db, request, segments, body) {
  if (segments[0] !== "friends") return null;

  if (segments[1] === "match" && request.method === "POST") {
    const user = await authUser(env, db, request);
    const mood = cleanText(body.mood, 40);
    if (!mood) throw fail(400, "mood is required.", "missing_mood");
    const entry = upsertMood(db, user, mood, cleanDate(body.date), body.profile);
    const blocked = blockedUserIds(db, user.id);
    const blockedBy = blockingUserIds(db, user.id);
    const friends = activeFriendIds(db, user.id);
    const matches = db.friendMoods
      .filter((item) => item.userId !== user.id && item.date === entry.date && item.mood === entry.mood)
      .filter((item) => !blocked.has(item.userId) && !blockedBy.has(item.userId) && !friends.has(item.userId))
      .map((item) => {
        const matched = db.users.find((userItem) => userItem.id === item.userId);
        return matched ? friendSummary(matched, item) : null;
      })
      .filter(Boolean)
      .slice(0, 30);
    await saveDb(env, db);
    return json(env, 200, { matches, users: matches });
  }

  if (segments.length === 1 && request.method === "GET") {
    const user = await authUser(env, db, request);
    const friends = [...activeFriendIds(db, user.id)]
      .map((id) => db.users.find((item) => item.id === id))
      .filter(Boolean)
      .map((friend) => friendSummary(friend, db.friendMoods.find((item) => item.userId === friend.id)));
    return json(env, 200, { friends });
  }

  if (segments.length === 1 && request.method === "POST") {
    const user = await authUser(env, db, request);
    const friendId = cleanText(body.friendId, 120);
    const friend = db.users.find((item) => item.id === friendId);
    if (!friendId || friendId === user.id || !friend) throw fail(404, "Friend was not found.", "friend_not_found");
    if (isBlockedBetween(db, user.id, friendId)) throw fail(403, "This user is blocked.", "blocked");
    const mine = db.friendMoods.find((item) => item.userId === user.id);
    const theirs = db.friendMoods.find((item) => item.userId === friendId);
    if (!mine || !theirs || mine.date !== theirs.date || mine.mood !== theirs.mood) {
      throw fail(409, "You can only add a friend with the same mood on the same day.", "mood_mismatch");
    }
    let friendship = findFriendship(db, user.id, friendId);
    if (!friendship) {
      friendship = {
        id: crypto.randomUUID(),
        userIds: sortedPair(user.id, friendId),
        mood: mine.mood,
        date: mine.date,
        createdAt: new Date().toISOString(),
        stoppedAt: null,
      };
      db.friendships.push(friendship);
      await saveDb(env, db);
    }
    return json(env, 201, { friendship, friend: friendSummary(friend, theirs) });
  }

  if (segments[1] && segments.length === 2 && request.method === "DELETE") {
    const user = await authUser(env, db, request);
    stopFriendship(db, user.id, segments[1]);
    await saveDb(env, db);
    return json(env, 200, { ok: true });
  }
  return null;
}

async function handleReports(env, db, request, segments, body) {
  if (segments[0] !== "reports" || segments.length !== 1 || request.method !== "POST") return null;
  const user = await authUser(env, db, request, false);
  const report = {
    id: cleanText(body.id, 120) || crypto.randomUUID(),
    reporterId: user?.id || null,
    targetId: cleanText(body.targetId, 120),
    targetType: cleanText(body.targetType || body.type, 40) || "unknown",
    reason: cleanText(body.reason, 1000),
    status: "open",
    createdAt: cleanText(body.createdAt, 80) || new Date().toISOString(),
  };
  if (!report.targetId || !report.reason) throw fail(400, "targetId and reason are required.", "invalid_report");
  db.reports.unshift(report);
  await saveDb(env, db);
  return json(env, 201, { ok: true, report });
}

async function handleBlocks(env, db, request, segments, body) {
  if (segments[0] !== "blocks" || segments.length !== 1 || request.method !== "POST") return null;
  const user = await authUser(env, db, request);
  const blockedUserId = cleanText(body.userId || body.blockedUserId, 120);
  if (!blockedUserId || blockedUserId === user.id) throw fail(400, "blocked user id is invalid.", "invalid_block");
  if (!db.blocks.some((item) => item.userId === user.id && item.blockedUserId === blockedUserId)) {
    db.blocks.push({ id: crypto.randomUUID(), userId: user.id, blockedUserId, createdAt: new Date().toISOString() });
  }
  stopFriendship(db, user.id, blockedUserId);
  await saveDb(env, db);
  return json(env, 201, { ok: true });
}

async function route(env, db, request, segments, body) {
  if (segments[0] === "health" && request.method === "GET") {
    return json(env, 200, {
      ok: true,
      app: "wuquan",
      runtime: "cloudflare-pages-functions",
      kvConfigured: Boolean(env.WUQUAN_KV),
      aiConfigured: Boolean(aiUrl(env) && (env.AI_API_KEY || env.OPENAI_API_KEY)),
    });
  }
  if (segments[0] === "auth") return handleAuth(env, db, request, segments, body);
  if (segments[0] === "user") return handleUser(env, db, request, segments, body);
  if (segments[0] === "ai") return handleAi(env, db, request, segments, body);
  if (segments[0] === "diaries") return handlePublicDiaries(env, db, request, segments, body);
  if (segments[0] === "friends") return handleFriends(env, db, request, segments, body);
  if (segments[0] === "reports") return handleReports(env, db, request, segments, body);
  if (segments[0] === "blocks") return handleBlocks(env, db, request, segments, body);
  return null;
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(env) });

  try {
    const rawPath = context.params.path || "";
    const path = Array.isArray(rawPath) ? rawPath.join("/") : rawPath;
    const segments = path.split("/").filter(Boolean).map((part) => decodeURIComponent(part));
    const body = await readBody(request);
    const db = await loadDb(env);
    const response = await route(env, db, request, segments, body);
    return response || json(env, 404, { error: "not_found", message: "API route was not found." });
  } catch (error) {
    const status = error.status || 500;
    return json(env, status, {
      error: error.code || "server_error",
      message: error.message || "Server error.",
    });
  }
}
