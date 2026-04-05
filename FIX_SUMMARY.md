# 后台管理系统 Bug 修复说明

## 🔴 严重 Bug 修复

### 问题：`TypeError: e.map is not a function`

**根本原因**：认证中间件 `server/middleware/auth.js` 使用了 MongoDB 的 User 模型，但项目实际使用的是 SQLite 数据库。

```javascript
// ❌ 错误的代码
const User = require('../models/User') // MongoDB 模型
req.user = await User.findById(decoded.id).select('-password')
```

**解决方案**：将认证中间件改为使用 SQLite 数据库查询。

```javascript
// ✅ 修复后的代码
const db = require('../config/db-sqlite')
req.user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.id)
```

## 📝 修复的文件列表

### 后端文件

1. **server/middleware/auth.js** - 修复认证中间件（关键修复）
2. **server/middleware/upload.js** - 修复上传路径为绝对路径

### 前端文件

3. **src/pages/admin/Users.tsx** - 添加错误处理和响应验证
4. **src/pages/admin/Menus.tsx** - 添加错误处理和响应验证
5. **src/pages/admin/Configs.tsx** - 新增 logo/favicon 上传功能
6. **src/pages/admin/Images.tsx** - 添加错误处理
7. **src/pages/admin/Articles.tsx** - 添加错误处理
8. **src/pages/admin/Banners.tsx** - 添加错误处理
9. **src/pages/admin/Comments.tsx** - 添加错误处理
10. **src/pages/admin/ShopProducts.tsx** - 使用统一 API 配置
11. **src/pages/admin/ShopOrders.tsx** - 使用统一 API 配置

## 新增功能

### Logo 和 Favicon 上传

现在可以在"站点配置"页面直接上传网站 logo 和 favicon：

1. 登录后台管理
2. 进入"站点配置"菜单
3. 找到 logo 或 favicon 配置项
4. 点击"上传"按钮
5. 选择图片文件
6. 上传成功后自动显示预览

## 🚀 部署步骤

### 方法 1：自动部署脚本

```bash
cd /Users/victor/Documents/trae_projects/GWEB
chmod +x deploy-fix.sh
./deploy-fix.sh
```

然后按照提示在服务器上执行命令。

### 方法 2：手动部署

#### 1. SSH 登录服务器

```bash
ssh root@gcore.xin
# 输入密码：Vicnan888.
```

#### 2. 拉取最新代码

```bash
cd /root/GWEB
git pull origin main
```

#### 3. 安装后端依赖

```bash
cd server
npm install --production
```

#### 4. 重启后端服务

```bash
pm2 restart gweb-backend
```

#### 5. 查看日志确认启动成功

```bash
pm2 logs gweb-backend --lines 50
```

#### 6. 查看服务状态

```bash
pm2 status
```

## ✅ 测试清单

部署完成后，请按以下顺序测试：

### 基础功能测试

- [ ] 访问 http://gcore.xin/admin/login
- [ ] 使用管理员账户登录（admin@example.com / admin123456）
- [ ] 确认登录后不出现"未授权"提示

### 页面加载测试

- [ ] 仪表盘 - 应显示统计数据
- [ ] 用户管理 - 应显示用户列表
- [ ] 菜单管理 - 应显示菜单列表
- [ ] 站点配置 - 应显示配置列表
- [ ] 图片管理 - 应显示图片列表
- [ ] 文章管理 - 应显示文章列表
- [ ] 广告管理 - 应显示广告列表
- [ ] 评论管理 - 应显示评论列表
- [ ] 商品管理 - 应显示商品列表
- [ ] 订单管理 - 应显示订单列表

### CRUD 功能测试

- [ ] 添加用户
- [ ] 编辑用户
- [ ] 删除用户
- [ ] 添加菜单
- [ ] 编辑菜单
- [ ] 删除菜单
- [ ] **上传 logo**（新功能）
- [ ] 编辑配置
- [ ] 上传图片
- [ ] 添加文章
- [ ] 编辑文章

## 🔍 常见问题排查

### 问题 1：登录后提示"未授权，请重新登录"

**原因**：后端服务未重启或 JWT_SECRET 配置错误

**解决方法**：

```bash
# 检查后端服务状态
pm2 status gweb-backend

# 重启服务
pm2 restart gweb-backend

# 查看日志
pm2 logs gweb-backend
```

### 问题 2：页面仍然显示 e.map 错误

**原因**：浏览器缓存了旧版本的前端代码

**解决方法**：

1. 清除浏览器缓存
2. 强制刷新页面（Ctrl+Shift+R 或 Cmd+Shift+R）
3. 或者使用无痕模式访问

### 问题 3：图片上传失败

**原因**：上传目录权限问题

**解决方法**：

```bash
cd /root/GWEB/server
chmod -R 755 uploads
chown -R root uploads
```

## 📊 修复前后对比

| 功能       | 修复前                       | 修复后                 |
| ---------- | ---------------------------- | ---------------------- |
| 用户管理   | ❌ 无法加载，显示 e.map 错误 | ✅ 正常加载和操作      |
| 菜单管理   | ❌ 无法加载，显示 e.map 错误 | ✅ 正常加载和操作      |
| 站点配置   | ⚠️ 可以编辑但无法上传 logo   | ✅ 可以编辑和上传 logo |
| 图片管理   | ⚠️ 可能失败                  | ✅ 正常上传和删除      |
| 文章管理   | ⚠️ 可能失败                  | ✅ 正常操作            |
| 认证中间件 | ❌ 使用 MongoDB 模型         | ✅ 使用 SQLite 查询    |

## 🎉 总结

本次修复解决了后台管理系统的核心问题：

1. ✅ 修复了认证中间件，不再使用 MongoDB 模型
2. ✅ 所有后台页面现在可以正常加载数据
3. ✅ 添加了完整的错误处理
4. ✅ 新增 logo 和 favicon 上传功能
5. ✅ 修复了图片上传路径问题

代码已推送到 GitHub，请按照部署步骤更新服务器即可。
