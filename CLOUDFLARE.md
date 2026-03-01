# Cloudflare Pages 部署配置

## 构建设置

- **构建命令**: `npm run pages:build`
- **构建输出目录**: `.vercel/output/static`
- **Node 版本**: 20.x

## 环境变量

无需配置（静态站点）

## 部署流程

1. 推送代码到 GitHub
2. Cloudflare Pages 自动检测到更新
3. 执行 `npm run pages:build`（内部调用 `@cloudflare/next-on-pages`）
4. 部署到 CDN

## 注意事项

- Next.js 15.5.2（兼容 `@cloudflare/next-on-pages` 最新版）
- SSG 页面会在构建时生成
- 动态路由（如 `/team/[id]`）通过 `generateStaticParams` 预渲染
- `.npmrc` 配置了 `legacy-peer-deps=true` 以解决依赖冲突
