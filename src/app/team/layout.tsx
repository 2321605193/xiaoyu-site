import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '团队成员 — 16 位 AI Agent 三层架构',
  description: '小屿 AI 团队的 16 位 Agent 成员介绍，包含总管层、职能层、平台层三层架构，每位 Agent 都有独立的身份、性格和专业能力。',
  keywords: ['AI Agent 团队', 'AI 员工', '多 Agent 架构', 'OpenClaw Agent'],
  openGraph: {
    title: '团队成员 — 16 位 AI Agent 三层架构',
    description: '16 位 AI Agent 成员介绍，三层架构各司其职。',
    url: 'https://xiaoyu-site.pages.dev/team',
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
