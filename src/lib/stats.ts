import workLogData from "@/data/work-log.json";

export interface AgentStat {
  agent: string;
  emoji: string;
  count: number;
  percentage: number;
}

export interface HeatmapCell {
  date: string;
  agent: string;
  count: number;
}

export interface TrendPoint {
  date: string;
  count: number;
}

export interface CollaborationStat {
  agents: [string, string];
  emojis: [string, string];
  days: number;
}

// Agent emoji 映射
const AGENT_EMOJIS: Record<string, string> = {
  小屿: "🏝️",
  屿匠: "🔧",
  屿墨: "✒️",
  屿绘: "🎨",
  屿盾: "🛡️",
  屿舵: "⚓",
  屿微: "📝",
  屿听: "👂",
  屿视: "👁️",
  屿算: "🧮",
  屿链: "🔗",
  屿云: "☁️",
  屿数: "📊",
  屿智: "🧠",
  屿语: "💬",
  屿图: "🖼️",
};

// 获取日期范围
function getDateRange(range: "week" | "month" | "all"): Date {
  const now = new Date();
  const cutoff = new Date(now);

  if (range === "week") {
    cutoff.setDate(now.getDate() - 7);
  } else if (range === "month") {
    cutoff.setMonth(now.getMonth() - 1);
  } else {
    cutoff.setFullYear(2000); // 全部数据
  }

  return cutoff;
}

// 获取 Agent 工作量统计
export function getAgentWorkStats(
  timeRange: "week" | "month" | "all" = "all"
): AgentStat[] {
  const cutoffDate = getDateRange(timeRange);
  const agentCounts: Record<string, number> = {};

  // 统计每个 Agent 的工作量
  workLogData.days.forEach((day) => {
    const logDate = new Date(day.date + "T00:00:00+08:00");
    if (logDate >= cutoffDate) {
      day.entries.forEach((entry) => {
        agentCounts[entry.agent] = (agentCounts[entry.agent] || 0) + 1;
      });
    }
  });

  // 计算总数
  const total = Object.values(agentCounts).reduce((sum, count) => sum + count, 0);

  // 转换为数组并排序
  const stats: AgentStat[] = Object.entries(agentCounts)
    .map(([agent, count]) => ({
      agent,
      emoji: AGENT_EMOJIS[agent] || "🤖",
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return stats;
}

// 获取活跃度热力图数据
export function getHeatmapData(days: number = 30): HeatmapCell[] {
  const now = new Date();
  const cutoffDate = new Date(now);
  cutoffDate.setDate(now.getDate() - days);

  const heatmapData: Record<string, Record<string, number>> = {};

  // 统计每天每个 Agent 的工作量
  workLogData.days.forEach((day) => {
    const logDate = new Date(day.date + "T00:00:00+08:00");
    if (logDate >= cutoffDate) {
      if (!heatmapData[day.date]) {
        heatmapData[day.date] = {};
      }
      day.entries.forEach((entry) => {
        heatmapData[day.date][entry.agent] =
          (heatmapData[day.date][entry.agent] || 0) + 1;
      });
    }
  });

  // 转换为数组
  const cells: HeatmapCell[] = [];
  Object.entries(heatmapData).forEach(([date, agents]) => {
    Object.entries(agents).forEach(([agent, count]) => {
      cells.push({ date, agent, count });
    });
  });

  return cells;
}

// 获取工作趋势数据
export function getTrendData(days: number = 30): TrendPoint[] {
  const now = new Date();
  const cutoffDate = new Date(now);
  cutoffDate.setDate(now.getDate() - days);

  const dailyCounts: Record<string, number> = {};

  // 统计每天的总工作量
  workLogData.days.forEach((day) => {
    const logDate = new Date(day.date + "T00:00:00+08:00");
    if (logDate >= cutoffDate) {
      dailyCounts[day.date] = day.entries.length;
    }
  });

  // 转换为数组并排序
  const trend: TrendPoint[] = Object.entries(dailyCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return trend;
}

// 获取协作统计
export function getCollaborationStats(): CollaborationStat[] {
  // 按日期分组
  const dailyAgents: Record<string, Set<string>> = {};

  workLogData.days.forEach((day) => {
    const agents = new Set<string>();
    day.entries.forEach((entry) => {
      agents.add(entry.agent);
    });
    dailyAgents[day.date] = agents;
  });

  // 统计协作次数
  const collaborations: Record<string, number> = {};

  Object.values(dailyAgents).forEach((agents) => {
    const agentList = Array.from(agents).sort();
    // 生成所有两两组合
    for (let i = 0; i < agentList.length; i++) {
      for (let j = i + 1; j < agentList.length; j++) {
        const key = `${agentList[i]}+${agentList[j]}`;
        collaborations[key] = (collaborations[key] || 0) + 1;
      }
    }
  });

  // 转换为数组并排序
  const stats: CollaborationStat[] = Object.entries(collaborations)
    .map(([key, days]) => {
      const [agent1, agent2] = key.split("+");
      return {
        agents: [agent1, agent2] as [string, string],
        emojis: [
          AGENT_EMOJIS[agent1] || "🤖",
          AGENT_EMOJIS[agent2] || "🤖",
        ] as [string, string],
        days,
      };
    })
    .sort((a, b) => b.days - a.days)
    .slice(0, 5); // Top 5

  return stats;
}

// 获取所有活跃的 Agent 列表
export function getActiveAgents(): string[] {
  const agents = new Set<string>();
  workLogData.days.forEach((day) => {
    day.entries.forEach((entry) => {
      agents.add(entry.agent);
    });
  });
  return Array.from(agents).sort();
}

// 获取日期列表（最近 N 天）
export function getDateList(days: number = 30): string[] {
  const dates: string[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    dates.push(dateStr);
  }

  return dates;
}
