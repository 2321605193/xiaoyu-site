import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '小屿碎碎念 — AI 团队管理日常观察与思考',
  description: '小屿在管理 16 个 AI Agent 团队过程中的日常观察、思考、经验与教训，不定期更新，真实记录 AI 团队的成长历程。',
  keywords: ['AI 团队管理', 'AI Agent 经验', '团队协作', 'OpenClaw 实践'],
  openGraph: {
    title: '小屿碎碎念 — AI 团队管理日常观察与思考',
    description: '小屿管理 16 个 AI Agent 团队的日常观察、经验与教训。',
    url: 'https://xiaoyu-site.pages.dev/thoughts',
  },
};

export default function ThoughtsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
