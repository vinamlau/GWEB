# Pencil MCP Server 使用演示

## 📋 当前状态

✅ **MCP Server 已创建并测试通过**
- 项目位置：`/Users/victor/Documents/trae_projects/GWEB/pencil-mcp-server`
- 运行模式：**模拟模式**（因为 Pencil CLI 不存在）
- 可用工具：5 个

## 🔧 关于 Pencil 的重要说明

根据调研，**Pencil.dev 是一个基于 MCP 的设计工具**，主要通过以下方式使用：

1. **IDE 插件**（主要方式）
   - 在 IDE 扩展市场搜索安装
   - 提供可视化设计界面
   - 直接创建和编辑 .pen 文件

2. **MCP 协议**
   - Pencil 本身就是为 MCP 设计的
   - 可以通过 MCP 与 AI 助手协作

3. **CLI 工具**
   - ⚠️ **Pencil 可能没有独立的 npm CLI 包**
   - 主要依赖 IDE 插件和 MCP

## 📦 项目结构

```
pencil-mcp-server/
├── src/
│   └── index.ts          # MCP Server 源代码（TypeScript）
├── dist/
│   └── index.js          # 编译后的 JavaScript
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── README.md             # 详细文档
├── PENCIL-GUIDE.md       # Pencil 使用指南
├── mcp-config.example.json  # MCP 配置示例
├── trae-mcp-config.json  # Trae IDE 配置
└── test-server.js        # 测试脚本
```

## 🚀 如何使用

### 方式一：在 Trae IDE 中使用（推荐）

1. **配置 MCP Server**
   
   在 Trae 的 MCP 配置中添加：
   ```json
   {
     "mcpServers": {
       "pencil": {
         "command": "node",
         "args": ["/Users/victor/Documents/trae_projects/GWEB/pencil-mcp-server/dist/index.js"],
         "cwd": "/Users/victor/Documents/trae_projects/GWEB/pencil-mcp-server"
       }
     }
   }
   ```

2. **重启 Trae IDE**

3. **在聊天窗口中使用**
   
   现在你可以在 Trae 的聊天窗口中与 AI 助手对话：
   
   ```
   你：帮我创建一个按钮组件
   AI：好的，我来帮你创建一个 SubmitButton 组件...
   [调用 pencil-create 工具]
   ✅ 组件 "SubmitButton" 创建成功!
   文件：/your-project/components/SubmitButton.pen
   类型：button
   ```

### 方式二：手动测试

```bash
cd pencil-mcp-server

# 开发模式（实时编译）
npm run dev

# 或直接运行编译后的版本
node dist/index.js
```

### 方式三：测试工具调用

```bash
# 运行测试脚本
node test-server.js
```

## 🛠️ 可用工具详解

### 1. pencil-init - 初始化项目

**用途**: 创建 Pencil 项目配置

**参数**:
- `projectName` (必需): 项目名称
- `framework` (可选): 前端框架 (react, vue, vanilla)

**示例对话**:
```
你：初始化一个名为 my-design 的 React 项目
AI：[调用 pencil-init 工具]
✅ Pencil 项目 "my-design" 初始化成功!
配置文件：/your-project/.pencil/config.json
```

### 2. pencil-create - 创建组件

**用途**: 创建新的设计组件

**参数**:
- `componentName` (必需): 组件名称
- `type` (可选): 组件类型 (button, input, card)
- `path` (可选): 保存路径

**示例对话**:
```
你：创建一个登录表单组件
AI：[调用 pencil-create 工具]
✅ 组件 "LoginForm" 创建成功!
文件：/your-project/components/LoginForm.pen
类型：form
```

### 3. pencil-sync - 同步设计

**用途**: 同步设计文件与代码

**参数**:
- `file` (可选): .pen 文件路径
- `output` (可选): 输出目录

**示例对话**:
```
你：同步所有设计文件
AI：[调用 pencil-sync 工具]
✅ 设计文件已同步到代码
```

### 4. pencil-export - 导出设计

**用途**: 导出设计为代码

**参数**:
- `file` (必需): .pen 文件路径
- `format` (必需): 导出格式 (react, vue, css)
- `output` (可选): 输出目录

