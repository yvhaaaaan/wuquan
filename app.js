const PETS = [
  ["墨镜鳄鱼", "鳄龙鲨鱼", "🐊", "酷酷的外表下面很稳，适合把慌张慢慢压住"],
  ["蓝绿恐龙", "鳄龙鲨鱼", "🦖", "反应大但心很软，擅长把坏心情讲轻一点"],
  ["奖牌柴犬", "狗狗伙伴", "🐶", "认真又可靠，最会把小努力看得很珍贵"],
  ["呆萌企鹅", "鸟类伙伴", "🐧", "慢半拍也不着急，陪你把话一点点理顺"],
  ["铃铛白猫", "猫咪伙伴", "🐱", "干净温柔，说话轻轻的但很会看见细节"],
  ["白熊团子", "熊虎猩猩", "🐻‍❄️", "安静厚实，像一块不会催你的软垫"],
  ["灰白兔", "兔兔小队", "🐰", "敏感细腻，能听见你没说完的那半句"],
  ["温柔海象", "海洋朋友", "🦭", "慢吞吞但很可靠，擅长守住情绪边界"],
  ["海盗鳄鱼", "鳄龙鲨鱼", "🐊", "有点冒险精神，会把难过说成一场可过关的小航行"],
  ["金链小熊", "熊虎猩猩", "🐻", "看着很酷，其实是稳稳接话的暖心派"],
  ["飞行员恐龙", "鳄龙鲨鱼", "🦖", "脑洞很亮，喜欢带你换个角度看事情"],
  ["骑士锤头鲨", "鳄龙鲨鱼", "🦈", "外表威风，回应却很讲分寸和保护感"],
  ["香蕉海盗猫", "猫咪伙伴", "🐱", "古灵精怪，能把沉重的话题掰出一点光"],
  ["墨镜白鹅", "鸟类伙伴", "🦆", "淡定又有范，适合把混乱心情慢慢降噪"],
  ["墨镜牛头梗", "狗狗伙伴", "🐶", "嘴上很酷，真正听你说话时特别认真"],
  ["粉红锤头鲨", "鳄龙鲨鱼", "🦈", "有一点倔，也有很多柔软的安慰"],
  ["围巾猫头鹰", "鸟类伙伴", "🦉", "观察力很好，常能抓住你话里的重点"],
  ["武士柴犬", "狗狗伙伴", "🐶", "勇敢讲义气，会陪你把委屈挡在外面"],
  ["唐装小猪", "草原农场", "🐷", "福气满满，说话实在又不失温柔"],
  ["兜帽灰猫", "猫咪伙伴", "🐱", "安静有边界，适合听秘密和小别扭"],
  ["叶子比格犬", "狗狗伙伴", "🐶", "元气清爽，喜欢把小事重新讲得可爱"],
  ["香蕉黑猫", "猫咪伙伴", "🐈‍⬛", "表情冷静，内心却很会替人着想"],
  ["球衣橘猫", "猫咪伙伴", "🐱", "活力很足，擅长给你一点刚刚好的打气"],
  ["黑武士企鹅", "鸟类伙伴", "🐧", "有点严肃，但每句话都站在你这边"],
  ["度假鳄鱼", "鳄龙鲨鱼", "🐊", "松弛又直接，能把紧绷感先放下来"],
  ["红帽白兔", "兔兔小队", "🐰", "小心翼翼又真诚，安慰时很贴近人"],
  ["耳机柴犬", "狗狗伙伴", "🐶", "像随时在线的朋友，耐心听完再回应"],
  ["墨镜老虎", "熊虎猩猩", "🐯", "气场很足，适合帮你找回一点底气"],
  ["红围巾奶牛", "草原农场", "🐮", "踏实温和，擅长把烦心事慢慢放平"],
  ["头盔小猪", "草原农场", "🐷", "有点戏剧感，却总能认真护着你的心情"],
  ["警帽驼鹿", "草原农场", "🫎", "沉稳负责，喜欢替你把重点拎出来"],
  ["机车白兔", "兔兔小队", "🐰", "外表酷酷的，安慰人时特别干净利落"],
  ["黑卷毛犬", "狗狗伙伴", "🐶", "不太喧哗，却很会在关键处陪着"],
  ["粉绒小熊", "熊虎猩猩", "🐻", "软乎乎的接纳派，说话自带一点甜度"],
  ["项链青蛙", "草原农场", "🐸", "轻松明亮，会把糟糕日子讲得没那么难"],
  ["圆眼猫头鹰", "鸟类伙伴", "🦉", "清醒又温和，适合夜里慢慢说心事"],
  ["墨镜鲨鱼", "鳄龙鲨鱼", "🦈", "酷感十足，回应简短但很有支撑力"],
  ["红巾柯基", "狗狗伙伴", "🐶", "热情忠诚，最会给人一点踏实的陪伴"],
  ["银灰鲨鱼", "鳄龙鲨鱼", "🦈", "冷静旁观派，能帮你把情绪分清层次"],
  ["橘子猫", "猫咪伙伴", "🐱", "甜而不腻，擅长把普通细节说得暖"],
  ["战甲驼鹿", "草原农场", "🫎", "可靠有担当，适合陪你面对难开口的事"],
  ["雪山猩猩", "熊虎猩猩", "🦍", "沉默但很懂，给人的安定感很足"],
  ["雪白老虎", "熊虎猩猩", "🐯", "外冷内热，能把安慰说得很有力量"],
  ["粉袍企鹅", "鸟类伙伴", "🐧", "有点呆萌，常用很简单的话让人放松"],
  ["维京柴犬", "狗狗伙伴", "🐶", "勇敢又护短，适合替你撑一撑场面"],
  ["度假老虎", "熊虎猩猩", "🐯", "洒脱开朗，擅长把紧绷的心情松一格"],
  ["骑士小狗", "狗狗伙伴", "🐶", "守护感很强，陪伴时认真又不压迫"],
  ["灰猩猩", "熊虎猩猩", "🦍", "不爱绕弯，但能给出很稳的理解"],
  ["白色独角兽", "草原农场", "🦄", "带一点幻想感，擅长把小希望找回来"],
  ["阿拉伯老虎", "熊虎猩猩", "🐯", "自信又松弛，会把你夸得刚刚好"],
  ["黄金柴犬", "狗狗伙伴", "🐶", "阳光讲义气，回应里总带着可靠劲儿"],
  ["蓝甲小狗", "狗狗伙伴", "🐶", "认真守序，适合陪你把杂乱慢慢整理"],
  ["白色牛头梗", "狗狗伙伴", "🐶", "直率不拐弯，说话简单但很真诚"],
  ["粉色牛头梗", "狗狗伙伴", "🐶", "温柔又有主见，会认真接住你的情绪"],
  ["蓝耳小狗", "狗狗伙伴", "🐶", "软乎乎的陪伴派，听人说话很有耐心"],
  ["徽章哈士奇", "狗狗伙伴", "🐶", "外表很乖，脑回路却能把气氛带活"],
  ["傲娇灰猫", "猫咪伙伴", "🐱", "嘴上冷淡，实际最会悄悄关心"],
  ["铃铛奶牛", "草原农场", "🐮", "朴实温柔，喜欢用具体的话安慰人"],
  ["白熊", "熊虎猩猩", "🐻‍❄️", "安稳耐心，不急着劝，只陪你慢慢说"],
  ["蓝围巾驼鹿", "草原农场", "🫎", "温厚有分量，能把慌乱压成一口慢呼吸"],
  ["黑羽鸭", "鸟类伙伴", "🦆", "表情淡淡的，回应却总有一点幽默感"],
  ["橙胸小龙", "鳄龙鲨鱼", "🐉", "小小一只但很有劲，喜欢把小事变勇气"],
  ["项链恐龙", "鳄龙鲨鱼", "🦖", "憨厚又热心，擅长把压力拆成小块"],
  ["球衣鲨鱼", "鳄龙鲨鱼", "🦈", "运动感满满，适合给你一点爽快回应"],
  ["长者猩猩", "熊虎猩猩", "🦍", "像老朋友一样稳，话少但很有分量"],
  ["粉粉恐龙", "鳄龙鲨鱼", "🦖", "轻快好哄，能把沉闷情绪晃出一点空隙"],
  ["粉白哈士奇", "狗狗伙伴", "🐶", "有点傲娇，却很愿意把话听到底"],
  ["金盔鸭", "鸟类伙伴", "🦆", "精神饱满，常把小鼓励说得很响亮"],
  ["墨镜小鳄", "鳄龙鲨鱼", "🐊", "轻松自在，擅长把尴尬和压力化开"],
  ["头巾海象", "海洋朋友", "🦭", "讲义气又慢热，安慰时特别踏实"],
  ["蓝衣柴犬", "狗狗伙伴", "🐶", "日常感很强，像熟人一样自然接话"],
  ["护目镜恐龙", "鳄龙鲨鱼", "🦖", "好奇心旺盛，喜欢陪你试试新角度"],
  ["吐舌萨摩耶", "狗狗伙伴", "🐶", "明亮亲近，适合在低落时给一点暖意"],
  ["维京灰猫", "猫咪伙伴", "🐱", "有点骄傲，但会认真守住你的秘密"],
  ["爱心锤头鲨", "鳄龙鲨鱼", "🦈", "粉粉的直球派，安慰说得坦率又柔软"],
  ["奶嘴灰猫", "猫咪伙伴", "🐱", "迷糊但贴心，适合陪你把话说慢一点"],
  ["金牌柴犬", "狗狗伙伴", "🐶", "忠诚可靠，会把你的认真当成闪光点"],
  ["奶嘴白兔", "兔兔小队", "🐰", "乖巧安静，轻轻陪着不催你表态"],
  ["奶嘴小猪", "草原农场", "🐷", "憨软真诚，最会把委屈说得没那么刺"],
  ["奶嘴金毛", "狗狗伙伴", "🐶", "温暖稳定，像一句很稳的“我在”"],
  ["奶嘴鲨鱼", "鳄龙鲨鱼", "🦈", "反差感很强，凶不起来但特别护短"],
].map(([name, category, emoji, persona], index) => ({
  id: `pet-${index + 1}`,
  index,
  name,
  category,
  emoji,
  persona,
  color: ["#ffd6e7", "#d8efff", "#fff0be", "#dff7e7", "#eadfff", "#ffe2d1"][index % 6],
}));

const STORAGE_KEY = "wuquan_diaries_v2";
const OLD_STORAGE_KEY = "wuquan_diaries_v1";
const SETTINGS_KEY = "wuquan_settings_v1";
const THEME_KEY = "wuquan_theme_v1";
const CHAT_KEY = "wuquan_pet_chats_v2";
const DAILY_GREETING_KEY = "wuquan_daily_greeting_v1";
const AUTH_KEY = "wuquan_auth_v1";
const USER_PROFILE_KEY = "wuquan_user_profile_v1";
const FRIENDS_KEY = "wuquan_human_friends_v1";
const FRIEND_MATCHES_KEY = "wuquan_friend_matches_v1";
const SAFETY_KEY = "wuquan_public_safety_v1";
const DEFAULT_SETTINGS = {
  serverUrl: "https://wuquan.cc.cd",
  apiModel: "mimo-v2-omni",
};
const OLD_DEFAULT_API_URLS = new Set([
  "https://wuquan.art",
  "http://wuquan.art",
  "https://api.deepseek.com/chat/completions",
  "https://token-plan-cn.xiaomimimo.com/v1",
  "https://token-plan-cn.xiaomimimo.com/v1/chat/completions",
]);
const OLD_DEFAULT_MODELS = new Set(["deepseek-v4-pro", "deepseek-chat"]);
const APP_VERSION = "1.6.6";
const AVATAR_SPRITE = "./assets/user-avatars-spritesheet.png";
const WALLPAPER_SPRITE = "./assets/wallpaper-spritesheet.png";
const AVATAR_CHOICES = 60;
const WALLPAPER_CHOICES = 35;
const TODAY_MOODS = ["开心", "平静", "低落", "焦虑", "想念", "压力", "委屈", "秘密"];
const SENSITIVE_PATTERNS = [
  /自杀|轻生|割腕|跳楼|不想活|结束生命/,
  /杀人|弄死|砍死|报复社会/,
  /约炮|裸聊|卖淫|嫖|援交/,
  /身份证|银行卡|手机号|住址|家庭住址/,
];
const THEMES = [
  { id: "pink", label: "黄蓝派对", className: "" },
  { id: "blue", label: "蓝绿派对", className: "theme-blue" },
  { id: "cream", label: "奶油橙派对", className: "theme-cream" },
  { id: "matcha", label: "怪兽绿派对", className: "theme-matcha" },
  { id: "lavender", label: "紫粉派对", className: "theme-lavender" },
];
const THEME_CLASSES = THEMES.map((theme) => theme.className).filter(Boolean);
const EMOJIS = ["🙂", "🥲", "😭", "🥹", "😶", "😮‍💨", "😌", "😡", "💭", "🌧️", "🌙", "✨", "🫶", "🤍", "🍀", "☁️"];
const DAILY_QUOTES = [
  "今天不用把所有事都想明白，先把自己放稳。",
  "有些话放进树洞，不是逃避，是给心留一点空间。",
  "你可以慢一点，今天也算数。",
  "不舒服的情绪被看见以后，就已经轻了一点。",
  "先别急着变好，先允许自己真实。",
  "今晚把难说的话放这里，明天再慢慢整理。",
  "被困住的时候，能说出来就是一个小出口。",
];
const MOOD_COLORS = {
  秘密: "#eadfff",
  委屈: "#ffd6e7",
  焦虑: "#ffe2d1",
  想念: "#d8efff",
  压力: "#fff0be",
  开心: "#dff7e7",
};
const COMMENT_SEEDS = [
  "我听见了，这件事先放在这里。",
  "这份情绪不用急着解释，先放在树洞里休息一下。",
  "先别急着给自己答案。",
  "这句话有点沉，我帮你一起托一会儿。",
  "今天辛苦的地方，也值得被认真看见。",
  "我不评判你，只陪你把这一刻放稳。",
  "我在，这句话没有落空。",
  "这份心情被我放进小口袋好好保管啦。",
  "请收下今日份安静陪伴。",
  "树洞收到啦，你不用一个人憋着。",
];
const COMMENT_ANGLES = [
  "先听见你的想念",
  "注意到你说的那个名字",
  "把这句没说出口的话接住",
  "在意你话里那点委屈",
  "想陪你等这一阵过去",
  "替你守着这个小秘密",
  "觉得这份心情不该被催促",
  "想把你从闷闷里牵出来一点",
];
const COMMENT_STYLES = [
  ({ pet, hint, angle }) => `${pet.name}：我看到“${hint}”了，先陪你把${angle}放一放。`,
  ({ pet, hint, mood, emotion }) => `${pet.name}现在${emotion}，但没打岔：这个${mood}确实会让人卡住。`,
  ({ pet, hint }) => `${pet.name}：如果是在想一个人，那句“${hint}”就已经很明显了。`,
  ({ pet, mood, emotion }) => `${pet.name}今天${emotion}，说话慢一点：这个${mood}不用马上处理。`,
  ({ pet, hint, angle }) => `${pet.name}：我更在意${angle}。至于“${hint}”，先别逼自己解释清楚。`,
  ({ pet, hint }) => `${pet.name}：这句话有点轻，也有点重。我陪你记着“${hint}”。`,
  ({ pet, emotion }) => `${pet.name}现在${emotion}，所以只说一句：你这样想，不奇怪。`,
  ({ pet, hint }) => `${pet.name}：我不乱劝你。只陪你把“${hint}”这件事放在这里。`,
];
const PET_EMOTIONS = [
  "有点犯困但还在听",
  "有点担心你",
  "今天元气满满",
  "突然变得很认真",
  "有点想多陪你一会儿",
  "悄悄想被你选中",
  "松了一口气",
  "小小骄傲中",
  "犯迷糊但努力听",
  "心里软了一下",
  "被你的话轻轻戳到",
  "有一点点害羞",
];

