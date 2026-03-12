# FRONTEND.md

> 前端开发规范总纲。初期项目只需本文件，复杂后可按需拆分详细规范到 `frontend/` 子目录。

## 技术栈

- 框架：Next.js 15 (App Router)
- 语言：TypeScript 5.x（严格模式）
- 构建工具：Next.js 内置（Turbopack）
- 样式方案：Tailwind CSS + Shadcn/UI
- 状态管理：Zustand
- 认证授权：NextAuth + CASL
- 表单方案：React Hook Form + Zod
- 测试方案：待配置（建议 Vitest + Playwright）

## 核心约束

### 组件开发
- 优先复用 Shadcn/UI 组件，不重复造基础组件
- 基础组件放 `src/shared/ui`，业务组件放业务模块内
- 一个组件一个职责，复杂逻辑抽到 hooks
- 优先使用 React Server Components，需要交互时使用 Client Components

### 样式规则
- 统一使用 Tailwind CSS
- 禁止硬编码颜色、间距、字号，使用 Tailwind 工具类
- 不混用其他 CSS 方案（CSS Modules、Styled Components 等）
- 响应式设计优先考虑 PC 端（Centos/Ubuntu + Firefox），兼顾移动端

### 状态管理
- UI 局部状态放组件内（useState）
- 跨页面共享状态放 Zustand store
- 筛选/分页/排序等可分享状态优先放 URL（useSearchParams）
- 服务端状态优先使用 React Server Components

### 数据请求
- 请求统一通过 BFF 层（`app/api/`）
- 禁止页面组件直接请求后端微服务
- Server Components 直接调用后端 API
- Client Components 通过 fetch 调用 BFF 层 API
- 所有请求处理 loading、error、empty 三态

### 表单规则
- 使用 React Hook Form + Zod 校验
- 表单提交态、禁用态、错误提示必须完整
- 不允许无反馈的异步提交
- 表单校验规则集中定义在 schema 文件

### 认证授权
- 使用 NextAuth 处理认证
- 使用 CASL 处理权限控制
- 权限检查在 Server Components 或 Middleware 中进行
- 敏感操作必须有权限校验

## 禁止事项
- 禁止组件内直接请求后端微服务
- 禁止复制粘贴已有组件后另起一套
- 禁止跳过类型错误直接提交
- 禁止在 Client Components 中处理敏感数据

## 目录约定

```txt
src/
├── app/
│   ├── api/              # BFF 层 API Routes
│   ├── (auth)/           # 认证相关页面
│   ├── (dashboard)/      # 主应用页面
│   └── layout.tsx
├── features/
│   ├── chat/
│   │   ├── components/   # 业务组件
│   │   ├── hooks/        # 业务 hooks
│   │   └── types.ts      # 类型定义
│   └── knowledge/
├── entities/
│   ├── user/
│   └── document/
├── shared/
│   ├── ui/               # Shadcn/UI 组件
│   ├── lib/              # 工具函数
│   ├── hooks/            # 通用 hooks
│   └── types/            # 共享类型
└── generated/
```

## 命名约定

- 组件文件：PascalCase（`UserProfile.tsx`）
- 工具函数：camelCase（`formatDate.ts`）
- 类型文件：`types.ts` 或 `*.types.ts`
- hooks：`use` 前缀（`useAuth.ts`）
- API Routes：kebab-case（`app/api/chat-history/route.ts`）

## 详细规范（按需创建）

当项目复杂度增加时，可将详细规范拆分到：
- `frontend/components.md` - 组件开发详细规范
- `frontend/state.md` - 状态管理详细规范
- `frontend/api.md` - API 请求层详细规范
- `frontend/styling.md` - 样式开发详细规范
