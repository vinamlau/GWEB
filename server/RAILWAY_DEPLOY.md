# Railway 部署配置

## 快速部署到 Railway

### 1. 准备工作

1. 访问 https://railway.app
2. 使用 GitHub 账户登录
3. 点击 "New Project"

### 2. 部署后端

#### 方式 A: 从 GitHub 部署

1. 选择 "Deploy from GitHub repo"
2. 选择你的仓库 `GWEB`
3. Railway 会自动检测 `server` 目录

#### 方式 B: 使用 Railway CLI

```bash
# 安装 Railway CLI
npm i -g @railway/cli

# 登录 Railway
railway login

# 初始化项目
cd server
railway init

# 创建新服务
railway add --name gweb-backend

# 部署
railway up
```

### 3. 配置 MongoDB

Railway 提供托管 MongoDB:

1. Railway Dashboard → New → Database → MongoDB
2. Railway 会自动创建 `MONGODB_URL` 环境变量
3. 在 `server` 服务中引用这个变量

### 4. 设置环境变量

在 Railway Dashboard 中设置:

```
MONGODB_URI=${{MONGODB_URL}}
JWT_SECRET=bba6917387fa9dbaa95f8a352581f9f18ec8a8dbadbf6ce46b87ba8a4dffd8a073771c99aa3c843b7779bd446f4baa5aff192a03f6a9fae78a17cc9d6f3534b5
NODE_ENV=production
UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=5242880
```

### 5. 配置启动命令

在 Railway Dashboard → Settings → Start Command:

```
node server.js
```

### 6. 获取部署 URL

部署成功后，Railway 会提供:

- 公网 URL: `https://gweb-backend-production.up.railway.app`
- 这个 URL 将用于前端的 `VITE_API_URL`

### 7. 更新前端配置

更新 `.env`:

```env
VITE_API_URL=https://gweb-backend-production.up.railway.app
```

### 8. 初始化数据库

```bash
# 使用 Railway CLI 运行脚本
railway run node server/scripts/init-admin.js
```

### 9. 验证部署

访问: `https://gweb-backend-production.up.railway.app/api/health`

应该返回:

```json
{
  "status": "ok",
  "environment": "production"
}
```

---

## 健康检查端点

在 `server/server.js` 中添加:

```javascript
// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  })
})
```

---

## 环境变量参考

| 变量名        | 说明               | 示例值                |
| ------------- | ------------------ | --------------------- |
| MONGODB_URI   | MongoDB 连接字符串 | mongodb+srv://...     |
| JWT_SECRET    | JWT 密钥           | 随机生成的 128 位密钥 |
| NODE_ENV      | 运行环境           | production            |
| UPLOAD_PATH   | 上传路径           | /app/uploads          |
| MAX_FILE_SIZE | 最大文件大小       | 5242880 (5MB)         |

---

## 常见问题

### Q: Railway 免费额度够用吗？

A: 免费套餐提供 $5 额度，足够个人项目使用

### Q: MongoDB 数据会丢失吗？

A: Railway MongoDB 是持久化的，但建议定期备份

### Q: 如何查看日志？

A: Railway Dashboard → Logs 或使用 `railway logs`

### Q: 如何重启服务？

A: Railway Dashboard → Settings → Restart

---

## 性能优化建议

1. **启用 Redis 缓存** (可选)

   ```bash
   railway add --name redis
   ```

2. **配置自动备份**
   - Railway Dashboard → Database → Backups

3. **监控资源使用**
   - Railway Dashboard → Metrics

---

**部署完成！** 🎉

下一步：部署前端到 Vercel，并更新 API URL 为 Railway 提供的地址。
