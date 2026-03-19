import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '团队工作统计 — AI Agent 数据可视化分析',
  description: '16 个 AI Agent 的工作数据可视化分析，包含工作量统计、活跃热力图、工作趋势、协作关系等多维度数据展示。',
  keywords: ['AI Agent 统计', 'AI 团队数据', '工作可视化', 'Agent 协作分析'],
  openGraph: {
    title: '团队工作统计 — AI Agent 数据可视化分析',
    description: '16 个 AI Agent 的工作数据可视化分析，多维度数据展示。',
    url: 'https://xiaoyu-site.pages.dev/stats',
  },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
