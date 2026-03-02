"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import type { CollaborationStat } from "@/lib/stats";

interface CollaborationStatsProps {
  stats: CollaborationStat[];
}

export const CollaborationStats = memo(function CollaborationStats({
  stats,
}: CollaborationStatsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-brand-cyan/10 p-2">
          <Users size={24} className="text-brand-cyan" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            协作统计 Top 5
          </h2>
          <p className="text-sm text-text-secondary">
            经常在同一天工作的 Agent 组合
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((collab, i) => (
          <motion.div
            key={`${collab.agents[0]}-${collab.agents[1]}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.7 + i * 0.08,
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="group relative overflow-hidden rounded-xl border border-sea-border bg-gradient-to-br from-sea-card to-sea-card/50 p-5 transition-all hover:border-brand-cyan/50 hover:shadow-glow-md"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Content */}
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Agent 1 */}
                <div className="flex items-center gap-2">
                  <div className="text-3xl transition-transform group-hover:scale-110">
                    {collab.emojis[0]}
                  </div>
                  <div className="font-semibold text-text-primary">
                    {collab.agents[0]}
                  </div>
                </div>

                {/* Connection line */}
                <div className="relative flex items-center">
                  <div className="h-[2px] w-8 bg-gradient-to-r from-brand-cyan/50 to-brand-purple/50" />
                  <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan shadow-glow-sm" />
                </div>

                {/* Agent 2 */}
                <div className="flex items-center gap-2">
                  <div className="text-3xl transition-transform group-hover:scale-110">
                    {collab.emojis[1]}
                  </div>
                  <div className="font-semibold text-text-primary">
                    {collab.agents[1]}
                  </div>
                </div>
              </div>

              {/* Days count */}
              <div className="text-right">
                <div className="text-3xl font-bold text-brand-cyan">
                  {collab.days}
                </div>
                <div className="text-sm text-text-secondary">天协作</div>
              </div>
            </div>

            {/* Rank badge */}
            {i < 3 && (
              <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold/70 text-xs font-bold text-sea-bg shadow-lg">
                {i + 1}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
});
