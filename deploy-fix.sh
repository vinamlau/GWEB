#!/bin/bash

# 快速部署脚本 - 修复 e.map is not a function 错误

echo "======================================"
echo "🚀 开始部署修复到阿里云服务器"
echo "======================================"
echo ""

# 1. 前端构建
echo "📦 步骤 1/3: 构建前端..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 前端构建失败！"
    exit 1
fi
echo "✅ 前端构建完成"
echo ""

# 2. 提交并推送代码
echo "📤 步骤 2/3: 推送代码到 GitHub..."
git add .
git commit -m "deploy: 自动部署修复 e.map 错误" || echo "没有新的更改需要提交"
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ 推送失败！"
    exit 1
fi
echo "✅ 代码已推送到 GitHub"
echo ""

# 3. SSH 部署说明
echo "======================================"
echo "📋 步骤 3/3: 请在服务器上执行以下命令"
echo "======================================"
echo ""
echo "1. SSH 登录服务器："
echo "   ssh root@gcore.xin"
echo "   密码：Vicnan888."
echo ""
echo "2. 在服务器上执行："
echo "   cd /root/GWEB"
echo "   git pull origin main"
echo "   cd server"
echo "   npm install --production"
echo "   pm2 restart gweb-backend"
echo "   pm2 logs gweb-backend --lines 50"
echo ""
echo "======================================"
echo "✅ 本地部署准备完成！"
echo "======================================"
echo ""
echo "💡 提示：修复了以下问题："
echo "   - 认证中间件从 MongoDB 改为 SQLite"
echo "   - 所有后台页面的错误处理"
echo "   - Logo 和 Favicon 上传功能"
echo ""
