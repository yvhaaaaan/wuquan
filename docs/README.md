# 吾圈部署与迁移调试备忘录

这份文档用来处理后续换 VPS、换应用服务器、更新代码、排查访问异常。当前结构是：

```text
用户浏览器 -> VPS Nginx 反向代理 -> 应用服务器 Node 服务
```

当前已知配置：

```text
域名：wuquan.cc.cd
VPS：38.47.102.54，只负责 Nginx 反向代理
应用服务器：101.42.103.204:5177，运行 wuquan Node 服务和数据库
Nginx 转发目标：http://101.42.103.204:5177
```

## 平时怎么更新

普通代码更新、前端页面更新、后端接口更新、数据库接口更新，都只需要更新应用服务器。

```bash
update-wuquan
```

如果没有 `update-wuquan`，手动执行：

```bash
cd /var/www/wuquan
git pull
npm install
sudo systemctl restart wuquan
```

这种情况不需要更新 VPS。

只有下面这些情况才需要改 VPS：

- 换域名
- 换应用服务器 IP
- 改 Nginx 配置
- 改 HTTPS 证书
- 改反向代理端口或转发目标

## 怎么判断现在是不是本机代理

如果你只是用 Xshell 登录 VPS 或应用服务器操作命令，关掉 Xshell 后网站仍然能访问，就说明不是本机代理。

systemd 服务和 Nginx 都跑在服务器上，不依赖你电脑上的 Xshell 窗口。

## 换 VPS 怎么办

换 VPS 时，应用服务器一般不用动。你只是在新 VPS 上重新配置 Nginx，让它继续转发到应用服务器。

1. 先把域名解析到新 VPS 的公网 IP。

在域名 DNS 里把：

```text
wuquan.cc.cd -> 新 VPS IP
```

2. 在新 VPS 安装 Nginx。

```bash
sudo apt update
sudo apt install -y nginx
```

3. 新建 Nginx 配置。

```bash
sudo nano /etc/nginx/sites-available/wuquan
```

内容示例：

```nginx
server {
    listen 80;
    server_name wuquan.cc.cd;

    location / {
        proxy_pass http://101.42.103.204:5177;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

4. 启用配置并重启 Nginx。

```bash
sudo ln -s /etc/nginx/sites-available/wuquan /etc/nginx/sites-enabled/wuquan
sudo nginx -t
sudo systemctl restart nginx
```

5. 如果要 HTTPS，重新申请证书。

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d wuquan.cc.cd
```

换 VPS 后，应用服务器不需要 `git pull`，除非你同时也更新了代码。

## 换应用服务器怎么办

换应用服务器时，VPS 的域名和证书可以不变，但 Nginx 的 `proxy_pass` 要改成新应用服务器 IP。

### 新应用服务器初始化

1. 安装基础依赖。

```bash
sudo apt update
sudo apt install -y git build-essential python3 make g++
```

2. 安装 Node.js。建议继续使用当前可运行的大版本。

3. 拉代码。

```bash
cd /var/www
git clone https://github.com/yvhaaaaan/wuquan.git
cd wuquan
npm install
```

如果 GitHub 在服务器上不稳定，可以用代理地址：

```bash
git clone https://gh-proxy.com/https://github.com/yvhaaaaan/wuquan.git
```

4. 配置环境变量。

生产环境至少需要：

```bash
PORT=5177
HOST=0.0.0.0
JWT_SECRET=换成一串足够长的随机字符串
AI_API_URL=你的 AI 接口地址
AI_API_KEY=你的服务端 AI 密钥
AI_MODEL=mimo-v2-omni
AI_REQUIRE_AUTH=1
```

密钥只放服务器环境变量，不嵌入前端。

5. 配置 systemd 服务。

可以参考仓库里的：

```text
deploy/wuquan.service.example
```

常见位置：

```bash
sudo nano /etc/systemd/system/wuquan.service
sudo systemctl daemon-reload
sudo systemctl enable wuquan
sudo systemctl restart wuquan
```

6. 检查应用服务。

```bash
curl -s http://127.0.0.1:5177/api/health
```

应该能看到服务状态，数据库正常时会显示 sqlite 相关信息。

### 迁移数据库

当前服务端数据在应用服务器上，默认目录通常是：

```text
/var/www/wuquan/.wuquan-data/
```

迁移应用服务器时，必须把这个目录一起复制到新服务器，否则用户、聊天、树洞、好友关系等服务端数据会丢。

