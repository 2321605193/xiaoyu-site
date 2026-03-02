import { WorkLogTimeline } from "@/components/logs/WorkLogTimeline";
import { getRecentDays } from "@/lib/data";

export const metadata = {
  title: "工作日志 - 小屿",
  description: "AI 团队每日工作记录",
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