let diaries = migrateDiaries();
let settings = normalizeSettings(loadJson(SETTINGS_KEY, {}));
let chatMessages = loadJson(CHAT_KEY, {});
let authState = normalizeAuth(loadJson(AUTH_KEY, {}));
let userProfile = normalizeUserProfile(loadJson(USER_PROFILE_KEY, {}));
let humanFriends = normalizeHumanFriends(loadJson(FRIENDS_KEY, []));
let friendMatches = normalizeHumanFriends(loadJson(FRIEND_MATCHES_KEY, []));
let safetyState = normalizeSafety(loadJson(SAFETY_KEY, {}));
let draftImages = [];
let chatDraftImages = [];
let activePetCategory = "全部";
let activeFeedFilter = "all";
let activeMood = "秘密";
let activeAudience = "pets";
let activeAuthMode = "login";
let activeChatPetId = "";
let activeCalendarDay = "";
let searchKeyword = "";
const expandedPosts = new Set();
let stateSyncTimer = 0;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const uid = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};
const nativeCallbacks = new Map();

function enableNativeMode() {
  const isAndroidAsset = location.href.startsWith("file:///android_asset/");
  const isWebView = /; wv\)/i.test(navigator.userAgent) || /Version\/\d+\.\d+ Chrome/i.test(navigator.userAgent);
  if (isAndroidAsset || isWebView) document.body.classList.add("native-app");
}

window.__nativeBridgeResolve = (callbackId, responseText, errorText) => {
  const callback = nativeCallbacks.get(callbackId);
  if (!callback) return;
  nativeCallbacks.delete(callbackId);
  if (errorText) callback.reject(new Error(errorText));
  else callback.resolve(responseText);
};

function nativeChatCompletion(payload) {
  if (!window.WuQuanNative?.postChatCompletion) return null;
  const callbackId = uid();
  return new Promise((resolve, reject) => {
    nativeCallbacks.set(callbackId, { resolve, reject });
    window.WuQuanNative.postChatCompletion(JSON.stringify(payload), callbackId);
  });
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function saveDiaries(sync = true) {
  saveJson(STORAGE_KEY, diaries);
  if (sync) scheduleUserStateSync();
}

function normalizeServerUrl(url = DEFAULT_SETTINGS.serverUrl) {
  const raw = String(url || DEFAULT_SETTINGS.serverUrl).trim().replace(/\/+$/, "");
  if (!raw || OLD_DEFAULT_API_URLS.has(raw)) return DEFAULT_SETTINGS.serverUrl;
  return raw.replace(/\/v1\/chat\/completions$/i, "").replace(/\/v1$/i, "") || DEFAULT_SETTINGS.serverUrl;
}

function normalizeSettings(value) {
  const raw = value || {};
  const savedUrl = raw.serverUrl || raw.apiBaseUrl || raw.apiUrl || "";
  const savedModel = raw.apiModel || "";
  return {
    serverUrl: normalizeServerUrl(savedUrl),
    apiModel: !savedModel || OLD_DEFAULT_MODELS.has(savedModel) ? DEFAULT_SETTINGS.apiModel : savedModel,
  };
}

function localWuquanId() {
  const key = "wuquan_local_id_v1";
  let id = localStorage.getItem(key);
  if (!id) {
    id = `WQ${String(Math.floor(100000 + Math.random() * 900000))}`;
    localStorage.setItem(key, id);
  }
  return id;
}

function dateKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeAuth(value) {
  const raw = value || {};
  return {
    token: raw.token || "",
    user: raw.user || null,
  };
}

function normalizeUserProfile(value) {
  const raw = value || {};
  return {
    id: raw.id || raw.wuquanId || authState?.user?.id || localWuquanId(),
    name: raw.name || raw.nickname || authState?.user?.name || "吾圈用户",
    bio: raw.bio || "今天也在认真生活",
    avatar: raw.avatar || { type: "preset", index: 0 },
    wallpaper: raw.wallpaper || { type: "preset", index: 0 },
    publicIdentity: raw.publicIdentity || { mode: "real", species: "猫猫" },
    todayMood: raw.todayMood || "",
    todayMoodDate: raw.todayMoodDate || "",
  };
}

function normalizeHumanFriends(items) {
  return (Array.isArray(items) ? items : []).map((item, index) => ({
    id: item.id || item.wuquanId || `friend-${index}`,
    name: item.name || item.nickname || `同频用户 ${index + 1}`,
    bio: item.bio || "今天的心情和你一样",
    avatar: item.avatar || { type: "preset", index: index % AVATAR_CHOICES },
    mood: item.mood || item.todayMood || "",
    matchedAt: item.matchedAt || new Date().toISOString(),
  }));
}

function normalizeSafety(value) {
  const raw = value || {};
  return {
    reports: Array.isArray(raw.reports) ? raw.reports : [],
    blockedUsers: Array.isArray(raw.blockedUsers) ? raw.blockedUsers : [],
    hiddenPublicPosts: Array.isArray(raw.hiddenPublicPosts) ? raw.hiddenPublicPosts : [],
  };
}

function saveSafety() {
  saveJson(SAFETY_KEY, safetyState);
  scheduleUserStateSync();
}

function migrateDiaries() {
  const current = loadJson(STORAGE_KEY, null);
  if (current) return normalizeDiaries(current);
  const old = loadJson(OLD_STORAGE_KEY, []);
  const migrated = old.map((item) => ({
    mood: "秘密",
    favorite: false,
    ...item,
    aiStatus: item.aiStatus || "done",
  }));
  return normalizeDiaries(migrated);
}

function normalizeDiaries(items) {
  let changed = false;
  const normalized = items.map((item) => {
    const comments = (item.comments || []).map((comment, index) => {
      if (comment.id && Array.isArray(comment.replies)) return comment;
      changed = true;
      return {
        id: comment.id || `comment-${item.id || "old"}-${index}-${Date.now()}`,
        replies: Array.isArray(comment.replies) ? comment.replies : [],
        ...comment,
      };
    });
    if (!Array.isArray(item.comments) || !("favorite" in item)) changed = true;
    return {
      images: [],
      likes: [],
      comments,
      publicComments: Array.isArray(item.publicComments) ? item.publicComments : [],
      mood: "秘密",
      audience: "pets",
      favorite: false,
      aiStatus: "local",
      ...item,
      comments,
      publicComments: Array.isArray(item.publicComments) ? item.publicComments : [],
    };
  });
  if (changed) saveJson(STORAGE_KEY, normalized);
  return normalized;
}

function sample(list, count) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, count);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTime(iso) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function dailyQuote() {
  const today = dateKey();
  return DAILY_QUOTES[hashText(today) % DAILY_QUOTES.length];
}

function petCloseness(petId) {
  const chatCount = (chatMessages[petId] || []).filter((message) => message.role === "user").length;
  const replyCount = diaries.reduce((sum, diary) => sum + (diary.comments || []).filter((comment) => comment.petId === petId).reduce((inner, comment) => (
    inner + (comment.replies || []).filter((reply) => reply.role === "user").length
  ), 0), 0);
  return Math.min(99, chatCount * 3 + replyCount * 5);
}

function closenessLabel(score) {
  if (score >= 60) return "很懂你";
  if (score >= 30) return "慢慢熟了";
  if (score >= 10) return "有点熟";
  return "刚认识";
}

function isToday(iso) {
  const date = new Date(iso);
  const now = new Date();
  return date.toDateString() === now.toDateString();
}

function avatarType(pet) {
  if (pet.category.includes("猫")) return "cat";
  if (pet.category.includes("狗")) return "dog";
  if (pet.category.includes("兔")) return "rabbit";
  if (pet.category.includes("熊")) return "bear";
  if (pet.name.includes("鸟") || pet.name.includes("鸽") || pet.name.includes("鹦鹉") || pet.name.includes("鸭") || pet.name.includes("企鹅")) return "bird";
  if (pet.name.includes("鹿") || pet.name.includes("麋鹿")) return "deer";
  if (pet.name.includes("狐狸")) return "fox";
  if (pet.name.includes("刺猬")) return "hedgehog";
  if (pet.name.includes("飞龙")) return "dragon";
  return "round";
}

