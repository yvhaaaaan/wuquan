# 吾圈 H5 部署说明

这是一个纯静态 H5/PWA 项目，不需要前端构建命令，也不需要 Node.js 服务端。

## 需要上传的文件

把项目根目录下这些内容上传到服务器网站根目录：

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `assets/`

不要只上传 `index.html`，否则头像、图标、样式和离线缓存会缺失。

## 推荐部署方式

### Nginx

1. 把项目文件上传到服务器目录，例如：

```text
/var/www/wuquan
```

2. 参考 `deploy/nginx.conf.example` 配置站点。

3. 检查并重载 Nginx：

```bash
nginx -t
systemctl reload nginx
```

### Apache

1. 把项目文件上传到服务器站点目录。

2. 如果使用 Apache，可把 `deploy/apache.htaccess.example` 的内容复制成网站根目录下的 `.htaccess`。

## PWA 注意事项

- 如果只是普通 H5 访问，HTTP 也能打开页面。
- 如果要支持“添加到主屏幕”、Service Worker 离线缓存，线上域名需要 HTTPS。
- 更新 `app.js`、`styles.css`、图片或图标后，建议同步修改 `sw.js` 里的 `CACHE_NAME`，例如从 `wuquan-app-v2` 改成 `wuquan-app-v3`，避免用户浏览器继续使用旧缓存。

## API 注意事项

页面里的日记数据默认保存在用户浏览器本地 `localStorage`。只有用户使用 AI 回声或萌宠聊天时，才会请求页面设置中的 AI API。

