#!/bin/bash

echo "🔐 MongoDB Atlas 快速配置工具 (CLI 方式)"
echo "======================================"
echo ""

# 检查是否已安装 mongocli/atlascli
if command -v mongocli &> /dev/null; then
    CLI_CMD="mongocli"
elif command -v atlascli &> /dev/null; then
    CLI_CMD="atlascli"
else
    echo "❌ 未找到 MongoDB CLI 工具"
    echo ""
    echo "请先安装 MongoDB Atlas CLI:"
    echo ""
    echo "方法 1 - 使用 Homebrew (推荐):"
    echo "  brew tap mongodb/brew"
    echo "  brew install mongodb-atlas"
    echo ""
    echo "方法 2 - 直接下载:"
    echo "  访问 https://www.mongodb.com/docs/atlas/cli/stable/install-atlas-cli/"
    echo ""
    echo "安装完成后重新运行此脚本"
    exit 1
fi

echo "✓ 检测到 MongoDB CLI: $CLI_CMD"
echo ""

# 登录
echo "📝 步骤 1: 登录 MongoDB Atlas"
echo "----------------------------"
echo "将打开浏览器让你登录..."
echo ""
read -p "按回车键继续..."
$CLI_CMD auth login

# 检查是否登录成功
if ! $CLI_CMD auth whoami &> /dev/null; then
    echo "❌ 登录失败"
    exit 1
fi

echo ""
echo "✓ 登录成功!"
echo ""

# 创建集群
echo "🏗️  步骤 2: 创建免费集群"
echo "----------------------------"
echo ""
echo "集群配置:"
echo "  - 名称：gweb-cluster"
echo "  - 提供商：AWS"
echo "  - 区域：ap-southeast-1 (新加坡)"
echo "  - 套餐：M0 (免费)"
echo ""
read -p "按回车键创建集群..."

$CLI_CMD clusters create gweb-cluster \
  --provider AWS \
  --region ap-southeast-1 \
  --tier M0 \
  --mdbVersion 7.0

echo ""
echo "⏱️  集群创建中... (大约需要 3-5 分钟)"
echo ""

# 创建数据库用户
echo "👤 步骤 3: 创建数据库用户"
echo "----------------------------"
echo ""
echo "请输入数据库用户密码:"
read -sp "密码：" DB_PASSWORD
echo ""

if [ -z "$DB_PASSWORD" ]; then
    echo "❌ 密码不能为空"
    exit 1
fi

$CLI_CMD dbusers create \
  --username gweb_admin \
  --password "$DB_PASSWORD" \
  --role readWriteAnyDatabase

echo ""
echo "✓ 数据库用户已创建"
echo ""

# 配置网络访问
echo "🌐 步骤 4: 配置网络访问"
echo "----------------------------"
echo ""
echo "允许所有 IP 访问 (开发/测试用)"
read -p "按回车键继续..."

$CLI_CMD accessList create 0.0.0.0/0 --type ipAddress

echo ""
echo "✓ 网络访问已配置"
echo ""

# 等待集群创建完成
echo "⏳ 等待集群创建完成..."
echo ""

while true; do
    STATE=$($CLI_CMD clusters describe gweb-cluster --output json 2>/dev/null | grep -o '"state":"[^"]*"' | cut -d'"' -f4)
    if [ "$STATE" = "IDLE" ]; then
        echo "✓ 集群已就绪!"
        break
    else
        echo "  当前状态：$STATE (等待中...)"
        sleep 30
    fi
done

echo ""

# 获取连接字符串
echo "🔗 步骤 5: 获取连接字符串"
echo "----------------------------"
echo ""

CONNECTION_STRING=$($CLI_CMD clusters connectionStrings describe gweb-cluster --output json 2>/dev/null | grep -o '"standardSrv":"[^"]*"' | cut -d'"' -f4)

if [ -z "$CONNECTION_STRING" ]; then
    echo "❌ 获取连接字符串失败"
    exit 1
fi

echo "连接字符串:"
echo "$CONNECTION_STRING"
echo ""

# 更新配置文件
echo "📝 步骤 6: 更新配置文件"
echo "----------------------------"
echo ""

# 替换用户名和密码
FINAL_CONNECTION_STRING=$(echo "$CONNECTION_STRING" | sed "s/<password>/$DB_PASSWORD/")

# 添加数据库名
FINAL_CONNECTION_STRING="${FINAL_CONNECTION_STRING%/?*}/gweb_cms?retryWrites=true&w=majority"

echo "更新 server/.env 文件..."

cat > server/.env << EOF
# 服务器端口
PORT=3001

# MongoDB 连接字符串
MONGODB_URI=$FINAL_CONNECTION_STRING

# JWT 密钥
JWT_SECRET=$(grep "JWT_SECRET=" server/.env | cut -d '=' -f 2)

# 运行环境
NODE_ENV=development

# 文件上传路径
UPLOAD_PATH=./uploads

# 最大文件大小 (5MB)
MAX_FILE_SIZE=5242880
EOF

echo "✓ 配置文件已更新"
echo ""

# 显示配置
echo "📋 配置摘要"
echo "----------------------------"
echo "集群名称：gweb-cluster"
echo "数据库用户：gweb_admin"
echo "数据库名称：gweb_cms"
echo ""
echo "MongoDB URI:"
echo "$FINAL_CONNECTION_STRING"
echo ""

# 初始化数据库
echo "🗄️  步骤 7: 初始化数据库"
echo "----------------------------"
echo ""
read -p "按回车键运行初始化脚本..."

cd server
npm run seed

echo ""

# 完成
echo "=============================="
echo "✅ MongoDB Atlas 配置完成!"
echo "=============================="
echo ""
echo "下一步:"
echo "1. 启动后端服务器：npm run dev"
echo "2. 访问管理后台：http://localhost:5173/admin/login"
echo "3. 使用测试账户登录：admin@example.com / admin123456"
echo ""