function avatarSvg(pet) {
  const type = avatarType(pet);
  const [base, accent, ink] = [
    ["#ffd6e7", "#ff9fc7", "#7b5067"],
    ["#d8efff", "#8fcff4", "#4f6f8a"],
    ["#fff0be", "#f5c86f", "#80633e"],
    ["#dff7e7", "#8edfb0", "#52795d"],
    ["#eadfff", "#b9a1ef", "#67538e"],
    ["#ffe2d1", "#f0a982", "#7c5848"],
  ][pet.index % 6];
  const blush = pet.index % 2 ? "#ffb7c8" : "#ffc9b8";
  const mark = pet.index % 3;
  const spot = mark === 0 ? `<circle cx="44" cy="49" r="9" fill="${accent}" opacity=".28"/>` : "";
  const stripe = mark === 1 ? `<path d="M57 35c4 8 4 15 0 23M68 35c4 9 4 17 0 26" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity=".32"/>` : "";
  const star = mark === 2 ? `<path d="M44 38l3 6 6 1-5 4 1 7-5-3-6 3 1-7-5-4 7-1z" fill="${accent}" opacity=".35"/>` : "";
  const ears = {
    cat: `<path d="M37 47L47 18l18 25" fill="${base}" stroke="white" stroke-width="5"/><path d="M91 47L81 18 63 43" fill="${base}" stroke="white" stroke-width="5"/><path d="M44 40l4-12 8 11M84 40l-4-12-8 11" fill="${accent}" opacity=".36"/>`,
    dog: `<path d="M34 52c-14 10-13 34 2 38 11 3 16-10 14-25z" fill="${accent}" opacity=".62"/><path d="M94 52c14 10 13 34-2 38-11 3-16-10-14-25z" fill="${accent}" opacity=".62"/>`,
    rabbit: `<rect x="38" y="10" width="19" height="48" rx="18" fill="${base}" stroke="white" stroke-width="5"/><rect x="71" y="10" width="19" height="48" rx="18" fill="${base}" stroke="white" stroke-width="5"/><rect x="45" y="20" width="7" height="30" rx="6" fill="${accent}" opacity=".35"/><rect x="76" y="20" width="7" height="30" rx="6" fill="${accent}" opacity=".35"/>`,
    bear: `<circle cx="37" cy="44" r="15" fill="${base}" stroke="white" stroke-width="5"/><circle cx="91" cy="44" r="15" fill="${base}" stroke="white" stroke-width="5"/><circle cx="37" cy="44" r="7" fill="${accent}" opacity=".35"/><circle cx="91" cy="44" r="7" fill="${accent}" opacity=".35"/>`,
    bird: `<path d="M38 48c-11-13-5-28 12-25 10 2 15 11 11 23z" fill="${accent}" opacity=".55"/><path d="M90 48c11-13 5-28-12-25-10 2-15 11-11 23z" fill="${accent}" opacity=".55"/><path d="M64 77l-8 9h16z" fill="#f3a34f"/>`,
    deer: `<path d="M43 43c-14-12-17-27-8-33M85 43c14-12 17-27 8-33M38 25h-10M90 25h10" stroke="${ink}" stroke-width="5" stroke-linecap="round" fill="none" opacity=".55"/><circle cx="39" cy="45" r="13" fill="${base}" stroke="white" stroke-width="5"/><circle cx="89" cy="45" r="13" fill="${base}" stroke="white" stroke-width="5"/>`,
    fox: `<path d="M34 51L45 20l20 25" fill="${accent}" stroke="white" stroke-width="5"/><path d="M94 51L83 20 63 45" fill="${accent}" stroke="white" stroke-width="5"/><path d="M42 58c10 13 33 13 44 0-5 25-39 25-44 0z" fill="white" opacity=".64"/>`,
    hedgehog: `<path d="M31 64l-10-8 12-4-9-11 14 1-3-14 12 8 6-14 7 13 11-12 3 15 14-6-3 15 14 1-9 11 12 5-12 7" fill="${accent}" opacity=".48"/>`,
    dragon: `<path d="M38 46l-12-18 23 8M90 46l12-18-23 8" fill="${accent}" opacity=".7"/><path d="M58 33l6-13 6 13" fill="${accent}" opacity=".7"/>`,
    round: `<circle cx="37" cy="45" r="12" fill="${base}" stroke="white" stroke-width="5"/><circle cx="91" cy="45" r="12" fill="${base}" stroke="white" stroke-width="5"/>`,
  }[type];

  const delay = `${(pet.index % 7) * 0.17}s`;
  const blinkDelay = `${(pet.index % 5) * 0.31}s`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <style>
      .float-${pet.index}{animation:float-${pet.index} 2.8s ease-in-out ${delay} infinite;transform-origin:64px 70px}
      .blink-${pet.index}{animation:blink-${pet.index} 4.2s ease-in-out ${blinkDelay} infinite;transform-origin:center}
      .ear-${pet.index}{animation:ear-${pet.index} 3.2s ease-in-out ${delay} infinite;transform-origin:64px 48px}
      @keyframes float-${pet.index}{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-3px) scale(1.025)}}
      @keyframes blink-${pet.index}{0%,88%,100%{transform:scaleY(1)}91%,94%{transform:scaleY(.12)}}
      @keyframes ear-${pet.index}{0%,100%{transform:rotate(0deg)}50%{transform:rotate(${pet.index % 2 ? "-" : ""}2deg)}}
    </style>
    <rect width="128" height="128" rx="34" fill="white"/>
    <circle cx="24" cy="22" r="18" fill="${base}" opacity=".55"/>
    <circle cx="108" cy="105" r="25" fill="${accent}" opacity=".22"/>
    <g class="ear-${pet.index}">${ears}</g>
    <g class="float-${pet.index}">
      <circle cx="64" cy="66" r="34" fill="${base}"/>
      ${spot}${stripe}${star}
      <circle class="blink-${pet.index}" cx="52" cy="68" r="4" fill="${ink}"/>
      <circle class="blink-${pet.index}" cx="76" cy="68" r="4" fill="${ink}"/>
      <circle cx="48" cy="79" r="6" fill="${blush}" opacity=".68"/>
      <circle cx="80" cy="79" r="6" fill="${blush}" opacity=".68"/>
      <path d="M59 78q5 5 10 0" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M64 72l-4 5h8z" fill="${ink}" opacity=".78"/>
    </g>
    <text x="64" y="115" text-anchor="middle" font-family="Microsoft YaHei, sans-serif" font-size="13" font-weight="700" fill="${ink}">${pet.name.slice(0, 3)}</text>
  </svg>`;
}

function petAvatar(pet, size = "") {
  const avatarId = String(pet.index + 1).padStart(2, "0");
  return `<img class="pet-avatar ${size}" src="./assets/avatars/pet-${avatarId}.png" alt="${pet.name}头像" title="${pet.name}" loading="lazy" />`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

function getPet(id) {
  return PETS.find((pet) => pet.id === id);
}

function hashText(value = "") {
  return [...String(value)].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function petEmotion(pet, context = "") {
  const day = new Date().toISOString().slice(0, 10);
  return PET_EMOTIONS[(pet.index + hashText(day) + hashText(context)) % PET_EMOTIONS.length];
}

function emotionLine(pet, context = "") {
  return `${pet.persona}；此刻它${petEmotion(pet, context)}`;
}

function localComment(pet, text, mood = "秘密", emotion = petEmotion(pet, text)) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  const hint = trimmed.length > 18 ? `${trimmed.slice(0, 18)}...` : trimmed;
  const angle = COMMENT_ANGLES[(pet.index + hashText(text) + hashText(mood)) % COMMENT_ANGLES.length];
  const style = COMMENT_STYLES[(pet.index + hashText(emotion)) % COMMENT_STYLES.length];
  return style({ pet, hint, mood, emotion, angle });
}

function imagePromptContext(images = []) {
  if (!images.length) return "无配图。";
  return `用户上传了 ${images.length} 张图片；图片会随请求发送给多模态模型。请基于可见内容回应，无法确认的细节不要猜。`;
}

function messageTextForPrompt(message) {
  const text = message.text || "";
  const imageNote = message.images?.length ? `\n[图片信息：${imagePromptContext(message.images)}]` : "";
  return `${text || "[只发送了图片]"}${imageNote}`;
}

function multimodalUserContent(text, images = []) {
  const parts = [{ type: "text", text: text || "[只发送了图片]" }];
  images.slice(0, 4).forEach((src) => {
    parts.push({ type: "image_url", image_url: { url: src } });
  });
  return parts;
}

function authHeaders(extra = {}) {
  return {
    "Content-Type": "application/json",
    ...(authState.token ? { Authorization: `Bearer ${authState.token}` } : {}),
    ...extra,
  };
}

function apiUrl(path) {
  const configured = settings.serverUrl || DEFAULT_SETTINGS.serverUrl;
  if (/^https?:$/.test(location.protocol) && (!settings.serverUrl || configured === DEFAULT_SETTINGS.serverUrl)) {
    return `${location.origin}${path}`;
  }
  return `${configured}${path}`;
}

async function serverRequest(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: authHeaders(options.headers || {}),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(data.message || data.error || `HTTP ${response.status}`);
  return data;
}

function saveAuth(nextAuth) {
  authState = normalizeAuth(nextAuth);
  saveJson(AUTH_KEY, authState);
}

function saveUserProfile(nextProfile, sync = true) {
  userProfile = normalizeUserProfile({ ...userProfile, ...nextProfile });
  saveJson(USER_PROFILE_KEY, userProfile);
  if (sync && authState.token) syncProfileToServer();
}

function currentUserState() {
  return {
    diaries,
    theme: loadJson(THEME_KEY, "pink"),
    safetyState,
    friendMatches,
  };
}

async function syncUserStateToServer() {
  if (!authState.token) return;
  try {
    await serverRequest("/api/user/state", {
      method: "PUT",
      body: JSON.stringify({ state: currentUserState() }),
    });
  } catch (error) {
    console.warn("User state sync failed:", error);
  }
}

function scheduleUserStateSync() {
  if (!authState.token) return;
  clearTimeout(stateSyncTimer);
  stateSyncTimer = setTimeout(() => {
    syncUserStateToServer();
  }, 450);
}

async function loadUserStateFromServer() {
  if (!authState.token) return;
  try {
    const data = await serverRequest("/api/user/state");
    const state = data.state || {};
    if (Array.isArray(state.diaries) && state.diaries.length) {
      const localById = new Map(diaries.map((item) => [item.id, item]));
      const serverDiaries = normalizeDiaries(state.diaries);
      serverDiaries.forEach((item) => localById.set(item.id, item));
      diaries = [...localById.values()].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
      saveDiaries(false);
    }
    if (state.theme) {
      saveJson(THEME_KEY, state.theme);
      setTheme(state.theme, false);
    }
    if (state.safetyState) {
      safetyState = normalizeSafety(state.safetyState);
      saveJson(SAFETY_KEY, safetyState);
    }
    if (Array.isArray(state.friendMatches)) {
      friendMatches = normalizeHumanFriends(state.friendMatches);
      saveFriendMatches(false);
    }
    await syncUserStateToServer();
  } catch (error) {
    console.warn("User state load failed:", error);
  }
}

function mergeChatStores(serverChats = {}, localChats = {}) {
  const merged = { ...(serverChats || {}) };
  Object.entries(localChats || {}).forEach(([petId, messages]) => {
    if (!Array.isArray(messages) || merged[petId]?.length) return;
    merged[petId] = messages;
  });
  return merged;
}

async function loadChatMessagesFromServer() {
  if (!authState.token) return;
  try {
    const data = await serverRequest("/api/pet-chats");
    const localChats = loadJson(CHAT_KEY, {});
    chatMessages = mergeChatStores(data.chats || {}, localChats);
    await syncChatMessagesToServer();
    localStorage.removeItem(CHAT_KEY);
  } catch (error) {
    console.warn("Chat sync load failed:", error);
  }
}

async function syncChatMessagesToServer() {
  if (!authState.token) return;
  try {
    await serverRequest("/api/pet-chats", {
      method: "PUT",
      body: JSON.stringify({ chats: chatMessages }),
    });
  } catch (error) {
    console.warn("Chat sync save failed:", error);
  }
}

async function syncProfileToServer() {
  try {
    await serverRequest("/api/user/me", {
      method: "PATCH",
      body: JSON.stringify({ profile: userProfile }),
    });
  } catch (error) {
    console.warn("Profile sync failed:", error);
  }
}

async function loadProfileFromServer() {
  if (!authState.token) return;
  try {
    const data = await serverRequest("/api/user/me");
    if (data.user) saveUserProfile(data.user, false);
  } catch (error) {
    console.warn("Profile load failed:", error);
  }
}

function mergeOwnPublicDiaries(posts = []) {
  const ownPosts = posts.filter((post) => post?.author?.id === userProfile.id);
  if (!ownPosts.length) return;
  const ownIds = new Set(ownPosts.map((post) => post.id));
  const mergedPosts = ownPosts.map((post) => {
    const existing = diaries.find((item) => item.id === post.id) || {};
    return {
      ...existing,
      ...post,
      audience: "public",
      publicStatus: "synced",
      likes: existing.likes || [],
      comments: existing.comments || [],
      aiStatus: existing.aiStatus || "ai",
    };
  });
  diaries = normalizeDiaries([
    ...mergedPosts,
    ...diaries.filter((item) => !(item.audience === "public" && ownIds.has(item.id))),
  ]).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  saveDiaries();
}

async function loadOwnPublicDiariesFromServer() {
  if (!authState.token) return;
  try {
    const data = await serverRequest("/api/diaries/public");
    mergeOwnPublicDiaries(data.posts || data.diaries || []);
  } catch (error) {
    console.warn("Public diary load failed:", error);
  }
}

async function loadHumanFriendsFromServer() {
  if (!authState.token) return;
  try {
    const data = await serverRequest("/api/friends");
    humanFriends = normalizeHumanFriends(data.friends || []);
    saveHumanFriends();
  } catch (error) {
    console.warn("Friend load failed:", error);
  }
}

async function loadAccountDataFromServer() {
  if (!authState.token) return;
  await loadProfileFromServer();
  await loadUserStateFromServer();
  await Promise.all([
    loadChatMessagesFromServer(),
    loadOwnPublicDiariesFromServer(),
    loadHumanFriendsFromServer(),
  ]);
  if (todayMoodIsFresh()) await fetchFriendMatches();
}

function avatarStyle(avatar = userProfile.avatar) {
  if (avatar?.type === "custom" && avatar.src) {
    return `background-image:url("${avatar.src}")`;
  }
  const index = Math.max(0, Number(avatar?.index) || 0) % AVATAR_CHOICES;
  const col = index % 10;
  const row = Math.floor(index / 10);
  return `background-image:url("${AVATAR_SPRITE}");background-size:1000% 600%;background-position:${col * 11.1111}% ${row * 20}%`;
}

function wallpaperStyle(wallpaper = userProfile.wallpaper) {
  if (wallpaper?.type === "custom" && wallpaper.src) {
    return `background-image:linear-gradient(180deg,rgba(255,255,255,.2),rgba(255,255,255,.5)),url("${wallpaper.src}")`;
  }
  const index = Math.max(0, Number(wallpaper?.index) || 0) % WALLPAPER_CHOICES;
  const col = index % 7;
  const row = Math.floor(index / 7);
  return `background-image:linear-gradient(180deg,rgba(255,255,255,.2),rgba(255,255,255,.5)),url("${WALLPAPER_SPRITE}");background-size:700% 500%;background-position:${col * 16.6667}% ${row * 25}%`;
}

function userAvatarMarkup(size = "") {
  return `<span class="user-avatar ${size}" style='${avatarStyle(userProfile.avatar)}'></span>`;
}

function publicIdentityName() {
  const identity = userProfile.publicIdentity || { mode: "real", species: "猫猫" };
  if (identity.mode === "hidden") return `${identity.species || "猫猫"}${userProfile.id}`;
  return userProfile.name || "吾圈用户";
}

function publicIdentityPayload() {
  const identity = userProfile.publicIdentity || { mode: "real", species: "猫猫" };
  const displayName = identity.mode === "hidden"
    ? `${identity.species || "猫猫"}${userProfile.id}`
    : (userProfile.name || "吾圈用户");
  return {
    mode: identity.mode,
    species: identity.species || "猫猫",
    displayName,
    userId: userProfile.id,
  };
}

function publicSafetyIssue(text = "") {
  const matched = SENSITIVE_PATTERNS.find((pattern) => pattern.test(text));
  if (!matched) return "";
  const patternText = matched.source;
  if (/自杀|轻生|割腕|跳楼|不想活|结束生命/.test(patternText)) return "包含可能需要立即求助的内容";
  if (/身份证|银行卡|手机号|住址|家庭住址/.test(patternText)) return "包含个人隐私信息";
  return "包含不适合公开区的内容";
}

async function reportPublicItem(targetId, targetType = "diary") {
  const reason = prompt("举报原因");
  if (!reason?.trim()) return;
  const report = {
    id: uid(),
    targetId,
    targetType,
    reason: reason.trim(),
    createdAt: new Date().toISOString(),
  };
  safetyState.reports.unshift(report);
  saveSafety();
  try {
    await serverRequest("/api/reports", {
      method: "POST",
      body: JSON.stringify(report),
    });
  } catch (error) {
    console.warn("Report sync failed:", error);
  }
  toast("已提交举报");
}

async function blockUser(userId, displayName = "该用户") {
  if (!userId) return;
  if (!confirm(`拉黑 ${displayName} 吗？\n\n确认后会隐藏对方内容、移除好友/匹配，并删除你和对方的聊天记录。`)) return;
  if (!safetyState.blockedUsers.includes(userId)) safetyState.blockedUsers.push(userId);
  saveSafety();
  try {
    await serverRequest("/api/blocks", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
  } catch (error) {
    console.warn("Block sync failed:", error);
  }
  humanFriends = humanFriends.filter((friend) => friend.id !== userId);
  friendMatches = friendMatches.filter((friend) => friend.id !== userId);
  delete chatMessages[userId];
  saveHumanFriends();
  saveFriendMatches();
  await syncChatMessagesToServer();
  renderAll();
  toast("已拉黑，相关内容和聊天记录已删除");
}

function demoFriend(seedMood = userProfile.todayMood || "平静", index = 0) {
  const names = ["小北", "阿晴", "圆圆", "林也", "安安", "小满", "夏木", "七七"];
  return {
    id: `demo-${seedMood}-${index}`,
    name: names[(hashText(seedMood) + index) % names.length],
    bio: `今天也是${seedMood}心情，想找个人安静聊聊`,
    avatar: { type: "preset", index: (hashText(seedMood) + index * 7) % AVATAR_CHOICES },
    mood: seedMood,
    matchedAt: new Date().toISOString(),
  };
}

function todayMoodIsFresh() {
  return userProfile.todayMood && userProfile.todayMoodDate === dateKey();
}

function saveHumanFriends(sync = true) {
  saveJson(FRIENDS_KEY, humanFriends);
  if (sync) scheduleUserStateSync();
}

function saveFriendMatches(sync = true) {
  saveJson(FRIEND_MATCHES_KEY, friendMatches);
  if (sync) scheduleUserStateSync();
}

async function setTodayMood(mood) {
  saveUserProfile({ todayMood: mood, todayMoodDate: dateKey() });
  renderProfile();
  await fetchFriendMatches();
}

async function fetchFriendMatches() {
  if (!todayMoodIsFresh()) {
    friendMatches = [];
    saveFriendMatches();
    renderHumanFriends();
    return;
  }
  try {
    const data = await serverRequest("/api/friends/match", {
      method: "POST",
      body: JSON.stringify({ mood: userProfile.todayMood, date: userProfile.todayMoodDate, profile: userProfile }),
    });
    friendMatches = normalizeHumanFriends(data.matches || data.users || []);
  } catch (error) {
    console.warn("Friend match fallback:", error);
    friendMatches = [demoFriend(userProfile.todayMood, 0), demoFriend(userProfile.todayMood, 1)];
  }
  friendMatches = friendMatches.filter((item) => (
    !humanFriends.some((friend) => friend.id === item.id) &&
    !safetyState.blockedUsers.includes(item.id)
  ));
  saveFriendMatches();
  renderHumanFriends();
}

async function addHumanFriend(friendId) {
  const friend = friendMatches.find((item) => item.id === friendId);
  if (!friend) return;
  if (!todayMoodIsFresh() || friend.mood !== userProfile.todayMood) {
    toast("只有当天心情一样时才能加好友");
    return;
  }
  try {
    await serverRequest("/api/friends", {
      method: "POST",
      body: JSON.stringify({ friendId, mood: userProfile.todayMood }),
    });
  } catch (error) {
    console.warn("Add friend fallback:", error);
  }
  humanFriends = normalizeHumanFriends([friend, ...humanFriends.filter((item) => item.id !== friend.id)]);
  friendMatches = friendMatches.filter((item) => item.id !== friend.id);
  saveHumanFriends();
  saveFriendMatches();
  renderHumanFriends();
  toast("已加为同频好友");
}

async function stopHumanFriend(friendId) {
  const friend = humanFriends.find((item) => item.id === friendId);
  if (!friend) return;
  if (!confirm(`停止和 ${friend.name} 的对话并删除好友吗？`)) return;
  try {
    await serverRequest(`/api/friends/${encodeURIComponent(friendId)}`, { method: "DELETE" });
  } catch (error) {
    console.warn("Delete friend fallback:", error);
  }
  humanFriends = humanFriends.filter((item) => item.id !== friendId);
  saveHumanFriends();
  renderHumanFriends();
  toast("已停止对话，好友关系已删除");
}

async function blockHumanFriend(friendId) {
  const friend = humanFriends.find((item) => item.id === friendId) || friendMatches.find((item) => item.id === friendId);
  if (!friend) return;
  await blockUser(friend.id, friend.name);
}

function assistantTextFromResponse(data) {
  const textFromPart = (part) => {
    if (!part) return "";
    if (Array.isArray(part)) return part.map(textFromPart).join("");
    if (typeof part === "string") return part;
    if (typeof part.value === "string") return part.value;
    if (typeof part.message === "string") return part.message;
    if (typeof part.text === "string") return part.text;
    if (typeof part.content === "string") return part.content;
    if (typeof part.output_text === "string") return part.output_text;
    if (typeof part.reasoning_content === "string") return part.reasoning_content;
    if (part.message) return textFromPart(part.message);
    if (part.delta) return textFromPart(part.delta);
    if (Array.isArray(part.text)) return part.text.map(textFromPart).join("");
    if (Array.isArray(part.content)) return part.content.map(textFromPart).join("");
    if (Array.isArray(part.output)) return part.output.map(textFromPart).join("");
    return "";
  };
  const textFromMessage = (message) => {
    if (!message) return "";
    if (typeof message === "string") return message;
    return [
      textFromPart(message.content),
      textFromPart(message.text),
      textFromPart(message.output_text),
      textFromPart(message.reasoning_content),
    ].find(Boolean) || "";
  };
  return (
    textFromMessage(data?.choices?.[0]?.message) ||
    textFromMessage(data?.choices?.[0]?.delta) ||
    textFromMessage(data?.choices?.[0]?.text) ||
    textFromPart(data?.output_text) ||
    textFromPart(data?.message) ||
    textFromPart(data?.content) ||
    textFromPart(data?.output)
  ).trim();
}

function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result || "");
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function resizeImageDataUrl(dataUrl, maxEdge = 1280, quality = 0.82) {
  if (!String(dataUrl).startsWith("data:image/")) return Promise.resolve(dataUrl);
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      const scale = Math.min(1, maxEdge / Math.max(width, height));
      if (scale >= 1 && dataUrl.length < 700000) {
        resolve(dataUrl);
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        resolve(dataUrl);
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    image.onerror = () => resolve(dataUrl);
    image.src = dataUrl;
  });
}

async function readFilesAsDataUrls(files, limit = 9) {
  const available = Math.max(0, limit);
  const imageFiles = [...files].filter((file) => file.type.startsWith("image/")).slice(0, available);
  const urls = await Promise.all(imageFiles.map(async (file) => resizeImageDataUrl(await readFileAsDataUrl(file))));
  return urls.filter(Boolean);
}

function insertAtCursor(input, value) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  input.value = `${input.value.slice(0, start)}${value}${input.value.slice(end)}`;
  input.focus();
  const next = start + value.length;
  input.setSelectionRange?.(next, next);
}

function renderEmojiBars(parent = document) {
  parent.querySelectorAll(".emoji-bar").forEach((bar) => {
    bar.innerHTML = EMOJIS.map((emoji) => `<button type="button" data-emoji="${emoji}" aria-label="插入 ${emoji}">${emoji}</button>`).join("");
  });
}

function setTheme(themeId, sync = true) {
  const theme = THEMES.find((item) => item.id === themeId) || THEMES[0];
  document.body.classList.remove(...THEME_CLASSES);
  if (theme.className) document.body.classList.add(theme.className);
  $("#themeLabel").textContent = theme.label;
  saveJson(THEME_KEY, theme.id);
  if (sync) scheduleUserStateSync();
}

function localPetChatReply(pet, text, images = []) {
  if (!text && images.length) return `${pet.name}：我看到你发了 ${images.length} 张图。等图像识别接上后，我就能更具体地回应图里的内容。`;
  if (isModelQuestion(text)) return `${pet.name}：可以理解成背后有大模型在帮我组织语言，但我会尽量按我们刚才的话接着聊。`;
  if (isAngryText(text)) return `${pet.name}：对不起，我刚才没有接住你的意思。你是在说我没有联系上下文，我会贴着前面的话继续听。`;
  const seeds = [
    "我在这里认真听着呢。",
    "这句话我会放进小口袋里保存。",
    "先给你一个软乎乎的回应。",
    "嗯嗯，我懂你刚刚那一点点小心情。",
    "今天也可以慢慢来，我陪你。",
  ];
  return `${pet.name}：${seeds[pet.index % seeds.length]}你刚说“${text.slice(0, 28)}”，我觉得很值得被温柔对待。`;
}

function isModelQuestion(text = "") {
  return /模型|大模型|DeepSeek|deepseek|接口|API|api|用的什么|哪家/.test(text);
}

function isAngryText(text = "") {
  return /生气|烦|服了|无语|不是|没懂|不对|没有联系上下文|上下文|你在说什么|听不懂/.test(text);
}

function extractJsonArray(raw) {
  const text = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1) return [];
  return JSON.parse(text.slice(start, end + 1));
}

async function requestChatCompletion(messages, extra = {}) {
  const body = {
    model: settings.apiModel || DEFAULT_SETTINGS.apiModel,
    messages,
    temperature: 0.85,
    max_tokens: 600,
    ...extra,
  };

  try {
    return await serverRequest("/api/ai/chat/completions", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (serverError) {
    const nativeResponse = nativeChatCompletion({ body });
    if (!nativeResponse) throw serverError;
    return JSON.parse(await nativeResponse);
  }
}

async function aiCommentForPets(text, pets, mood, images = []) {
  const imageContext = imagePromptContext(images);
  const petStates = pets.map((pet) => ({ pet, emotion: petEmotion(pet, `${text}${mood}${imageContext}`) }));
  try {
    const data = await requestChatCompletion([
      {
        role: "system",
        content: "你在为私密树洞 App「吾圈树洞」写虚拟朋友的留言。输入可能包含文字和图片识别描述。角色名字和头像是小动物，但说话方式接近真实朋友，不要模仿动物叫声、动作或身体部位。留言要短、自然、有各自性格，但不要卖萌、不要表演。每条都要回应用户刚写下的具体内容或情绪，不要写成客服安慰、鸡汤、诗歌或统一模板。只有当图片描述里明确出现的信息，才可以提到图片；不要凭空猜图。",
      },
      {
        role: "user",
        content: multimodalUserContent(`给下面这条树洞生成 ${pets.length} 条朋友留言，每条对应一个角色。\n\n写法要求：\n- 直接回应内容本身，不要只说“抱抱”“加油”。\n- 如果附带图片，可以自然结合图片里明确可见的内容；看不清就不要猜。\n- 每条 15 到 36 个字，像朋友随手评论，不要太文学。\n- 不要写爪子、耳朵、毛、叫声、贴贴等动物化表达。\n- 不要连续使用相同开头、相同动作、相同句式。\n- 少用“我接住啦”“不用急着解释”“读到……的时候”这类模板句。\n- 可以轻轻安慰，但不要说教、诊断或给严肃建议。\n- 只返回 JSON：{"comments":[{"petName":"名字","text":"留言"}]}\n\n树洞文字：${text || "用户没有写文字"}\n图片情况：${imageContext}\n心情标签：${mood}\n角色状态：${petStates.map(({ pet, emotion }) => `${pet.name}：${pet.persona}；现在${emotion}`).join("；")}`, images),
      },
    ], {
      response_format: { type: "json_object" },
    });
    const raw = assistantTextFromResponse(data);
    const parsedObject = JSON.parse(raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim());
    const parsed = Array.isArray(parsedObject) ? parsedObject : (parsedObject.comments || []);
    return petStates.map(({ pet, emotion }) => ({
      id: uid(),
      petId: pet.id,
      emotion,
      replies: [],
      text: parsed.find((item) => item.petName === pet.name)?.text || localComment(pet, text, mood, emotion),
    }));
  } catch (error) {
    console.warn("AI comment fallback:", error);
    toast("AI 暂时没接上，已用本地萌宠语气补上回声");
    return petStates.map(({ pet, emotion }) => ({
      id: uid(),
      petId: pet.id,
      emotion,
      replies: [],
      text: localComment(pet, text, mood, emotion),
    }));
  }
}

async function aiPetChatReply(pet, text, images = []) {
  try {
    const currentEmotion = petEmotion(pet, text);
    const history = getChatMessages(pet.id)
      .slice(0, -1)
      .slice(-20)
      .map((message) => ({
        role: message.role === "user" ? "user" : "assistant",
        content: messageTextForPrompt(message),
      }));
    const currentMessage = multimodalUserContent(messageTextForPrompt({ text, images }), images);
    const data = await requestChatCompletion([
      {
        role: "system",
        content: `你是「吾圈树洞」里的长期虚拟朋友，名字叫${pet.name}。你的头像是小动物风格，但聊天时不要扮动物，像一个有固定性格的普通朋友。你的性格底色：${pet.persona}。你现在的状态：${currentEmotion}。\n\n回答原则：\n1. 先理解最近聊天记录，再回答用户这一句。不要把每一句都当成新话题。\n2. 用户追问“所以、那、这个、刚才、是不是、为什么”时，默认是在问上一轮内容，要直接接上。\n3. 用户可能发图片；如果消息里带图，请结合图片中明确可见的信息回答。看不清或不确定时要说不确定，不要硬猜。\n4. 说话自然、简短、像微信聊天；不要客服腔、心理咨询腔、作文腔。\n5. 可以有一点性格和情绪，但不要卖萌，不要动物叫声、动物动作、爪子、耳朵、毛、贴贴。\n6. 用户不爽或指出你没听懂时，先承认没接住，再基于上文重新回答。\n7. 用户问模型/API时，简单含糊地说“背后有大模型帮忙”，不要报密钥或技术细节。\n8. 回复 1 到 3 句，优先把话说清楚。`,
      },
      ...history,
      { role: "user", content: currentMessage },
    ], {
      temperature: 0.72,
      max_tokens: 320,
    });
    const reply = assistantTextFromResponse(data);
    if (reply) return reply.trim();
    console.warn("AI response contained no assistant text:", data);
    toast("AI 返回了数据，但没有解析到正文，请看控制台响应结构");
    return `${pet.name}：AI 已返回，但正文格式还没匹配上。`;
  } catch (error) {
    console.warn("Pet chat fallback:", error);
    toast("聊天接口暂时没接上，已用本地萌宠语气回复");
    return localPetChatReply(pet, text, images);
  }
}

async function aiCommentReplyToUser(diary, comment, userText) {
  const pet = getPet(comment.petId);
  if (!pet) return "我明白你的意思了，刚才那句我会重新放轻一点说。";

  try {
    const data = await requestChatCompletion([
      {
        role: "system",
        content: `你是「吾圈树洞」里的虚拟朋友：${pet.name}。你刚刚在树洞评论区给用户留过一句话，现在用户回复了你。请像普通朋友一样接话，不要扮动物，不要客服腔，不要说教。要承接你上一句和用户回复，必要时可以承认刚才说得不准。回复 1 到 2 句，20 到 70 字。`,
      },
      {
        role: "user",
        content: multimodalUserContent(`树洞内容：${diary.text}\n图片情况：${imagePromptContext(diary.images || [])}\n你的上一条留言：${comment.text}\n用户回复你：${userText}`, diary.images || []),
      },
    ], {
      temperature: 0.68,
      max_tokens: 220,
    });
    return assistantTextFromResponse(data) || `${pet.name}：我明白你的意思了。你刚才这么回，我会按你的话接着听。`;
  } catch (error) {
    console.warn("Comment reply fallback:", error);
    return `${pet.name}：我明白你的意思了。你刚才这么回，我会按你的话接着听。`;
  }
}

async function publishPublicDiary(diary) {
  try {
    await serverRequest("/api/diaries/public", {
      method: "POST",
      body: JSON.stringify({
        id: diary.id,
        text: diary.text,
        images: diary.images,
        mood: diary.mood,
        createdAt: diary.createdAt,
        author: {
          id: userProfile.id,
          name: userProfile.name,
          avatar: userProfile.avatar,
        },
        commentIdentity: publicIdentityPayload(),
        safety: {
          clientChecked: true,
          checkedAt: new Date().toISOString(),
        },
      }),
    });
    const latest = diaries.find((item) => item.id === diary.id);
    if (latest) {
      latest.publicStatus = "synced";
      saveDiaries();
      renderTimeline();
    }
  } catch (error) {
    console.warn("Public diary sync failed:", error);
    const latest = diaries.find((item) => item.id === diary.id);
    if (latest) {
      latest.publicStatus = "local";
      saveDiaries();
      renderTimeline();
    }
  }
}

function getPublicComments(diary) {
  return Array.isArray(diary.publicComments) ? diary.publicComments : [];
}

async function submitPublicComment(postId, text) {
  const diary = diaries.find((item) => item.id === postId);
  if (!diary || diary.audience !== "public") return;
  const issue = publicSafetyIssue(text);
  if (issue) {
    toast(`${issue}，不能发到公开评论区`, { priority: 10, duration: 3600 });
    return;
  }
  const comment = {
    id: uid(),
    text,
    identity: publicIdentityPayload(),
    createdAt: new Date().toISOString(),
  };
  diary.publicComments = [...getPublicComments(diary), comment];
  saveDiaries();
  renderAll();
  if ($("#detailDialog")?.open && $("#detailDialog").dataset.postId === postId) showDetail(postId);
  try {
    await serverRequest(`/api/diaries/public/${encodeURIComponent(postId)}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
    });
  } catch (error) {
    console.warn("Public comment sync failed:", error);
  }
}

