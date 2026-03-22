# MongoDB Atlas 配置指南

## 📦 什么是 MongoDB Atlas?

MongoDB Atlas 是 MongoDB 官方提供的云端数据库服务，提供免费套餐，非常适合个人项目和小型应用。

## 🚀 快速开始

### 步骤 1: 创建账户

1. 访问 https://cloud.mongodb.com
2. 点击 "Start for Free"
3. 使用邮箱注册或使用 Google/GitHub 快捷登录

### 步骤 2: 创建免费集群

1. 登录后，点击 "Build a Database"
2. 选择 **FREE** 套餐 (M0 Sandbox)
3. 选择云服务提供商和区域:
   - 推荐：AWS - Singapore (新加坡) 或 Tokyo (东京) - 离中国较近
4. 点击 "Create Cluster"

### 步骤 3: 创建数据库用户

1. 点击左侧菜单 "Database Access"
2. 点击 "+ ADD NEW DATABASE USER"
3. 选择认证方式：**Password**
4. 填写:
   - Username: `gweb_admin`
   - Password: 点击 "Autogenerate Secure Password" 或自定义强密码
   - **重要**: 保存密码！
5. Database User Privileges: 选择 "Read and write to any database"
6. 点击 "Add User"

### 步骤 4: 配置网络访问

1. 点击左侧菜单 "Network Access"
2. 点击 "+ ADD IP ADDRESS"
3. 选择:
   - **开发测试**: 选择 "Allow Access from Anywhere" (0.0.0.0/0)
   - **生产环境**: 添加 Vercel 的 IP 地址
4. 点击 "Confirm"

### 步骤 5: 获取连接字符串

1. 返回 "Database Deployments"
2. 点击集群的 "Connect" 按钮
3. 选择 "Connect your application"
4. 选择驱动：**Node.js** 和版本 **5.5 or later**
5. 复制连接字符串，格式如下:

```
mongodb+srv://gweb_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. 将 `<password>` 替换为你设置的密码
7. 在末尾添加数据库名: `/gweb_cms`

最终格式:

```
mongodb+srv://gweb_admin:your_password@cluster0.xxxxx.mongodb.net/gweb_cms?retryWrites=true&w=majority
```

### 步骤 6: 更新项目配置

编辑 `server/.env`:

```env
MONGODB_URI=mongodb+srv://gweb_admin:your_password@cluster0.xxxxx.mongodb.net/gweb_cms?retryWrites=true&w=majority
```

### 步骤 7: 测试连接

```bash
cd server
npm run dev
```

如果看到:

```
服务器运行在端口 3001
环境：development
```

说明连接成功! ✅

## 🔧 在 Vercel 中使用

### 设置环境变量

1. 访问 https://vercel.com/dashboard
2. 选择你的项目
3. 点击 "Settings" → "Environment Variables"
4. 添加新变量:
   - Name: `MONGODB_URI`
   - Value: 你的 MongoDB Atlas 连接字符串
   - Environment: 选择 "Production" 和 "Preview"
5. 点击 "Save"

### 验证部署

部署后，访问健康检查端点:

```
https://your-app.vercel.app/api/health
```

## 🛡️ 安全建议

### 1. 使用强密码

- 至少 12 位
- 包含大小写字母、数字、特殊字符
- 使用密码管理器保存

### 2. 限制 IP 访问

生产环境建议:

- 只允许 Vercel 的 IP 地址
- 或使用 VPC Peering

### 3. 定期备份

- Atlas 自动备份 (免费套餐 7 天)
- 可以手动创建快照

### 4. 监控使用量

- Dashboard → Metrics 查看使用情况
- 免费套餐限制:
  - 512 MB 存储
  - 共享 RAM
  - 共享 CPU

## 📊 免费套餐限制

| 资源   | 限制     |
| ------ | -------- |
| 存储   | 512 MB   |
| RAM    | 共享     |
| CPU    | 共享     |
| 连接数 | 最大 500 |
| 备份   | 7 天     |

**对于 CMS 系统够用吗？**

- ✅ 文章管理：足够 (文本占用很小)
- ✅ 图片管理：建议配合云存储 (Cloudinary)
- ✅ 配置管理：完全足够

## 🆘 常见问题

### Q: 连接超时？

**A**: 检查:

1. 网络访问是否允许你的 IP
2. 密码是否正确
3. 防火墙设置

### Q: 认证失败？

**A**: 检查:

1. 用户名密码是否正确
2. 连接字符串格式
3. 特殊字符需要 URL 编码

### Q: 如何重置密码？

**A**:

1. Database Access → 编辑用户
2. Edit Password → 设置新密码
3. 更新所有使用该数据库的应用

### Q: 如何删除集群？

**A**:

1. 点击集群的 "..."
2. 选择 "Delete"
3. 输入集群名称确认

## 📝 连接字符串格式说明

```
mongodb+srv://用户名:密码@集群地址/数据库名?参数
```

- `mongodb+srv`: SRV 协议 (推荐)
- `用户名`: 数据库用户名
- `密码`: 数据库密码
- `集群地址`: Atlas 提供的集群地址
- `数据库名`: 要连接的数据库
- `参数`:
  - `retryWrites=true`: 重试写入
  - `w=majority`: 写入确认

## 🎯 下一步

配置完成后:

1. ✅ 运行 `npm run seed` 初始化数据
2. ✅ 测试登录功能
3. ✅ 部署到 Vercel

---

**需要帮助？**

- MongoDB 官方文档：https://www.mongodb.com/docs/atlas/
- Atlas 免费套餐：https://www.mongodb.com/pricing
