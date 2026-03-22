# 生产环境配置指南

## 🚀 快速部署步骤

### 方案 A: 前端 + 后端都部署到 Vercel (推荐)

#### 1. 准备 MongoDB Atlas

1. 访问 https://cloud.mongodb.com
2. 注册/登录账户
3. 创建免费集群 (M0)
4. 创建数据库用户:
   - 用户名：gweb_admin
   - 密码：[生成强密码]
5. 配置网络访问:
   - 添加当前 IP 地址
   - 或允许所有 IP (0.0.0.0/0) - 仅用于测试
6. 获取连接字符串:
   ```
   mongodb+srv://gweb_admin:<password>@cluster0.xxxxx.mongodb.net/
   ```
7. 替换 `<password>` 为你的密码
8. 添加数据库名: `gweb_cms`

最终格式:

```
mongodb+srv://gweb_admin:your_password@cluster0.xxxxx.mongodb.net/gweb_cms?retryWrites=true&w=majority
```

#### 2. 配置对象存储 (图片上传)

由于 Vercel 不支持持久化文件存储，我们需要使用云存储。

**推荐：使用 Cloudinary (免费)**

1. 访问 https://cloudinary.com
2. 注册免费账户
3. 获取凭证:
   - Cloud Name
   - API Key
   - API Secret

4. 安装 Cloudinary SDK:

```bash
cd server
npm install cloudinary
```

5. 修改 `server/middleware/upload.js` 使用 Cloudinary (见下方代码)

#### 3. 设置 Vercel 环境变量

在 Vercel Dashboard → Settings → Environment Variables 添加:

```
MONGODB_URI=mongodb+srv://gweb_admin:your_password@cluster0.xxxxx.mongodb.net/gweb_cms
JWT_SECRET=bba6917387fa9dbaa95f8a352581f9f18ec8a8dbadbf6ce46b87ba8a4dffd8a073771c99aa3c843b7779bd446f4baa5aff192a03f6a9fae78a17cc9d6f3534b5
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### 4. 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署前端
vercel --prod

# 部署后端 API (如果需要单独部署)
cd server
vercel --prod
```

---

### 方案 B: 前端 Vercel + 后端 Railway

#### 1. 部署后端到 Railway

1. 访问 https://railway.app
2. 使用 GitHub 登录
3. 创建新项目 → Deploy from GitHub repo
4. 选择你的仓库
5. 添加 MongoDB 插件:
   - Railway → New → Database → MongoDB
6. 设置环境变量:
   ```
   MONGODB_URI=${{MONGODB_URL}}
   JWT_SECRET=bba6917387fa9dbaa95f8a352581f9f18ec8a8dbadbf6ce46b87ba8a4dffd8a073771c99aa3c843b7779bd446f4baa5aff192a03f6a9fae78a17cc9d6f3534b5
   NODE_ENV=production
   ```
7. Railway 会自动部署

#### 2. 更新前端 API URL

更新 `.env`:

```env
VITE_API_URL=https://your-backend.railway.app
```

#### 3. 部署前端到 Vercel

```bash
vercel --prod
```

---

## 🔧 代码修改 (如果使用 Cloudinary)

### 修改 `server/middleware/upload.js`

```javascript
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const upload = multer({
  storage: multer.memoryStorage(), // 使用内存存储
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
})

// 修改上传逻辑
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '请上传图片文件' })
    }

    // 上传到 Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'gweb-cms',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
      uploadStream.end(req.file.buffer)
    })

    const { category = 'other', width = 0, height = 0 } = req.body

    const image = await Image.create({
      name: result.public_id,
      originalName: req.file.originalname,
      path: result.secure_url,
      url: result.secure_url,
      size: req.file.size,
      mimeType: req.file.mimetype,
      category: category,
      width: width || result.width,
      height: height || result.height,
    })

    res.status(201).json(image)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
```

---

## 📊 数据库初始化

部署后，需要初始化数据库:

### 方式 1: 使用 API 端点

创建初始化管理员账户的脚本:

```javascript
// server/scripts/init-admin.js
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')

const initAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI)

  const adminExists = await User.findOne({ role: 'admin' })
  if (!adminExists) {
    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123456',
      role: 'admin',
    })
    console.log('✓ 管理员账户已创建')
  } else {
    console.log('✓ 管理员账户已存在')
  }

  process.exit(0)
}

initAdmin()
```

运行:

```bash
node server/scripts/init-admin.js
```

### 方式 2: 手动创建

通过 MongoDB Compass 或 Atlas UI 直接插入文档。

---

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

---

## 🆘 故障排查

### 登录失败

- 检查 MongoDB 连接字符串
- 确认 JWT_SECRET 正确
- 查看 Vercel 函数日志

### 图片上传失败

- 检查 Cloudinary 凭证
- 确认文件大小限制
- 查看浏览器网络请求

### API 404 错误

- 检查 vercel.json 路由配置
- 确认 API 路径前缀 `/api`

---

**需要帮助？**

- Vercel 文档：https://vercel.com/docs
- MongoDB Atlas 文档：https://www.mongodb.com/docs/atlas/
- Cloudinary 文档：https://cloudinary.com/documentation
