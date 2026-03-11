'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, User } from 'lucide-react';

const teamLevels = [
  {
    label: '决策层',
    desc: '1 人',
    color: 'var(--color-brand-cyan)',
    agents: [
      { emoji: '🏝️', name: '小屿', role: '总管，协调调度' },
    ],
  },
  {
    label: '职能层',
    desc: '7 人',
    color: 'var(--color-brand-blue)',
    agents: [
      { emoji: '🖋️', name: '屿墨', role: '内容总监' },
      { emoji: '🔧', name: '屿匠', role: '技术开发' },
      { emoji: '🎨', name: '屿绘', role: '视觉设计' },
      { emoji: '🧮', name: '屿算', role: '财务分析' },
      { emoji: '📈', name: '屿潮', role: '增长策略' },
      { emoji: '🛡️', name: '屿盾', role: '安全审计' },
      { emoji: '🧭', name: '屿舵', role: '运维部署' },
    ],
  },
  {
    label: '执行层',
    desc: '8 人',
    color: 'var(--color-accent-gold)',
    agents: [
      { emoji: '📝', name: '屿微', role: '公众号' },
      { emoji: '💡', name: '屿知', role: '知乎' },
      { emoji: '🍠', name: '屿薯', role: '小红书' },
      { emoji: '🐦', name: '屿推', role: 'Twitter' },
      { emoji: '⛏️', name: '屿掘', role: '掘金' },
      { emoji: '📺', name: '屿播', role: 'B站' },
      { emoji: '🌊', name: '屿风', role: '微博' },
      { emoji: '🎬', name: '屿映', role: '短视频' },
    ],
  },
];

const cases = [
  {
    emoji: '🌐',
    title: '网站开发',
    items: [
      '屿匠根据记忆系统自主设计',
      '从需求分析到代码实现全自动',
      '人只需要最后确认',
    ],
  },
  {
    emoji: '📱',
    title: '公众号运营',
    items: [
      '屿墨策划选题 → 屿微执笔 → 屿绘配图',
      'Markdown 一键上传草稿箱',
      '手动 30 分钟 → 自动 1 分钟',
    ],
  },
  {
    emoji: '📊',
    title: '数据分析',
    items: [
      '屿潮每天 08:00 自动扫描竞品热点',
      '输出结构化报告 + 选题建议',
      '追踪内容表现 + 增长策略',
    ],
  },
];

const freeContent = [
  'OpenClaw 实战教程',
  'AI 编程工具对比',
  '一人公司方法论',
  '免费 skill 和配置模板',
];

const paidProducts = [
  { name: '完整 16 个 Agent 配置包', price: '¥99' },
  { name: '一对一咨询服务', price: '¥299-499/次' },
  { name: '付费社群', price: '¥199/年' },
  { name: '托管部署服务', price: '¥99-199/月' },
];

const milestones = [
  { phase: '1-2 月', title: '免费引流', desc: '积累 500-1000 粉丝' },
  { phase: '3-4 月', title: '付费增值', desc: '完整 Agent 配置包' },
  { phase: '5-6 月', title: 'SaaS 化', desc: '托管部署服务' },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ===== Hero ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-text-primary">
            关于屿总
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            我用 OpenClaw 搭建了一个 16 人的 AI 团队：从网站开发（屿匠根据记忆系统自主设计）、
            内容创作（屿墨策划 + 屿微执笔）、公众号自动发文（Markdown 一键上传草稿箱），
            到视觉设计（屿绘识图生图）、数据分析（屿潮竞品监控 + 增长策略），
            实现了一人公司的完整运营闭环。
          </p>
        </motion.section>

        {/* ===== 我的故事 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-text-primary">我的故事</h2>
          <div className="p-6 rounded-2xl border border-sea-border bg-sea-card">
            <h3 className="text-lg font-semibold mb-4 text-brand-cyan">从前端到 AI 编程</h3>
            <div className="flex flex-wrap gap-3">
              {[
                '6 年前端开发经验',
                '涨薪 500 块那天，决定转型',
                '3 个月学习 AI 编程',
                '用 OpenClaw 搭建了 16 人 AI 团队',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sea-deep/50 border border-sea-border"
                >
                  <span className="text-accent-gold font-mono text-sm">{i + 1}</span>
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== 16 个 AI 员工 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-text-primary">16 个 AI 员工</h2>
          <div className="space-y-6">
            {teamLevels.map((level) => (
              <div key={level.label}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="text-sm font-semibold px-3 py-1 rounded-full"
                    style={{
                      color: level.color,
                      background: `color-mix(in srgb, ${level.color} 15%, transparent)`,
                    }}
                  >
                    {level.label}（{level.desc}）
                  </div>
                  {level.label !== '决策层' && (
                    <div className="flex-1 h-px bg-sea-border" />
                  )}
                  {level.label === '决策层' && (
                    <div className="flex-1 h-px bg-sea-border" />
                  )}
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

        {/* ===== 真实案例 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-text-primary">真实案例</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {cases.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl border border-sea-border bg-sea-card"
              >
                <span className="text-3xl mb-3 block">{c.emoji}</span>
                <h3 className="text-lg font-bold mb-3 text-text-primary">{c.title}</h3>
                <ul className="space-y-2">
                  {c.items.map((item) => (
                    <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-brand-cyan mt-0.5 shrink-0">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===== 6 个月生存挑战 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-2 text-text-primary">6 个月生存挑战</h2>
          <p className="text-text-secondary mb-8">
            目标：<span className="text-accent-gold font-semibold">¥5400</span>（¥30/天）
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {milestones.map((m, i) => (
              <div
                key={m.phase}
                className="p-5 rounded-2xl border border-sea-border bg-sea-card relative overflow-hidden"
              >
                <div className="text-xs font-mono text-brand-cyan mb-2">{m.phase}</div>
                <div className="text-base font-bold text-text-primary mb-1">{m.title}</div>
                <div className="text-sm text-text-secondary">{m.desc}</div>
                <div
                  className="absolute top-3 right-3 text-4xl font-bold opacity-5"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===== 关注我能获得什么 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-text-primary">关注我能获得什么</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 免费内容 */}
            <div className="p-6 rounded-2xl border border-sea-border bg-sea-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🎁</span>
                <h3 className="text-lg font-bold text-text-primary">免费内容</h3>
              </div>
              <ul className="space-y-2.5">
                {freeContent.map((item) => (
                  <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-status-online mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 付费产品 */}
            <div className="p-6 rounded-2xl border border-sea-border bg-sea-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">💎</span>
                <h3 className="text-lg font-bold text-text-primary">付费产品（即将推出）</h3>
              </div>
              <ul className="space-y-2.5">
                {paidProducts.map((item) => (
                  <li key={item.name} className="text-sm text-text-secondary flex items-center justify-between">
                    <span className="flex items-start gap-2">
                      <span className="text-accent-gold mt-0.5 shrink-0">★</span>
                      {item.name}
                    </span>
                    <span className="text-accent-gold font-semibold text-xs shrink-0 ml-2">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ===== 联系我 ===== */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-3 text-text-primary">联系我</h2>
          <p className="text-sm text-text-secondary mb-10">
            公众号回复「自动发文」领取免费 skill
          </p>
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
              <p className="text-sm mb-6 text-text-secondary">知屿AI编程</p>
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-sea-border">
                <Image src="/images/wechat-mp-qr.jpg" alt="公众号二维码" fill className="object-cover" />
              </div>
              <p className="text-xs text-text-secondary">回复「自动发文」领取免费 skill</p>
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
              <p className="text-sm mb-6 text-text-secondary">知屿 · 一对一交流</p>
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
