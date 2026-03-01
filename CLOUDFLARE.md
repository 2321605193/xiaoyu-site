# Cloudflare Pages 部署配置

## 构建设置

- **构建命令**: `npx @cloudflare/next-on-pages@1`
- **构建输出目录**: `.vercel/output/static`
- **Node 版本**: 20.x

## 环境变量

无需配置（静态站点）

## 部署流程

1. 推送代码到 GitHub
2. Cloudflare Pages 自动检测到更新
3. 执行构建命令
4. 部署到 CDN

## 注意事项

- Next.js 15 + App Router 完全支持
- SSG 页面会在构建时生成
- 动态路由（如 `/team/[id]`）通过 `generateStaticParams` 预渲染
