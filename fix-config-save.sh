#!/bin/bash

echo "=========================================="
echo "🔧 修复站点配置无法保存的问题"
echo "=========================================="
echo ""

cd /var/www/gweb/server

echo "📝 检查 .env 文件..."
if [ ! -f .env ]; then
    echo "创建 .env 文件..."
    echo "JWT_SECRET=gcore_xin_super_secret_key_2026_victor" > .env
    echo "NODE_ENV=production" >> .env
    echo "PORT=3001" >> .env
    echo "✅ .env 文件已创建"
else
    echo "✅ .env 文件已存在"
    cat .env
fi

echo ""
echo "🔄 重启 PM2 服务..."
pm2 restart gweb-backend --update-env
sleep 3

echo ""
echo "📊 服务状态："
pm2 status gweb-backend

echo ""
echo "📋 最近日志（最后 30 行）："
pm2 logs gweb-backend --lines 30 --nostream

echo ""
echo "=========================================="
echo "✅ 修复完成！"
echo "=========================================="
echo ""
echo "📝 现在可以访问："
echo "   后台：http://gcore.xin/admin/login"
echo "   账户：admin@example.com"
echo "   密码：admin123456"
echo ""
echo "⚠️  重要提示："
echo "   请清除浏览器缓存并强制刷新页面！"
echo "   Windows: Ctrl + Shift + R"
echo "   Mac: Cmd + Shift + R"
echo ""
