#!/bin/bash

echo "=========================================="
echo "🚀 阿里云服务器部署脚本"
echo "=========================================="
echo ""

# 1. 查找项目目录
echo "📂 正在查找项目目录..."
PROJECT_DIR=""
if [ -d "/root/GWEB" ]; then
    PROJECT_DIR="/root/GWEB"
    echo "✓ 找到项目目录：/root/GWEB"
elif [ -d "/root/gweb" ]; then
    PROJECT_DIR="/root/gweb"
    echo "✓ 找到项目目录：/root/gweb"
elif [ -d "/home/www/GWEB" ]; then
    PROJECT_DIR="/home/www/GWEB"
    echo "✓ 找到项目目录：/home/www/GWEB"
elif [ -d "/var/www/GWEB" ]; then
    PROJECT_DIR="/var/www/GWEB"
    echo "✓ 找到项目目录：/var/www/GWEB"
else
    echo "❌ 未找到项目目录，请手动指定"
    echo "提示：使用 'find / -name \"GWEB\" -type d' 查找"
    exit 1
fi

cd $PROJECT_DIR

# 2. 拉取最新代码
echo ""
echo "📥 正在拉取最新代码..."
git config --global --add safe.directory $PROJECT_DIR
git pull origin main

if [ $? -ne 0 ]; then
    echo "❌ 代码拉取失败！"
    exit 1
fi
echo "✅ 代码拉取成功"

# 3. 安装后端依赖
echo ""
echo "📦 正在安装后端依赖..."
cd $PROJECT_DIR/server
npm install --omit=dev

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败！"
    exit 1
fi
echo "✅ 依赖安装完成"

# 4. 重启后端服务
echo ""
echo "🔄 正在重启后端服务..."

# 检查 PM2 是否已安装
if ! command -v pm2 &> /dev/null; then
    echo "⚠️  PM2 未安装，正在安装..."
    npm install -g pm2
fi

# 停止旧服务
pm2 stop gweb-backend 2>/dev/null || true
pm2 delete gweb-backend 2>/dev/null || true

# 启动新服务
pm2 start server/server-sqlite.js --name gweb-backend
pm2 save

echo "✅ 后端服务已重启"

# 5. 显示服务状态
echo ""
echo "📊 服务状态："
pm2 status gweb-backend

# 6. 显示最近的日志
echo ""
echo "📋 最近日志（最后 20 行）："
pm2 logs gweb-backend --lines 20 --nostream

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
