"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import type { AgentStat } from "@/lib/stats";

interface AgentWorkStatsProps {
  stats: AgentStat[];
}

export const AgentWorkStats = memo(function AgentWorkStats({
  stats,
}: AgentWorkStatsProps) {
  const topStats = stats.slice(0, 10);

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-brand-cyan/10 p-2">
          <Users size={24} className="text-brand-cyan" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Agent 工作量 Top 10
          </h2>
          <p className="text-sm text-text-secondary">
            按任务完成数量排序
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {topStats.map((stat, i) => (
          <motion.div
            key={stat.agent}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: i * 0.05,
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="group relative overflow-hidden rounded-xl border border-sea-border bg-gradient-to-br from-sea-card to-sea-card/50 p-6 text-center transition-all hover:border-brand-cyan/50 hover:shadow-glow-md"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Content */}
            <div className="relative">
              <div className="mb-3 text-5xl transition-transform group-hover:scale-110">
                {stat.emoji}
              </div>
              <div className="mb-2 font-semibold text-text-primary">
                {stat.agent}
              </div>
              <div className="mb-2 text-3xl font-bold text-brand-cyan">
                {stat.count}
              </div>
              <div className="text-sm text-text-secondary">
                {stat.percentage.toFixed(1)}%
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-sea-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.percentage}%` }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple"
                />
              </div>
            </div>

            {/* Rank badge */}
            {i < 3 && (
              <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold/70 text-xs font-bold text-sea-bg shadow-lg">
                {i + 1}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
});
