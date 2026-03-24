"use client";

import { motion } from "framer-motion";
import { FileText, Users, CheckCircle2, Zap, ArrowRight } from "lucide-react";
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
  const today = new Date()
    .toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" });
  return dateStr === today;
}

function SummaryCard({ summary }: { summary: DailySummary }) {
  const today = isToday(summary.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-sea-border/60 bg-gradient-to-br from-sea-card to-sea-card/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-sea-border"
    >
      {/* Date header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gold/10">
          <FileText size={16} className="text-accent-gold" />
        </div>
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

      {/* Summary content */}
      <p className="mb-4 leading-relaxed text-text-secondary">
        {summary.content}
      </p>

      {/* Highlights */}
      <div className="mb-4 space-y-2">
        {summary.highlights.map((highlight, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent-gold" />
            <span className="text-sm text-text-secondary">{highlight}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 border-t border-sea-border/60 pt-4">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-brand-cyan" />
          <span className="text-sm text-text-secondary">
            {summary.stats.activeAgents} 位活跃
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-accent-gold" />
          <span className="text-sm text-text-secondary">
            {summary.stats.completedTasks} 项完成
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-brand-purple" />
          <span className="text-sm text-text-secondary">
            {summary.stats.codeChanges}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function DailyReport() {
  const summaries = dailySummary.summaries.slice(0, 3);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-accent-gold to-accent-gold-light bg-clip-text text-transparent">
              工作日报
            </span>
          </h2>
          <p className="text-text-secondary">小屿视角 · 团队工作总结</p>
        </motion.div>

        {/* Summary cards */}
        <div className="space-y-6">
          {summaries.map((summary) => (
            <SummaryCard key={summary.date} summary={summary} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/daily"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-sea-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-accent-gold hover:text-accent-gold"
          >
            查看全部日报
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
