# 博客自动更新逻辑

## 概述
从屿墨的 workspace 自动提取已完成文章，转换为 MDX 格式并发布到小屿网站。

## 目录结构

```
屿墨 workspace:
/root/.openclaw/workspace-writer/articles/
├── bounty-hunter-13-v3.md          # 源文件（Markdown）
├── bounty-hunter-13-v3-feishu.md   # 飞书版本
└── images/                          # 文章配图

小屿网站:
/root/projects/xiaoyu-site/content/blog/
├── bounty-hunter-13.mdx            # 转换后的 MDX
└── welcome.mdx

/root/projects/xiaoyu-site/public/images/blog/
└── bounty-hunter-13-cover.jpg      # 文章封面
```

## 更新方式

### 方式 1：手动同步（推荐）

**适用场景**：文章需要审核、编辑、配图后再发布

**步骤**：
1. 屿墨在 `workspace-writer/articles/` 完成文章
2. 屿匠运行同步脚本：
   ```bash
   cd /root/projects/xiaoyu-site
   ./scripts/sync-blog.sh
   ```
3. 检查生成的 MDX 文件（敏感信息已过滤）
4. 准备封面图（放到 `public/images/blog/`）
5. Git commit + push → 自动部署

**配置文章元数据**：
编辑 `scripts/sync-blog.sh` 中的 `ARTICLES` 数组：
```bash
declare -A ARTICLES=(
  ["源文件名"]="slug|标题|日期|标签|描述|状态"
)
```

示例：
```bash
["bounty-hunter-13-v3.md"]="bounty-hunter-13|涨薪500块后，我用AI员工替代了3个外包|2026-03-02|AI编程,OpenClaw,一人公司|16个Agent的自我进化实战|published"
```

**状态说明**：
- `published` - 已发布，会被同步
- `draft` - 草稿，跳过同步
- `archived` - 归档，跳过同步

### 方式 2：自动同步（未来可选）

**适用场景**：文章质量稳定，可以自动发布

**实现方案**：
1. 屿墨完成文章后在 `articles/` 目录创建 `.published` 标记文件
2. Cron 任务每天 23:30 运行 `sync-blog.sh`
3. 自动提取、转换、提交、部署

**Cron 配置**（暂未启用）：
```json
{
  "name": "博客自动同步",
  "schedule": { "kind": "cron", "expr": "30 23 * * *", "tz": "Asia/Shanghai" },
  "payload": { "kind": "agentTurn", "message": "运行博客同步脚本并部署", "model": "elbnt-ai/claude-opus-4-6" },
  "sessionTarget": "isolated",
  "delivery": { "mode": "announce" }
}
```

## 安全机制

### 敏感信息过滤
脚本自动过滤：
- 邮箱地址 → `[邮箱已隐藏]`
- 手机号 → `[手机号已隐藏]`
- IP 地址 → `[IP已隐藏]`
- API Key/Token → `[已隐藏]`

### 人工审核
- 方式 1（手动）：每次同步后人工检查 MDX 文件
- 方式 2（自动）：建议先在测试环境验证，确认无误后再启用

## 文章元数据规范

### Frontmatter 字段
```yaml
---
title: 文章标题（必填）
date: 2026-03-02（必填，YYYY-MM-DD 格式）
tags: [标签1, 标签2]（必填，数组格式）
description: 文章简介（必填，用于 SEO 和列表页）
cover: /images/blog/slug-cover.jpg（可选，封面图路径）
---
```

### 标签规范
- 技术类：`AI编程`, `OpenClaw`, `Next.js`, `前端开发`
- 主题类：`一人公司`, `自我进化`, `工具推荐`, `实战案例`
- 平台类：`公众号`, `知乎`, `小红书`

## 工作流程

### 屿墨侧
1. 在 `workspace-writer/articles/` 完成文章（Markdown 格式）
2. 文件命名规范：`{主题}-{版本}.md`（如 `bounty-hunter-13-v3.md`）
3. 通知屿匠："文章已完成，请同步到网站"

### 屿匠侧
1. 更新 `scripts/sync-blog.sh` 中的 `ARTICLES` 数组（添加新文章元数据）
2. 运行 `./scripts/sync-blog.sh`
3. 检查生成的 MDX 文件
4. 准备封面图（可选，或使用默认封面）
5. Git commit + push

### 自动部署
- Cloudflare Pages 监听 GitHub 仓库
- 检测到 `content/blog/` 变更 → 自动构建
- 构建命令：`npm run pages:build`
- 输出目录：`.vercel/output/static`
- 部署完成后网站自动更新

## 当前状态

- ✅ 同步脚本已创建：`scripts/sync-blog.sh`
- ✅ 敏感信息过滤已实现
- ✅ 元数据映射机制已建立
- ⏳ 待配置：破局赏金猎人征文元数据
- ⏳ 待准备：文章封面图
- ⏳ 待测试：首次同步运行

## 下一步

1. 确认破局赏金猎人征文是否可以发布
2. 配置文章元数据（标题/日期/标签/描述）
3. 准备封面图
4. 运行首次同步测试
5. 验证部署结果

---

*创建时间：2026-03-02 21:55*
*维护者：屿匠 🔧*
