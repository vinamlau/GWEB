# 部署前安全检查清单

## 🔐 1. 环境变量安全

### 前端环境变量 (.env)

- ✅ `VITE_API_URL` - 生产环境需要改为实际的后端 API 地址
- ⚠️ **不要**在前端 .env 中存储敏感信息 (API keys, secrets 等)
- ⚠️ 前端 .env 文件会被打包到客户端，所有变量都是公开的

### 后端环境变量 (server/.env)

- 🔒 `JWT_SECRET` - **必须**生成强随机密钥 (生产环境)
- 🔒 `MONGODB_URI` - 使用 MongoDB Atlas 或生产数据库连接字符串
- 🔒 `NODE_ENV` - 设置为 `production`
- 🔒 这些变量**绝对不能**提交到 GitHub

## 🚫 2. .gitignore 检查

确保以下文件**不**被提交:

- ✅ `.env` - 包含敏感环境变量
- ✅ `.env.local` - 本地环境配置
- ✅ `node_modules/` - 依赖包
- ✅ `server/uploads/` - 用户上传文件
- ✅ `*.local` - 本地配置

## 🔑 3. JWT Secret 生成

**当前状态**: 使用默认密钥 (不安全!)

**生产环境必须修改**:

```bash
# 生成强随机密钥 (Node.js)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 或使用 openssl
openssl rand -base64 64
```

将生成的密钥替换到 `server/.env`:

```env
JWT_SECRET=生成的强随机密钥
```

## 🗄️ 4. 数据库配置

### MongoDB Atlas (推荐)

1. 访问 https://cloud.mongodb.com
2. 创建免费集群
3. 获取连接字符串
4. 替换 `server/.env` 中的 `MONGODB_URI`

示例:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gweb_cms?retryWrites=true&w=majority
```

### 自托管 MongoDB

- 确保数据库可公开访问
- 配置防火墙规则
- 使用强密码认证

## 📤 5. 文件上传配置

### Vercel 部署注意事项

⚠️ **重要**: Vercel 是无服务器架构，不支持持久化文件存储

**解决方案**:

1. **对象存储服务** (推荐)
   - AWS S3
   - Cloudinary (图片专用)
   - 阿里云 OSS
   - 七牛云

2. **修改 Multer 配置**
   - 将文件上传到云存储
   - 数据库只存储文件 URL

## 🔒 6. CORS 配置

**当前**: 允许所有来源

**生产环境**应该限制为实际域名:

```javascript
// server/server.js
app.use(
  cors({
    origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
    credentials: true,
  }),
)
```

## 🛡️ 7. Helmet 安全头

**已配置** ✅ - Helmet 已添加到 Express

确保以下安全头已启用:

- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

## 🔐 8. 密码安全

**已实现** ✅ - 使用 bcryptjs 加密

- 密码最小长度：6 位 (建议增加到 8-12 位)
- bcrypt rounds: 默认 (建议设置为 12)

## 📊 9. 速率限制 (Rate Limiting)

**建议添加**: 防止暴力破解和 DDoS 攻击

```javascript
// server/server.js
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 最多 100 个请求
})

app.use('/api/', limiter)
```

## 📝 10. 日志配置

**当前**: 使用 morgan 记录 HTTP 请求

**生产环境**:

- 记录到文件而不是控制台
- 使用 Winston 或 Bunyan
- 集成日志服务 (Logtail, Datadog 等)

## 🔧 11. 构建优化

### 前端

```bash
# 构建生产版本
npm run build

# 检查包大小
npm run build -- --debug
```

### 代码分割

- 考虑使用动态 import() 分割大文件
- 路由级别的代码分割

## 🌐 12. HTTPS 配置

**Vercel**: 自动提供 HTTPS ✅

**自托管**:

- 使用 Let's Encrypt 免费 SSL 证书
- 配置 Nginx 或 Apache

## 📋 13. 部署检查清单

### 部署到 Vercel 前:

- [ ] 生成新的 JWT_SECRET
- [ ] 配置 MongoDB Atlas
- [ ] 更新 .env 中的 API URL
- [ ] 配置 CORS 白名单
- [ ] 设置对象存储 (图片上传)
- [ ] 添加速率限制
- [ ] 测试所有 API 端点
- [ ] 检查 .gitignore

### Vercel 环境变量设置:

在 Vercel Dashboard 中设置:

```
MONGODB_URI=你的 MongoDB 连接字符串
JWT_SECRET=强随机密钥
NODE_ENV=production
UPLOAD_PATH=/tmp/uploads
MAX_FILE_SIZE=5242880
```

## 🎯 立即行动项

### 🔴 高优先级 (必须做)

1. **生成新的 JWT_SECRET**
2. **配置 MongoDB Atlas**
3. **将 .env 添加到 .gitignore**
4. **配置对象存储 (如果用 Vercel)**

### 🟡 中优先级 (建议做)

5. 配置 CORS 白名单
6. 添加速率限制
7. 增强密码策略
8. 配置生产日志

### 🟢 低优先级 (可选做)

9. 代码分割优化
10. CDN 集成
11. 错误监控 (Sentry)

## 📦 快速部署脚本

创建 `deploy.sh`:

```bash
#!/bin/bash

# 1. 检查 .env 文件
if [ -f .env ]; then
  echo "⚠️  警告：发现 .env 文件，确保不要提交到 Git!"
fi

# 2. 构建前端
npm run build

# 3. 检查构建结果
if [ $? -eq 0 ]; then
  echo "✅ 构建成功"
else
  echo "❌ 构建失败"
  exit 1
fi

# 4. 安全提示
echo ""
echo "🔐 部署前检查:"
echo "1. JWT_SECRET 已更新"
echo "2. MongoDB 已配置"
echo "3. .env 已添加到 .gitignore"
echo ""
```

## 🆘 常见问题

**Q: 图片上传失败？**
A: Vercel 不支持本地文件存储，需要使用云存储

**Q: 登录一直失败？**
A: 检查 JWT_SECRET 是否正确，MongoDB 是否连接成功

**Q: CORS 错误？**
A: 在 server/server.js 中配置正确的域名白名单

**Q: 环境变量不生效？**
A: 确保在 Vercel Dashboard 中设置了环境变量

---

**最后更新**: 2024-01-XX
**版本**: 1.0.0
