# 📋 部署快速参考卡片

## 🚀 3 步部署流程

```
┌─────────────────────────────────────────────────────────────┐
│  步骤 1: 配置 MongoDB Atlas (5 分钟)                          │
├─────────────────────────────────────────────────────────────┤
│  1. 访问 https://cloud.mongodb.com                          │
│  2. 创建免费账户和集群                                       │
│  3. 创建数据库用户 (保存密码!)                               │
│  4. 配置网络访问 (允许所有 IP 或 Vercel IP)                  │
│  5. 获取连接字符串                                           │
│  6. 更新 server/.env 中的 MONGODB_URI                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  步骤 2: 运行准备脚本 (1 分钟)                                │
├─────────────────────────────────────────────────────────────┤
│  chmod +x scripts/prepare-deploy.sh                         │
│  ./scripts/prepare-deploy.sh                                │
│                                                             │
│  ✅ 自动检查依赖                                             │
│  ✅ 自动生 JWT_SECRET                                        │
│  ✅ 自动构建前端                                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  步骤 3: 部署到 Vercel (2 分钟)                               │
├─────────────────────────────────────────────────────────────┤
│  npm i -g vercel                                            │
│  vercel login                                               │
│  vercel --prod                                              │
│                                                             │
│  在 Vercel Dashboard 设置环境变量:                           │
│  - MONGODB_URI                                              │
│  - JWT_SECRET                                               │
│  - NODE_ENV=production                                      │
└─────────────────────────────────────────────────────────────┘
```

## 🔑 环境变量速查

### 必须设置的变量

| 变量名         | 位置                 | 说明         | 示例                                                   |
| -------------- | -------------------- | ------------ | ------------------------------------------------------ |
| `MONGODB_URI`  | server/.env + Vercel | MongoDB 连接 | `mongodb+srv://user:pass@cluster.mongodb.net/gweb_cms` |
| `JWT_SECRET`   | server/.env + Vercel | JWT 密钥     | 自动生成的 128 位密钥                                  |
| `NODE_ENV`     | Vercel               | 运行环境     | `production`                                           |
| `VITE_API_URL` | .env                 | API 地址     | `https://your-api.vercel.app`                          |

### 可选变量

| 变量名                  | 说明                | 默认值         |
| ----------------------- | ------------------- | -------------- |
| `PORT`                  | 服务器端口          | 3001           |
| `UPLOAD_PATH`           | 上传路径            | `/tmp/uploads` |
| `MAX_FILE_SIZE`         | 最大文件大小        | 5242880 (5MB)  |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary 云名称   | -              |
| `CLOUDINARY_API_KEY`    | Cloudinary API 密钥 | -              |
| `CLOUDINARY_API_SECRET` | Cloudinary API 密钥 | -              |

## 🛠️ 常用命令

```bash
# 开发
npm run dev          # 启动前端开发服务器
cd server && npm run dev  # 启动后端开发服务器

# 构建
npm run build        # 构建生产版本

# 部署
vercel --prod        # 部署到 Vercel

# 数据库
npm run seed         # 初始化数据库数据

# 检查
npm run lint         # 检查代码质量
npm run lint:fix     # 自动修复代码问题
```

## 📊 部署架构

```
用户访问
   ↓
Vercel CDN (前端静态文件)
   ↓
Vercel Serverless Functions (后端 API)
   ↓
MongoDB Atlas (数据库)
   ↓
Cloudinary (图片存储 - 可选)
```

## ✅ 验证清单

部署后立即测试:

```
[ ] 首页加载正常
[ ] /admin/login 可访问
[ ] 使用 admin@example.com 登录成功
[ ] 仪表盘显示统计
[ ] 创建文章成功
[ ] 修改配置成功
[ ] 无控制台错误
[ ] 无函数错误日志
```

## 🔍 故障排查速查

| 问题           | 可能原因        | 解决方案          |
| -------------- | --------------- | ----------------- |
| 登录失败       | MongoDB 未连接  | 检查 MONGODB_URI  |
| 登录失败       | JWT_SECRET 错误 | 重新生成密钥      |
| 图片上传失败   | 本地存储不支持  | 使用 Cloudinary   |
| CORS 错误      | 域名配置错误    | 检查 CORS 设置    |
| 404 错误       | 路由配置错误    | 检查 vercel.json  |
| 环境变量不生效 | 设置位置错误    | 在 Dashboard 设置 |

## 📞 重要链接

- **MongoDB Atlas**: https://cloud.mongodb.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Cloudinary**: https://cloudinary.com
- **项目文档**: 查看 DEPLOYMENT_README.md

## ⚡ 快速提示

💡 **提示 1**: 使用 `vercel --prod` 而不是 `vercel` 直接部署到生产环境

💡 **提示 2**: 修改环境变量后需要重新部署才能生效

💡 **提示 3**: 使用 `vercel logs` 查看实时日志

💡 **提示 4**: MongoDB 密码包含特殊字符需要 URL 编码

💡 **提示 5**: 图片上传建议使用云存储，不要用本地存储

---

**保存这个文件作为快速参考!** 📌
