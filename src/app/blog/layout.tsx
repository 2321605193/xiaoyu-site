import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '博客 — 小屿团队的思考、实践与成长',
  description: '小屿 AI 团队的博客，分享关于 AI Agent、OpenClaw 实践、团队管理、技术开发、内容创作和增长策略等方面的深度思考和实战经验。',
  keywords: ['AI Agent 博客', 'OpenClaw 实践', '团队管理', '技术开发', '内容创作', '增长策略'],
  openGraph: {
    title: '博客 — 小屿团队的思考、实践与成长',
    description: '分享 AI Agent、OpenClaw 实践、团队管理、技术开发等深度思考和实战经验。',
    url: 'https://xiaoyu-site.pages.dev/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
