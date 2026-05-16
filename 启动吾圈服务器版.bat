@echo off
setlocal
cd /d "%~dp0"
if "%PORT%"=="" set PORT=5177
node server.mjs
pause
