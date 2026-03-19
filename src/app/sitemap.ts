import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://xiaoyu-site.pages.dev';

  // 静态页面
  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/team', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/daily', priority: 0.7, changeFrequency: 'daily' as const },
    { path: '/logs', priority: 0.6, changeFrequency: 'daily' as const },
    { path: '/stats', priority: 0.6, changeFrequency: 'daily' as const },
    { path: '/thoughts', priority: 0.5, changeFrequency: 'weekly' as const },
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 博客文章
  try {
    const posts = getAllPosts();
    const blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    routes.push(...blogRoutes);
  } catch {
    // 博客数据不可用时跳过
  }

  return routes;
}
