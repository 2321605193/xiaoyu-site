import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于屿总 — 用 OpenClaw 搭建 16 人 AI 团队的一人公司',
  description: '6 年前端开发经验，3 个月转型 AI 编程，用 OpenClaw 搭建了 16 人 AI 团队，实现从网站开发、内容创作到数据分析的完整运营闭环。',
  keywords: ['OpenClaw', 'AI 团队', '一人公司', 'AI Agent', 'AI 编程', '知屿'],
  openGraph: {
    title: '关于屿总 — 用 OpenClaw 搭建 16 人 AI 团队',
    description: '6 年前端转型 AI 编程，搭建 16 人 AI 团队，实现一人公司完整运营闭环。',
    url: 'https://xiaoyu-site.pages.dev/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
