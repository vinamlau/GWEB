# 🔐 部署前安全配置指南

## ✅ 已完成的配置

### 1. .gitignore 配置 ✅

- `.env` 文件已添加到 .gitignore
- `server/uploads/` 已排除
- `node_modules/` 已排除

### 2. 环境变量模板 ✅

- 创建了 `.env.example` (前端模板)
- 创建了 `server/.env.example` (后端模板)

### 3. 强随机 JWT Secret 已生成 ✅

```
bba6917387fa9dbaa95f8a352581f9f18ec8a8dbadbf6ce46b87ba8a4dffd8a073771c99aa3c843b7779bd446f4baa5aff192a03f6a9fae78a17cc9d6f3534b5
```

## 🚨 部署前必须修改的配置

### 1. 更新 JWT_SECRET (必须!)

打开 `server/.env`,将 JWT_SECRET 替换为上面生成的密钥:

```env
JWT_SECRET=bba6917387fa9dbaa95f8a352581f9f18ec8a8dbadbf6ce46b87ba8a4dffd8a073771c99aa3c843b7779bd446f4baa5aff192a03f6a9fae78a17cc9d6f3534b5
```

### 2. 配置 MongoDB Atlas (必须!)

**步骤**:

1. 访问 https://cloud.mongodb.com
2. 创建免费账户和集群
3. 创建数据库用户
4. 获取连接字符串
5. 更新 `server/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gweb_cms?retryWrites=true&w=majority
```

### 3. 更新前端 API URL (必须!)

更新 `.env`:

```env
VITE_API_URL=https://your-api.vercel.app
```

或者根据你的实际部署域名修改。

### 4. 配置 Vercel 环境变量 (必须!)

在 Vercel Dashboard 中设置以下环境变量:

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=bba6917387fa9dbaa95f8a352581f9f18ec8a8dbadbf6ce46b87ba8a4dffd8a073771c99aa3c843b7779bd446f4baa5aff192a03f6a9fae78a17cc9d6f3534b5
NODE_ENV=production
UPLOAD_PATH=/tmp/uploads
MAX_FILE_SIZE=5242880
```

## 📋 安全检查清单

### 高优先级 (必须完成)

- [ ] 生成并更新 JWT_SECRET ✅ (已生成，需要替换)
- [ ] 配置 MongoDB Atlas ⏳
- [ ] 更新前端 API URL ⏳
- [ ] 在 Vercel 设置环境变量 ⏳
- [ ] 确保 .env 不提交到 Git ✅ (已配置)

### 中优先级 (强烈推荐)

- [ ] 配置 CORS 白名单
- [ ] 添加速率限制
- [ ] 配置对象存储 (如果用 Vercel)
- [ ] 测试所有 API 端点

### 低优先级 (可选)

- [ ] 代码分割优化
- [ ] CDN 集成
- [ ] 错误监控 (Sentry)

## 🛠️ 快速配置脚本

创建 `setup-production.sh`:

```bash
#!/bin/bash

echo "🔐 生产环境配置脚本"
echo ""

# 生成 JWT_SECRET
echo "生成新的 JWT_SECRET..."
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")

# 更新 server/.env
echo "更新 server/.env..."
sed -i.bak "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" server/.env
rm server/.env.bak

echo "✅ JWT_SECRET 已更新"
echo ""
echo "⚠️ 接下来请手动配置:"
echo "1. MongoDB Atlas 连接字符串"
echo "2. Vercel 环境变量"
echo ""
```

## 📦 部署步骤

### 1. 准备阶段

```bash
# 拉取最新代码
git pull origin main

# 安装依赖
npm install
cd server && npm install && cd ..

# 运行测试
npm run build
```

### 2. 配置环境变量

```bash
# 复制示例文件
cp .env.example .env
cp server/.env.example server/.env

# 编辑 .env 文件
# - 更新 JWT_SECRET
# - 更新 MongoDB URI
# - 更新 API URL
```

### 3. 部署到 Vercel

#### 前端:

```bash
cd /Users/victor/Documents/trae_projects/GWEB
vercel --prod
```

#### 后端 (如果也部署到 Vercel):

```bash
cd server
vercel --prod
```

### 4. 验证部署

- [ ] 访问前端网站
- [ ] 测试登录功能
- [ ] 测试文章管理
- [ ] 测试图片上传
- [ ] 检查控制台错误

## 🔍 常见问题排查

### 问题 1: 登录后立即退出

**原因**: JWT_SECRET 不正确或 MongoDB 连接失败
**解决**: 检查环境变量是否正确设置

### 问题 2: 图片上传失败

**原因**: Vercel 不支持本地文件存储
**解决**: 使用 Cloudinary 或 AWS S3

### 问题 3: CORS 错误

**原因**: 后端 CORS 配置不正确
**解决**: 在 server/server.js 中添加前端域名

### 问题 4: 环境变量不生效

**原因**: 在错误的地方设置
**解决**: 确保在 Vercel Dashboard 的项目设置中设置

## 📞 需要帮助？

查看完整文档:

- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - 完整检查清单
- [server/README.md](./server/README.md) - 后端 API 文档

---

**最后更新**: 2024-01-XX
**状态**: 就绪待部署
