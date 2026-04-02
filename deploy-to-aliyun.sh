#!/bin/bash

# GWEB 项目阿里云一键部署脚本
# 作者：Assistant
# 使用方法：在阿里云服务器上执行 bash deploy.sh

set -e

echo "========================================="
echo "🚀 GWEB 项目阿里云一键部署"
echo "========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 配置
REPO_URL="https://github.com/vinamlau/GWEB.git"
DOMAIN="gcore.xin"
PORT=3001

echo -e "${BLUE}📋 部署信息:${NC}"
echo "  仓库：$REPO_URL"
echo "  域名：$DOMAIN"
echo "  端口：$PORT"
echo ""

# 检查是否以 root 运行
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}❌ 请使用 sudo 运行此脚本${NC}"
  echo "  执行：sudo bash deploy.sh"
  exit 1
fi

echo -e "${YELLOW}[1/10] 更新系统...${NC}"
apt update -y
apt upgrade -y

echo -e "${YELLOW}[2/10] 安装 Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
node -v
npm -v

echo -e "${YELLOW}[3/10] 安装 Git...${NC}"
apt install -y git
git --version

echo -e "${YELLOW}[4/10] 安装 Nginx...${NC}"
apt install -y nginx
systemctl start nginx
systemctl enable nginx

echo -e "${YELLOW}[5/10] 安装 PM2...${NC}"
npm install -g pm2
pm2 --version

echo -e "${YELLOW}[6/10] 克隆项目代码...${NC}"
cd /var/www
if [ -d "gweb" ]; then
  echo -e "${YELLOW}项目已存在，更新代码...${NC}"
  cd gweb
  git pull
else
  echo -e "${BLUE}克隆新代码...${NC}"
  git clone $REPO_URL gweb
  cd gweb
fi

echo -e "${YELLOW}[7/10] 安装前端依赖并构建...${NC}"
npm install
echo "构建前端..."
npm run build

echo -e "${YELLOW}[8/10] 安装后端依赖...${NC}"
cd server
npm install

# 创建 .env 文件
echo -e "${BLUE}创建环境配置...${NC}"
cat > .env << EOF
NODE_ENV=production
PORT=$PORT
JWT_SECRET=$(openssl rand -hex 32)
EOF

echo -e "${YELLOW}[9/10] 配置 Nginx...${NC}"
cat > /etc/nginx/sites-available/gweb << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # 前端静态文件
    location / {
        root /var/www/gweb/dist;
        try_files \$uri \$uri/ /index.html;
    }

    # 后端 API 代理
    location /api {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # 上传文件
    location /uploads {
        alias /var/www/gweb/server/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# 启用配置
ln -sf /etc/nginx/sites-available/gweb /etc/nginx/sites-enabled/gweb
echo "测试 Nginx 配置..."
nginx -t
echo "重启 Nginx..."
systemctl restart nginx

echo -e "${YELLOW}[10/10] 启动后端服务...${NC}"
cd /var/www/gweb/server
pm2 delete gweb-api 2>/dev/null || true
pm2 start server-sqlite.js --name gweb-api
pm2 save
pm2 startup | tail -1 | bash

# 完成
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ 部署完成！${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${BLUE}📌 访问地址：${NC}"
echo "  前台：http://$DOMAIN"
echo "  后台：http://$DOMAIN/admin/login"
echo ""
echo -e "${BLUE}🔐 管理员账户：${NC}"
echo "  邮箱：admin@example.com"
echo "  密码：admin123456"
echo ""
echo -e "${BLUE}🔧 常用命令：${NC}"
echo "  查看状态：pm2 status"
echo "  查看日志：pm2 logs gweb-api"
echo "  重启服务：pm2 restart gweb-api"
echo "  Nginx 状态：systemctl status nginx"
echo ""
echo -e "${YELLOW}⚠️  下一步：${NC}"
echo "  1. 修改管理员密码"
echo "  2. 配置域名 DNS 解析"
echo "  3. 安装 SSL 证书（推荐）"
echo ""
echo -e "${GREEN}祝您使用愉快！${NC}"
