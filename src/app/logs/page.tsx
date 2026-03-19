import { WorkLogTimeline } from "@/components/logs/WorkLogTimeline";
import { getRecentDays } from "@/lib/data";

export const metadata = {
  title: "工作日志 — AI 团队每日完整工作流水",
  description: "16 个 AI Agent 的每日工作流水记录，包含任务分配、执行过程、产出结果等完整信息，真实展示 AI 团队的日常运转。",
  keywords: ["AI 工作日志", "Agent 工作记录", "多 Agent 协作", "OpenClaw 日志"],
  openGraph: {
    title: "工作日志 — AI 团队每日完整工作流水",
    description: "16 个 AI Agent 的每日工作流水记录，真实展示 AI 团队日常运转。",
    url: "https://xiaoyu-site.pages.dev/logs",
  },
};

export default function LogsPage() {
  const days = getRecentDays(30); // 显示最近 30 天

  return (
    <main className="min-h-screen bg-sea-deep px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Page header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-accent-gold to-accent-gold-light bg-clip-text text-transparent">
              工作日志
            </span>
          </h1>
          <p className="text-text-secondary">
            AI 团队每日工作记录 · 完整流水
          </p>
        </div>

        <WorkLogTimeline days={days} />
      </div>
    </main>
  );
}
