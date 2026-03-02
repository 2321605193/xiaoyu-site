"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { TrendPoint } from "@/lib/stats";

interface WorkTrendProps {
  data: TrendPoint[];
}

export const WorkTrend = memo(function WorkTrend({ data }: WorkTrendProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const avg = data.length > 0 ? (total / data.length).toFixed(1) : "0";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-brand-cyan/10 p-2">
            <TrendingUp size={24} className="text-brand-cyan" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">工作趋势</h2>
            <p className="text-sm text-text-secondary">最近 30 天每日任务数</p>
          </div>
        </div>
        {/* Summary stats */}
        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-2xl font-bold text-brand-cyan">{total}</div>
            <div className="text-xs text-text-secondary">总任务</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-brand-purple">{avg}</div>
            <div className="text-xs text-text-secondary">日均</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-sea-border bg-gradient-to-br from-sea-card to-sea-card/50 p-6">
        {/* Y-axis labels + bars */}
        <div className="relative flex h-64 items-end gap-[2px]">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio) => (
            <div
              key={ratio}
              className="pointer-events-none absolute left-0 right-0 border-t border-sea-border/30"
              style={{ bottom: `${ratio * 100}%` }}
            >
              <span className="absolute -top-3 -left-1 text-[10px] text-text-secondary">
                {Math.round(maxCount * ratio)}
              </span>
            </div>
          ))}

          {data.map((point, i) => {
            const height = (point.count / maxCount) * 100;
            return (
              <motion.div
                key={point.date}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{
                  delay: 0.6 + i * 0.015,
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="group relative flex-1 cursor-pointer rounded-t-sm bg-gradient-to-t from-brand-cyan/40 to-brand-cyan/80 transition-all hover:from-brand-cyan/60 hover:to-brand-cyan"
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-sea-border bg-sea-deep px-2 py-1 text-xs shadow-lg group-hover:block">
                  <span className="font-bold text-brand-cyan">
                    {point.count}
                  </span>
                  <span className="ml-1 text-text-secondary">
                    {point.date.slice(5)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="mt-2 flex gap-[2px]">
          {data.map((point, i) => (
            <div
              key={point.date}
              className="flex-1 text-center text-[9px] text-text-secondary"
            >
              {i % 5 === 0 ? point.date.slice(5) : ""}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
});
