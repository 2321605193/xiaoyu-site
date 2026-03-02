"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import {
  getAgentWorkStats,
  getHeatmapData,
  getTrendData,
  getCollaborationStats,
  getActiveAgents,
  getDateList,
} from "@/lib/stats";
import { AgentWorkStats } from "@/components/stats/AgentWorkStats";
import { ActivityHeatmap } from "@/components/stats/ActivityHeatmap";
import { WorkTrend } from "@/components/stats/WorkTrend";
import { CollaborationStats } from "@/components/stats/CollaborationStats";

type TimeRange = "all" | "week" | "month";

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("all");

  // Memoize expensive calculations
  const agentStats = useMemo(
    () => getAgentWorkStats(timeRange),
    [timeRange]
  );
  const heatmapData = useMemo(() => getHeatmapData(30), []);
  const trendData = useMemo(() => getTrendData(30), []);
  const collaborationStats = useMemo(() => getCollaborationStats(), []);
  const activeAgents = useMemo(() => getActiveAgents(), []);
  const dateList = useMemo(() => getDateList(30), []);

  return (
    <div className="min-h-screen px-6 pb-16 pt-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 p-3 shadow-glow-sm">
              <BarChart3 size={32} className="text-brand-cyan" />
            </div>
            <h1 className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-4xl font-bold text-transparent">
              团队工作统计
            </h1>
          </div>
          <p className="text-text-secondary">
            16 个 AI Agent 的工作数据可视化分析
          </p>
        </motion.div>

        {/* Time Range Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex justify-center gap-3"
        >
          {(["all", "month", "week"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`group relative overflow-hidden rounded-lg px-8 py-3 font-medium transition-all ${
                timeRange === range
                  ? "bg-gradient-to-r from-brand-cyan to-brand-purple text-sea-bg shadow-glow-md"
                  : "border border-sea-border bg-sea-card text-text-secondary hover:border-brand-cyan/50 hover:text-text-primary"
              }`}
            >
              {/* Hover gradient */}
              {timeRange !== range && (
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
              <span className="relative">
                {range === "all" ? "全部" : range === "month" ? "本月" : "本周"}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Stats Sections */}
        <div className="space-y-12">
          {/* Agent Work Stats */}
          <AgentWorkStats stats={agentStats} />

          {/* Activity Heatmap */}
          <ActivityHeatmap
            data={heatmapData}
            agents={activeAgents}
            dateList={dateList}
          />

          {/* Work Trend */}
          <WorkTrend data={trendData} />

          {/* Collaboration Stats */}
          <CollaborationStats stats={collaborationStats} />
        </div>
      </div>
    </div>
  );
}
