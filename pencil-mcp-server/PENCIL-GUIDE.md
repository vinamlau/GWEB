# Pencil 设计工具使用指南

## 什么是 Pencil？

Pencil 是一个**基于 MCP (Model Context Protocol) 的画布式 AI 辅助设计工具**，可以直接集成到你的 IDE 中。

**核心特点：**
- 🎨 在 IDE 中直接进行矢量设计
- 🔄 设计与代码实时同步
- 🤖 AI 助手帮助保持设计与代码一致性
- 📦 支持 .pen 文件格式和组件系统

## Pencil 的安装方式

### 方式一：IDE 插件（推荐）

Pencil 主要作为 IDE 插件使用：

1. **Trae IDE**
   - 打开扩展市场
   - 搜索 "Pencil" 或 "Pencil.dev"
   - 安装并重启 IDE

2. **VS Code**
   - 打开扩展面板 (Ctrl+Shift+X)
   - 搜索 "Pencil"
   - 安装扩展

3. **JetBrains IDEs**
   - 打开 Settings → Plugins
   - 搜索 "Pencil"
   - 安装并重启 IDE

### 方式二：MCP Server

Pencil 本身就是基于 MCP 协议设计的，可以通过 MCP 集成：

1. **使用官方 MCP Server**（如果有）
   ```bash
   npm install -g @pencil/mcp-server
   ```

2. **使用自定义 MCP Server**
   - 本项目提供的 `pencil-mcp-server` 就是一个实现
   - 可以调用 Pencil 的各项功能

## 关于 Pencil CLI

⚠️ **重要说明**：

根据我们的调研，Pencil 主要通过以下方式工作：

1. **IDE 插件**：提供可视化设计界面
2. **MCP 协议**：提供与 AI 助手的集成
3. **.pen 文件**：设计文件的存储格式

**Pencil 可能没有独立的 CLI 工具**，而是通过：
- IDE 插件的图形界面
- MCP 工具调用
- .pen 文件的直接操作

## 使用本项目（Pencil MCP Server）

本项目的 `pencil-mcp-server` 实现了 Pencil 的 MCP 工具封装，可以让你：

### 1. 在 AI 对话中使用 Pencil

配置好 MCP Server 后，你可以在 Trae 的聊天窗口中说：
- "帮我创建一个按钮组件"
- "导出所有设计为 React 代码"
- "预览当前的设计组件"

### 2. 工作流程

```
AI 助手 → MCP Server → Pencil 功能 → 返回结果
```

### 3. 注意事项

⚠️ **重要**：
- 本 MCP Server 需要 Pencil 的核心功能支持
- 可能需要先安装 Pencil IDE 插件
- .pen 文件需要 Pencil 运行时支持

## 替代方案

如果 Pencil 不可用，可以考虑以下替代方案：

### 1. Figma
- 业界领先的设计工具
- 提供 API 和插件系统
- 可以导出代码

### 2. Penpot
- 开源设计工具
- 支持 SVG 格式
- 可以自托管

### 3. Excalidraw
- 手绘风格设计工具
- 开源免费
- 支持导出

## 下一步

1. **确认 Pencil 的可用性**
   - 访问 [Pencil.dev](https://pencil.dev) 查看官方文档
   - 检查是否有 IDE 插件可用

2. **配置 MCP**
   - 如果 Pencil 可用，使用本项目的 MCP Server
   - 按照 README.md 配置 MCP

3. **开始设计**
   - 在 IDE 中打开 Pencil
   - 创建你的第一个 .pen 组件
   - 同步到代码

## 相关链接

- [Pencil 官方文档](https://docs.pencil.dev/)
- [MCP 协议](https://modelcontextprotocol.io/)
- [本项目 README](./README.md)