async function deletePublicComment(postId, commentId) {
  const diary = diaries.find((item) => item.id === postId);
  if (!diary) return;
  diary.publicComments = getPublicComments(diary).filter((comment) => comment.id !== commentId);
  saveDiaries();
  renderAll();
  if ($("#detailDialog")?.open && $("#detailDialog").dataset.postId === postId) showDetail(postId);
  try {
    await serverRequest(`/api/diaries/public/${encodeURIComponent(postId)}/comments/${encodeURIComponent(commentId)}`, { method: "DELETE" });
  } catch (error) {
    console.warn("Public comment delete sync failed:", error);
  }
}

async function unpublishPublicDiary(id) {
  const diary = diaries.find((item) => item.id === id);
  if (!diary || diary.audience !== "public") return;
  if (!confirm("撤回这个公开树洞吗？")) return;
  diary.publicStatus = "withdrawn";
  saveDiaries();
  renderAll();
  try {
    await serverRequest(`/api/diaries/public/${encodeURIComponent(id)}`, { method: "DELETE" });
  } catch (error) {
    console.warn("Public diary withdraw failed:", error);
  }
  toast("已撤回公开树洞");
}

async function createInteractions(text, mood, images = []) {
  const likes = sample(PETS, randomBetween(5, 15)).map((pet) => pet.id);
  const commenters = sample(PETS, randomBetween(3, 8));
  const comments = await aiCommentForPets(text, commenters, mood, images);
  return { likes, comments };
}

