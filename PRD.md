# 小屿个人网站 PRD v2.0

> 版本：v2.0 | 日期：2026-03-01 | 作者：小屿 🏝️ + 屿匠 🔧 | 设计：屿绘 🎨

---

## 一、项目概述

### 1.1 项目名称
小屿个人网站（xiaoyu.dev / 待定域名）

### 1.2 项目定位
小屿（🏝️）作为 AI 员工总管的个人网站，展示 16 位 AI Agent 的团队架构、能力矩阵和工作动态。兼具个人品牌展示与博客内容输出。

### 1.3 核心差异化
- 不是传统个人主页，是一个 AI 团队的「总部大厅」
- 16 Agent 团队矩阵可视化是核心卖点
- 侧重「管理者」视角，展示 AI 公司化运作模式

### 1.4 技术选型（v2 变更）

| 项目 | 选型 | 理由 |
|------|------|------|
| **框架** | **Next.js 15 (App Router)** | 全栈能力、SSR/SSG 灵活、React 生态丰富 |
| **样式** | Tailwind CSS v4 | 快速开发、设计系统友好 |
| **动效** | Framer Motion | 流畅的页面过渡和交互动画 |
| **图标** | Lucide Icons | 线性风格、与 Next.js 生态契合 |
| **字体** | Inter + 思源黑体 + JetBrains Mono | 标题/正文/代码三套字体 |
| **部署** | Vercel | Next.js 原生支持、全球 CDN、自动部署 |
| **内容** | MDX + next-mdx-remote | 博客内容管理 |

### 1.5 与 v1 的主要变更
- Astro → **Next.js**（全栈框架，支持 API Routes）
- Cloudflare Pages → **Vercel**（Next.js 原生部署平台）
- Svelte/Preact Islands → **React 组件**（统一技术栈）
- 设计方案由屿绘全新制定（深海岛屿配色 + 现代科技感）

---

## 二、设计规范（by 屿绘 🎨）

### 2.1 风格定位
**现代科技感 + 温暖人性化**
- 专业但不冰冷，有 AI 的未来感也有人格化的亲和力
- 极简克制，信息密度高但不拥挤，留白大方
- 适度微动效，让页面有生命力但不花哨

### 2.2 配色方案（深海岛屿）

| 用途 | 色值 | 说明 |
|------|------|------|
| 背景主色 | `#0F172A` | 深海蓝，稳重深邃 |
| 卡片背景 | `#1E293B` | 深灰蓝 |
| 边框/分割线 | `#334155` | 中灰蓝 |
| 品牌主色 | `#22D3EE` | 岛屿青，科技感 |
| 强调色 | `#F59E0B` | 沙金色，温暖点缀 |
| 主要文字 | `#FFFFFF` | 纯白 |
| 次要文字 | `#94A3B8` | 浅灰 |
| 在线状态 | `#22C55E` | 绿色 |
| 空闲状态 | `#EAB308` | 黄色 |
| 离线状态 | `#6B7280` | 灰色 |

**渐变：**
- 背景渐变：`linear-gradient(135deg, #0F172A, #1E293B)`
- 品牌渐变：`linear-gradient(135deg, #22D3EE, #3B82F6)`
- 金色渐变：`linear-gradient(135deg, #F59E0B, #FBBF24)`

### 2.3 字体系统

| 用途 | 字体 | 字号 |
|------|------|------|
| H1（Hero） | Inter Bold / 思源黑体 Bold | 48px |
| H2（区块标题） | Inter Bold | 32px |
| H3（卡片标题） | Inter SemiBold | 24px |
| 正文 | Inter Regular / 思源黑体 | 16px |
| 小字 | Inter Regular | 14px |
| 代码 | JetBrains Mono | 14px |

### 2.4 间距系统（8px 网格）
- 4px / 8px / 16px / 24px / 48px / 96px

### 2.5 圆角
- 小：4px（按钮、标签） | 中：8px（卡片） | 大：16px（大卡片） | 圆：50%（头像）

### 2.6 阴影与动效
- Hover 阴影：`0 8px 32px rgba(34, 211, 238, 0.2)`（青色光晕）
- 卡片 Hover：上浮 4px + 边框发光
- 过渡：200ms（快速）/ 300ms（标准）
- 缓动：`cubic-bezier(0.4, 0, 0.2, 1)`

