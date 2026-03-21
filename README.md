# GWEB

React + Vite + TypeScript 项目，部署在 Vercel 上。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📦 项目结构

```
GWEB/
├── src/                  # 源代码目录
│   ├── App.tsx          # 主应用组件
│   ├── App.css          # 应用样式
│   ├── main.tsx         # 入口文件
│   └── index.css        # 全局样式
├── components/           # 自定义组件
│   └── Button.pen       # Pencil 设计组件
├── pencil-mcp-server/    # Pencil MCP Server
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── vercel.json          # Vercel 部署配置
```

## 🛠️ 技术栈

- **React 19** - UI 库
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Vercel** - 部署平台

## 🎨 设计工具

本项目使用 [Pencil](https://pencil.dev) 进行设计：

- 设计文件：`components/Button.pen`
- MCP Server：`pencil-mcp-server/`

## 🌐 部署

### GitHub + Vercel 自动部署

1. 代码已推送到 GitHub
2. 在 Vercel 导入 GitHub 仓库
3. 自动部署到：`https://gweb.vercel.app`

### 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

## 📝 开发工作流

1. 使用 Pencil 设计组件
2. 导出为 React 代码
3. 在 `src/` 目录中开发
4. Git 提交并推送
5. Vercel 自动部署

## 🔗 相关链接

- [Vercel 文档](https://vercel.com/docs)
- [Vite 文档](https://vitejs.dev)
- [React 文档](https://react.dev)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

## 📄 License

MIT