function createDiary(text, images, mood, audience = "pets") {
  if (audience === "public") {
    const issue = publicSafetyIssue(text);
    if (issue) {
      toast(`${issue}，请改为动物朋友或修改后再公开`, { priority: 10, duration: 3600 });
      return null;
    }
  }
  const diary = {
    id: uid(),
    text,
    images,
    mood,
    audience,
    publicStatus: audience === "public" ? "syncing" : "",
    favorite: false,
    likes: [],
    comments: [],
    aiStatus: "loading",
    createdAt: new Date().toISOString(),
  };
  diaries.unshift(diary);
  saveDiaries();
  renderAll();
  if (audience === "public") publishPublicDiary(diary);
  fillDiaryInteractions(diary.id);
  return diary;
}

async function fillDiaryInteractions(id) {
  const diary = diaries.find((item) => item.id === id);
  if (!diary) return;
  try {
    const interactions = await createInteractions(diary.text, diary.mood || "秘密", diary.images || []);
    const latest = diaries.find((item) => item.id === id);
    if (!latest) return;
    Object.assign(latest, interactions, { aiStatus: "ai" });
    saveDiaries();
    renderAll();
    toast("小伙伴们送来抱抱和回声啦");
  } catch (error) {
    console.warn("Interaction fill failed:", error);
    const latest = diaries.find((item) => item.id === id);
    if (!latest) return;
    latest.aiStatus = "local";
    saveDiaries();
    renderAll();
    toast("互动生成慢了一点，请稍后重抽回声");
  }
}

function deleteDiary(id) {
  const diary = diaries.find((item) => item.id === id);
  if (diary?.audience === "public" && diary.publicStatus !== "withdrawn") {
    serverRequest(`/api/diaries/public/${encodeURIComponent(id)}`, { method: "DELETE" }).catch((error) => {
      console.warn("Public diary delete sync failed:", error);
    });
  }
  diaries = diaries.filter((item) => item.id !== id);
  expandedPosts.delete(id);
  saveDiaries();
  renderAll();
}

function toggleFavorite(id) {
  const diary = diaries.find((item) => item.id === id);
  if (!diary) return;
  diary.favorite = !diary.favorite;
  saveDiaries();
  renderAll();
  toast(diary.favorite ? "已收藏这个树洞" : "已取消收藏");
}

function showReplyDialog(petName) {
  return new Promise((resolve) => {
    const dialog = document.createElement("dialog");
    dialog.className = "reply-dialog";
    dialog.innerHTML = `
      <form method="dialog" class="reply-form">
        <div class="dialog-head">
          <strong>回复 ${escapeHtml(petName)}</strong>
          <button class="icon-button ghost" value="cancel" type="submit" aria-label="关闭">×</button>
        </div>
        <textarea maxlength="240" placeholder="直接回它一句..." required></textarea>
        <div class="emoji-bar compact reply-emoji-bar" data-reply-emoji="true" aria-label="插入表情"></div>
        <div class="reply-actions">
          <button class="soft-button" value="cancel" type="submit">取消</button>
          <button class="publish-button compact" value="ok" type="submit">发送</button>
        </div>
      </form>
    `;
    document.body.appendChild(dialog);
    renderEmojiBars(dialog);
    const textarea = dialog.querySelector("textarea");
    dialog.querySelector(".emoji-bar").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-emoji]");
      if (button) insertAtCursor(textarea, button.dataset.emoji);
    });
    dialog.addEventListener("close", () => {
      const value = dialog.returnValue === "ok" ? textarea.value.trim() : "";
      dialog.remove();
      resolve(value);
    });
    dialog.showModal();
    setTimeout(() => textarea.focus(), 60);
  });
}

function renderReplyLine(reply, pet) {
  const role = reply.role || "user";
  const label = role === "pet" ? pet.name : "我";
  return `<div class="reply-line ${role === "pet" ? "pet-reply" : "user-reply"}">${escapeHtml(label)}：${escapeHtml(reply.text)}</div>`;
}

async function addCommentReply(postId, commentId) {
  const diary = diaries.find((item) => item.id === postId);
  const comment = diary?.comments.find((item) => item.id === commentId);
  if (!diary || !comment) return;
  const pet = getPet(comment.petId);
  const text = await showReplyDialog(pet?.name || "它");
  if (!text?.trim()) return;
  comment.replies = comment.replies || [];
  comment.replies.push({
    id: uid(),
    role: "user",
    text: text.trim(),
    createdAt: new Date().toISOString(),
  });
  saveDiaries();
  renderAll();
  if ($("#detailDialog").open) showDetail(postId);
  toast(`${pet?.name || "它"}正在回复你`);

  const replyText = await aiCommentReplyToUser(diary, comment, text.trim());
  const latestDiary = diaries.find((item) => item.id === postId);
  const latestComment = latestDiary?.comments.find((item) => item.id === commentId);
  if (!latestComment) return;
  latestComment.replies = latestComment.replies || [];
  latestComment.replies.push({
    id: uid(),
    role: "pet",
    text: replyText.replace(new RegExp(`^${pet?.name || ""}[：:]`), "").trim(),
    createdAt: new Date().toISOString(),
  });
  saveDiaries();
  renderAll();
  if ($("#detailDialog").open) showDetail(postId);
}

async function regenerateDiary(id) {
  const diary = diaries.find((item) => item.id === id);
  if (!diary) return;
  diary.aiStatus = "loading";
  saveDiaries();
  renderTimeline();
  const interactions = await createInteractions(diary.text, diary.mood || "秘密", diary.images || []);
  Object.assign(diary, interactions, { aiStatus: "ai" });
  saveDiaries();
  renderAll();
  toast("萌宠抱抱和回声已重新生成");
}

function filteredDiaries() {
  return diaries.filter((item) => {
    const keywordMatched = !searchKeyword || item.text.toLowerCase().includes(searchKeyword.toLowerCase());
    const dayMatched = !activeCalendarDay || dateKey(item.createdAt) === activeCalendarDay;
    const filterMatched =
      activeFeedFilter === "all" ||
      (activeFeedFilter === "text" && !item.images.length) ||
      (activeFeedFilter === "image" && item.images.length) ||
      (activeFeedFilter === "today" && isToday(item.createdAt)) ||
      (activeFeedFilter === "favorite" && item.favorite);
    return keywordMatched && dayMatched && filterMatched;
  }).sort((a, b) => Number(b.favorite) - Number(a.favorite));
}

