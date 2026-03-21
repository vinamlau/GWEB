#!/usr/bin/env node
/**
 * Pencil MCP Server 测试脚本
 * 用于验证服务器是否正确启动和响应
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath = join(dirname(__filename), 'dist', 'index.js');

console.log('📝 测试 Pencil MCP Server...\n');

// 启动服务器
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
});

let testPassed = false;

// 监听服务器输出
server.stderr.on('data', (data) => {
  const output = data.toString();
  console.log('服务器输出:', output);
  
  if (output.includes('已启动') || output.includes('started')) {
    console.log('✅ MCP Server 启动成功!\n');
    testPassed = true;
    
    // 发送测试请求
    const listToolsRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    };
    
    server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
    console.log('📋 发送工具列表请求...\n');
  }
});

server.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('服务器响应:', output);
  
  try {
    const response = JSON.parse(output.trim());
    if (response.result && response.result.tools) {
      console.log(`\n✅ 成功获取工具列表！共 ${response.result.tools.length} 个工具:`);
      response.result.tools.forEach((tool, index) => {
        console.log(`  ${index + 1}. ${tool.name}: ${tool.description}`);
      });
      
      console.log('\n🎉 测试完成！MCP Server 工作正常\n');
      testPassed = true;
    }
  } catch (e) {
    // 忽略解析错误
  }
});

server.on('error', (error) => {
  console.error('❌ 服务器错误:', error.message);
  testPassed = false;
});

// 5 秒后关闭服务器
setTimeout(() => {
  if (server && !server.killed) {
    server.kill();
    console.log('\n📝 测试结束\n');
    
    if (testPassed) {
      console.log('✅ 所有测试通过！');
      process.exit(0);
    } else {
      console.log('❌ 测试失败！');
      process.exit(1);
    }
  }
}, 5000);
