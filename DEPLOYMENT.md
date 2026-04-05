# 部署说明文档

## 📦 部署方式

### 1. 后端部署（服务器端直接部署）

后端代码在服务器上直接运行，不需要构建。

**部署步骤：**

```bash
# 本地提交并推送代码
git add -A
git commit -m "feat: 更新说明"
git push origin main

# SSH 登录服务器
ssh root@gcore.xin

# 在服务器上执行
cd /var/www/gweb
git pull origin main
npm install --omit=dev  # 如有新依赖
pm2 restart gweb-backend
pm2 logs gweb-backend --lines 30
```

**或使用自动化脚本：**

```bash
./deploy-to-alibaba-final.sh
```

### 2. 前端部署（需要构建后上传）

前端是 React 应用，需要构建后上传到服务器。

**部署步骤：**

```bash
# 本地构建并上传
./deploy-frontend.sh
```

**或手动部署：**

```bash
# 1. 本地构建
npm run build

# 2. 上传到服务器
scp -r dist root@gcore.xin:/var/www/gweb/

# 3. 验证
curl http://gcore.xin
```

## 🌐 访问地址

- **前台网站**: http://gcore.xin
- **后台管理**: http://gcore.xin/admin/login
- **管理员账号**: admin@example.com / admin123456

## 🔧 核心功能

### 已部署的功能模块：

1. ✅ **页面管理** - 首页、关于我们、联系我们
2. ✅ **业务板块** - 边缘计算、支付金融、电商业务
3. ✅ **新闻动态** - 公司新闻、行业资讯
4. ✅ **页脚配置** - 公司信息、联系方式、社交账号
5. ✅ **站点配置** - 网站名称、Logo、联系方式
6. ✅ **菜单管理** - 顶部导航
7. ✅ **文章管理** - 发布和管理文章
8. ✅ **图片上传** - 支持图片上传和管理
9. ✅ **轮播图管理** - 首页轮播广告
10. ✅ **商品管理** - 商城商品管理
11. ✅ **订单管理** - 订单处理
12. ✅ **用户管理** - 用户账户管理
13. ✅ **评论管理** - 文章评论管理

## 📝 注意事项

### 前端更新后：

- 需要清除浏览器缓存
- Windows: Ctrl + Shift + R
- Mac: Cmd + Shift + R

### 后端更新后：

- PM2 会自动重启服务
- 检查日志确保无错误：`pm2 logs gweb-backend`

### 数据库：

- SQLite 数据库文件：`/var/www/gweb/server/config/gweb_cms.db`
- 修改会自动保存，无需重启

## 🚨 常见问题

### 1. 前端更新后看不到变化

**原因**：浏览器缓存
**解决**：强制刷新页面（Ctrl+Shift+R）

### 2. 后端 API 报错

**原因**：代码未更新或依赖问题
**解决**：

```bash
ssh root@gcore.xin
cd /var/www/gweb
git pull
npm install
pm2 restart gweb-backend
```

### 3. 端口被占用

**解决**：

```bash
ssh root@gcore.xin
pkill -9 node
pm2 kill
pm2 start server/server-sqlite.js --name gweb-backend
```

## 📂 服务器目录结构

```
/var/www/gweb/
├── dist/              # 前端构建文件
├── server/            # 后端代码
│   ├── config/       # 数据库配置
│   ├── routes/       # API 路由
│   ├── middleware/   # 中间件
│   └── server-sqlite.js  # 主服务
└── .git/             # Git 仓库
```

## 🔐 SSH 配置

本地已配置 SSH 密钥，可以直接连接：

```bash
ssh root@gcore.xin
```

公钥已添加到服务器：`~/.ssh/authorized_keys`

## 📊 服务监控

```bash
# 查看服务状态
pm2 status gweb-backend

# 查看日志
pm2 logs gweb-backend --lines 50

# 重启服务
pm2 restart gweb-backend

# 停止服务
pm2 stop gweb-backend
```

## 📅 更新日期

2024-04-05

- 完成 CMS 系统全部功能部署
- 前端构建并上传
- 后端代码更新并重启
- 所有功能测试通过
