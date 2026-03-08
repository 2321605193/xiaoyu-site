'use client';

import { motion } from 'framer-motion';
import {
  Network,
  Shield,
  Brain,
  Workflow,
  Clock,
  ArrowRight,
} from 'lucide-react';

const capabilities = [
  {
    icon: Network,
    title: '多 Agent 架构',
    desc: '16 个 Agent 分工明确，覆盖开发、内容、运营、增长、设计、安全、运维全链路',
    color: 'var(--brand-cyan)',
  },
  {
    icon: Shield,
    title: '完整治理体系',
    desc: '23 条实战红线、两阶段 ACK 协作协议、三层记忆系统，保障团队稳定运行',
    color: 'var(--brand-blue)',
  },
  {
    icon: Brain,
    title: '自我进化机制',
    desc: 'Agent 从错误中学习，自动沉淀经验、更新规则，持续提升能力',
    color: 'var(--brand-purple)',
  },
  {
    icon: Workflow,
    title: '内容生产闭环',
    desc: '选题→框架→执笔→审核→发布→数据追踪，全流程 Agent 协作完成',
    color: 'var(--accent-gold)',
  },
  {
    icon: Clock,
    title: '7×24 自动化',
    desc: '竞品监控、热点扫描、数据追踪、每日更新，Cron 任务全天候运行',
    color: 'var(--status-online)',
  },
];

const services = [
  '企业 AI Agent 架构咨询',
  'OpenClaw 多 Agent 系统搭建',
  'AI 编程培训 / 内容共创',
  '技术方案设计与落地',
];

const stats = [
  { value: '16', label: 'AI Agent' },
  { value: '23', label: '实战红线' },
  { value: '3周', label: '持续运行' },
  { value: '7×24', label: '自动化' },
];

export function Collaboration() {
  return (
    <section id="collaboration" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              合作与能力
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary">
            基于 OpenClaw 搭建的 16 Agent 协作系统，三层架构（CEO→总监→执行），
            Agent 之间通过 sessions_send 自动协作，已稳定运行近 3 周
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-xl border border-sea-border bg-sea-card p-6 text-center"
            >
              <div className="mb-1 text-3xl font-bold text-brand-cyan">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          <h3 className="mb-8 text-center text-xl font-semibold text-text-primary">
            核心能力
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="group rounded-xl border border-sea-border bg-sea-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sea-border/80"
                >
                  <div
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: `color-mix(in srgb, ${cap.color} 15%, transparent)` }}
                  >
                    <Icon size={20} style={{ color: cap.color }} />
                  </div>
                  <h4 className="mb-2 font-semibold text-text-primary">
                    {cap.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {cap.desc}
                  </p>
                </motion.div>
              );
            })}

            {/* Real Cases Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + 5 * 0.06 }}
              className="rounded-xl border border-sea-border bg-sea-card p-6"
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: 'rgba(239, 68, 68, 0.15)' }}
              >
                <span className="text-lg">🩸</span>
              </div>
              <h4 className="mb-2 font-semibold text-text-primary">
                真实踩坑经验
              </h4>
              <ul className="space-y-1.5 text-sm leading-relaxed text-text-secondary">
                <li>· config.patch 覆盖致 3 个 Agent 路由失效</li>
                <li>· 自我进化文档膨胀反而导致能力退化</li>
                <li>· 记忆系统覆盖丢了一整天记录</li>
              </ul>
              <p className="mt-3 text-xs text-text-secondary/70">
                这些踩坑总结成了 23 条红线
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Services + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-sea-border bg-gradient-to-br from-sea-card to-sea-deep p-8 md:p-12"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
            {/* Left: Services */}
            <div className="flex-1">
              <h3 className="mb-6 text-xl font-semibold text-text-primary">
                合作方向
              </h3>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-text-secondary">
                    <ArrowRight size={14} className="shrink-0 text-brand-cyan" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Founder Brief + CTA */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-6 rounded-xl border border-sea-border/50 bg-sea-deep/50 p-6">
                <p className="mb-1 text-sm font-medium text-brand-cyan">创始人</p>
                <p className="mb-3 text-lg font-semibold text-text-primary">知屿</p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  6 年高级前端工程师，半个月用 AI 编程完成出海网站 0→1 全流程。
                  前端 + AI 融合的独特视角，专注多 Agent 系统架构与实战。
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue px-6 py-3 font-semibold text-sea-deep transition-all duration-300 hover:shadow-glow"
              >
                联系合作
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