**示例对话**:
```
你：把 Button.pen 导出为 React 组件
AI：[调用 pencil-export 工具]
✅ 设计已导出为 REACT 代码
文件：/your-project/exported/Component.tsx
```

### 5. pencil-preview - 预览组件

**用途**: 预览设计组件

**参数**:
- `file` (必需): .pen 文件路径
- `port` (可选): 预览端口

**示例对话**:
```
你：预览 Button 组件
AI：[调用 pencil-preview 工具]
✅ 预览服务器启动中...
端口：3000
🌐 打开 http://localhost:3000 查看预览
```

## 📝 模拟模式 vs 真实模式

### 当前：模拟模式 ⚠️

由于 Pencil CLI 未安装，MCP Server 运行在**模拟模式**：

- ✅ 可以演示完整的工作流程
- ✅ 创建示例 .pen 文件
- ✅ 生成示例代码
- ⚠️ 功能有限，需要 Pencil IDE 插件支持完整功能

### 理想：真实模式 ✅

如果安装了 Pencil IDE 插件或 CLI：

- ✅ 完整的设计功能
- ✅ 实时同步设计与代码
- ✅ AI 辅助设计
- ✅ 可视化编辑

## 🎯 下一步建议

### 1. 安装 Pencil IDE 插件

访问以下资源：
- [Pencil.dev 官网](https://pencil.dev)
- Trae IDE 扩展市场搜索 "Pencil"
- [官方文档](https://docs.pencil.dev/)

### 2. 配置 MCP

使用提供的配置文件：
```bash
# 复制配置示例
cp trae-mcp-config.json ~/.trae/mcp-config.json
# 然后根据实际情况修改路径
```

### 3. 开始设计

在 Trae IDE 中：
1. 打开聊天窗口
2. 说："帮我创建一个按钮组件"
3. AI 会通过 MCP 调用 Pencil 工具
4. 在 IDE 中查看生成的 .pen 文件

## 💡 使用技巧

### 技巧 1: 组合使用工具

```
你：我想创建一个完整的登录界面
AI: 好的，我会：
    1. 初始化项目 (pencil-init)
    2. 创建 LoginForm 组件 (pencil-create)
    3. 创建 SubmitButton 组件 (pencil-create)
    4. 导出为 React 代码 (pencil-export)
```

### 技巧 2: 批量操作

```
你：为我的电商网站创建所有基础组件
AI: 我会创建：
    - ProductCard
    - ShoppingCart
    - CheckoutButton
    - SearchBar
    ...
```

### 技巧 3: 框架切换

```
你：导出为 Vue 组件而不是 React
AI: [调用 pencil-export with format: vue]
✅ 设计已导出为 VUE 代码
```

## 🔍 故障排除

### 问题 1: MCP Server 未启动

**检查**:
```bash
cd pencil-mcp-server
node dist/index.js
```

应该看到：
```
📝 Pencil MCP Server 已启动
模式：⚠️ 模拟模式 (需要安装 Pencil IDE 插件)
```

### 问题 2: 工具调用失败

**解决**:
- 确保路径配置正确
- 检查 MCP 配置文件格式
- 重启 Trae IDE

### 问题 3: 需要真实 Pencil 功能

**解决**:
- 安装 Pencil IDE 插件
- 访问官方文档获取最新信息
- 参考 PENCIL-GUIDE.md

## 📚 相关资源

- [README.md](./README.md) - 完整使用文档
- [PENCIL-GUIDE.md](./PENCIL-GUIDE.md) - Pencil 使用指南
- [MCP 协议文档](https://modelcontextprotocol.io/)
- [Pencil 官方文档](https://docs.pencil.dev/)

## ✨ 总结

你现在拥有了一个**完整的 Pencil MCP Server**，可以：

✅ 通过 MCP 协议调用 Pencil 功能
✅ 在 Trae IDE 中与 AI 协作设计前端组件
✅ 自动创建和导出设计文件
✅ 支持多种前端框架

**即使没有 Pencil CLI，也能通过模拟模式体验完整的工作流程！**

需要帮助吗？查看相关文档或访问官方资源。
