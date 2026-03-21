#!/bin/bash

# GWEB 一键部署到 Vercel 脚本

echo "🚀 GWEB 部署脚本"
echo "================"
echo ""

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null
then
    echo "⚠️  Vercel CLI 未安装，正在安装..."
    npm i -g vercel
fi

# 检查是否已登录
echo "📝 检查 Vercel 登录状态..."
if ! vercel whoami &> /dev/null
then
    echo "🔐 请登录 Vercel..."
    vercel login
fi

# 切换目录
cd "$(dirname "$0")"

echo ""
echo "📦 开始部署到 Vercel..."
echo ""

# 部署
vercel --prod

echo ""
echo "✅ 部署完成！"
echo ""
echo "📊 项目信息:"
echo "   - GitHub: https://github.com/vinamlau/GWEB"
echo "   - Vercel Dashboard: https://vercel.com/vinamlau/gweb"
echo ""
