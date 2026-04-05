# 🚀 阿里云服务器部署指南

## 📋 快速部署步骤

### 方法 1：使用自动部署脚本（推荐）

1. **SSH 登录服务器**

   ```bash
   ssh root@gcore.xin
   # 输入密码：Vicnan888.
   ```

2. **查找项目目录**

   ```bash
   find / -name "GWEB" -type d 2>/dev/null
   ```

   记下找到的路径，例如：`/root/GWEB` 或 `/home/www/GWEB`

3. **下载并运行部署脚本**
   ```bash
   cd /tmp
   curl -O https://raw.githubusercontent.com/vinamlau/GWEB/main/deploy-to-alibaba.sh
   chmod +x deploy-to-alibaba.sh
   bash deploy-to-alibaba.sh
   ```

### 方法 2：手动部署

1. **SSH 登录服务器**

   ```bash
   ssh root@gcore.xin
   # 密码：Vicnan888.
   ```

2. **查找项目目录**

   ```bash
   find / -name "GWEB" -type d 2>/dev/null
   ```

3. **进入项目目录并拉取代码**

   ```bash
   cd /找到的/GWEB/路径
   git config --global --add safe.directory /找到的/GWEB/路径
   git pull origin main
   ```

4. **安装后端依赖**

   ```bash
   cd server
   npm install --omit=dev
   ```

5. **重启 PM2 服务**

   ```bash
   pm2 restart gweb-backend
   # 或者如果服务不存在
   pm2 start server/server-sqlite.js --name gweb-backend
   pm2 save
   ```

6. **查看日志确认**
   ```bash
   pm2 logs gweb-backend --lines 30
   ```

## 🔍 常见问题排查

### 问题 1：找不到项目目录

```bash
# 使用以下命令查找
find / -name "GWEB" -type d 2>/dev/null
ls -la /root/
ls -la /home/www/
ls -la /var/www/
```

### 问题 2：PM2 未安装

```bash
npm install -g pm2
```

### 问题 3：Git 权限问题

```bash
git config --global --add safe.directory /你的/GWEB/路径
```

### 问题 4：端口被占用

```bash
# 查看端口占用
lsof -i :3001
# 或者
netstat -tulpn | grep 3001

# 杀死占用端口的进程
kill -9 <PID>
```

## ✅ 验证部署成功

1. **检查 PM2 服务状态**

   ```bash
   pm2 status
   ```

   应该看到 `gweb-backend` 状态为 `online`

2. **测试后端 API**

   ```bash
   curl http://localhost:3001/api/health
   ```

   应该返回：

   ```json
   {
     "status": "ok",
     "environment": "production",
     "database": "sqlite",
     "timestamp": "..."
   }
   ```

3. **访问网站**
   - 前台：http://gcore.xin
   - 后台：http://gcore.xin/admin/login

## ⚠️ 重要提示

### 清除浏览器缓存

部署完成后，**必须清除浏览器缓存**才能看到最新代码：

- **Windows**: `Ctrl + Shift + R` 或 `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`
- **或者**：使用浏览器无痕模式访问

### 测试清单

- [ ] 登录后台管理
- [ ] 用户管理 - 显示用户列表
- [ ] 菜单管理 - 显示菜单列表
- [ ] 站点配置 - 显示配置，可以上传 logo
- [ ] 商品管理 - 显示商品列表
- [ ] 订单管理 - 显示订单列表

## 📞 需要帮助？

如果部署过程中遇到问题，请提供以下信息：

1. SSH 登录后的完整操作记录
2. PM2 日志输出：`pm2 logs gweb-backend --lines 50`
3. 浏览器控制台的错误信息
