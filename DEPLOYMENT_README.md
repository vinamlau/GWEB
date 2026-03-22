# 🚀 部署总览

欢迎使用 GWEB CMS！这是你的完整部署指南。

## 📋 快速开始

### 3 分钟部署流程

1. **配置 MongoDB Atlas** (5 分钟)

   ```bash
   # 阅读详细指南
   open MONGODB_ATLAS_SETUP.md
   ```

2. **准备项目** (1 分钟)

   ```bash
   # 运行准备脚本
   chmod +x scripts/prepare-deploy.sh
   ./scripts/prepare-deploy.sh
   ```

3. **部署到 Vercel** (2 分钟)

   ```bash
   # 安装 Vercel CLI
   npm i -g vercel

   # 部署
   vercel --prod
   ```

## 📚 完整文档索引

### 新手必读

- 📘 [MongoDB Atlas 配置指南](./MONGODB_ATLAS_SETUP.md) - **首先阅读**
- 📗 [部署详细指南](./DEPLOY_GUIDE.md) - 完整部署步骤
- 📙 [安全检查清单](./SECURITY_SETUP.md) - 部署前安全检查

### 进阶配置

- 📕 [Railway 部署指南](./server/RAILWAY_DEPLOY.md) - 后端部署方案
- 📔 [部署检查清单](./DEPLOYMENT_CHECKLIST.md) - 完整检查项

### 快速参考

- [环境变量配置](#环境变量配置)
- [常见问题](#常见问题)
- [部署命令](#部署命令)

## 🔧 环境变量配置

### 前端环境变量 (.env)

```env
# 后端 API 地址 (部署后修改为实际地址)
VITE_API_URL=http://localhost:3001
```

### 后端环境变量 (server/.env)

```env
# 服务器端口
PORT=3001

# MongoDB 连接字符串 (必须修改!)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gweb_cms

# JWT 密钥 (已自动生成)
JWT_SECRET=自动生成的密钥

# 运行环境
NODE_ENV=production

# 文件上传路径
UPLOAD_PATH=/tmp/uploads

# 最大文件大小 (5MB)
MAX_FILE_SIZE=5242880
```

### Vercel 环境变量

在 Vercel Dashboard 设置:

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
NODE_ENV=production
UPLOAD_PATH=/tmp/uploads
MAX_FILE_SIZE=5242880
```

## 🛠️ 部署命令

### 本地开发

```bash
# 前端
npm run dev

# 后端
cd server
npm run dev

# 初始化数据
npm run seed
```

### 构建

```bash
npm run build
```

### 部署

```bash
# 部署到 Vercel
vercel --prod

# 查看部署日志
vercel logs
```

## 📊 部署架构

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Vercel    │ ──────> │   MongoDB    │
│  Frontend   │         │    Atlas     │
│             │ <────── │              │
└─────────────┘   API   └──────────────┘
       │
       │
       v
┌─────────────┐
│   Vercel    │
│ Serverless  │
│  Functions  │
└─────────────┘
```

## ✅ 部署验证清单

部署完成后，逐一测试:

- [ ] 访问网站首页
- [ ] 访问 `/admin/login`
- [ ] 使用 admin@example.com 登录
- [ ] 访问仪表盘
- [ ] 创建测试文章
- [ ] 上传图片 (如果配置了云存储)
- [ ] 修改站点配置
- [ ] 检查浏览器控制台无错误
- [ ] 检查 Vercel 函数日志无错误

## 🔍 常见问题

### 登录失败

**原因**: MongoDB 未连接或 JWT_SECRET 不正确
**解决**:

1. 检查 MongoDB Atlas 连接字符串
2. 确认 JWT_SECRET 已更新
3. 查看 Vercel 函数日志

### 图片上传失败

**原因**: Vercel 不支持本地文件存储
**解决**: 使用 Cloudinary 或其他云存储服务

### CORS 错误

**原因**: 后端 CORS 配置问题
**解决**: 在 server/server.js 中配置正确的域名

### 环境变量不生效

**原因**: 设置位置错误
**解决**: 确保在 Vercel Dashboard 的项目设置中设置

## 🆘 获取帮助

### 文档

- MongoDB Atlas: [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)
- 部署指南：[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)
- 安全配置：[SECURITY_SETUP.md](./SECURITY_SETUP.md)

### 社区

- Vercel 社区：https://github.com/vercel/vercel/discussions
- MongoDB 社区：https://www.mongodb.com/community/forums/

### 日志

```bash
# 查看 Vercel 日志
vercel logs

# 查看本地后端日志
cd server
npm run dev
```

## 🎯 下一步

1. ✅ 配置 MongoDB Atlas
2. ✅ 运行准备脚本
3. ✅ 部署到 Vercel
4. ✅ 测试所有功能
5. ✅ 配置自定义域名 (可选)

---

**祝你部署顺利！** 🎉

如有问题，请查看详细文档或查看日志排查。
