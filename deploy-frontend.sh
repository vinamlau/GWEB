#!/bin/bash

echo "=========================================="
echo "🚀 前端构建并部署到阿里云"
echo "=========================================="
echo ""

# 1. 构建前端
echo "📦 正在构建前端..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败！"
    exit 1
fi
echo "✅ 构建完成"
echo ""

# 2. 上传到服务器
echo "📤 正在上传到阿里云服务器..."
scp -r dist root@gcore.xin:/var/www/gweb/

if [ $? -ne 0 ]; then
    echo "❌ 上传失败！"
    exit 1
fi
echo "✅ 上传完成"
echo ""

# 3. 验证部署
echo "🔍 验证部署..."
response=$(curl -s "http://gcore.xin" | grep -o "<title>.*</title>")
if [ -n "$response" ]; then
    echo "✅ 网站访问正常"
    echo "   $response"
else
    echo "❌ 网站访问失败"
    exit 1
fi
echo ""

echo "=========================================="
echo "✅ 前端部署完成！"
echo "=========================================="
echo ""
echo "📝 访问地址："
echo "   前台：http://gcore.xin"
echo "   后台：http://gcore.xin/admin/login"
echo ""
echo "⚠️  重要提示："
echo "   请清除浏览器缓存并强制刷新页面！"
echo "   Windows: Ctrl + Shift + R"
echo "   Mac: Cmd + Shift + R"
echo ""
