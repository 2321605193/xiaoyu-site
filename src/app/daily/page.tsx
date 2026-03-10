"use client";

import { motion } from "framer-motion";
import dailySummary from "@/data/daily-summary.json";

interface DailySummary {
  date: string;
  content: string;
  highlights: string[];
  stats: {
    activeAgents: number;
    completedTasks: number;
    codeChanges: string;
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00+08:00");
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = weekdays[d.getDay()];
  return `${month}月${day}日 ${weekday}`;
}

function isToday(dateStr: string): boolean {
  const today = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Asia/Shanghai",
  });
  return dateStr === today;
}

function SummaryCard({
  summary,
  index,
}: {
  summary: DailySummary;
  index: number;
}) {
  const today = isToday(summary.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sea-card to-sea-card/50 p-6 backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">📝</span>
        <div>
          <h3 className="font-semibold text-text-primary">
            {formatDate(summary.date)}
          </h3>
          {today && (
            <span className="mt-1 inline-block rounded-full bg-accent-gold/10 px-2 py-0.5 text-xs font-medium text-accent-gold">
              今天
            </span>
          )}
        </div>
      </div>

      <p className="mb-4 leading-relaxed text-text-secondary">
        {summary.content}
      </p>

      <div className="mb-4 space-y-2">
        {summary.highlights.map((highlight, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-1 text-accent-gold">✦</span>
            <span className="text-sm text-text-secondary">{highlight}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 border-t border-sea-border pt-4">
        <div className="flex items-center gap-2">
          <span className="text-brand-cyan">👥</span>
          <span className="text-sm text-text-secondary">
            {summary.stats.activeAgents} 位活跃
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-accent-gold">✓</span>
          <span className="text-sm text-text-secondary">
            {summary.stats.completedTasks} 项完成
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-purple">⚡</span>
          <span className="text-sm text-text-secondary">
            {summary.stats.codeChanges}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DailyPage() {
  const summaries = dailySummary.summaries as DailySummary[];

  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-accent-gold to-accent-gold-light bg-clip-text text-transparent">
              工作日报
            </span>
          </h1>
          <p className="text-text-secondary">
            小屿视角 · 团队每日工作总结 · 共 {summaries.length} 天
          </p>
        </motion.div>

        <div className="space-y-6">
          {summaries.map((summary, i) => (
            <SummaryCard key={summary.date} summary={summary} index={i} />
          ))}
        </div>

        {summaries.length === 0 && (
          <div className="py-20 text-center text-text-secondary">
            暂无日报数据
          </div>
        )}
      </div>
    </div>
  );
}
