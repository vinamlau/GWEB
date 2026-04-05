# 测试说明 - 首页和新闻页面

## 问题诊断

后台编辑的内容前台不显示，可能的原因：

1. ✅ **后端 API 正常** - 所有 API 返回 200
2. ✅ **前端代码正常** - 构建无错误
3. ✅ **Nginx 配置正常** - 配置已优化
4. ⚠️ **浏览器缓存** - 最可能的原因

## 已完成的修复

1. **修复首页动态内容**
   - Home.tsx 现在会从 API 获取内容
   - 支持后台编辑后实时同步
   - 添加了 CSS 样式支持

2. **优化 Nginx 缓存配置**
   - HTML 文件不缓存（no-cache）
   - JS/CSS 文件可以缓存（带 hash 文件名）
   - API 请求不缓存

3. **重启后端服务**
   - 清除端口占用
   - PM2 服务正常运行

## 测试步骤

### 1. 清除浏览器缓存

**最重要的一步！**

#### Chrome:

1. 按 `F12` 打开开发者工具
2. 右键点击刷新按钮
3. 选择"清空缓存并硬性重新加载"

或：

- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

#### Safari:

1. 开发 → 清空缓存
2. 或按 `Cmd + Option + E`

### 2. 测试首页

1. 访问：http://gcore.xin
2. 查看是否显示后台编辑的内容

### 3. 测试新闻页

1. 访问：http://gcore.xin/news
2. 查看新闻列表是否正常

### 4. 后台编辑测试

1. 登录后台：http://gcore.xin/admin/login
2. 账号：admin@example.com / admin123456
3. 进入"页面管理"
4. 编辑"首页"
5. 修改一些内容
6. 保存
7. 回到前台刷新（Ctrl+Shift+R）
8. 查看新内容

## 验证 API

如果仍然有问题，先验证 API 是否正常：

```bash
# 测试首页 API
curl http://gcore.xin/api/pages/home

# 测试新闻页 API
curl http://gcore.xin/api/pages/news

# 测试健康检查
curl http://gcore.xin/api/health
```

## 常见问题

### Q: 编辑后看不到变化

**A:** 99% 是浏览器缓存问题！

- 按 `Ctrl+Shift+R` 强制刷新
- 或清除浏览器缓存

### Q: 页面显示空白

**A:** 打开浏览器控制台（F12）查看错误

- 检查 Console 标签的错误信息
- 检查 Network 标签的 API 请求

### Q: API 返回错误

**A:** 检查后端服务

```bash
ssh root@gcore.xin
pm2 logs gweb-backend --lines 50
```

## 技术细节

### 前端工作原理

1. **首页（Home.tsx）**
   - 组件加载时调用 `/api/pages/home`
   - 如果后台有编辑内容，显示 HTML 内容
   - 如果没有，显示默认设计

2. **新闻页（News.tsx）**
   - 调用 `/api/articles` 获取文章列表
   - 显示公司新闻和行业资讯

3. **实时更新**
   - 后台保存时触发 `pageUpdated` 事件
   - 前台监听事件并自动刷新

### Nginx 缓存策略

```nginx
# HTML 文件 - 不缓存
location ~* \.html$ {
    add_header Cache-Control 'no-store, no-cache, must-revalidate';
    expires off;
}

# 静态资源 - 长期缓存（文件名带 hash）
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|wasm)$ {
    expires 1y;
    add_header Cache-Control 'public, immutable';
    access_log off;
}
```

## 联系支持

如果以上步骤都无法解决问题，请提供：

1. 浏览器控制台截图（F12 → Console）
2. Network 请求截图（F12 → Network）
3. 访问的具体 URL
