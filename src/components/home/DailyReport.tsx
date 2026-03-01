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

// 总结每日工作（去重、分类、提炼关键信息）
function summarizeDay(day: WorkLogDay): string[] {
  const summaries: string[] = [];
  const seen = new Set<string>();

  // 按 Agent 分组
  const byAgent = new Map<string, string[]>();
  day.entries.forEach((entry) => {
    if (!byAgent.has(entry.agent)) {
      byAgent.set(entry.agent, []);
    }
    byAgent.get(entry.agent)!.push(entry.content);
  });

  // 为每个 Agent 生成总结
  byAgent.forEach((contents, agent) => {
    // 提取关键词（去掉重复的细节）
    const keywords = new Set<string>();
    contents.forEach((c) => {
      // 提取关键动作词
      if (c.includes("完成")) keywords.add("完成");
      if (c.includes("修复")) keywords.add("修复");
      if (c.includes("优化")) keywords.add("优化");
      if (c.includes("部署")) keywords.add("部署");
      if (c.includes("设计")) keywords.add("设计");
      if (c.includes("编写")) keywords.add("编写");
      if (c.includes("配置")) keywords.add("配置");
    });

    // 生成简洁总结
    if (keywords.size > 0) {
      const summary = `${agent}：${Array.from(keywords).join("、")}相关工作（${contents.length}项）`;
      if (!seen.has(summary)) {
        summaries.push(summary);
        seen.add(summary);
      }
    }
  });

  return summaries.slice(0, 5); // 最多显示5条总结
}

function DayGroup({
  day,
  defaultOpen,
}: {
  day: WorkLogDay;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const summaries = summarizeDay(day);

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
              {summaries.map((summary, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-lg bg-sea-card/30 px-4 py-3 text-sm leading-relaxed text-text-secondary"
                >
                  {summary}
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
            每日工作总结 · 自动生成
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
