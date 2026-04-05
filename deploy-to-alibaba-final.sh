#!/bin/bash

echo "=========================================="
echo "🚀 阿里云服务器部署脚本"
echo "=========================================="
echo ""

# 服务器配置
SERVER_USER="root"
SERVER_HOST="gcore.xin"
PROJECT_DIR="/var/www/gweb"

echo "📂 项目目录：$PROJECT_DIR"
echo ""

# 1. 拉取最新代码
echo "📥 正在拉取最新代码..."
ssh ${SERVER_USER}@${SERVER_HOST} "cd $PROJECT_DIR && git config --global --add safe.directory $PROJECT_DIR && git pull origin main"

if [ $? -ne 0 ]; then
    echo "❌ 代码拉取失败！"
    exit 1
fi
echo "✅ 代码拉取成功"
echo ""

# 2. 安装后端依赖
echo "📦 正在安装后端依赖..."
ssh ${SERVER_USER}@${SERVER_HOST} "cd $PROJECT_DIR/server && npm install --omit=dev"

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败！"
    exit 1
fi
echo "✅ 依赖安装完成"
echo ""

# 3. 重启后端服务
echo "🔄 正在重启后端服务..."
ssh ${SERVER_USER}@${SERVER_HOST} "
cd $PROJECT_DIR
pm2 stop gweb-backend 2>/dev/null || true
pm2 delete gweb-backend 2>/dev/null || true
pm2 start server/server-sqlite.js --name gweb-backend
pm2 save
"

echo "✅ 后端服务已重启"
echo ""

# 4. 显示服务状态
echo "📊 服务状态："
ssh ${SERVER_USER}@${SERVER_HOST} "pm2 status gweb-backend"
echo ""

# 5. 显示最近的日志
echo "📋 最近日志（最后 20 行）："
ssh ${SERVER_USER}@${SERVER_HOST} "pm2 logs gweb-backend --lines 20 --nostream"
echo ""

echo "=========================================="
echo "✅ 部署完成！"
echo "=========================================="
echo ""
echo "📝 访问地址："
echo "   前台：http://gcore.xin"
echo "   后台：http://gcore.xin/admin/login"
echo ""
echo "🔑 管理员账户："
echo "   邮箱：admin@example.com"
echo "   密码：admin123456"
echo ""
echo "⚠️  重要提示："
echo "   请清除浏览器缓存并强制刷新页面！"
echo "   Windows: Ctrl + Shift + R"
echo "   Mac: Cmd + Shift + R"
echo ""
