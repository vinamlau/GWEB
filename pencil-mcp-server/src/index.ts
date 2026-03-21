#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { exec } from 'child_process'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

const execAsync = promisify(exec)

interface PencilTool {
  name: string
  description: string
  inputSchema: {
    type: 'object'
    properties: Record<
      string,
      {
        type: string
        description: string
      }
    >
    required?: string[]
  }
}

// 定义 Pencil 工具
const pencilTools: PencilTool[] = [
  {
    name: 'pencil-init',
    description: '初始化 Pencil 项目，创建 .pen 文件配置',
    inputSchema: {
      type: 'object',
      properties: {
        projectName: {
          type: 'string',
          description: '项目名称',
        },
        framework: {
          type: 'string',
          description: '前端框架 (react, vue, vanilla 等)',
        },
      },
      required: ['projectName'],
    },
  },
  {
    name: 'pencil-create',
    description: '创建新的设计组件 (.pen 文件)',
    inputSchema: {
      type: 'object',
      properties: {
        componentName: {
          type: 'string',
          description: '组件名称',
        },
        type: {
          type: 'string',
          description: '组件类型 (button, input, card 等)',
        },
        path: {
          type: 'string',
          description: '保存路径',
        },
      },
      required: ['componentName'],
    },
  },
  {
    name: 'pencil-sync',
    description: '同步设计文件与代码',
    inputSchema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          description: '要同步的 .pen 文件路径',
        },
        output: {
          type: 'string',
          description: '输出目录',
        },
      },
    },
  },
  {
    name: 'pencil-export',
    description: '导出设计为代码或资源',
    inputSchema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          description: '.pen 文件路径',
        },
        format: {
          type: 'string',
          description: '导出格式 (react, vue, css, svg 等)',
        },
        output: {
          type: 'string',
          description: '输出目录',
        },
      },
      required: ['file', 'format'],
    },
  },
  {
    name: 'pencil-preview',
    description: '预览设计组件',
    inputSchema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          description: '要预览的 .pen 文件路径',
        },
        port: {
          type: 'string',
          description: '预览服务器端口',
        },
      },
      required: ['file'],
    },
  },
]

// 检查 Pencil CLI 是否可用
async function isPencilAvailable(): Promise<boolean> {
  try {
    const { stderr } = await execAsync('pencil --version 2>&1')
    return !stderr.includes('not found') && !stderr.includes('command not found')
  } catch {
    return false
  }
}

// 模拟模式：创建示例 .pen 文件
function createMockPenFile(componentName: string, type: string = 'component'): string {
  const penContent = {
    name: componentName,
    type: type,
    version: '1.0.0',
    design: {
      width: 100,
      height: 100,
      elements: [
        {
          type: 'rectangle',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          fill: '#3498db',
        },
      ],
    },
    code: {
      framework: 'react',
      exports: ['default'],
    },
  }
  return JSON.stringify(penContent, null, 2)
}

// 执行 Pencil CLI 命令
async function executePencilCommand(args: string[]): Promise<{ stdout: string; stderr: string }> {
  try {
    const { stdout, stderr } = await execAsync(`pencil ${args.join(' ')}`)
    return { stdout, stderr }
  } catch (error: any) {
    return {
      stdout: error.stdout || '',
      stderr: error.stderr || error.message,
    }
  }
}

