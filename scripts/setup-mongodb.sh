#!/bin/bash

echo "🔐 GWEB CMS MongoDB 配置向导"
echo "============================"
echo ""

# 生成强随机 JWT_SECRET
echo "生成安全密钥..."
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
echo "✓ JWT_SECRET 已生成"

# 更新 server/.env
echo ""
echo "更新配置文件..."

cat > server/.env << EOF
# 服务器端口
PORT=3001

# MongoDB 连接字符串
# ⚠️ 请将下面的连接字符串替换为你的 MongoDB Atlas 连接字符串
# 格式：mongodb+srv://用户名:密码@集群地址/gweb_cms?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://gweb_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/gweb_cms?retryWrites=true&w=majority

# JWT 密钥 (已自动生成)
JWT_SECRET=$JWT_SECRET

# 运行环境
NODE_ENV=development

# 文件上传路径
UPLOAD_PATH=./uploads

# 最大文件大小 (5MB)
MAX_FILE_SIZE=5242880
EOF

echo "✓ server/.env 已更新"

# 显示配置说明
echo ""
echo "============================"
echo "📋 接下来你需要:"
echo "============================"
echo ""
echo "1️⃣ 访问 https://cloud.mongodb.com 创建 MongoDB Atlas 账户"
echo ""
echo "2️⃣ 创建免费集群:"
echo "   - 选择 FREE 套餐 (M0)"
echo "   - 选择 AWS - Singapore 或 Tokyo"
echo ""
echo "3️⃣ 创建数据库用户:"
echo "   - Username: gweb_admin"
echo "   - Password: (保存好生成的密码)"
echo ""
echo "4️⃣ 配置网络访问:"
echo "   - 允许所有 IP (0.0.0.0/0)"
echo ""
echo "5️⃣ 获取连接字符串并替换 server/.env 中的:"
echo "   mongodb+srv://gweb_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/gweb_cms?retryWrites=true&w=majority"
echo ""
echo "6️⃣ 运行初始化脚本:"
echo "   cd server"
echo "   npm run seed"
echo ""
echo "7️⃣ 启动后端:"
echo "   npm run dev"
echo ""
echo "============================"
echo "✅ 配置完成!"
echo "============================"
echo ""
echo "💡 提示：详细的 MongoDB Atlas 配置指南请查看 MONGODB_ATLAS_SETUP.md"
echo ""
