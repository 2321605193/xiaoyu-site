"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Calendar, TrendingUp, Users } from "lucide-react";
import {
  getAgentWorkStats,
  getHeatmapData,
  getTrendData,
  getCollaborationStats,
  getActiveAgents,
  getDateList,
} from "@/lib/stats";

type TimeRange = "all" | "week" | "month";

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("all");

  const agentStats = getAgentWorkStats(timeRange);
  const heatmapData = getHeatmapData(30);
  const trendData = getTrendData(30);
  const collaborationStats = getCollaborationStats();
  const activeAgents = getActiveAgents();
  const dateList = getDateList(30);

  // 构建热力图数据结构
  const heatmapMap = new Map<string, number>();
  heatmapData.forEach((cell) => {
    heatmapMap.set(`${cell.date}-${cell.agent}`, cell.count);
  });

  // 获取热力图颜色
  const getHeatColor = (count: number) => {
    if (count === 0) return "bg-sea-card";
    if (count <= 3) return "bg-brand-cyan/20";
    if (count <= 10) return "bg-brand-cyan/50";
    return "bg-brand-cyan";
  };

  // 获取趋势图最大值
  const maxTrend = Math.max(...trendData.map((d) => d.count), 1);

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
            <BarChart3 size={32} className="text-brand-cyan" />
            <h1 className="text-4xl font-bold text-text-primary">
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
          className="mb-8 flex justify-center gap-4"
        >
          {(["all", "month", "week"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded-lg px-6 py-2 font-medium transition-all ${
                timeRange === range
                  ? "bg-brand-cyan text-sea-bg shadow-glow-sm"
                  : "bg-sea-card text-text-secondary hover:bg-sea-card-hover"
              }`}
            >
              {range === "all" ? "全部" : range === "month" ? "本月" : "本周"}
            </button>
          ))}
        </motion.div>

        {/* Agent Work Stats - Top 10 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <Users size={24} className="text-brand-cyan" />
            <h2 className="text-2xl font-bold text-text-primary">
              Agent 工作量 Top 10
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {agentStats.slice(0, 10).map((stat, i) => (
              <motion.div
                key={stat.agent}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="group rounded-xl border border-sea-border bg-sea-card p-6 text-center transition-all hover:border-brand-cyan/50 hover:shadow-glow-sm"
              >
                <div className="mb-3 text-4xl">{stat.emoji}</div>
                <div className="mb-2 font-semibold text-text-primary">
                  {stat.agent}
                </div>
                <div className="mb-1 text-3xl font-bold text-brand-cyan">
                  {stat.count}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat.percentage.toFixed(1)}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Heatmap */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <Calendar size={24} className="text-brand-cyan" />
            <h2 className="text-2xl font-bold text-text-primary">
              活跃度热力图（最近 30 天）
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-sea-border bg-sea-card p-6">
            <div className="min-w-max">
              {/* Date headers */}
              <div className="mb-2 flex gap-1">
                <div className="w-24" /> {/* Agent name column */}
                {dateList.map((date) => (
                  <div
                    key={date}
                    className="w-4 text-center text-xs text-text-secondary"
                    title={date}
                  >
                    {new Date(date + "T00:00:00+08:00").getDate()}
                  </div>
                ))}
              </div>
              {/* Heatmap rows */}
              {activeAgents.map((agent) => (
                <div key={agent} className="mb-1 flex items-center gap-1">
                  <div className="w-24 text-sm text-text-secondary">
                    {agent}
                  </div>
                  {dateList.map((date) => {
                    const count = heatmapMap.get(`${date}-${agent}`) || 0;
                    return (
                      <div
                        key={`${date}-${agent}`}
                        className={`h-4 w-4 rounded-sm ${getHeatColor(count)} transition-all hover:scale-125`}
                        title={`${agent} - ${date}: ${count} 任务`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Trend Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp size={24} className="text-brand-cyan" />
            <h2 className="text-2xl font-bold text-text-primary">
              工作趋势（最近 30 天）
            </h2>
          </div>
          <div className="rounded-xl border border-sea-border bg-sea-card p-6">
            <div className="flex h-64 items-end gap-1">
              {trendData.map((point, i) => {
                const height = (point.count / maxTrend) * 100;
                return (
                  <motion.div
                    key={point.date}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.6 + i * 0.02 }}
                    className="group relative flex-1 rounded-t bg-brand-cyan/50 transition-all hover:bg-brand-cyan"
                    title={`${point.date}: ${point.count} 任务`}
                  >
                    <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-sea-bg px-2 py-1 text-xs text-text-primary group-hover:block">
                      {point.count}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 text-center text-sm text-text-secondary">
              每日任务完成数量
            </div>
          </div>
        </motion.section>

        {/* Collaboration Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <Users size={24} className="text-brand-cyan" />
            <h2 className="text-2xl font-bold text-text-primary">
              协作统计 Top 5
            </h2>
          </div>
          <div className="space-y-4">
            {collaborationStats.map((collab, i) => (
              <motion.div
                key={`${collab.agents[0]}-${collab.agents[1]}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="group rounded-xl border border-sea-border bg-sea-card p-6 transition-all hover:border-brand-cyan/50 hover:shadow-glow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{collab.emojis[0]}</div>
                    <div className="font-semibold text-text-primary">
                      {collab.agents[0]}
                    </div>
                    <div className="text-text-secondary">+</div>
                    <div className="text-2xl">{collab.emojis[1]}</div>
                    <div className="font-semibold text-text-primary">
                      {collab.agents[1]}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-cyan">
                      {collab.days}
                    </div>
                    <div className="text-sm text-text-secondary">天协作</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
