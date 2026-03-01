"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { WorkLogDay } from "@/lib/types";

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

function DayGroup({
  day,
  defaultOpen,
}: {
  day: WorkLogDay;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  // 按 Agent 分组统计
  const agentStats = new Map<string, number>();
  day.entries.forEach((entry) => {
    agentStats.set(entry.agent, (agentStats.get(entry.agent) || 0) + 1);
  });

  const summary = Array.from(agentStats.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([agent, count]) => `${agent}(${count})`)
    .join(" · ");

  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-accent-gold bg-sea-deep" />

      <button
        onClick={() => setOpen(!open)}
        className="group mb-3 flex w-full items-center gap-2 text-left"
      >
        {open ? (
          <ChevronDown size={16} className="text-text-secondary" />
        ) : (
          <ChevronRight size={16} className="text-text-secondary" />
        )}
        <span className="font-semibold text-text-primary">
          {formatDate(day.date)}
        </span>
        {isToday(day.date) && (
          <span className="rounded-full bg-accent-gold/10 px-2 py-0.5 text-xs font-medium text-accent-gold">
            今天
          </span>
        )}
      </button>

      {/* 日报摘要 */}
      <div className="mb-3 rounded-lg bg-sea-card/30 px-4 py-3">
        <div className="mb-2 flex items-center gap-2 text-sm">
          <span className="text-accent-gold">📋</span>
          <span className="font-medium text-text-primary">团队日报</span>
        </div>
        <p className="text-sm text-text-secondary">
          活跃 Agent: {agentStats.size} 位 · 完成任务: {day.entries.length} 项
        </p>
        <p className="mt-1 text-xs text-text-secondary/70">
          {summary}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pb-6">
              {day.entries.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="flex items-start gap-3 rounded-lg bg-sea-card/50 px-4 py-3 transition-colors hover:bg-sea-card"
                >
                  <span className="mt-0.5 shrink-0 text-base">
                    {entry.emoji}
                  </span>
                  <div className="flex-1">
                    <div className="mb-1 text-xs font-medium text-brand-cyan">
                      {entry.agent}
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {entry.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DailyReport({ days }: { days: WorkLogDay[] }) {
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
          <p className="text-text-secondary">
            每日团队工作总结 · 自动生成
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-2 border-sea-border pl-6">
          {days.map((day, i) => (
            <DayGroup key={day.date} day={day} defaultOpen={i === 0} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/logs"
            className="inline-flex items-center gap-2 rounded-lg border border-sea-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-accent-gold hover:text-accent-gold"
          >
            查看详细工作日志 →
          </a>
        </div>
      </div>
    </section>
  );
}
