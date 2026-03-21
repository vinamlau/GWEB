# Pencil MCP Server

这是一个将 Pencil 设计工具 CLI 集成到 MCP (Model Context Protocol) 的服务器。

## 功能特性

- ✅ 在 IDE 中直接使用 Pencil 设计工具
- ✅ 通过 AI 助手创建和管理设计组件
- ✅ 自动同步设计与代码
- ✅ 支持多种前端框架 (React, Vue 等)

## 安装步骤

### 1. 安装 Pencil IDE 插件

Pencil 是一个基于 MCP 的设计工具，需要先安装 IDE 插件：

**方法一：通过 Trae IDE 扩展市场**
1. 打开 Trae IDE
2. 进入扩展市场 (Extensions)
3. 搜索 "Pencil"
4. 点击安装

**方法二：从官网下载**
访问 [Pencil.dev 官网](https://pencil.dev) 下载最新的 IDE 插件

**方法三：使用 MCP 配置**
如果你已经有 Pencil MCP 服务，可以直接配置（见下方 MCP 配置部分）

### 2. 安装 MCP Server 依赖

```bash
cd pencil-mcp-server
npm install
npm run build
```

### 3. 配置 MCP 客户端

#### Trae IDE 配置

在你的 MCP 配置文件中添加：

```json
{
  "mcpServers": {
    "pencil": {
      "command": "node",
      "args": ["/absolute/path/to/pencil-mcp-server/dist/index.js"],
      "cwd": "/absolute/path/to/pencil-mcp-server"
    }
  }
}
```

**注意**: 请将 `/absolute/path/to/pencil-mcp-server` 替换为实际路径。

#### Cursor 配置

在 `.cursor/settings.json` 中添加：

```json
{
  "mcp": {
    "servers": {
      "pencil": {
        "command": "node",
        "args": ["/absolute/path/to/pencil-mcp-server/dist/index.js"]
      }
    }
  }
}
```

## 可用工具

### 1. pencil-init
初始化 Pencil 项目

**参数**:
- `projectName` (必需): 项目名称
- `framework` (可选): 前端框架 (react, vue, vanilla)

**示例**:
```
初始化一个 React 项目，名为 my-design
```

### 2. pencil-create
创建新的设计组件

**参数**:
- `componentName` (必需): 组件名称
- `type` (可选): 组件类型 (button, input, card)
- `path` (可选): 保存路径

**示例**:
```
创建一个名为 SubmitButton 的按钮组件
```

### 3. pencil-sync
同步设计文件与代码

**参数**:
- `file` (可选): .pen 文件路径
- `output` (可选): 输出目录

**示例**:
```
同步所有设计文件到代码
```

### 4. pencil-export
导出设计为代码

**参数**:
- `file` (必需): .pen 文件路径
- `format` (必需): 导出格式 (react, vue, css, svg)
- `output` (可选): 输出目录

**示例**:
```
将 Button.pen 导出为 React 组件
```

### 5. pencil-preview
预览设计组件

**参数**:
- `file` (必需): .pen 文件路径
- `port` (可选): 预览端口

**示例**:
```
预览 Button.pen 组件
```

## 使用示例

### 在 Trae 中使用

1. 配置好 MCP Server 后重启 Trae
2. 在聊天窗口中，你可以直接说：
   - "帮我创建一个按钮组件"
   - "导出所有设计为 React 代码"
   - "预览当前的设计组件"

### 开发工作流

```
1. 使用 pencil-init 初始化项目
2. 使用 pencil-create 创建组件设计
3. 在 Pencil IDE 插件中编辑设计
4. 使用 pencil-sync 同步到代码
5. 使用 pencil-export 导出最终代码
```

## 开发模式

```bash
# 开发模式（无需编译）
npm run dev

# 生产模式
npm run build
npm start
```

## 故障排除

### Pencil CLI 未找到
确保 Pencil CLI 已全局安装并且在 PATH 中：
```bash
pencil --version
```

### MCP Server 未启动
检查日志输出：
```bash
tail -f ~/.trae/logs/mcp.log
```

### 工具调用失败
确保 .pen 文件路径正确，并且文件格式有效。

## 注意事项

⚠️ **重要**: 
- Pencil CLI 需要先单独安装
- 确保文件路径使用绝对路径
- 首次使用需要初始化项目

## 相关链接

- [Pencil 官方文档](https://docs.pencil.dev/)
- [MCP 协议文档](https://modelcontextprotocol.io/)
- [MCP SDK](https://github.com/modelcontextprotocol/sdk)

## License

MIT