// 模拟执行（当 Pencil CLI 不可用时）
function executeMockCommand(name: string, args: any): { stdout: string; stderr: string } {
  switch (name) {
    case 'pencil-init': {
      const configDir = join(process.cwd(), '.pencil')
      if (!existsSync(configDir)) {
        mkdirSync(configDir, { recursive: true })
      }
      const configFile = join(configDir, 'config.json')
      writeFileSync(
        configFile,
        JSON.stringify(
          {
            projectName: args.projectName,
            framework: args.framework || 'react',
            version: '1.0.0',
          },
          null,
          2,
        ),
      )
      return {
        stdout: `✅ Pencil 项目 "${args.projectName}" 初始化成功!\n配置文件：${configFile}\n\n下一步：使用 pencil-create 创建组件`,
        stderr: '',
      }
    }

    case 'pencil-create': {
      const componentName = args.componentName
      const type = args.type || 'component'
      const outputPath = args.path || join(process.cwd(), 'components')

      if (!existsSync(outputPath)) {
        mkdirSync(outputPath, { recursive: true })
      }

      const penFile = join(outputPath, `${componentName}.pen`)
      writeFileSync(penFile, createMockPenFile(componentName, type))

      return {
        stdout: `✅ 组件 "${componentName}" 创建成功!\n文件：${penFile}\n类型：${type}\n\n下一步：在 IDE 中编辑 .pen 文件`,
        stderr: '',
      }
    }

    case 'pencil-sync': {
      return {
        stdout: `✅ 设计文件已同步到代码\n\n注意：这是模拟模式，需要安装 Pencil IDE 插件以获得完整功能`,
        stderr: '',
      }
    }

    case 'pencil-export': {
      const format = args.format || 'react'
      const outputDir = args.output || join(process.cwd(), 'exported')

      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true })
      }

      const exampleCode =
        format === 'react'
          ? `import React from 'react';\n\nexport default function Component() {\n  return (\n    <div style={{ width: 100, height: 100, background: '#3498db' }}>\n      Component\n    </div>\n  );\n}\n`
          : format === 'vue'
            ? `<template>\n  <div :style="{ width: '100px', height: '100px', background: '#3498db' }">\n    Component\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'Component'\n}\n</script>\n`
            : `/* ${format} export */\n.component {\n  width: 100px;\n  height: 100px;\n  background: #3498db;\n}\n`

      const outputFile = join(
        outputDir,
        `Component.${format === 'react' ? 'tsx' : format === 'vue' ? 'vue' : 'css'}`,
      )
      writeFileSync(outputFile, exampleCode)

      return {
        stdout: `✅ 设计已导出为 ${format.toUpperCase()} 代码\n文件：${outputFile}\n\n注意：这是示例代码，实际导出需要 Pencil IDE 插件`,
        stderr: '',
      }
    }

    case 'pencil-preview': {
      const port = args.port || '3000'
      return {
        stdout: `✅ 预览服务器启动中...\n端口：${port}\n\n🌐 打开 http://localhost:${port} 查看预览\n\n注意：这是模拟模式，需要 Pencil IDE 插件支持`,
        stderr: '',
      }
    }

    default:
      return {
        stdout: '',
        stderr: `未知命令：${name}`,
      }
  }
}

// 创建 MCP Server
const server = new Server(
  {
    name: 'pencil-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

// 处理工具列表请求
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: pencilTools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  }
})

// 处理工具调用请求
server.setRequestHandler(CallToolRequestSchema, async request => {
  const { name, arguments: args } = request.params

  console.error(`调用工具：${name}`, args)

  try {
    // 检查 Pencil 是否可用
    const pencilAvailable = await isPencilAvailable()

    let result: { stdout: string; stderr: string }

    if (pencilAvailable) {
      // 使用真实的 Pencil CLI
      let command: string[] = []

      switch (name) {
        case 'pencil-init':
          command = ['init', (args as any).projectName]
          if ((args as any).framework) {
            command.push('--framework', (args as any).framework)
          }
          break

        case 'pencil-create':
          command = ['create', (args as any).componentName]
          if ((args as any).type) {
            command.push('--type', (args as any).type)
          }
          if ((args as any).path) {
            command.push('--path', (args as any).path)
          }
          break

        case 'pencil-sync':
          command = ['sync']
          if ((args as any).file) {
            command.push((args as any).file)
          }
          if ((args as any).output) {
            command.push('--output', (args as any).output)
          }
          break

        case 'pencil-export':
          command = ['export', (args as any).file, '--format', (args as any).format]
          if ((args as any).output) {
            command.push('--output', (args as any).output)
          }
          break

        case 'pencil-preview':
          command = ['preview', (args as any).file]
          if ((args as any).port) {
            command.push('--port', (args as any).port)
          }
          break

        default:
          throw new Error(`未知工具：${name}`)
      }

      result = await executePencilCommand(command)
    } else {
      // 使用模拟模式
      console.error('⚠️ Pencil CLI 未找到，使用模拟模式')
      result = executeMockCommand(name, args || {})
    }

    return {
      content: [
        {
          type: 'text',
          text: result.stdout || result.stderr || '命令执行成功',
        },
      ],
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `执行失败：${error.message}`,
        },
      ],
      isError: true,
    }
  }
})

// 启动服务器
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)

  const pencilAvailable = await isPencilAvailable()
  console.error('📝 Pencil MCP Server 已启动')
  console.error(
    `模式：${pencilAvailable ? '✅ Pencil CLI 模式' : '⚠️ 模拟模式 (需要安装 Pencil IDE 插件)'}`,
  )
}

main().catch(error => {
  console.error('服务器启动失败:', error)
  process.exit(1)
})
