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

  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-brand-cyan bg-sea-deep" />

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
          <span className="rounded-full bg-brand-cyan/10 px-2 py-0.5 text-xs font-medium text-brand-cyan">
            今天
          </span>
        )}
        <span className="text-xs text-text-secondary">
          {day.entries.length} 条记录
        </span>
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
              {day.entries.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-sea-card/50"
                >
                  <span className="mt-0.5 shrink-0 text-base">
                    {entry.emoji}
                  </span>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {entry.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WorkLog({ days }: { days: WorkLogDay[] }) {
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
              工作动态
            </span>
          </h2>
          <p className="text-text-secondary">
            每日自动同步 · 真实 Agent 工作记录
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-2 border-sea-border pl-6">
          {days.map((day, i) => (
            <DayGroup key={day.date} day={day} defaultOpen={i < 2} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/logs"
            className="inline-flex items-center gap-2 rounded-lg border border-sea-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-brand-cyan hover:text-brand-cyan"
          >
            查看完整日志 →
          </a>
        </div>
      </div>
    </section>
  );
}
