# 自检测试系统使用指南

## 📋 概述

本项目已配置完整的自检测试系统，可在开发过程中自动检测代码质量问题并提供修复建议。

## 🛠️ 可用命令

### 代码检查

```bash
# 运行 ESLint 检查
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix

# 运行 Prettier 格式化
npm run format

# 检查 Prettier 格式化（不修改）
npm run format:check
```

### 类型检查

```bash
# 运行 TypeScript 类型检查
npm run type-check
```

### 构建验证

```bash
# 运行完整构建检查
npm run build:check
```

### 自检报告

```bash
# 运行完整的自检测试
npm run self-check
```

## 📊 自检系统功能

### 1. 文件检查

- ✅ package.json
- ✅ tsconfig.json
- ✅ ESLint 配置
- ✅ Prettier 配置
- ✅ Git Hooks
- ✅ lint-staged 配置

### 2. 代码质量检查

- TypeScript 类型检查
- ESLint 代码规范检查
- Prettier 格式化检查
- 导入顺序检查

### 3. 构建验证

- 项目构建测试
- 输出文件验证

### 4. 报告生成

- 详细的问题列表
- 修复建议
- 通过/失败统计

## 🎯 开发工作流

### 保存文件时

VS Code 会自动：

1. 运行 Prettier 格式化
2. 运行 ESLint 自动修复
3. 显示错误和警告

### 提交代码时

Git pre-commit hook 会自动：

1. 检查暂存的文件
2. 运行 ESLint 修复
3. 运行 Prettier 格式化
4. 如果有无法修复的错误，阻止提交

### 手动检查

```bash
# 运行完整自检
npm run self-check

# 如果发现问题，先尝试自动修复
npm run lint:fix
npm run format

# 再次检查
npm run self-check
```

## 📝 示例输出

### 成功情况

```
🔍 开始自检测试...
==================================================

📁 检查必要文件...
✅ package.json 存在
✅ tsconfig.json 存在
...

🔍 TypeScript 类型检查...
✅ TypeScript 类型检查 - 通过

🔍 ESLint 代码检查...
✅ ESLint 代码检查 - 通过

🔍 构建检查...
✅ 项目构建 - 通过

==================================================
📊 自检报告
==================================================

✅ 通过 (9):
   - package.json
   - tsconfig.json
   - ESLint 配置
   - Prettier 配置
   - Git Hooks
   - lint-staged 配置
   - TypeScript 类型检查
   - ESLint 代码检查
   - 项目构建

🎉 自检完成！所有检查通过
```

### 失败情况

```
❌ ESLint 代码检查 - 失败

==================================================
⚠️  自检完成！发现 1 个问题需要修复

💡 建议：运行 "npm run lint:fix" 尝试自动修复
```

## 🔧 配置说明

### ESLint 配置 (eslint.config.js)

- 使用 TypeScript ESLint
- React Hooks 规则
- Prettier 集成
- 导入排序

### Prettier 配置 (prettier.config.js)

- 单引号
- 无分号
- 100 字符行宽
- 2 空格缩进

### Git Hooks (.husky/pre-commit)

- 运行 lint-staged
- 只检查暂存文件
- 自动修复格式问题

### VS Code 集成 (.vscode/settings.json)

- 保存时格式化
- 保存时 ESLint 修复
- 实时错误提示

## 🚨 常见问题

### Q: ESLint 报错怎么办？

A: 先运行 `npm run lint:fix` 尝试自动修复，如果还有错误，根据提示手动修复。

### Q: Prettier 格式化失败？

A: 运行 `npm run format` 进行格式化，然后重新检查。

### Q: TypeScript 类型错误？

A: 运行 `npm run type-check` 查看详细错误信息，根据提示修复类型问题。

### Q: 构建失败？

A: 运行 `npm run build` 查看详细错误，通常是 TypeScript 错误或导入路径问题。

## 💡 最佳实践

1. **频繁运行自检**：每次提交前都运行 `npm run self-check`
2. **及时修复问题**：发现问题立即修复，不要累积
3. **使用自动修复**：优先使用 `npm run lint:fix` 和 `npm run format`
4. **查看报告**：仔细阅读自检报告，理解每个问题

## 📚 相关文档

- [ESLint 文档](https://eslint.org/docs/user-guide/getting-started)
- [Prettier 文档](https://prettier.io/docs/en/index.html)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Husky 文档](https://typicode.github.io/husky/)

---

**最后更新**: 2026-03-22  
**版本**: 1.0.0
