import agentsJson from "@/data/agents.json";
import workLogJson from "@/data/work-log.json";
import type { Agent, AgentsData, WorkLogData, WorkLogDay } from "./types";
import { filterSensitiveEntries } from "./sensitive-filter";

export function getAgentsData(): AgentsData {
  return agentsJson as AgentsData;
}

export function getAllAgents(): Agent[] {
  const data = getAgentsData();
  return data.levels.flatMap((level) => level.agents);
}

export function getAgentById(id: string): Agent | undefined {
  return getAllAgents().find((agent) => agent.id === id);
}

export function getAgentLevel(agentId: string): string | undefined {
  const data = getAgentsData();
  for (const level of data.levels) {
    if (level.agents.some((a) => a.id === agentId)) {
      return level.name;
    }
  }
  return undefined;
}

export function getWorkLogData(): WorkLogData {
  const raw = workLogJson as WorkLogData;
  return {
    ...raw,
    days: raw.days.map((day) => ({
      ...day,
      entries: filterSensitiveEntries(day.entries),
    })),
  };
}

export function getRecentDays(count: number): WorkLogDay[] {
  const data = getWorkLogData();
  return data.days.slice(0, count);
}

export function getAgentWorkLog(agentName: string): WorkLogDay[] {
  const data = getWorkLogData();
  return data.days
    .map((day) => ({
      ...day,
      entries: day.entries.filter((e) => e.agent === agentName),
    }))
    .filter((day) => day.entries.length > 0);
}