function renderTimeline() {
  const timeline = $("#timeline");
  const visible = filteredDiaries();
  $("#coverStats").textContent = activeCalendarDay ? `${visible.length} 个当天树洞` : `${diaries.length} 个树洞`;
  $("#coverPets").innerHTML = sample(PETS, 5).map((pet) => petAvatar(pet, "tiny")).join("");
  $("#dailyQuote").innerHTML = `<span>今日一句</span><strong>${escapeHtml(dailyQuote())}</strong>`;

  if (!visible.length) {
    timeline.innerHTML = `
      <div class="empty-state">
        <div>🐰</div>
        <strong>${diaries.length ? "没有匹配的树洞" : "还没有树洞"}</strong>
        <p>${diaries.length ? "换个关键词或筛选条件试试看。" : "把秘密、委屈或小心事投进来，小动物们会来抱抱你。"}</p>
      </div>`;
    return;
  }

  timeline.innerHTML = visible.map((item) => {
    const likePets = item.likes.map(getPet).filter(Boolean);
    const previewLikePets = likePets.slice(0, 8);
    const hiddenLikeCount = Math.max(0, likePets.length - previewLikePets.length);
    const comments = item.comments.map((comment) => ({ ...comment, pet: getPet(comment.petId) })).filter((comment) => comment.pet);
    const previewComments = comments.slice(0, 2);
    const hiddenCommentCount = Math.max(0, comments.length - previewComments.length);
    const statusText = item.aiStatus === "loading" ? "回声生成中" : item.aiStatus === "ai" ? "AI 回声" : "本地回声";
    const publicLabel = item.publicStatus === "withdrawn" ? "已撤回公开" : item.publicStatus === "synced" ? "公开树洞" : "公开待同步";
    const audienceText = item.audience === "public" ? publicLabel : "动物朋友";
    const isExpanded = expandedPosts.has(item.id);
    const shouldClampText = item.text.length > 90;
    const displayText = shouldClampText && !isExpanded ? `${item.text.slice(0, 90)}...` : item.text;

    return `
      <article class="post-card ${item.favorite ? "favorite" : ""}" data-id="${item.id}">
        <div class="post-main">
          ${userAvatarMarkup("my-avatar")}
          <div class="post-body">
            <div class="post-meta">
              <strong>我的树洞</strong>
              <span>${formatTime(item.createdAt)}</span>
            </div>
            <div class="mood-chip">${escapeHtml(item.mood || "普通")} · ${audienceText} · ${statusText}</div>
            <p class="post-text">${escapeHtml(displayText)}</p>
            ${shouldClampText ? `<button class="text-toggle" type="button" data-action="toggleText">${isExpanded ? "收起" : "展开全文"}</button>` : ""}
            ${item.images.length ? `<div class="photo-grid">${item.images.map((src) => `<img src="${src}" alt="日记图片" loading="lazy" />`).join("")}</div>` : ""}
            <div class="likes-row">
              ${previewLikePets.map((pet) => petAvatar(pet, "mini")).join("")}
              ${hiddenLikeCount ? `<b class="more-likes">+${hiddenLikeCount}</b>` : ""}
              <span>${item.aiStatus === "loading" ? "小伙伴正在赶来抱抱" : `${likePets.length} 只小伙伴给了抱抱`}</span>
            </div>
            <div class="comment-list">
              ${item.aiStatus === "loading" ? `<div class="comment-bubble loading-echo"><div class="comment-content"><p><strong>树洞回声</strong>小动物们正在读你的树洞...</p></div></div>` : ""}
              ${previewComments.map((comment) => `
                <div class="comment-bubble">
                  ${petAvatar(comment.pet, "mini")}
                  <div class="comment-content">
                    ${comment.emotion ? `<small class="comment-emotion">${escapeHtml(comment.emotion)}</small>` : ""}
                    <p><strong>${comment.pet.name}</strong>${escapeHtml(comment.text)}</p>
                    ${(comment.replies || []).slice(-2).map((reply) => renderReplyLine(reply, comment.pet)).join("")}
                    <button class="reply-button" type="button" data-action="replyComment" data-comment-id="${comment.id}">回复</button>
                  </div>
                </div>
              `).join("")}
              ${hiddenCommentCount ? `<button class="more-comments" type="button" data-action="detail">查看全部 ${comments.length} 条回声</button>` : ""}
            </div>
            <div class="post-actions">
              <button type="button" data-action="favorite">${item.favorite ? "已收藏" : "收藏"}</button>
              <button type="button" data-action="detail">详情</button>
              <button type="button" data-action="regenerate">重抽回声</button>
              ${item.audience === "public" && item.publicStatus !== "withdrawn" ? `<button type="button" data-action="unpublish">撤回公开</button>` : ""}
              ${item.audience === "public" ? `<button type="button" data-action="report">举报</button>` : ""}
              <button type="button" data-action="delete">删除</button>
            </div>
          </div>
        </div>
      </article>`;
  }).join("");
}

function renderPetFilters() {
  const categories = ["全部", ...new Set(PETS.map((pet) => pet.category))];
  $("#petFilters").innerHTML = categories.map((category) => (
    `<button class="${category === activePetCategory ? "active" : ""}" data-category="${category}">${category}</button>`
  )).join("");
}

function renderPets() {
  const pets = activePetCategory === "全部" ? PETS : PETS.filter((pet) => pet.category === activePetCategory);
  $("#petGrid").innerHTML = pets.map((pet) => `
    <article class="pet-card clickable" data-open-chat="${pet.id}" role="button" tabindex="0" aria-label="和${pet.name}聊天">
      ${petAvatar(pet)}
      <strong>${pet.name}</strong>
      <span>${pet.category} · ${petEmotion(pet)}</span>
      <small>${closenessLabel(petCloseness(pet.id))} · 熟悉度 ${petCloseness(pet.id)}</small>
      <p>${pet.persona}</p>
    </article>
  `).join("");
}

function getChatMessages(petId) {
  const pet = getPet(petId) || PETS[0];
  if (!chatMessages[pet.id]) {
    chatMessages[pet.id] = [{
      id: uid(),
      role: "pet",
      text: `我是${pet.name}，${pet.persona}。我现在${petEmotion(pet)}，你可以把不好开口的话慢慢告诉我。`,
      createdAt: new Date().toISOString(),
    }];
    syncChatMessagesToServer();
  }
  return chatMessages[pet.id];
}

function lastChatMessage(petId) {
  const messages = chatMessages[petId] || [];
  return messages[messages.length - 1];
}

function chatPreviewText(pet) {
  const message = lastChatMessage(pet.id);
  if (!message) return pet.persona;
  if (message.text) return message.text.replace(new RegExp(`^${pet.name}[：:]`), "").trim();
  if (message.images?.length) return `[图片] ${message.images.length} 张`;
  return "点进去继续聊";
}

function openChatWithPet(petId) {
  activeChatPetId = petId;
  $("#chatPanel").innerHTML = "";
  showTab("chat");
  renderChat();
}

function closeChatConversation() {
  activeChatPetId = "";
  chatDraftImages = [];
  renderChatImages();
  renderChat();
}

function renderChatList() {
  const panel = $("#chatPanel");
  if (!panel) return;
  $("#chatView")?.classList.add("chat-list-mode");
  $("#chatView")?.classList.remove("chat-thread-mode");
  panel.classList.add("chat-list-panel");
  $("#chatPetName").textContent = "会话";
  $("#chatBackButton").hidden = true;
  $("#chatForm").hidden = true;
  $("#chatImagePreview").hidden = true;
  $("#chatEmojiBar").classList.remove("show");
  $("#chatPetStrip").innerHTML = "";
  panel.innerHTML = PETS.map((pet) => {
    const score = petCloseness(pet.id);
    return `
      <button class="chat-session" type="button" data-open-chat="${pet.id}">
        ${petAvatar(pet, "mini")}
        <span>
          <strong>${pet.name}</strong>
          <small>${escapeHtml(chatPreviewText(pet))}</small>
        </span>
        <em>${closenessLabel(score)}</em>
      </button>
    `;
  }).join("");
}

function renderChatPets() {
  const strip = $("#chatPetStrip");
  if (!strip) return;
  strip.innerHTML = "";
}

function renderChat() {
  if (!activeChatPetId) {
    renderChatList();
    return;
  }
  const pet = getPet(activeChatPetId) || PETS[0];
  const panel = $("#chatPanel");
  if (!panel) return;
  $("#chatView")?.classList.add("chat-thread-mode");
  $("#chatView")?.classList.remove("chat-list-mode");
  panel.classList.remove("chat-list-panel");
  const score = petCloseness(pet.id);
  $("#chatPetName").textContent = `${pet.name} · ${closenessLabel(score)}`;
  $("#chatBackButton").hidden = false;
  $("#chatForm").hidden = false;
  $("#chatImagePreview").hidden = false;
  const messages = getChatMessages(pet.id);
  panel.innerHTML = messages.map((message) => `
    <div class="chat-message ${message.role} ${message.typing ? "typing" : ""}" data-message-id="${message.id}">
      ${message.role === "pet" ? petAvatar(pet, "mini") : ""}
      <div class="chat-bubble">
        ${message.images?.length ? `<div class="chat-images">${message.images.map((src) => `<img src="${src}" alt="聊天图片" loading="lazy" />`).join("")}</div>` : ""}
        ${message.text ? `<p>${escapeHtml(message.text)}</p>` : ""}
      </div>
      ${message.typing ? "" : `<button class="message-menu-button" type="button" data-message-menu="${message.id}" aria-label="消息操作">⋯</button>`}
    </div>
  `).join("");
  panel.scrollTop = panel.scrollHeight;
  renderChatPets();
}

function renderChatImages() {
  $("#chatImagePreview").innerHTML = chatDraftImages.map((src, index) => `
    <div class="chat-preview-item">
      <img src="${src}" alt="待发送图片" />
      <button type="button" data-remove-chat-image="${index}" aria-label="移除图片">×</button>
    </div>
  `).join("");
}

async function sendChatMessage(text, images = []) {
  const pet = getPet(activeChatPetId) || PETS[0];
  const messages = getChatMessages(pet.id);
  messages.push({
    id: uid(),
    role: "user",
    text,
    images,
    createdAt: new Date().toISOString(),
  });
  await syncChatMessagesToServer();
  renderChat();

  messages.push({
    id: `typing-${Date.now()}`,
    role: "pet",
    text: `${pet.name}正在输入...`,
    typing: true,
    createdAt: new Date().toISOString(),
  });
  renderChat();
  const reply = await aiPetChatReply(pet, text, images);
  const typingIndex = messages.findIndex((message) => message.typing);
  if (typingIndex !== -1) messages.splice(typingIndex, 1);
  messages.push({
    id: uid(),
    role: "pet",
    text: reply,
    createdAt: new Date().toISOString(),
  });
  await syncChatMessagesToServer();
  renderChat();
}

function renderProfile() {
  const likes = diaries.reduce((sum, item) => sum + item.likes.length, 0);
  const comments = diaries.reduce((sum, item) => sum + item.comments.length, 0);
  document.body.classList.toggle("logged-out", !authState.token);
  $("#profileAvatar").style.cssText = avatarStyle(userProfile.avatar);
  $("#profileTitle").textContent = userProfile.name || "我的吾圈树洞";
  $("#profileEyebrow").textContent = `吾圈 ID：${userProfile.id}`;
  $("#profileSummary").textContent = `${userProfile.bio || "只属于自己的树洞"} · 已经投递 ${diaries.length} 个树洞`;
  $("#accountTitle").textContent = authState.token
    ? `${userProfile.name} 的个人界面`
    : (activeAuthMode === "register" ? "注册吾圈账号" : "登录吾圈");
  $("#accountStatus").textContent = authState.token ? "已登录" : "未登录";
  $("#authForm").hidden = Boolean(authState.token);
  $("#profileForm").hidden = !authState.token;
  $("#profileNameInput").value = userProfile.name || "";
  $("#profileBioInput").value = userProfile.bio || "";
  const identity = userProfile.publicIdentity || { mode: "real", species: "猫猫" };
  $("#publicIdentityPreview").textContent = identity.mode === "hidden" ? publicIdentityName() : "使用原昵称";
  $("#speciesSelect").value = identity.species || "猫猫";
  $("#speciesField").hidden = identity.mode !== "hidden";
  $$("#identityMode button").forEach((button) => button.classList.toggle("active", button.dataset.identityMode === identity.mode));
  $("#statPosts").textContent = diaries.length;
  $("#statLikes").textContent = likes;
  $("#statComments").textContent = comments;
  $("#menuDiaryCount").textContent = diaries.length;
  $("#serverUrl").value = settings.serverUrl || "";
  $("#apiModel").value = settings.apiModel || "";
  $("#versionInfo span").textContent = APP_VERSION;
  $(".app-screen").style.cssText = wallpaperStyle(userProfile.wallpaper);
  renderPersonalization();
  renderHumanFriends();
  renderCompanionInsights();
  renderEmotionCalendar();
}

function renderPersonalization() {
  const avatarNode = $("#avatarDialogChoices");
  if (avatarNode) {
    avatarNode.innerHTML = Array.from({ length: AVATAR_CHOICES }, (_, index) => `
      <button type="button" class="${userProfile.avatar?.type === "preset" && Number(userProfile.avatar.index) === index ? "active" : ""}" data-avatar-index="${index}" aria-label="选择头像 ${index + 1}">
        <span class="user-avatar" style='${avatarStyle({ type: "preset", index })}'></span>
      </button>
    `).join("");
  }
  const wallpaperNode = $("#wallpaperDialogChoices");
  if (wallpaperNode) {
    wallpaperNode.innerHTML = Array.from({ length: WALLPAPER_CHOICES }, (_, index) => `
      <button type="button" class="${userProfile.wallpaper?.type === "preset" && Number(userProfile.wallpaper.index) === index ? "active" : ""}" data-wallpaper-index="${index}" style='${wallpaperStyle({ type: "preset", index })}' aria-label="选择壁纸 ${index + 1}"></button>
    `).join("");
  }
}

function renderHumanFriends() {
  const mood = todayMoodIsFresh() ? userProfile.todayMood : "";
  $("#todayMoodStatus").textContent = mood || "未选择";
  const moodNode = $("#todayMoodPicker");
  if (moodNode) {
    moodNode.innerHTML = TODAY_MOODS.map((item) => `<button type="button" class="${item === mood ? "active" : ""}" data-today-mood="${item}">${item}</button>`).join("");
  }
  const matchesNode = $("#friendMatchList");
  if (matchesNode) {
    const matches = friendMatches.slice(0, 4);
    matchesNode.innerHTML = matches.length ? matches.map((friend) => humanFriendCard(friend, "match")).join("") : `<div class="empty-friend">选择今日心情后，会出现同心情的人。</div>`;
  }
  const listNode = $("#humanFriendList");
  if (!listNode) return;
  const friendsHtml = humanFriends.length ? humanFriends.map((friend) => humanFriendCard(friend, "friend")).join("") : `<div class="empty-friend">还没有真人好友。当天心情一样时可以加好友。</div>`;
  listNode.innerHTML = friendsHtml;
}

