#!/bin/bash

# 阿里云 ECS 一键部署脚本
# 使用方法：bash deploy.sh

set -e

echo "🚀 开始部署 GWEB 项目..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否以 root 运行
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}请使用 sudo 运行此脚本${NC}"
  exit 1
fi

# 1. 更新系统
echo -e "${YELLOW}[1/8] 更新系统...${NC}"
apt update && apt upgrade -y

# 2. 安装 Node.js
echo -e "${YELLOW}[2/8] 安装 Node.js...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 3. 安装 Git
echo -e "${YELLOW}[3/8] 安装 Git...${NC}"
apt install -y git

# 4. 安装 Nginx
echo -e "${YELLOW}[4/8] 安装 Nginx...${NC}"
apt install -y nginx

# 5. 安装 PM2
echo -e "${YELLOW}[5/8] 安装 PM2...${NC}"
npm install -g pm2

# 6. 克隆项目
echo -e "${YELLOW}[6/8] 克隆项目代码...${NC}"
mkdir -p /var/www
cd /var/www

# 询问 Git 仓库地址
read -p "请输入 Git 仓库地址：" REPO_URL
if [ -z "$REPO_URL" ]; then
  echo -e "${RED}Git 仓库地址不能为空${NC}"
  exit 1
fi

git clone $REPO_URL gweb
cd gweb

# 7. 安装依赖
echo -e "${YELLOW}[7/8] 安装依赖...${NC}"

# 前端
npm install
npm run build

# 后端
cd server
npm install

# 创建 .env 文件
echo -e "${YELLOW}创建环境配置文件...${NC}"
read -p "请输入服务器 IP 或域名：" DOMAIN
cat > .env << EOF
NODE_ENV=production
PORT=3001
JWT_SECRET=$(openssl rand -hex 32)
EOF

cd /var/www/gweb

# 8. 配置 Nginx
echo -e "${YELLOW}[8/8] 配置 Nginx...${NC}"
cat > /etc/nginx/sites-available/gweb << EOF
server {
    listen 80;
    server_name $DOMAIN;

    # 前端静态文件
    location / {
        root /var/www/gweb/dist;
        try_files \$uri \$uri/ /index.html;
    }

    # 后端 API 代理
    location /api {
        proxy_pass http://localhost:3001;
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
nginx -t
systemctl restart nginx
systemctl enable nginx

# 9. 启动后端服务
echo -e "${YELLOW}启动后端服务...${NC}"
cd /var/www/gweb/server
pm2 start server-sqlite.js --name gweb-api
pm2 save
pm2 startup | tail -1 | bash

# 10. 完成
echo -e "${GREEN}✅ 部署完成！${NC}"
echo ""
echo "访问地址："
echo "  前台：http://$DOMAIN"
echo "  后台：http://$DOMAIN/admin/login"
echo ""
echo "管理员账户：admin@example.com / admin123456"
echo ""
echo "常用命令："
echo "  查看日志：pm2 logs gweb-api"
echo "  重启服务：pm2 restart gweb-api"
echo "  停止服务：pm2 stop gweb-api"
echo "  Nginx 状态：systemctl status nginx"
echo ""