旧服务器打包：

```bash
cd /var/www/wuquan
tar -czf /root/wuquan-data-backup.tar.gz .wuquan-data
```

复制到新服务器后解压：

```bash
cd /var/www/wuquan
tar -xzf /root/wuquan-data-backup.tar.gz
sudo systemctl restart wuquan
```

### 修改 VPS 转发目标

在 VPS 上改 Nginx：

```bash
sudo nano /etc/nginx/sites-available/wuquan
```

把旧的：

```nginx
proxy_pass http://101.42.103.204:5177;
```

改成：

```nginx
proxy_pass http://新应用服务器IP:5177;
```

然后：

```bash
sudo nginx -t
sudo systemctl restart nginx
```

换应用服务器后，VPS 需要改一次 Nginx；以后普通代码更新仍然只在应用服务器执行 `update-wuquan`。

## 验证链路

### 在应用服务器上验证 Node 服务

```bash
curl -s http://127.0.0.1:5177/api/health
```

如果这里失败，说明应用服务器服务本身没跑起来。

### 在 VPS 上验证反向代理到应用服务器

```bash
curl -i http://127.0.0.1
```

或者直接请求域名：

```bash
curl -i http://wuquan.cc.cd
```

如果应用服务器本地正常，但 VPS 访问失败，重点看 Nginx 配置、防火墙、应用服务器安全组。

### 在任意地方验证公网访问

```bash
curl -i https://wuquan.cc.cd
```

如果公网失败但 VPS 本机正常，重点看 DNS、证书、端口 80/443、安全组。

## 验证 AI 是否真的接通

先登录拿 token：

```bash
TOKEN=$(curl -s http://127.0.0.1:5177/api/auth/login -H "Content-Type: application/json" -d '{"email":"你的邮箱","password":"你的密码"}' | node -e "let s='';process.stdin.on('data',d=>s+=d);process.stdin.on('end',()=>console.log(JSON.parse(s).token||''))")
```

再测试 AI：

```bash
curl -i http://127.0.0.1:5177/api/ai/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"model":"mimo-v2-omni","messages":[{"role":"user","content":"只回复：AI已接通"}]}'
```

如果返回头里有：

```text
X-Wuquan-AI: provider
```

并且内容是 AI 返回的，就说明没有走本地兜底。

## 常见故障

### git pull 被 package-lock.json 卡住

如果提示：

```text
The following untracked working tree files would be overwritten by merge:
package-lock.json
```

说明服务器上有一个未被 Git 管理的同名文件。可以先备份再删除：

```bash
cd /var/www/wuquan
mv package-lock.json package-lock.json.bak
git pull
npm install
sudo systemctl restart wuquan
```

### npm install 失败，提示 g++ 不存在

```bash
sudo apt update
sudo apt install -y build-essential python3 make g++
npm config set registry https://registry.npmmirror.com
cd /var/www/wuquan
npm install
sudo systemctl restart wuquan
```

### GitHub 拉取失败

如果看到 TLS 或连接中断，可以临时用：

```bash
git pull https://gh-proxy.com/https://github.com/yvhaaaaan/wuquan.git master
```

或者把 remote 改成代理地址：

```bash
git remote set-url origin https://gh-proxy.com/https://github.com/yvhaaaaan/wuquan.git
git pull
```

### 页面没变

优先检查三件事：

1. 应用服务器是否真的拉到最新代码。

```bash
cd /var/www/wuquan
git log -1 --oneline
```

2. 服务是否重启。

```bash
sudo systemctl restart wuquan
```

3. 浏览器/PWA 缓存是否还在旧版本。

可以访问：

```text
https://wuquan.cc.cd/sw.js?v=当前版本号
```

如果 service worker 缓存太顽固，可以在浏览器里清除站点数据，或者等新的 `CACHE_NAME` 生效。

## 以后怎么判断要不要动 VPS

只改代码、页面、接口、数据库逻辑：

```text
只更新应用服务器：update-wuquan
VPS 不用动
```

改域名、证书、Nginx、代理目标、换应用服务器 IP：

```text
需要更新 VPS
应用服务器是否更新，看有没有代码变化
```

换 VPS：

```text
应用服务器通常不用动
新 VPS 配 Nginx + DNS + HTTPS
```

换应用服务器：

```text
新服务器部署代码和数据库
VPS 改 proxy_pass 到新应用服务器
```
