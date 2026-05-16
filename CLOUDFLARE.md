# 吾圈 Cloudflare CDN 免费部署方案

这个方案不需要 VPS，也不需要中国大陆 ICP 备案。前端由 Cloudflare Pages 托管在全球 CDN，`/api/*` 由 Cloudflare Pages Functions 处理。

## 适合什么场景

- 学生作业演示
- 小规模原型
- 不想买服务器
- 不想走备案

注意：这不是正式大规模运营架构。当前数据默认放在 Cloudflare KV 的一个 `db` 键里，适合作业和小流量 MVP；用户多了以后应迁移到 D1、Supabase、PostgreSQL 等数据库。

## 文件结构

Cloudflare 需要这些文件：

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `_routes.json`
- `assets/`
- `functions/api/[[path]].js`

`functions/api/[[path]].js` 是 Cloudflare 版后端，提供注册、登录、资料、公开树洞、评论、好友匹配、举报、拉黑和 AI 代理。

## 部署步骤

### 1. 创建 Cloudflare Pages 项目

进入 Cloudflare Dashboard：

```text
Workers & Pages -> Create -> Pages
```

你可以选择：

- 连接 Git 仓库部署
- 或者 Direct Upload 直接上传当前项目文件夹

构建设置：

```text
Build command: 留空
Build output directory: /
```

如果页面要求输出目录，可以填：

```text
.
```

### 2. 创建 KV

进入：

```text
Workers & Pages -> KV
```

创建一个 KV namespace，例如：

```text
wuquan-kv
```

然后在 Pages 项目里绑定：

```text
Settings -> Functions -> KV namespace bindings
Variable name: WUQUAN_KV
KV namespace: wuquan-kv
```

变量名必须是 `WUQUAN_KV`。

### 3. 设置环境变量

进入 Pages 项目：

```text
Settings -> Environment variables
```

至少设置：

```text
JWT_SECRET=一串长随机字符串
AI_API_URL=https://你的AI服务/v1/chat/completions
AI_API_KEY=你的服务端AI密钥
AI_MODEL=mimo-v2-omni
AI_REQUIRE_AUTH=1
```

没有 AI key 也能打开页面，后端会返回本地 fallback 回复，但真正 AI 效果需要配置 `AI_API_KEY`。

### 4. 绑定域名

Pages 项目里添加自定义域名：

```text
wuquan.art
```

按 Cloudflare 提示把 DNS 接过去。因为是 Cloudflare 海外 CDN/边缘服务，不走中国大陆服务器备案路线。

### 5. 检查接口

上线后打开：

```text
https://你的域名/api/health
```

看到类似下面内容就说明 API 正常：

```json
{
  "ok": true,
  "runtime": "cloudflare-pages-functions",
  "kvConfigured": true
}
```

## 重要限制

- 不要用腾讯云中国大陆 CDN，不备案会被卡。
- Cloudflare KV 是轻量存储，适合小作业，不适合大量图片和高并发写入。
- 用户自定义头像/壁纸如果都是 base64，数据会变大；作业可以，正式版要接对象存储。
- 如果没有绑定 `WUQUAN_KV`，后端会使用临时内存，冷启动后数据可能丢失。
