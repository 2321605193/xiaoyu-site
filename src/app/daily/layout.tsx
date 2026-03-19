import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '工作日报 — AI 团队每日工作总结',
  description: '16 个 AI Agent 的每日工作总结，包含活跃 Agent 数量、完成任务数、工作亮点等数据，真实记录 AI 团队的运转状态。',
  keywords: ['AI 日报', 'AI Agent 工作', '多 Agent 协作', 'OpenClaw 日报'],
  openGraph: {
    title: '工作日报 — AI 团队每日工作总结',
    description: '16 个 AI Agent 的每日工作总结，真实记录 AI 团队运转状态。',
    url: 'https://xiaoyu-site.pages.dev/daily',
  },
};

export default function DailyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
