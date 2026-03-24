"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Wrench, Layers } from "lucide-react";
import { AgentCard } from "@/components/team/AgentCard";
import { StatusDot } from "@/components/ui/StatusDot";
import { Tag } from "@/components/ui/Tag";
import type { Agent, AgentLevel } from "@/lib/types";

type LevelMeta = {
  label: string;
  color: string;
  Icon: React.ElementType;
};

const levelLabels: Record<string, LevelMeta> = {
  总管层: { label: "总管层", color: "text-accent-gold", Icon: Crown },
  职能层: { label: "职能层", color: "text-brand-cyan", Icon: Wrench },
  平台层: { label: "平台层", color: "text-text-secondary", Icon: Layers },
};

export function TeamMatrix({ levels }: { levels: AgentLevel[] }) {
  const [selected, setSelected] = useState<Agent | null>(null);

  const handleSelect = useCallback((agent: Agent) => {
    setSelected(agent);
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <section id="team" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              团队矩阵
            </span>
          </h2>
          <p className="text-text-secondary">
            三层架构 · 16 位 AI Agent · 各司其职
          </p>
        </motion.div>

        {/* Levels */}
        {levels.map((level, levelIdx) => {
          const meta: LevelMeta = levelLabels[level.name] ?? {
            label: level.name,
            color: "text-text-primary",
            Icon: Layers,
          };
          const LevelIcon = meta.Icon;
          return (
            <div key={level.name} className="mb-12 last:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: levelIdx * 0.1 }}
                className={`mb-6 flex items-center gap-2 text-lg font-semibold ${meta.color}`}
              >
                <LevelIcon size={18} />
                {meta.label}
              </motion.div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {level.agents.map((agent, i) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onClick={handleSelect}
                    index={levelIdx * 4 + i}
                  />
                ))}
              </div>

              {/* Connector line between levels */}
              {levelIdx < levels.length - 1 && (
                <div className="flex justify-center py-6">
                  <div className="h-8 w-px bg-gradient-to-b from-sea-border to-transparent" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail sidebar */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-sea-border bg-sea-deep p-8"
            >
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-lg p-2 text-text-secondary transition-colors hover:bg-sea-card hover:text-text-primary"
              >
                <X size={20} />
              </button>

              <div className="pt-8">
                <span className="text-6xl">{selected.emoji}</span>

                <div className="mt-4 flex items-center gap-3">
                  <h3 className="text-2xl font-bold">{selected.name}</h3>
                  <StatusDot
                    status={selected.status}
                    showLabel
                    size="md"
                  />
                </div>

                <p className="mt-3 text-text-secondary">{selected.role}</p>

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                    技能标签
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <Tag key={tag} variant="cyan">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                    Agent ID
                  </h4>
                  <code className="rounded bg-sea-card px-3 py-1.5 font-mono text-sm text-brand-cyan">
                    {selected.id}
                  </code>
                </div>

                <div className="mt-8">
                  <a
                    href={`/team/${selected.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue px-6 py-2.5 text-sm font-semibold text-sea-deep transition-all duration-300 hover:shadow-glow"
                  >
                    查看详情 →
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
