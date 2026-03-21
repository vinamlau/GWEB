#!/usr/bin/env node

/**
 * 自检测试脚本
 * 检查代码质量、构建状态等
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const RESET = '\x1b[0m'

const results = {
  passed: [],
  failed: [],
  warnings: [],
}

function log(message, color = RESET) {
  console.log(`${color}${message}${RESET}`)
}

function runCheck(name, command, required = true) {
  try {
    log(`\n📋 检查：${name}`, BLUE)
    execSync(command, { stdio: 'pipe' })
    log(`✅ ${name} - 通过`, GREEN)
    results.passed.push(name)
    return true
  } catch (error) {
    if (required) {
      log(`❌ ${name} - 失败`, RED)
      results.failed.push(name)
    } else {
      log(`⚠️  ${name} - 警告`, YELLOW)
      results.warnings.push(name)
    }
    return false
  }
}

function checkFileExists(filePath, description) {
  const exists = existsSync(filePath)
  if (exists) {
    log(`✅ ${description} 存在`, GREEN)
    results.passed.push(description)
  } else {
    log(`❌ ${description} 不存在`, RED)
    results.failed.push(description)
  }
  return exists
}

// 开始自检
log('\n🔍 开始自检测试...', BLUE)
log('='.repeat(50), BLUE)

// 1. 检查必要文件
log('\n📁 检查必要文件...', BLUE)
checkFileExists('package.json', 'package.json')
checkFileExists('tsconfig.json', 'tsconfig.json')
checkFileExists('eslint.config.js', 'ESLint 配置')
checkFileExists('prettier.config.js', 'Prettier 配置')
checkFileExists('.husky/pre-commit', 'Git Hooks')
checkFileExists('lint-staged.config.js', 'lint-staged 配置')

// 2. TypeScript 类型检查
log('\n🔍 TypeScript 类型检查...', BLUE)
runCheck('TypeScript 类型检查', 'npm run type-check', true)

// 3. ESLint 代码检查
log('\n🔍 ESLint 代码检查...', BLUE)
runCheck('ESLint 代码检查', 'npm run lint', true)

// 4. Prettier 格式化检查
log('\n🔍 Prettier 格式化检查...', BLUE)
runCheck('Prettier 格式化检查', 'npm run format:check', false)

// 5. 构建检查
log('\n🔍 构建检查...', BLUE)
runCheck('项目构建', 'npm run build', true)

// 生成报告
log('\n' + '='.repeat(50), BLUE)
log('📊 自检报告', BLUE)
log('='.repeat(50), BLUE)

if (results.passed.length > 0) {
  log(`\n✅ 通过 (${results.passed.length}):`, GREEN)
  results.passed.forEach(item => log(`   - ${item}`))
}

if (results.warnings.length > 0) {
  log(`\n⚠️  警告 (${results.warnings.length}):`, YELLOW)
  results.warnings.forEach(item => log(`   - ${item}`))
}

if (results.failed.length > 0) {
  log(`\n❌ 失败 (${results.failed.length}):`, RED)
  results.failed.forEach(item => log(`   - ${item}`))
}

log('\n' + '='.repeat(50), BLUE)

// 总结
if (results.failed.length === 0) {
  log('\n🎉 自检完成！所有检查通过', GREEN)
  process.exit(0)
} else {
  log(`\n⚠️  自检完成！发现 ${results.failed.length} 个问题需要修复`, YELLOW)

  if (results.failed.includes('TypeScript 类型检查')) {
    log('\n💡 建议：运行 "npm run type-check" 查看详细类型错误', YELLOW)
  }

  if (results.failed.includes('ESLint 代码检查')) {
    log('\n💡 建议：运行 "npm run lint:fix" 尝试自动修复', YELLOW)
  }

  if (results.failed.includes('项目构建')) {
    log('\n💡 建议：运行 "npm run build" 查看详细构建错误', YELLOW)
  }

  process.exit(1)
}
