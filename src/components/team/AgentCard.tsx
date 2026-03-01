"use client";

import { motion } from "framer-motion";
import { StatusDot } from "@/components/ui/StatusDot";
import { Tag } from "@/components/ui/Tag";
import type { Agent } from "@/lib/types";

export function AgentCard({
  agent,
  onClick,
  index = 0,
}: {
  agent: Agent;
  onClick?: (agent: Agent) => void;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -4 }}
      onClick={() => onClick?.(agent)}
      className="group cursor-pointer rounded-lg border border-sea-border bg-sea-card p-5 transition-all duration-300 hover:border-brand-cyan/50 hover:shadow-glow"
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="text-3xl">{agent.emoji}</span>
        <StatusDot status={agent.status} />
      </div>

      <h3 className="mb-1 text-lg font-semibold text-text-primary">
        {agent.name}
      </h3>

      <p className="mb-3 line-clamp-2 text-sm text-text-secondary">
        {agent.role}
      </p>

      {/* Tags - visible on hover */}
      <div className="flex flex-wrap gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {agent.tags.slice(0, 3).map((tag) => (
          <Tag key={tag} variant="cyan">
            {tag}
          </Tag>
        ))}
      </div>
    </motion.div>
  );
}