### 2.7 参考网站
- Linear（整体风格） | Vercel（Hero 区） | Raycast（暗色+青色） | Notion（卡片布局）

---

## 三、页面结构与功能

### 3.1 首页 `/`

#### Hero 区域
- 全屏深海蓝背景，微粒子动效（轻量）
- 主标题："小屿 🏝️ — AI 员工总管"
- 副标题："16 个 AI Agent，一个总管，无限可能"
- 两个 CTA：「认识团队 ↓」|「关注公众号」
- 向下滚动视差效果

#### 团队矩阵区（核心）
- 4×4 网格展示 16 个 Agent
- 三层架构可视化（总管 → 职能层 → 平台层）
- 每张卡片：Emoji + 名字 + 职责 + 状态灯
- Hover：卡片上浮 + 青色边框发光 + 显示技能标签
- Click：展开详情面板（最近工作记录、能力详情）

**Agent 数据结构：**

| 层级 | Agent | Emoji | 职能 |
|------|-------|-------|------|
| 总管 | 小屿 | 🏝️ | 统筹全局 |
| 职能 | 屿匠 | 🔧 | 开发架构 |
| 职能 | 屿墨 | ✒️ | 内容总监 |
| 职能 | 屿绘 | 🎨 | 设计 UI/UX |
| 职能 | 屿潮 | 📈 | 增长营销 |
| 职能 | 屿算 | 💰 | 财务管理 |
| 职能 | 屿盾 | 🛡️ | 安全风控 |
| 职能 | 屿舵 | ⚙️ | 运维部署 |
| 平台 | 屿微 | 📱 | 微信公众号 |
| 平台 | 屿知 | 💡 | 知乎 |
| 平台 | 屿薯 | 📕 | 小红书 |
| 平台 | 屿推 | 🐦 | X/Twitter |
| 平台 | 屿映 | 🎬 | 短视频 |
| 平台 | 屿掘 | ⛏️ | 掘金 |
| 平台 | 屿播 | 📺 | B站/YouTube |
| 平台 | 屿风 | 🌊 | 微博 |

#### 工作动态区
- 时间轴布局，最新在上
- 每条：时间戳 + Agent Emoji + 工作内容
- 按日期分组，可折叠
- 默认展示最近 3 天

#### 项目介绍区
- 大卡片展示核心项目
- 项目封面 + 标题 + 简介 + 技术栈标签

#### Footer
- 社交链接 + 公众号二维码 + 版权信息

### 3.2 团队页 `/team`
- 顶部搜索 + 分类筛选（职能/平台）
- 4×4 网格，响应式（移动端 2 列）
- 点击进入 Agent 详情页

### 3.3 Agent 详情页 `/team/[id]`
- 大头像 + 名字 + 完整职责
- 技能列表、性格特点、协作关系图
- 最近工作日志（时间轴）

### 3.4 工作日志页 `/logs`
- 左侧日期导航 + 右侧时间轴流
- 按 Agent / 日期 / 关键词筛选
- 分页加载

### 3.5 博客 `/blog` + `/blog/[slug]`
- 列表页：文章卡片 + 标签筛选
- 详情页：MDX 渲染 + TOC 目录 + 代码高亮
- 上一篇/下一篇导航

### 3.6 关于页 `/about`
- 双栏：小屿（AI 总管） | 屿总（创始人）
- 项目故事、技术栈、联系方式

---

## 四、技术架构

### 4.1 项目结构

```
xiaoyu-site/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # 全局布局
│   │   ├── page.tsx                # 首页
│   │   ├── team/
│   │   │   ├── page.tsx            # 团队列表
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Agent 详情
│   │   ├── logs/
│   │   │   └── page.tsx            # 工作日志
│   │   ├── blog/
│   │   │   ├── page.tsx            # 博客列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # 博客详情
│   │   ├── about/
│   │   │   └── page.tsx            # 关于页
│   │   └── api/                    # API Routes
│   │       ├── logs/route.ts       # 工作日志 API
│   │       └── status/route.ts     # Agent 状态 API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── TeamMatrix.tsx
│   │   │   ├── WorkLog.tsx
│   │   │   └── Projects.tsx
│   │   ├── team/
│   │   │   ├── AgentCard.tsx
│   │   │   ├── AgentDetail.tsx
│   │   │   └── TeamGrid.tsx
│   │   └── ui/
│   │       ├── StatusDot.tsx
│   │       ├── Tag.tsx
│   │       └── Card.tsx
│   ├── data/
│   │   ├── agents.json             # Agent 数据
│   │   └── work-log.json           # 工作日志数据
│   ├── lib/
│   │   ├── mdx.ts                  # MDX 处理
│   │   └── utils.ts                # 工具函数
│   └── styles/
│       └── globals.css             # Tailwind + CSS Variables
├── content/
│   └── blog/                       # MDX 博客文章
├── public/
│   ├── images/
│   └── fonts/
├── scripts/
│   ├── extract-daily.sh            # 每日数据提取
│   └── deploy.sh                   # 部署脚本
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── README.md
```

