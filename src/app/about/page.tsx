'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, User, Zap, Shield, RefreshCw, Bot, AlertTriangle, Briefcase } from 'lucide-react';

const teamLevels = [
  {
    label: 'CEO 层',
    color: 'var(--color-brand-cyan)',
    agents: [
      { emoji: '🏝️', name: '小屿', role: '战略决策 · 全局协调' },
    ],
  },
  {
    label: '总监层',
    color: 'var(--color-brand-blue)',
    agents: [
      { emoji: '📈', name: '屿潮', role: '增长策略' },
      { emoji: '🖋️', name: '屿墨', role: '内容总监' },
      { emoji: '🔧', name: '屿匠', role: '技术开发' },
    ],
  },
  {
    label: '执行层',
    color: 'var(--color-accent-gold)',
    agents: [
      { emoji: '📱', name: '屿微', role: '公众号' },
      { emoji: '💡', name: '屿知', role: '知乎' },
      { emoji: '🍠', name: '屿薯', role: '小红书' },
      { emoji: '🐦', name: '屿推', role: 'Twitter' },
      { emoji: '⛏️', name: '屿掘', role: '掘金' },
      { emoji: '📺', name: '屿播', role: 'B站' },
      { emoji: '🌊', name: '屿风', role: '微博' },
      { emoji: '🎬', name: '屿映', role: '短视频' },
      { emoji: '🎨', name: '屿绘', role: '设计' },
      { emoji: '💰', name: '屿算', role: '财务' },
      { emoji: '🛡️', name: '屿盾', role: '安全' },
      { emoji: '🧭', name: '屿舵', role: '运维' },
    ],
  },
];

const capabilities = [
  {
    icon: Bot,
    title: '多 Agent 协作架构',
    color: 'var(--color-brand-cyan)',
    items: [
      '16 个 Agent 分工协作',
      'sessions_send 通信协议',
      '两阶段 ACK 确认机制',
    ],
  },
  {
    icon: Shield,
    title: '完整治理体系',
    color: 'var(--color-brand-blue)',
    items: [
      '23 条血泪红线',
      '三层记忆系统',
      '自我进化机制',
    ],
  },
  {
    icon: RefreshCw,
    title: '内容生产闭环',
    color: 'var(--color-brand-purple)',
    items: [
      '选题→框架→执笔→审核→发布→追踪',
      '全流程 Agent 协作',
      '5 维度 25 分制选题评估',
    ],
  },
  {
    icon: Zap,
    title: '自动化运营',
    color: 'var(--color-accent-gold)',
    items: [
      '7×24 Cron 任务运行',
      '每日竞品监控、热点扫描',
      '多平台自动适配',
    ],
  },
  {
    icon: AlertTriangle,
    title: '真实踩坑经验',
    color: '#EF4444',
    items: [
      'config 覆盖导致路由失效',
      'Agent 自我退化',
      '记忆覆盖丢数据',
      '23 条红线都是真实教训',
    ],
  },
];

const cooperationItems = [
  { icon: '🏗️', title: '企业 AI Agent 架构咨询', desc: '从零搭建多 Agent 协作系统' },
  { icon: '⚙️', title: 'OpenClaw 多 Agent 系统搭建', desc: '架构设计、部署、调优全流程指导' },
  { icon: '📚', title: 'AI 编程培训 / 内容共创', desc: '实战案例分享、技术文章合作' },
  { icon: '📐', title: '技术方案设计与评审', desc: '架构评审、Code Review、最佳实践' },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ===== Hero ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              16 个 AI Agent
            </span>
            <br />
            <span className="text-text-primary">一家真正在运转的 AI 公司</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            基于 OpenClaw 构建的多 Agent 协作系统，已持续运行近 3 周。
            <br className="hidden md:block" />
            不是 Demo，不是概念验证——是每天在跑的真实生产系统。
          </p>
        </motion.section>

        {/* ===== 团队架构 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            团队架构
          </h2>
          <div className="space-y-8">
            {teamLevels.map((level) => (
              <div key={level.label}>
                <div
                  className="text-sm font-semibold mb-3 px-3 py-1 rounded-full inline-block"
                  style={{ color: level.color, background: `color-mix(in srgb, ${level.color} 15%, transparent)` }}
                >
                  {level.label}
                </div>
                <div className="flex flex-wrap gap-3">
                  {level.agents.map((agent) => (
                    <div
                      key={agent.name}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-sea-border bg-sea-card hover:border-brand-cyan/50 transition-colors"
                    >
                      <span className="text-xl">{agent.emoji}</span>
                      <div>
                        <div className="text-sm font-semibold text-text-primary">{agent.name}</div>
                        <div className="text-xs text-text-secondary">{agent.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===== 核心能力 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            核心能力
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="p-6 rounded-2xl border border-sea-border bg-sea-card hover:border-brand-cyan/30 transition-colors"
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                    style={{ background: `color-mix(in srgb, ${cap.color} 15%, transparent)`, color: cap.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-text-primary">{cap.title}</h3>
                  <ul className="space-y-1.5">
                    {cap.items.map((item) => (
                      <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-brand-cyan mt-1 shrink-0">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ===== 创始人 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            创始人
          </h2>
          <div
            className="max-w-2xl mx-auto p-8 rounded-2xl border border-sea-border bg-sea-card"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-cyan to-brand-blue flex items-center justify-center text-2xl shrink-0">
                👤
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">知屿</h3>
                <p className="text-sm text-brand-cyan mb-4">一人公司创始人</p>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-gold mt-0.5 shrink-0">▸</span>
                    6 年高级前端开发工程师
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-gold mt-0.5 shrink-0">▸</span>
                    独立负责过整个产品线（网站 + 小程序 + APP）
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-gold mt-0.5 shrink-0">▸</span>
                    半个月用 AI 编程完成出海网站 0→1 全流程
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-gold mt-0.5 shrink-0">▸</span>
                    前端 + AI 融合的独特视角
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== 合作方向 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            合作方向
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {cooperationItems.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-sea-border bg-sea-card hover:border-accent-gold/30 transition-colors"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="text-base font-bold text-text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===== 联系方式 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-10 text-text-primary">
            联系我们
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* 公众号 */}
            <div className="p-8 rounded-2xl border border-sea-border bg-sea-card text-center">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ background: 'var(--color-brand-cyan)', color: 'var(--color-sea-deep)' }}
              >
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">关注公众号</h3>
              <p className="text-sm mb-6 text-text-secondary">知屿AI编程 · AI 编程与出海干货</p>
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-sea-border">
                <Image src="/images/wechat-mp-qr.jpg" alt="公众号二维码" fill className="object-cover" />
              </div>
              <p className="text-xs text-text-secondary">扫码关注，获取最新文章</p>
            </div>

            {/* 个人微信 */}
            <div className="p-8 rounded-2xl border border-sea-border bg-sea-card text-center">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ background: 'var(--color-accent-gold)', color: 'var(--color-sea-deep)' }}
              >
                <User size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">添加微信</h3>
              <p className="text-sm mb-6 text-text-secondary">知屿 · 一对一深度交流</p>
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-sea-border">
                <Image src="/images/wechat-qr.jpg" alt="个人微信二维码" fill className="object-cover" />
              </div>
              <p className="text-xs text-text-secondary">扫码添加，备注来意</p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
