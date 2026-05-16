# 吾圈后端部署说明

这个版本带了配套后端：`server.mjs`。它用 Node.js 内置模块实现 API 服务，同时托管 H5 前端，不需要安装 npm 依赖。

## 本地启动

```bash
node server.mjs
```

默认访问：

```text
http://localhost:5177
```

健康检查：

```text
http://localhost:5177/api/health
```

## 服务器环境变量

正式部署建议至少配置：

```bash
PORT=5177
HOST=0.0.0.0
JWT_SECRET=换成一串足够长的随机字符串
AI_API_URL=https://你的AI服务/v1/chat/completions
AI_API_KEY=你的服务端AI密钥
AI_MODEL=mimo-v2-omni
```

可选配置：

```bash
WUQUAN_DB_FILE=/var/lib/wuquan/db.json
CORS_ORIGIN=https://wuquan.art
AI_REQUIRE_AUTH=1
```

`AI_API_KEY` 只在服务器环境变量里保存，前端不会再保存或暴露密钥。

## 已提供的 API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/user/me`
- `PATCH /api/user/me`
- `POST /api/ai/chat/completions`
- `GET /api/diaries/public`
- `POST /api/diaries/public`
- `DELETE /api/diaries/public/:id`
- `POST /api/diaries/public/:id/comments`
- `DELETE /api/diaries/public/:id/comments/:commentId`
- `GET /api/friends`
- `POST /api/friends/match`
- `POST /api/friends`
- `DELETE /api/friends/:friendId`
- `POST /api/reports`
- `POST /api/blocks`

## 数据保存

默认数据文件在：

```text
.wuquan-data/db.json
```

生产环境建议用 `WUQUAN_DB_FILE` 放到服务器持久化目录，并定期备份。当前版本是轻量 JSON 存储，适合小规模 MVP；用户量变大后建议迁移到 PostgreSQL、MySQL 或 SQLite。

## Nginx 反向代理示例

Node 后端运行在本机 `5177` 端口时，Nginx 可以这样转发：

```nginx
server {
    listen 80;
    server_name wuquan.art www.wuquan.art;

    location / {
        proxy_pass http://127.0.0.1:5177;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

上线 HTTPS 后，把 `http://` 换成证书对应的 `https://wuquan.art` 访问即可。

## 备案怎么处理

如果服务器在中国大陆，`wuquan.art` 正式对外访问前通常需要做 ICP 备案。流程一般是：购买大陆云服务器、在云厂商备案系统提交主体资料和网站信息、按要求核验、等待管局审核。

如果服务器在香港、澳门、台湾或海外，通常不需要也不能做工信部 ICP 备案，但国内访问速度和稳定性要看线路质量。想先快速上线测试，可以先放香港或新加坡；想长期面向大陆用户稳定访问，再走大陆服务器备案。
