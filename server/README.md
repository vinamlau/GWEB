# GWEB CMS 后端服务器

集团公司内容管理系统后端，基于 Node.js + Express + MongoDB 构建。

## 功能特性

- 🔐 **用户认证** - JWT 令牌认证，支持多角色 (admin/editor/viewer)
- 📝 **文章管理** - 完整的 CRUD 操作，支持分类、标签、状态管理
- 🖼️ **图片管理** - 文件上传、分类管理、元数据记录
- ⚙️ **站点配置** - 键值对配置管理，支持批量操作
- 🔒 **权限控制** - 基于角色的访问控制
- 📊 **数据验证** - 请求数据验证和错误处理

## 技术栈

- **运行时**: Node.js
- **框架**: Express.js
- **数据库**: MongoDB + Mongoose
- **认证**: JWT (jsonwebtoken)
- **加密**: bcryptjs
- **文件上传**: Multer
- **验证**: express-validator
- **安全**: Helmet (安全头)
- **日志**: Morgan (HTTP 日志)
- **压缩**: Compression

## 快速开始

### 1. 安装依赖

```bash
cd server
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并修改配置:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gweb-cms
JWT_SECRET=your_jwt_secret_key_here
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

### 3. 初始化数据

```bash
npm run seed
```

这将创建:

- 管理员账户：`admin@example.com` / `admin123456`
- 编辑账户：`editor@example.com` / `editor123456`
- 初始站点配置
- 示例文章

### 4. 启动服务器

开发模式:

```bash
npm run dev
```

生产模式:

```bash
npm start
```

服务器将运行在 `http://localhost:5000`

## API 文档

### 认证接口

#### 用户注册

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "editor"
}
```

#### 用户登录

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response:
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "token": "string"
}
```

#### 获取个人信息

```
GET /api/auth/profile
Authorization: Bearer <token>
```

#### 更新个人信息

```
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### 文章接口

#### 获取文章列表

```
GET /api/articles?page=1&category=公司新闻&status=published&search=关键词
```

#### 获取置顶文章

```
GET /api/articles/top
```

#### 获取最新文章

```
GET /api/articles/latest?limit=10
```

#### 获取文章详情

```
GET /api/articles/:id
```

#### 创建文章 (需要编辑权限)

```
POST /api/articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "summary": "string",
  "content": "string",
  "coverImage": "string",
  "images": ["string"],
  "category": "公司新闻",
  "tags": ["tag1", "tag2"],
  "author": "string",
  "status": "draft|published|archived",
  "isTop": false
}
```

#### 更新文章 (需要编辑权限)

```
PUT /api/articles/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### 删除文章 (需要编辑权限)

```
DELETE /api/articles/:id
Authorization: Bearer <token>
```

### 图片接口

#### 上传图片 (需要编辑权限)

```
POST /api/images/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- image: file (图片文件)
- category: string (可选，分类)
- width: number (可选，宽度)
- height: number (可选，高度)
```

#### 获取图片列表

```
GET /api/images?page=1&category=logo&search=关键词
```

#### 获取分类图片

```
GET /api/images/category/:category
```

#### 获取图片详情

```
GET /api/images/:id
```

#### 更新图片信息 (需要编辑权限)

```
PUT /api/images/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "string",
  "width": number,
  "height": number
}
```

#### 删除图片 (需要编辑权限)

```
DELETE /api/images/:id
Authorization: Bearer <token>
```

### 站点配置接口

#### 获取所有配置

```
GET /api/configs?category=basic
```

#### 获取单个配置

```
GET /api/configs/:key
```

#### 创建配置 (需要管理员权限)

```
POST /api/configs
Authorization: Bearer <token>
Content-Type: application/json

{
  "key": "string",
  "value": "string",
  "category": "basic|seo|contact|social|branding",
  "description": "string"
}
```

#### 更新配置 (需要管理员权限)

```
PUT /api/configs/:key
Authorization: Bearer <token>
Content-Type: application/json

{
  "value": "string",
  "description": "string"
}
```

#### 删除配置 (需要管理员权限)

```
DELETE /api/configs/:key
Authorization: Bearer <token>
```

#### 批量获取配置

```
POST /api/configs/batch
Content-Type: application/json

{
  "keys": ["siteName", "siteDescription", "logo"]
}
```

## 项目结构

```
server/
├── config/          # 配置文件
│   └── db.js       # MongoDB 连接
├── controllers/     # 控制器
│   ├── authController.js
│   ├── articleController.js
│   ├── imageController.js
│   └── configController.js
├── middleware/      # 中间件
│   ├── auth.js     # JWT 认证
│   └── upload.js   # 文件上传
├── models/         # 数据模型
│   ├── User.js
│   ├── Article.js
│   ├── Image.js
│   └── SiteConfig.js
├── routes/         # 路由
│   ├── auth.js
│   ├── articles.js
│   ├── images.js
│   └── config.js
├── scripts/        # 脚本
│   └── seed.js     # 数据初始化
├── uploads/        # 上传文件目录
├── .env            # 环境变量
├── .env.example    # 环境变量示例
├── package.json
└── server.js       # 入口文件
```

## 权限说明

- **admin**: 管理员权限，可以执行所有操作
- **editor**: 编辑权限，可以管理文章和图片
- **viewer**: 查看权限，只能查看公开内容

## 错误处理

所有 API 错误统一返回格式:

```json
{
  "message": "错误信息"
}
```

或验证错误:

```json
{
  "errors": [
    {
      "msg": "错误描述",
      "param": "参数名",
      "location": "body"
    }
  ]
}
```

## 安全建议

1. 生产环境使用强 JWT_SECRET
2. 启用 HTTPS
3. 定期备份 MongoDB 数据库
4. 限制上传文件大小和类型
5. 使用环境变量管理敏感信息

## 开发工具

- **Postman**: 测试 API 接口
- **MongoDB Compass**: 可视化查看数据库
- **nodemon**: 开发模式自动重启

## 许可证

MIT
