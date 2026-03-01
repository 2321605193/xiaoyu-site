import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://xiaoyu-site.pages.dev';
  
  // 静态页面
  const routes = ['', '/team', '/logs', '/blog', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // TODO: 动态添加博客文章和 Agent 详情页
  // 等 content/blog 和 agents 数据完善后补充

  return routes;
}
