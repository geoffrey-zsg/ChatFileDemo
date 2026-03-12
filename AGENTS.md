# AGENTS.md

> 这是所有 AI Agent 的入口文档。职责是导航，不是包办一切。

## 项目信息
- 项目名称：ChatFileDemo
- 项目目标：企业级 RAG 知识库产品（toB，面向半导体行业内网用户）
- 当前阶段：初始化阶段
- 技术栈：Next.js 15 (App Router) + Shadcn/UI + Tailwind + Zustand + NextAuth + CASL

## 核心规则

### 技术约束
- 使用 TypeScript 严格模式
- 状态管理：Zustand
- 样式方案：Tailwind CSS + Shadcn/UI
- 认证授权：NextAuth + CASL
- 请求层：统一通过 BFF 层（Next.js API Routes），禁止页面直接请求后端微服务
- 目标环境：PC 端优先（Centos/Ubuntu + Firefox），兼顾移动端

### 质量门槛
- 提交前必须通过：lint + typecheck + test
- 新增功能必须补充测试或说明无法自动化的原因
- 破坏性变更必须更新 CHANGELOG.md

### 架构边界
- 遵循 `docs/ARCHITECTURE.md` 定义的分层规则
- 禁止跨层级直接依赖
- 生成代码（如 `src/generated`）禁止手动修改
- BFF 层职责明确：API 聚合、流转换、多租户路由、安全清洗

## 默认流程
1. 先阅读本文件和相关文档
2. 根据任务类型读取相关文档（见下方文档地图）
3. 优先复用现有模式，做最小改动
4. 完成后运行校验命令并修复失败项
5. 引入新模式时同步更新文档

## 常用命令
```bash
# 开发
npm run dev

# 校验
npm run lint
npm run typecheck
npm run test

# 构建
npm run build
```

## 文档地图

### 必读文档
- `CLAUDE.md` - Claude 专用执行细则
- `docs/ARCHITECTURE.md` - 系统架构与分层规则
- `docs/FRONTEND.md` - 前端开发规范总纲

### 按需阅读
- `docs/技术栈及项目背景.md` - 详细的技术栈和业务背景

## 多Agent协作规则

### 何时可以并行
- ✅ 不同 feature 模块的独立开发
- ✅ 有明确类型契约的前后端分离任务
- ✅ 独立的工具函数/组件开发
- ❌ 同一个文件的修改
- ❌ 有强依赖关系的任务（需先完成依赖）

### 契约定义要求
- **类型契约**：接口类型必须先定义（TypeScript interface）
- **API契约**：使用 Swagger/OpenAPI schema
- **组件契约**：props 必须明确类型定义
- **状态契约**：全局状态结构必须预先设计

### 文件边界规则
- 各 Agent 只修改分配给自己的文件
- 共享类型定义文件由一个 Agent 负责
- 如需修改共享文件，必须先协调

### 集成验证
- 各 Agent 完成后必须通过：`npm run typecheck`
- 集成前运行：`npm run test`
- 最终验证：`npm run build`

### 冲突处理
- 发现依赖冲突时，立即暂停并通知
- 不要尝试"猜测"其他 Agent 的实现
- 优先串行，确认瓶颈后再并行

## 禁止事项
- 不要修改与任务无关的文件
- 不要绕过现有组件体系新造基础组件
- 不要在未更新文档的情况下引入新的全局模式
- 不要跳过失败的类型检查或测试
- 不要在页面组件中直接请求后端微服务（必须通过 BFF 层）