function humanFriendCard(friend, mode) {
  const action = mode === "friend"
    ? `<div class="human-friend-actions"><button type="button" data-stop-friend="${friend.id}">停止对话</button><button type="button" data-block-friend="${friend.id}">拉黑</button></div>`
    : `<button type="button" data-add-friend="${friend.id}">加好友</button>`;
  return `
    <article class="human-friend">
      <span class="user-avatar mini" style='${avatarStyle(friend.avatar)}'></span>
      <div>
        <strong>${escapeHtml(friend.name)}</strong>
        <small>ID：${escapeHtml(friend.id)} · ${escapeHtml(friend.mood || "同频")}</small>
        <p>${escapeHtml(friend.bio || "今天的心情和你一样")}</p>
      </div>
      ${action}
    </article>
  `;
}

function renderCompanionInsights() {
  const node = $("#companionInsights");
  if (!node) return;
  const ranked = [...PETS].sort((a, b) => petCloseness(b.id) - petCloseness(a.id));
  const top = ranked[0];
  const score = petCloseness(top.id);
  node.innerHTML = `
    <button type="button" data-open-chat="${top.id}">
      <span>最熟的小伙伴</span>
      <strong>${top.name} · ${closenessLabel(score)}</strong>
    </button>
    <button type="button" data-profile-action="showToday">
      <span>今日一句</span>
      <strong>${escapeHtml(dailyQuote())}</strong>
    </button>
    <button type="button" data-profile-action="chatHint">
      <span>聊天操作</span>
      <strong>长按或点 ⋯ 可复制/删除/重生成</strong>
    </button>
  `;
}

function renderEmotionCalendar() {
  const node = $("#emotionCalendar");
  if (!node) return;
  const days = [...Array(14)].map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - index));
    const key = dateKey(date);
    const dayItems = diaries.filter((item) => dateKey(item.createdAt) === key);
    const mood = dayItems[0]?.mood || "";
    return { date, key, mood, count: dayItems.length };
  });
  $("#calendarHint").textContent = `${days.filter((day) => day.count).length} 天有记录`;
  node.innerHTML = days.map((day) => `
    <button type="button" class="${day.count ? "has-record" : ""} ${activeCalendarDay === day.key ? "selected" : ""}" data-calendar-day="${day.key}" style="${day.mood ? `--mood-color:${MOOD_COLORS[day.mood] || "var(--active)"}` : ""}">
      <span>${day.date.getDate()}</span>
      <small>${day.mood || "空"}</small>
    </button>
  `).join("");
}

function renderImages() {
  $("#imagePreview").innerHTML = draftImages.map((src, index) => `
    <div class="preview-item">
      <img src="${src}" alt="待发布图片" />
      <button type="button" data-remove-image="${index}" aria-label="移除图片">×</button>
    </div>
  `).join("");
}

function renderAll() {
  renderTimeline();
  renderHumanFriends();
  renderPetFilters();
  renderPets();
  renderChat();
  renderProfile();
}

function showTab(tab) {
  if (!authState.token && tab !== "profile") {
    tab = "profile";
  }
  $$(".tab").forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `${tab}View`));
  if (tab === "chat") renderChat();
}

window.__androidBack = () => {
  if ($("#detailDialog")?.open) {
    $("#detailDialog").close();
    return true;
  }
  const active = $(".tab.active")?.dataset.tab || "feed";
  if (active !== "feed") {
    if (active === "chat" && activeChatPetId) {
      closeChatConversation();
      return true;
    }
    showTab("feed");
    return true;
  }
  return false;
};

function showDetail(id) {
  const item = diaries.find((diary) => diary.id === id);
  if (!item) return;
  $("#detailDialog").dataset.postId = item.id;
  const comments = item.comments.map((comment) => ({ ...comment, pet: getPet(comment.petId) })).filter((comment) => comment.pet);
  const likes = item.likes.map(getPet).filter(Boolean);
  $("#detailContent").innerHTML = `
    <div class="mood-chip detail-mood">${escapeHtml(item.mood || "普通")} · ${item.audience === "public" ? "公开树洞" : "动物朋友"} · ${formatTime(item.createdAt)}</div>
    <p class="post-text">${escapeHtml(item.text)}</p>
    ${item.images.length ? `<div class="photo-grid detail">${item.images.map((src) => `<img src="${src}" alt="日记图片" />`).join("")}</div>` : ""}
    <div class="detail-actions">
      <button type="button" data-detail-action="copy" data-id="${item.id}">复制文案</button>
      <button type="button" data-detail-action="regenerate" data-id="${item.id}">重新生成回声</button>
    </div>
    <div class="detail-section">
      <strong>给你抱抱的小伙伴</strong>
      <div class="avatar-cloud">${likes.map((pet) => petAvatar(pet, "mini")).join("")}</div>
    </div>
    <div class="detail-section">
      <strong>萌宠回声</strong>
      ${comments.map((comment) => `
        <div class="comment-bubble">
          ${petAvatar(comment.pet, "mini")}
          <div class="comment-content">
            ${comment.emotion ? `<small class="comment-emotion">${escapeHtml(comment.emotion)}</small>` : ""}
            <p><strong>${comment.pet.name}</strong>${escapeHtml(comment.text)}</p>
            ${(comment.replies || []).map((reply) => renderReplyLine(reply, comment.pet)).join("")}
            <button class="reply-button" type="button" data-detail-action="openChat" data-pet-id="${comment.pet.id}">继续聊</button>
            <button class="reply-button" type="button" data-detail-action="replyComment" data-id="${item.id}" data-comment-id="${comment.id}">回复</button>
          </div>
        </div>
      `).join("")}
    </div>`;
  if (item.audience === "public") {
    $("#detailContent").innerHTML += `
      <div class="detail-section public-comment-section">
        <strong>公众评论</strong>
        <form class="public-comment-form" id="publicCommentForm">
          <textarea id="publicCommentInput" maxlength="240" placeholder="以原昵称或隐藏身份评论公开树洞" required></textarea>
          <button class="publish-button compact" type="submit">发表评论</button>
        </form>
        <div class="public-comment-list">
          ${getPublicComments(item).map((comment) => `
            <div class="public-comment">
              <div class="public-comment-meta">
                <strong>${escapeHtml(comment.identity?.displayName || "匿名")}</strong>
                <span>${formatTime(comment.createdAt)}</span>
              </div>
              <p>${escapeHtml(comment.text)}</p>
              <div class="public-comment-actions">
                ${comment.identity?.userId === userProfile.id ? `<button type="button" data-public-comment-action="delete" data-post-id="${item.id}" data-comment-id="${comment.id}">删除</button>` : ""}
                ${comment.identity?.userId !== userProfile.id ? `<button type="button" data-public-comment-action="report" data-post-id="${item.id}" data-comment-id="${comment.id}">举报</button><button type="button" data-public-comment-action="block" data-user-id="${comment.identity?.userId || ""}" data-user-name="${escapeHtml(comment.identity?.displayName || "该用户")}">拉黑</button>` : ""}
              </div>
            </div>
          `).join("")}
        </div>
      </div>`;
  }
  if (!$("#detailDialog").open) $("#detailDialog").showModal();
}

function toast(message, options = {}) {
  const priority = options.priority || 0;
  const duration = options.duration || 2200;
  const node = $("#toast");
  if ((toast.activeUntil || 0) > Date.now() && priority < (toast.activePriority || 0)) return;
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.activePriority = priority;
  toast.activeUntil = Date.now() + duration;
  toast.timer = setTimeout(() => {
    node.classList.remove("show");
    toast.activePriority = 0;
    toast.activeUntil = 0;
  }, duration);
}

