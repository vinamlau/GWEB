# Tasks

- [x] Task 1: 安装和配置代码检查工具
  - [x] Subtask 1.1: 安装 ESLint 及相关插件
  - [x] Subtask 1.2: 安装 Prettier 及相关插件
  - [x] Subtask 1.3: 配置 ESLint 规则
  - [x] Subtask 1.4: 配置 Prettier 规则

- [x] Task 2: 配置 TypeScript 严格检查
  - [x] Subtask 2.1: 更新 tsconfig 启用严格模式
  - [x] Subtask 2.2: 配置类型检查脚本

- [x] Task 3: 设置 Git Hooks
  - [x] Subtask 3.1: 安装和配置 Husky
  - [x] Subtask 3.2: 安装和配置 lint-staged
  - [x] Subtask 3.3: 创建 pre-commit hook

- [x] Task 4: 创建自检脚本
  - [x] Subtask 4.1: 创建代码检查脚本
  - [x] Subtask 4.2: 创建构建验证脚本
  - [x] Subtask 4.3: 创建自检报告生成脚本

- [x] Task 5: 配置 VS Code 集成
  - [x] Subtask 5.1: 创建 VS Code 设置
  - [x] Subtask 5.2: 配置保存时自动修复

- [x] Task 6: 测试和验证
  - [x] Subtask 6.1: 测试代码检查功能
  - [x] Subtask 6.2: 测试 Git hooks
  - [x] Subtask 6.3: 验证自检报告

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 1, Task 2]
- [Task 6] depends on [Task 3, Task 4, Task 5]
