# 贡献指南

感谢您对 GameHub 项目的关注！我们欢迎所有形式的贡献，包括代码提交、文档改进、问题报告和功能建议。本指南将帮助您了解如何参与贡献。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
  - [问题报告](#问题报告)
  - [功能建议](#功能建议)
  - [代码贡献](#代码贡献)
- [开发流程](#开发流程)
  - [环境设置](#环境设置)
  - [分支策略](#分支策略)
  - [提交规范](#提交规范)
  - [Pull Request](#pull-request)
- [编码规范](#编码规范)
- [测试](#测试)
- [文档](#文档)
- [版本控制](#版本控制)

## 行为准则

GameHub 项目遵循开源社区标准行为准则。我们期望所有参与者尊重彼此，营造友好、包容的协作环境。不允许任何形式的歧视、侮辱、骚扰或其他不当行为。

## 如何贡献

### 问题报告

如果您发现了 bug 或者遇到问题，请按照以下步骤提交问题报告：

1. 检查现有 issues，避免重复报告
2. 使用 issue 模板，提供以下信息：
   - 问题的简洁描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 屏幕截图（如适用）
   - 环境信息（浏览器版本、操作系统等）

### 功能建议

我们欢迎您提出新功能建议，请按照以下步骤提交：

1. 检查现有 issues 和 roadmap，确保功能尚未计划或实现
2. 使用功能请求模板，提供以下信息：
   - 功能描述
   - 使用场景
   - 可能的实现方案
   - 为什么这个功能对项目有价值

### 代码贡献

如果您希望贡献代码，请按照以下步骤操作：

1. Fork 仓库
2. 创建功能分支（`feature/your-feature-name`）或修复分支（`fix/issue-number`）
3. 编写代码，确保遵循[编码规范](#编码规范)
4. 添加测试并确保所有测试通过
5. 提交变更，遵循[提交规范](#提交规范)
6. 推送到您的 Fork 仓库
7. 创建 Pull Request

## 开发流程

### 环境设置

1. 克隆仓库
   ```bash
   git clone https://github.com/your-username/games-hub.git
   cd games-hub
   ```

2. 安装依赖
   ```bash
   # 前端
   cd frontend
   npm install
   
   # 后端
   cd ../backend
   npm install
   ```

3. 设置环境变量（参见各自目录中的 README.md）

4. 启动开发服务器
   ```bash
   # 前端
   cd frontend
   npm run dev
   
   # 后端
   cd ../backend
   npm run dev
   ```

### 分支策略

我们采用以下分支策略：

- `main`: 稳定版本分支，只接受经过审核的 PR
- `develop`: 开发分支，所有功能和修复合并到此分支
- `feature/*`: 新功能分支，从 `develop` 分支创建
- `fix/*`: 修复分支，从 `develop` 分支创建
- `release/*`: 发布分支，从 `develop` 分支创建，合并到 `main` 和 `develop`

### 提交规范

请遵循以下提交消息格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

其中：

- `type`: 提交类型，如 feat, fix, docs, style, refactor, test, chore
- `scope`: 变更范围，如 frontend, backend, auth, games
- `subject`: 变更简述，使用现在时态，不要大写首字母，不要句号结尾
- `body`: 详细说明，解释为什么和如何变更
- `footer`: 关闭 issue 或破坏性变更说明

示例：
```
feat(games): add search by tag feature

Implement game search by tag functionality to improve user experience.
Users can now filter games by clicking on tags.

Closes #123
```

### Pull Request

提交 PR 时，请确保：

1. PR 标题遵循[提交规范](#提交规范)
2. PR 描述中包含变更说明和对应的 issue 链接
3. 所有自动化检查和测试通过
4. 代码已经经过自我审查
5. 如涉及 UI 变更，提供屏幕截图
6. 如涉及数据模型变更，说明迁移策略

## 编码规范

我们使用 ESLint 和 Prettier 确保代码质量和一致性。请在提交前运行：

```bash
# 前端
cd frontend
npm run lint
npm run format

# 后端
cd ../backend
npm run lint
npm run format
```

其他规范：
- 使用 TypeScript 类型系统，避免 `any` 类型
- 组件使用函数式组件和 Hooks
- 保持组件职责单一
- 使用有意义的变量和函数名称
- 添加必要注释，但避免过度注释
- 定期移除未使用的代码和依赖

## 测试

我们重视测试，请确保添加适当的测试：

- 前端：Jest 和 React Testing Library
- 后端：Jest 和 Supertest

运行测试：

```bash
# 前端
cd frontend
npm test

# 后端
cd ../backend
npm test
```

## 文档

良好的文档对项目至关重要：

- 更新 README.md 以反映主要变更
- 为新功能添加用户文档
- 为 API 端点添加或更新文档注释
- 为复杂功能添加代码注释

## 版本控制

我们使用语义化版本（[SemVer](https://semver.org/)）：

- 主版本号（X.0.0）：不兼容的 API 变更
- 次版本号（0.X.0）：向后兼容的新功能
- 修订号（0.0.X）：向后兼容的 bug 修复

---

再次感谢您的贡献！如有任何问题，请通过 issue 联系我们。

© 2023-2024 GameHub. All rights reserved. 