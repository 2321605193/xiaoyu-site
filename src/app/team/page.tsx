"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { AgentCard } from "@/components/team/AgentCard";
import agentsJson from "@/data/agents.json";
import type { Agent, AgentsData } from "@/lib/types";
import { useRouter } from "next/navigation";

const data = agentsJson as AgentsData;

const FILTERS = [
  { key: "all", label: "全部" },
  { key: "总管层", label: "总管" },
  { key: "职能层", label: "职能" },
  { key: "平台层", label: "平台" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function TeamPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const router = useRouter();

  const filteredAgents = useMemo(() => {
    let agents: Agent[] = [];

    if (filter === "all") {
      agents = data.levels.flatMap((l) => l.agents);
    } else {
      const level = data.levels.find((l) => l.name === filter);
      agents = level?.agents ?? [];
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      agents = agents.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return agents;
  }, [filter, search]);

  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              团队成员
            </span>
          </h1>
          <p className="text-lg text-text-secondary">
            16 位 AI Agent · 三层架构 · 各司其职
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索 Agent..."
              className="w-full rounded-lg border border-sea-border bg-sea-card py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-brand-cyan focus:outline-none sm:w-72"
            />
          </div>

          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === f.key
                    ? "bg-brand-cyan/10 text-brand-cyan"
                    : "text-text-secondary hover:bg-sea-card hover:text-text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredAgents.map((agent, i) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={i}
              onClick={(a) => router.push(`/team/${a.id}`)}
            />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="py-20 text-center text-text-secondary">
            没有找到匹配的 Agent
          </div>
        )}
      </div>
    </div>
  );
}
