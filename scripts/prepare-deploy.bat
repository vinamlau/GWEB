@echo off
REM 部署准备脚本 (Windows)

echo.
echo 🔐 GWEB CMS 部署准备脚本
echo ========================
echo.

REM 检查 Node.js 版本
echo 检查 Node.js 版本...
node -v
echo ✓ Node.js 已安装
echo.

REM 检查依赖
echo 检查依赖...
if not exist "node_modules" (
  echo 安装前端依赖...
  call npm install
) else (
  echo ✓ 前端依赖已安装
)

if not exist "server\node_modules" (
  echo 安装后端依赖...
  cd server
  call npm install
  cd ..
) else (
  echo ✓ 后端依赖已安装
)

REM 检查 .env 文件
echo.
echo 检查环境配置...
if not exist ".env" (
  echo ⚠️  发现 .env 文件不存在，从示例创建...
  copy .env.example .env
  echo 请编辑 .env 文件，设置正确的配置
) else (
  echo ✓ .env 文件存在
)

if not exist "server\.env" (
  echo ⚠️  发现 server\.env 文件不存在，从示例创建...
  copy server\.env.example server\.env
  echo 请编辑 server\.env 文件，设置正确的配置
) else (
  echo ✓ server\.env 文件存在
)

REM 构建前端
echo.
echo 构建前端...
call npm run build

if %ERRORLEVEL% EQU 0 (
  echo ✓ 前端构建成功
) else (
  echo ❌ 前端构建失败
  exit /b 1
)

REM 显示部署检查清单
echo.
echo ================================
echo ✅ 部署准备完成!
echo ================================
echo.
echo 📋 部署前检查清单:
echo.
echo 数据库配置:
echo   [ ] 已创建 MongoDB Atlas 账户
echo   [ ] 已获取 MongoDB 连接字符串
echo   [ ] 已更新 server\.env 中的 MONGODB_URI
echo.
echo 环境变量:
echo   [ ] JWT_SECRET 已生成并更新
echo   [ ] MongoDB URI 已配置
echo   [ ] NODE_ENV 设置为 production
echo.
echo Vercel 配置:
echo   [ ] 已安装 Vercel CLI (npm i -g vercel)
echo   [ ] 已登录 Vercel (vercel login)
echo   [ ] 已在 Vercel Dashboard 设置环境变量
echo.
echo 对象存储 (可选):
echo   [ ] 已注册 Cloudinary
echo   [ ] 已安装 cloudinary 包 (npm install cloudinary)
echo   [ ] 已配置 Cloudinary 环境变量
echo.
echo ================================
echo.
echo 下一步操作:
echo 1. 配置 MongoDB Atlas (如果还未配置)
echo 2. 运行：vercel --prod 部署到 Vercel
echo 3. 测试所有功能
echo.
echo 详细文档：DEPLOY_GUIDE.md
echo.
