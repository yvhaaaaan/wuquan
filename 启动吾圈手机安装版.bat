@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo.
echo 吾圈手机安装版已启动
echo.
echo 电脑本机访问：
echo   http://localhost:5177
echo.
echo 如果手机和电脑在同一个 Wi-Fi：
echo   先查看本机 IPv4 地址，再用手机打开 http://你的IPv4:5177
echo.
echo 打开后：
echo   Android Chrome：菜单 -> 添加到主屏幕 / 安装应用
echo   iPhone Safari：分享 -> 添加到主屏幕
echo.
python -m http.server 5177
pause
