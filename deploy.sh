#!/bin/bash

# 部署脚本 - 用于自动部署到阿里云服务器

echo "🚀 开始部署到阿里云服务器..."

# 前端构建
echo "📦 正在构建前端..."
npm run build

# 检查是否构建成功
if [ $? -ne 0 ]; then
    echo "❌ 前端构建失败！"
    exit 1
fi

echo "✅ 前端构建完成"

# SSH 连接到服务器并部署
echo "🔌 正在连接服务器..."
ssh root@gcore.xin << 'ENDSSH'
cd /root/GWEB

echo "📥 正在拉取最新代码..."
git pull origin main

echo "📦 正在安装后端依赖..."
cd server
npm install --production

echo "🔄 正在重启后端服务..."
pm2 restart gweb-backend

echo "⏳ 等待服务启动..."
sleep 3

echo "✅ 后端服务已重启"

echo "📊 查看服务状态..."
pm2 status gweb-backend

echo "🎉 部署完成！"
ENDSSH

if [ $? -eq 0 ]; then
    echo "✅ 部署成功！"
else
    echo "❌ 部署失败，请检查错误信息"
    exit 1
fi