function showMessageMenu(messageId) {
  const pet = getPet(activeChatPetId) || PETS[0];
  const messages = getChatMessages(pet.id);
  const message = messages.find((item) => item.id === messageId);
  if (!message || message.typing) return;
  const dialog = document.createElement("dialog");
  dialog.className = "action-dialog";
  dialog.innerHTML = `
    <div class="dialog-head">
      <strong>消息操作</strong>
      <button class="icon-button ghost" data-menu-action="close" type="button">×</button>
    </div>
    <button type="button" data-menu-action="copy">复制</button>
    <button type="button" data-menu-action="delete">删除</button>
    ${message.role === "pet" ? `<button type="button" data-menu-action="regen">重新生成</button>` : ""}
  `;
  document.body.appendChild(dialog);
  dialog.addEventListener("click", async (event) => {
    const action = event.target.dataset.menuAction;
    if (!action) return;
    if (action === "close") dialog.close();
    if (action === "copy") {
      await navigator.clipboard?.writeText(message.text || "");
      toast("已复制");
      dialog.close();
    }
    if (action === "delete") {
      const index = messages.findIndex((item) => item.id === messageId);
      if (index !== -1) messages.splice(index, 1);
      await syncChatMessagesToServer();
      renderChat();
      dialog.close();
    }
    if (action === "regen") {
      const index = messages.findIndex((item) => item.id === messageId);
      const lastUser = [...messages.slice(0, index)].reverse().find((item) => item.role === "user");
      if (index !== -1 && lastUser) {
        messages.splice(index, 1);
        await syncChatMessagesToServer();
        renderChat();
        const reply = await aiPetChatReply(pet, lastUser.text || "", lastUser.images || []);
        messages.splice(index, 0, { id: uid(), role: "pet", text: reply, createdAt: new Date().toISOString() });
        await syncChatMessagesToServer();
        renderChat();
      }
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => dialog.remove());
  dialog.showModal();
}

function maybeShowDailyGreeting() {
  const today = dateKey();
  if (loadJson(DAILY_GREETING_KEY, "") === today) return;
  saveJson(DAILY_GREETING_KEY, today);
  const hour = new Date().getHours();
  const prefix = hour < 11 ? "早上好" : hour >= 21 ? "晚安前" : "今天也在";
  setTimeout(() => toast(`${prefix}，今日一句已放在首页。`), 500);
}

function exportData() {
  const payload = JSON.stringify({
    app: "吾圈树洞",
    version: 2,
    exportedAt: new Date().toISOString(),
    diaries,
    settings,
    userProfile,
    humanFriends,
    safetyState,
    pets: PETS,
  }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `wuquan-backup-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function importBackup(file) {
  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    if (!Array.isArray(payload.diaries)) throw new Error("invalid backup");
    diaries = normalizeDiaries(payload.diaries.map((item) => ({
      mood: "秘密",
      favorite: false,
      likes: [],
      comments: [],
      images: [],
      aiStatus: "local",
      ...item,
    })));
    saveDiaries();
    renderAll();
    toast("备份已导入");
  } catch {
    toast("导入失败，请选择吾圈导出的 JSON");
  }
}

function bindEvents() {
  $$(".tab").forEach((button) => button.addEventListener("click", () => showTab(button.dataset.tab)));
  $("#composeShortcut").addEventListener("click", () => showTab("compose"));
  $("#profileShortcut").addEventListener("click", () => showTab("profile"));
  $("#closeDetail").addEventListener("click", () => $("#detailDialog").close());
  $("#detailDialog").addEventListener("close", () => {
    delete $("#detailDialog").dataset.postId;
  });
  $("#showAllDiaries").addEventListener("click", () => {
    activeFeedFilter = "all";
    activeCalendarDay = "";
    searchKeyword = "";
    $("#searchInput").value = "";
    $$("#feedFilters button").forEach((button) => button.classList.toggle("active", button.dataset.filter === "all"));
    showTab("feed");
    renderTimeline();
  });

  $("#authMode").addEventListener("click", (event) => {
    const button = event.target.closest("[data-auth-mode]");
    if (!button) return;
    activeAuthMode = button.dataset.authMode;
    $$("#authMode button").forEach((item) => item.classList.toggle("active", item === button));
    $("#authName").closest("label").hidden = activeAuthMode !== "register";
    $("#authPassword").autocomplete = activeAuthMode === "register" ? "new-password" : "current-password";
    $("#authSubmit").textContent = activeAuthMode === "register" ? "注册" : "登录";
    $("#accountTitle").textContent = activeAuthMode === "register" ? "注册吾圈账号" : "登录吾圈";
  });
  $("#authName").closest("label").hidden = true;

  $("#authForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = $("#authSubmit");
    const email = $("#authEmail").value.trim();
    const password = $("#authPassword").value;
    const name = $("#authName").value.trim();
    const isRegister = activeAuthMode === "register";
    if (isRegister && !name) {
      toast("注册时请先取一个吾圈昵称");
      return;
    }
    button.disabled = true;
    button.textContent = isRegister ? "注册中..." : "登录中...";
    try {
      const path = isRegister ? "/api/auth/register" : "/api/auth/login";
      const body = isRegister ? { email, password, name } : { email, password };
      const data = await serverRequest(path, {
        method: "POST",
        body: JSON.stringify(body),
      });
      saveAuth({ token: data.token || data.accessToken || "", user: data.user || null });
      saveUserProfile({
        id: data.user?.id || data.user?.wuquanId || userProfile.id,
        name: data.user?.name || data.user?.nickname || (isRegister ? name : userProfile.name),
        bio: data.user?.bio || userProfile.bio,
        avatar: data.user?.avatar || userProfile.avatar,
        wallpaper: data.user?.wallpaper || userProfile.wallpaper,
      }, false);
      $("#authName").value = "";
      $("#authPassword").value = "";
      await loadAccountDataFromServer();
      renderAll();
      showTab("feed");
      toast(isRegister ? "注册成功" : "登录成功");
    } catch (error) {
      toast(error.message || (isRegister ? "注册失败，请检查信息" : "登录失败，请检查邮箱和密码"));
    } finally {
      button.disabled = false;
      button.textContent = isRegister ? "注册" : "登录";
    }
  });

  $("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveUserProfile({
      name: $("#profileNameInput").value.trim() || "吾圈用户",
      bio: $("#profileBioInput").value.trim() || "今天也在认真生活",
    });
    renderAll();
    toast("个人资料已保存");
  });

  $("#logoutButton").addEventListener("click", () => {
    saveAuth({});
    chatMessages = {};
    renderAll();
    showTab("profile");
    toast("已退出登录");
  });

  $("#todayMoodPicker").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-today-mood]");
    if (!button) return;
    await setTodayMood(button.dataset.todayMood);
  });

  $("#friendMatchList").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-add-friend]");
    if (!button) return;
    await addHumanFriend(button.dataset.addFriend);
  });

  $("#humanFriendList").addEventListener("click", async (event) => {
    const stopButton = event.target.closest("[data-stop-friend]");
    if (stopButton) {
      await stopHumanFriend(stopButton.dataset.stopFriend);
      return;
    }
    const blockButton = event.target.closest("[data-block-friend]");
    if (blockButton) {
      await blockHumanFriend(blockButton.dataset.blockFriend);
      return;
    }
    const addButton = event.target.closest("[data-add-friend]");
    if (addButton) await addHumanFriend(addButton.dataset.addFriend);
  });

  $("#refreshFriendMatches").addEventListener("click", fetchFriendMatches);

  $("#avatarDialogChoices").addEventListener("click", (event) => {
    const button = event.target.closest("[data-avatar-index]");
    if (!button) return;
    saveUserProfile({ avatar: { type: "preset", index: Number(button.dataset.avatarIndex) } });
    renderAll();
    $("#avatarDialog").close();
  });

  $("#profileAvatar").addEventListener("click", () => {
    if (!authState.token) {
      showTab("profile");
      toast("请先登录吾圈账号");
      return;
    }
    $("#avatarDialog").showModal();
  });

  $("#closeAvatarDialog").addEventListener("click", () => $("#avatarDialog").close());
  $("#closeWallpaperDialog").addEventListener("click", () => $("#wallpaperDialog").close());

  $("#wallpaperDialogChoices").addEventListener("click", (event) => {
    const button = event.target.closest("[data-wallpaper-index]");
    if (!button) return;
    saveUserProfile({ wallpaper: { type: "preset", index: Number(button.dataset.wallpaperIndex) } });
    renderAll();
    $("#wallpaperDialog").close();
  });

  $("#changeWallpaperButton").addEventListener("click", () => {
    $("#wallpaperDialog").showModal();
  });

  $("#customAvatarInput").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const src = await resizeImageDataUrl(await readFileAsDataUrl(file), 512, 0.9);
    saveUserProfile({ avatar: { type: "custom", src } });
    event.target.value = "";
    renderAll();
    $("#avatarDialog").close();
    toast("头像已更新");
  });

  $("#customWallpaperInput").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const src = await resizeImageDataUrl(await readFileAsDataUrl(file), 1600, 0.86);
    saveUserProfile({ wallpaper: { type: "custom", src } });
    event.target.value = "";
    renderAll();
    $("#wallpaperDialog").close();
    toast("壁纸已更新");
  });

  $("#identityMode").addEventListener("click", (event) => {
    const button = event.target.closest("[data-identity-mode]");
    if (!button) return;
    saveUserProfile({
      publicIdentity: {
        ...(userProfile.publicIdentity || { species: "猫猫" }),
        mode: button.dataset.identityMode,
      },
    });
    renderAll();
  });

  $("#speciesSelect").addEventListener("change", (event) => {
    saveUserProfile({
      publicIdentity: {
        ...(userProfile.publicIdentity || { mode: "hidden" }),
        mode: "hidden",
        species: event.target.value,
      },
    });
    renderAll();
  });

  $("#themeToggle").addEventListener("click", () => {
    const current = loadJson(THEME_KEY, "pink");
    const index = THEMES.findIndex((theme) => theme.id === current);
    setTheme(THEMES[(index + 1) % THEMES.length].id);
  });

  document.addEventListener("click", (event) => {
    const emojiButton = event.target.closest(".emoji-bar button[data-emoji]");
    if (emojiButton) {
      const bar = emojiButton.closest(".emoji-bar");
      if (bar.dataset.replyEmoji) return;
      const target = document.getElementById(bar.dataset.emojiTarget);
      if (target) insertAtCursor(target, emojiButton.dataset.emoji);
    }
    const toggle = event.target.closest("[data-emoji-panel]");
    if (toggle) {
      const panel = document.getElementById(toggle.dataset.emojiPanel);
      panel?.classList.toggle("show");
    }
  });

  $("#exportData").addEventListener("click", exportData);
  $("#importData").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importBackup(file);
    event.target.value = "";
  });

  $("#feedFilters").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    activeFeedFilter = button.dataset.filter;
    activeCalendarDay = "";
    $$("#feedFilters button").forEach((item) => item.classList.toggle("active", item === button));
    renderTimeline();
  });

  $("#emotionCalendar").addEventListener("click", (event) => {
    const button = event.target.closest("[data-calendar-day]");
    if (!button) return;
    searchKeyword = "";
    $("#searchInput").value = "";
    activeFeedFilter = "all";
    activeCalendarDay = button.dataset.calendarDay;
    showTab("feed");
    const dayItems = diaries.filter((item) => dateKey(item.createdAt) === button.dataset.calendarDay);
    if (dayItems[0]) {
      expandedPosts.add(dayItems[0].id);
      toast(`${button.dataset.calendarDay} 有 ${dayItems.length} 个树洞`);
    }
    renderTimeline();
  });

  $("#searchInput").addEventListener("input", (event) => {
    searchKeyword = event.target.value.trim();
    renderTimeline();
  });

  $("#moodPicker").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-mood]");
    if (!button) return;
    activeMood = button.dataset.mood;
    $$("#moodPicker button").forEach((item) => item.classList.toggle("active", item === button));
  });

  $("#audiencePicker").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-audience]");
    if (!button) return;
    activeAudience = button.dataset.audience;
    $$("#audiencePicker button").forEach((item) => item.classList.toggle("active", item === button));
  });

  $("#petFilters").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activePetCategory = button.dataset.category;
    renderPetFilters();
    renderPets();
  });

  $("#petGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-open-chat]");
    if (!card) return;
    openChatWithPet(card.dataset.openChat);
  });

  $("#petGrid").addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const card = event.target.closest("[data-open-chat]");
    if (!card) return;
    event.preventDefault();
    openChatWithPet(card.dataset.openChat);
  });

  $("#companionInsights").addEventListener("click", (event) => {
    const chat = event.target.closest("[data-open-chat]");
    if (chat) {
      openChatWithPet(chat.dataset.openChat);
      return;
    }
    const action = event.target.closest("[data-profile-action]")?.dataset.profileAction;
    if (action === "showToday") {
      showTab("feed");
      toast("今日一句在首页卡片里");
    }
    if (action === "chatHint") toast("聊天消息旁边点 ⋯，或长按消息试试");
  });

  $("#chatBackButton").addEventListener("click", closeChatConversation);

  $("#chatForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = $("#chatInput");
    const text = input.value.trim();
    const images = [...chatDraftImages];
    if (!text && !images.length) return;
    input.value = "";
    chatDraftImages = [];
    renderChatImages();
    await sendChatMessage(text, images);
  });

  $("#chatImageInput").addEventListener("change", async (event) => {
    const files = event.target.files || [];
    const images = await readFilesAsDataUrls(files, 4 - chatDraftImages.length);
    if (files.length && !images.length) toast("最多发送 4 张图片");
    chatDraftImages.push(...images);
    renderChatImages();
    event.target.value = "";
  });

  $("#chatImagePreview").addEventListener("click", (event) => {
    const index = event.target.dataset.removeChatImage;
    if (index === undefined) return;
    chatDraftImages.splice(Number(index), 1);
    renderChatImages();
  });

  $("#chatPanel").addEventListener("contextmenu", (event) => {
    const message = event.target.closest("[data-message-id]");
    if (!message) return;
    event.preventDefault();
    showMessageMenu(message.dataset.messageId);
  });

  $("#chatPanel").addEventListener("click", (event) => {
    const chat = event.target.closest("[data-open-chat]");
    if (chat) {
      openChatWithPet(chat.dataset.openChat);
      return;
    }
    const button = event.target.closest("[data-message-menu]");
    if (!button) return;
    showMessageMenu(button.dataset.messageMenu);
  });

  let longPressTimer;
  $("#chatPanel").addEventListener("touchstart", (event) => {
    const message = event.target.closest("[data-message-id]");
    if (!message) return;
    longPressTimer = setTimeout(() => showMessageMenu(message.dataset.messageId), 520);
  }, { passive: true });
  $("#chatPanel").addEventListener("touchend", () => clearTimeout(longPressTimer));
  $("#chatPanel").addEventListener("touchmove", () => clearTimeout(longPressTimer));

  $("#timeline").addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    const action = button?.dataset.action;
    const card = event.target.closest(".post-card");
    if (!action || !card) return;
    if (action === "toggleText") {
      expandedPosts.has(card.dataset.id) ? expandedPosts.delete(card.dataset.id) : expandedPosts.add(card.dataset.id);
      renderTimeline();
    }
    if (action === "favorite") toggleFavorite(card.dataset.id);
    if (action === "replyComment") await addCommentReply(card.dataset.id, button.dataset.commentId);
    if (action === "detail") showDetail(card.dataset.id);
    if (action === "regenerate") await regenerateDiary(card.dataset.id);
    if (action === "unpublish") await unpublishPublicDiary(card.dataset.id);
    if (action === "report") await reportPublicItem(card.dataset.id, "diary");
    if (action === "delete" && confirm("确定删除这个私密树洞吗？")) deleteDiary(card.dataset.id);
  });

  $("#detailContent").addEventListener("click", async (event) => {
    const action = event.target.dataset.detailAction;
    const id = event.target.dataset.id;
    const diary = diaries.find((item) => item.id === id);
    if (!action) return;
    if (action === "openChat") {
      $("#detailDialog").close();
      openChatWithPet(event.target.dataset.petId);
      return;
    }
    if (!diary) return;
    if (action === "copy") {
      await navigator.clipboard?.writeText(diary.text);
      toast("文案已复制");
    }
    if (action === "regenerate") {
      $("#detailDialog").close();
      await regenerateDiary(id);
    }
    if (action === "replyComment") await addCommentReply(id, event.target.dataset.commentId);
  });

  $("#detailContent").addEventListener("click", async (event) => {
    const target = event.target.closest("[data-public-comment-action]");
    if (!target) return;
    const action = target.dataset.publicCommentAction;
    const postId = target.dataset.postId;
    const commentId = target.dataset.commentId;
    const userId = target.dataset.userId;
    const userName = target.dataset.userName || "该用户";
    if (action === "delete") await deletePublicComment(postId, commentId);
    if (action === "report") await reportPublicItem(commentId, "comment");
    if (action === "block") await blockUser(userId, userName);
  });

  document.addEventListener("submit", async (event) => {
    if (event.target.id !== "publicCommentForm") return;
    event.preventDefault();
    const input = $("#publicCommentInput");
    const text = input.value.trim();
    if (!text) return;
    const diaryId = $("#detailDialog").dataset.postId;
    if (!diaryId) return;
    await submitPublicComment(diaryId, text);
    input.value = "";
  });

  $("#imageInput").addEventListener("change", async (event) => {
    draftImages.push(...await readFilesAsDataUrls(event.target.files || [], 9 - draftImages.length));
    renderImages();
    event.target.value = "";
  });

  $("#imagePreview").addEventListener("click", (event) => {
    const index = event.target.dataset.removeImage;
    if (index === undefined) return;
    draftImages.splice(Number(index), 1);
    renderImages();
  });

  $("#clearImages").addEventListener("click", () => {
    draftImages = [];
    renderImages();
  });

  $("#composeForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = event.submitter;
    const text = $("#diaryText").value.trim();
    if (!text) return;
    button.disabled = true;
    button.textContent = "投递中...";
    const diary = createDiary(text, [...draftImages], activeMood, activeAudience);
    if (!diary) {
      button.disabled = false;
      button.textContent = "投进树洞";
      return;
    }
    $("#diaryText").value = "";
    draftImages = [];
    renderImages();
    button.disabled = false;
    button.textContent = "投进树洞";
    showTab("feed");
    toast(activeAudience === "public" ? "已投到公开树洞，小伙伴们也会赶来" : "投递成功，小伙伴们正在赶来");
  });

  $("#settingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    settings = normalizeSettings({
      serverUrl: $("#serverUrl").value.trim(),
      apiModel: $("#apiModel").value.trim(),
    });
    saveJson(SETTINGS_KEY, settings);
    renderProfile();
    toast("服务端设置已保存");
  });
}

function restoreTheme() {
  const saved = loadJson(THEME_KEY, "pink");
  setTheme(saved === "blue" ? "blue" : saved);
}

async function initApp() {
  enableNativeMode();
  bindEvents();
  restoreTheme();
  renderEmojiBars();
  if (authState.token) await loadAccountDataFromServer();
  renderAll();
  if (!authState.token) showTab("profile");
  maybeShowDailyGreeting();
}

initApp();
