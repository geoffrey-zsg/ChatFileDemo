# ARCHITECTURE.md

## 1. 文档目的

本文档用于定义项目的系统边界、目录分层、依赖方向和核心架构约束。它的目标不是解释全部业务，而是让人和 AI 在改动代码前快速知道：

- 系统按什么维度拆分
- 模块之间如何依赖
- 哪些边界不能跨
- 新功能应该落在哪一层

## 2. 项目概览

- 项目名称：ChatFileDemo
- 业务目标：企业级 RAG 知识库产品，面向半导体行业内网用户
- 当前阶段：初始化阶段
- 核心技术栈：Next.js 15 (App Router) + TypeScript + Shadcn/UI + Tailwind + Zustand

## 3. 架构原则

- 按业务模块或领域组织代码，而不是按技术类型随意堆文件。
- 依赖方向单向流动，低层不依赖高层。
- 外部数据必须在边界处做类型校验和转换。
- 共享能力集中沉淀，避免业务模块之间复制实现。
- 优先让架构规则可检查，而不是只写文字约束。

## 4. 目录结构

```txt
src/
├── app/              # Next.js App Router 目录
│   ├── api/          # BFF 层 API Routes
│   ├── (routes)/     # 页面路由
│   └── layout.tsx    # 根布局
├── features/         # 按业务模块拆分
│   ├── chat/         # 聊天对话功能
│   ├── knowledge/    # 知识库管理
│   └── auth/         # 认证授权
├── entities/         # 可跨模块复用的核心业务实体
│   ├── user/
│   ├── document/
│   └── conversation/
├── shared/           # 通用组件、工具、hooks
│   ├── ui/           # 基础 UI 组件（Shadcn/UI）
│   ├── lib/          # 工具函数
│   ├── hooks/        # 通用 hooks
│   └── types/        # 共享类型定义
└── generated/        # 自动生成代码，禁止手改
```

说明：

- `app/`：Next.js App Router 目录，负责路由和 BFF 层 API
- `app/api/`：BFF 层，负责 API 聚合、流转换、安全清洗
- `features/`：页面和业务流程的主要落点
- `entities/`：跨业务模块共享的业务对象和核心模型
- `shared/`：与具体业务弱相关的通用能力
- `generated/`：由脚本或契约生成的代码

## 5. 分层规则

推荐依赖方向：

```txt
app -> features -> entities -> shared
```

约束：

- `shared` 不能依赖 `features`
- `entities` 不能依赖具体页面实现
- `features` 间避免直接互相调用内部实现
- `app` 负责组装，不负责写业务逻辑

## 5.1 模块边界（支持多Agent并行）

### 清晰边界
- `features/` 下各模块相互独立，可并行开发
- `shared/` 为稳定的公共层，变更需谨慎
- 跨模块通信通过类型化的事件/API，不直接调用

### 依赖规则
- `features` → `shared` ✅
- `features` → `entities` ✅
- `shared` → `features` ❌
- `features` ↔ `features` ❌（通过 `shared` 或 `entities` 中转）

### 并行开发指南
- 不同 `features/` 模块可由不同 Agent 并行开发
- `shared/` 和 `entities/` 的修改需要串行或明确协调
- 新增共享能力时，先定义类型契约，再并行实现使用方

## 6. BFF 层职责

BFF 层位于 `app/api/`，职责包括：

- **胶水层**：聚合多个后端 API（如同时获取用户信息+未读消息），为 UI 提供干净的数据
- **流转换**：将后端的原始数据流转换为前端友好的 SSE 流
- **多租户路由**：利用 Middleware 识别子域名，注入租户 ID（未来扩展能力）
- **安全清洗**：隐藏后端真实 IP，CSRF 防护，敏感词流式遮蔽

约束：
- 页面组件禁止直接请求后端微服务
- 所有后端请求必须通过 BFF 层
- BFF 层 API 必须有明确的类型定义

## 7. 数据边界

- 所有接口响应在 BFF 层或 schema 层完成解析。
- 页面组件不直接处理原始后端返回结构。
- 表单输入在提交前统一校验。
- URL 参数、Local Storage、Query 参数都视为不可信输入。

## 8. 状态划分

- 全局状态：使用 Zustand（用户信息、主题、全局配置）
- 页面级状态：React useState/useReducer
- 表单状态：React Hook Form
- 服务端状态：通过 BFF 层获取，优先使用 React Server Components

推荐原则：

- 短生命周期状态优先本地化。
- 服务端状态和客户端派生状态分离。
- 不在多个层级维护同一份业务状态副本。

## 9. 核心约束

- 禁止在页面组件中直接请求后端微服务。
- 禁止跨业务模块引用私有实现。
- 禁止手改 `generated/` 下文件。
- 禁止为了单个页面方便绕过共享基础设施。

## 10. 新功能落点指南

当新增一个功能时，默认判断顺序：

1. 是否属于已有业务模块
2. 是否可复用已有实体模型
3. 是否应该进入共享层
4. 是否需要补充新的架构说明

## 11. 质量与守门

- 架构边界通过 ESLint 规则检查。
- 生成代码通过脚本统一更新。
- 关键路径通过自动化测试保证。
- 发现新模式后同步更新本文档。
