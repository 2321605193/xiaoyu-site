export type AgentStatus = "online" | "idle" | "offline";

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  role: string;
  status: AgentStatus;
  tags: string[];
}

export interface AgentLevel {
  name: string;
  parent?: string;
  agents: Agent[];
}

export interface AgentsData {
  levels: AgentLevel[];
}

export interface WorkLogEntry {
  agent: string;
  emoji: string;
  content: string;
}

export interface WorkLogDay {
  date: string;
  entries: WorkLogEntry[];
}

export interface WorkLogData {
  generated: string;
  days: WorkLogDay[];
}