### 4.2 关键技术决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 渲染策略 | SSG + ISR | 首页/团队页 SSG，日志页 ISR（每小时重验证） |
| 状态管理 | 无需（Server Components） | 大部分是展示型页面 |
| 动画库 | Framer Motion | React 生态最佳动画方案 |
| MDX 方案 | next-mdx-remote | 灵活、支持自定义组件 |
| 代码高亮 | Shiki | Next.js 原生支持、主题丰富 |
| 图片优化 | next/image | 自动优化、懒加载 |

### 4.3 部署架构

```
代码推送 → GitHub → Vercel 自动构建 → 全球 CDN
```

- 构建命令：`next build`
- Node 版本：20+
- 环境变量：通过 Vercel 管理

### 4.4 每日自动更新

```
16 Agent memory/ → 23:00 Cron 提取 → work-log.json → git push → Vercel 构建
```

- 脚本：`scripts/extract-daily.sh`
- 安全过滤：剔除含 token/key/password 的条目
- 输出：`src/data/work-log.json`

---

## 五、响应式设计

| 断点 | 宽度 | 团队矩阵 | 导航 |
|------|------|----------|------|
| 移动端 | <768px | 2 列 | 汉堡菜单 |
| 平板 | 768-1024px | 3 列 | 折叠 |
| 桌面 | >1024px | 4 列 | 完整展示 |

---

## 六、性能目标

| 指标 | 目标 |
|------|------|
| Lighthouse Performance | ≥ 95 |
| LCP | < 2s |
| FCP | < 1s |
| CLS | < 0.1 |
| Bundle Size (JS) | < 80KB gzipped |

---

## 七、里程碑

### Phase 1：基础框架（3 天）
- [ ] Next.js 项目初始化 + Tailwind + 配色系统
- [ ] 全局布局（Navbar + Footer）
- [ ] Hero 区域
- [ ] 部署到 Vercel

### Phase 2：核心页面（5 天）
- [ ] 团队矩阵组件（静态 + Hover 交互）
- [ ] Agent 卡片 + 详情页
- [ ] 工作动态时间轴
- [ ] 项目介绍区

### Phase 3：内容系统（3 天）
- [ ] 博客列表 + 详情页（MDX）
- [ ] 工作日志页（筛选 + 分页）
- [ ] 关于页

### Phase 4：动效与优化（3 天）
- [ ] Framer Motion 页面过渡
- [ ] 团队矩阵交互增强（连线动画、详情面板）
- [ ] 响应式适配
- [ ] SEO（meta、OG、sitemap）
- [ ] 性能优化

### Phase 5：数据管道与上线（2 天）
- [ ] 每日数据提取脚本
- [ ] 23:00 Cron 自动更新
- [ ] 域名绑定
- [ ] 上线 🚀

---

## 八、风险与待决项

| 项目 | 风险 | 应对 |
|------|------|------|
| Vercel 免费额度 | 构建次数/带宽限制 | 监控用量，必要时升级或切自建 |
| 域名 | 待确认 | 先用 Vercel 默认域名开发 |
| 工作日志格式 | memory/ 格式不统一 | 制定日志格式规范 |
| Agent 状态实时性 | 静态无法真正实时 | V1 构建时注入，V2 用 API Routes |

---

## 九、验收标准

1. 所有页面功能完整可访问
2. 团队矩阵可交互（Hover + Click 展开详情）
3. 深海岛屿设计方案还原度 ≥ 90%
4. 移动端体验流畅
5. Lighthouse 各项 ≥ 90
6. Vercel 部署成功且可访问
7. 每日自动更新管道正常运行

---

*PRD by 小屿 🏝️ + 屿匠 🔧 | 设计 by 屿绘 🎨*
