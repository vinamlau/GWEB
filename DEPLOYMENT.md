# GWEB 项目阿里云部署文档

## 📋 目录

1. [准备工作](#准备工作)
2. [快速部署](#快速部署)
3. [手动部署](#手动部署)
4. [配置域名和 SSL](#配置域名和 ssl)
5. [运维管理](#运维管理)
6. [常见问题](#常见问题)

---

## 准备工作

### 1. 阿里云账号

- 注册阿里云账号：https://www.aliyun.com/
- 完成实名认证

### 2. 购买 ECS 服务器

**推荐配置：**

| 配置项 | 推荐             | 说明           |
| ------ | ---------------- | -------------- |
| CPU    | 2 核             | 基础配置       |
| 内存   | 2-4GB            | 推荐 4GB       |
| 系统   | Ubuntu 20.04 LTS | 或 CentOS 7.9  |
| 带宽   | 1-5 Mbps         | 按量付费更划算 |
| 存储   | 40GB ESSD        | 基础云盘即可   |

**购买步骤：**

1. 登录阿里云控制台
2. 选择 **产品 > 云服务器 ECS**
3. 点击 **创建实例**
4. 选择配置并支付

### 3. 配置安全组

在阿里云控制台配置安全组规则：

| 端口 | 协议 | 授权对象     | 说明               |
| ---- | ---- | ------------ | ------------------ |
| 22   | TCP  | 0.0.0.0/0    | SSH                |
| 80   | TCP  | 0.0.0.0/0    | HTTP               |
| 443  | TCP  | 0.0.0.0/0    | HTTPS              |
| 3001 | TCP  | 127.0.0.1/32 | 后端 API（仅本地） |

---

## 快速部署

### 步骤 1：连接服务器

```bash
# SSH 登录（替换为您的服务器 IP）
ssh root@your-server-ip
```

### 步骤 2：上传部署脚本

```bash
# 在本地电脑执行
scp deploy.sh root@your-server-ip:/root/
```

### 步骤 3：执行一键部署

```bash
# 在服务器上执行
chmod +x deploy.sh
bash deploy.sh
```

按照提示输入：

- Git 仓库地址
- 服务器域名或 IP

### 步骤 4：验证部署

访问：

- 前台：http://your-domain.com
- 后台：http://your-domain.com/admin/login

---

## 手动部署

### 1. 安装运行环境

```bash
# 更新系统
apt update && apt upgrade -y

# 安装 Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 安装 Git
apt install -y git

# 安装 Nginx
apt install -y nginx

# 安装 PM2
npm install -g pm2
```

### 2. 部署代码

```bash
# 克隆项目
cd /var/www
git clone https://github.com/your-username/your-repo.git gweb
cd gweb

# 安装前端依赖并构建
npm install
npm run build

# 安装后端依赖
cd server
npm install

# 创建环境配置
cat > .env << EOF
NODE_ENV=production
PORT=3001
JWT_SECRET=$(openssl rand -hex 32)
EOF
```

### 3. 配置 Nginx

```bash
# 创建配置文件
nano /etc/nginx/sites-available/gweb
```

添加配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /var/www/gweb/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /uploads {
        alias /var/www/gweb/server/uploads;
        expires 30d;
    }
}
```

启用配置：

```bash
ln -s /etc/nginx/sites-available/gweb /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 4. 启动后端服务

```bash
cd /var/www/gweb/server
pm2 start server-sqlite.js --name gweb-api
pm2 save
pm2 startup | tail -1 | bash
```

---

## 配置域名和 SSL

### 1. 域名解析

在阿里云域名控制台：

1. 添加 A 记录
2. 主机记录：@ 和 www
3. 记录值：您的服务器 IP

### 2. 安装 SSL 证书

```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 申请证书（替换为您的域名）
certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 3. 自动续期

```bash
# 测试自动续期
certbot renew --dry-run

# 添加定时任务（已自动配置）
crontab -l
```

---

## 运维管理

### PM2 常用命令

```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs gweb-api

# 重启应用
pm2 restart gweb-api

# 停止应用
pm2 stop gweb-api

# 删除应用
pm2 delete gweb-api

# 查看监控
pm2 monit
```

### Nginx 常用命令

```bash
# 查看状态
systemctl status nginx

# 重启
systemctl restart nginx

# 停止
systemctl stop nginx

# 查看配置
nginx -t

# 查看日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 备份数据

```bash
# 备份 SQLite 数据库
cp /var/www/gweb/server/data.db /backup/data-$(date +%Y%m%d).db

# 备份上传文件
tar -czf /backup/uploads-$(date +%Y%m%d).tar.gz /var/www/gweb/server/uploads
```

### 更新代码

```bash
cd /var/www/gweb

# 拉取最新代码
git pull

# 重新构建前端
npm install
npm run build

# 重启后端
cd server
npm install
pm2 restart gweb-api
```

---

## 常见问题

### 1. 端口被占用

```bash
# 查看端口占用
lsof -i:3001
lsof -i:80

# 终止进程
kill -9 <PID>
```

### 2. Nginx 启动失败

```bash
# 检查配置
nginx -t

# 查看详细错误
journalctl -u nginx -n 50
```

### 3. 后端服务无法启动

```bash
# 查看 PM2 日志
pm2 logs gweb-api

# 检查 .env 配置
cat /var/www/gweb/server/.env

# 检查数据库文件
ls -la /var/www/gweb/server/data.db
```

### 4. 前端页面空白

- 检查 Nginx 配置中的 root 路径
- 查看浏览器控制台错误
- 确认前端构建成功：ls /var/www/gweb/dist

### 5. API 请求失败

- 检查 Nginx 代理配置
- 确认后端服务运行：pm2 status
- 查看后端日志：pm2 logs gweb-api

---

## 成本估算

### 基础配置（月付）

| 项目         | 费用                | 说明          |
| ------------ | ------------------- | ------------- |
| ECS 2 核 2GB | 约 60 元            | 基础配置      |
| ECS 2 核 4GB | 约 120 元           | 推荐配置      |
| 带宽 1Mbps   | 约 20 元            | 按固定带宽    |
| 域名         | 约 5 元             | .com 域名     |
| SSL 证书     | 免费                | Let's Encrypt |
| **总计**     | **约 85-145 元/月** |               |

### 省钱技巧

1. **按量付费**：适合测试环境
2. **抢占式实例**：价格更低，但可能被回收
3. **学生机**：9.9 元/月（符合条件的话）
4. **新用户优惠**：首年通常有折扣

---

## 技术支持

- 阿里云工单：https://workorder.console.aliyun.com/
- 阿里云文档：https://help.aliyun.com/
- 项目 Issues：https://github.com/your-repo/issues

---

## 下一步

1. 配置域名备案（中国大陆服务器必需）
2. 设置监控告警
3. 配置自动备份
4. 优化性能
5. 配置 CDN 加速

---

**祝您部署顺利！** 🎉
