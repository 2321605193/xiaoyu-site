"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { HeatmapCell } from "@/lib/stats";

interface ActivityHeatmapProps {
  data: HeatmapCell[];
  agents: string[];
  dateList: string[];
}

const HEAT_COLORS = [
  "bg-sea-card",
  "bg-brand-cyan/20",
  "bg-brand-cyan/40",
  "bg-brand-cyan/60",
  "bg-brand-cyan",
];

function getHeatLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

export const ActivityHeatmap = memo(function ActivityHeatmap({
  data,
  agents,
  dateList,
}: ActivityHeatmapProps) {
  const [tooltip, setTooltip] = useState<{
    agent: string;
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const heatmapMap = new Map<string, number>();
  data.forEach((cell) => {
    heatmapMap.set(`${cell.date}-${cell.agent}`, cell.count);
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-brand-cyan/10 p-2">
          <Calendar size={24} className="text-brand-cyan" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            活跃度热力图
          </h2>
          <p className="text-sm text-text-secondary">最近 30 天工作分布</p>
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-xl border border-sea-border bg-gradient-to-br from-sea-card to-sea-card/50 p-6">
        <div className="min-w-max">
          {/* Date headers */}
          <div className="mb-2 flex gap-[3px]">
            <div className="w-20 shrink-0" />
            {dateList.map((date) => (
              <div
                key={date}
                className="w-[18px] text-center text-[10px] text-text-secondary"
                title={date}
              >
                {new Date(date + "T00:00:00+08:00").getDate()}
              </div>
            ))}
          </div>

          {/* Heatmap rows */}
          {agents.map((agent) => (
            <div key={agent} className="mb-[3px] flex items-center gap-[3px]">
              <div className="w-20 shrink-0 truncate text-sm text-text-secondary">
                {agent}
              </div>
              {dateList.map((date) => {
                const count = heatmapMap.get(`${date}-${agent}`) || 0;
                const level = getHeatLevel(count);
                return (
                  <div
                    key={`${date}-${agent}`}
                    className={`h-[18px] w-[18px] cursor-pointer rounded-sm ${HEAT_COLORS[level]} transition-all hover:scale-125 hover:ring-1 hover:ring-brand-cyan/50`}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        agent,
                        date,
                        count,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-text-secondary">
          <span>少</span>
          {HEAT_COLORS.map((color, i) => (
            <div key={i} className={`h-3 w-3 rounded-sm ${color}`} />
          ))}
          <span>多</span>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none fixed z-50 rounded-lg border border-sea-border bg-sea-deep px-3 py-2 text-sm shadow-lg"
            style={{
              left: tooltip.x,
              top: tooltip.y - 40,
              transform: "translateX(-50%)",
            }}
          >
            <span className="font-medium text-text-primary">
              {tooltip.agent}
            </span>
            <span className="mx-1 text-text-secondary">·</span>
            <span className="text-text-secondary">{tooltip.date}</span>
            <span className="mx-1 text-text-secondary">·</span>
            <span className="font-bold text-brand-cyan">
              {tooltip.count} 任务
            </span>
          </div>
        )}
      </div>
    </motion.section>
  );
});
