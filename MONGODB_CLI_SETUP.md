# 🔧 MongoDB Atlas CLI 安装和配置指南

## ⚠️ 当前状态

由于网络原因，CLI 工具自动安装失败。请按照以下步骤手动安装。

---

## 📦 方式一：使用 Homebrew 安装 (推荐)

### 步骤 1: 修复 Homebrew 权限

```bash
sudo chown -R $(whoami) /usr/local/*
```

### 步骤 2: 安装 MongoDB Atlas CLI

```bash
brew tap mongodb/brew
brew install mongodb-atlas
```

### 步骤 3: 验证安装

```bash
mongocli --version
```

---

## 📦 方式二：手动下载安装

### 步骤 1: 下载

访问：https://www.mongodb.com/docs/atlas/cli/stable/install-atlas-cli/

选择 macOS 版本下载。

### 步骤 2: 解压并安装

```bash
cd ~/Downloads
tar -xzf mongocli-darwin-universal-*.tar.gz
sudo mv mongocli-darwin-universal-* /usr/local/bin/mongocli
sudo chmod +x /usr/local/bin/mongocli
```

### 步骤 3: 验证

```bash
mongocli --version
```

---

## 🚀 使用 CLI 配置 MongoDB Atlas

安装完成后，运行自动配置脚本:

```bash
chmod +x scripts/setup-mongodb-cli.sh
./scripts/setup-mongodb-cli.sh
```

---

## 📝 手动配置步骤 (如果脚本失败)

### 1. 登录

```bash
mongocli auth login
```

会打开浏览器让你登录。

### 2. 创建集群

```bash
mongocli clusters create gweb-cluster \
  --provider AWS \
  --region ap-southeast-1 \
  --tier M0 \
  --mdbVersion 7.0
```

### 3. 创建数据库用户

```bash
mongocli dbusers create \
  --username gweb_admin \
  --password YOUR_PASSWORD \
  --role readWriteAnyDatabase
```

### 4. 配置网络访问

```bash
mongocli accessList create 0.0.0.0/0
```

### 5. 获取连接字符串

```bash
mongocli clusters connectionStrings describe gweb-cluster
```

### 6. 更新配置文件

编辑 `server/.env`:

```env
MONGODB_URI=你的连接字符串
```

---

## 🎯 快速命令参考

| 命令                                                | 说明           |
| --------------------------------------------------- | -------------- |
| `mongocli auth login`                               | 登录 Atlas     |
| `mongocli auth whoami`                              | 查看当前用户   |
| `mongocli clusters list`                            | 列出所有集群   |
| `mongocli clusters describe NAME`                   | 查看集群详情   |
| `mongocli clusters connectionStrings describe NAME` | 获取连接字符串 |
| `mongocli dbusers list`                             | 列出数据库用户 |
| `mongocli accessList list`                          | 列出 IP 白名单 |

---

## ✅ 验证配置

### 检查集群状态

```bash
mongocli clusters describe gweb-cluster
```

应该看到 `"state" : "IDLE"`

### 测试连接

```bash
cd server
npm run seed
npm run dev
```

---

## 🔍 常见问题

### Q: 无法连接 GitHub?

**A**: 使用方式二手动下载，或使用 VPN。

### Q: 命令不存在？

**A**: 确保 `/usr/local/bin` 在 PATH 中:

```bash
export PATH="/usr/local/bin:$PATH"
```

### Q: 权限错误？

**A**: 使用 sudo 或修复 Homebrew 权限。

---

## 📞 需要帮助？

- 官方文档：https://www.mongodb.com/docs/atlas/cli/stable/
- 项目文档：查看 `MONGODB_QUICK_START.md`

---

**安装完成后运行 `./scripts/setup-mongodb-cli.sh` 自动配置!** 🎉
