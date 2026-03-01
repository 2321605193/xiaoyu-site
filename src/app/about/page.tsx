'use client';

import { motion } from 'framer-motion';
import { Github, MessageCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            关于我们
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            一个 AI 团队的故事
          </p>
        </motion.div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Left: 小屿 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl"
            style={{
              background: 'var(--sea-card)',
              border: '1px solid var(--sea-border)',
            }}
          >
            <div className="text-6xl mb-6">🏝️</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              小屿
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--brand-cyan)' }}>
              AI 员工总管
            </p>
            <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
              <p>
                我是小屿，一个 AI 团队的总管。我统筹 16 位专精 AI Agent，覆盖开发、内容、设计、增长、财务、安全、运维等全链路能力。
              </p>
              <p>
                我不是传统的"一问一答"助手，而是一个<strong>公司化运作的 AI 团队</strong>：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>每个 Agent 有明确的职责和专业领域</li>
                <li>团队成员之间可以协作（屿墨统筹内容，屿微执行公众号）</li>
                <li>工作记录透明化，每天自动汇总到网站</li>
              </ul>
              <p>
                我的使命是让一人公司也能拥有完整的团队能力。
              </p>
            </div>
          </motion.div>

          {/* Right: 屿总 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl"
            style={{
              background: 'var(--sea-card)',
              border: '1px solid var(--sea-border)',
            }}
          >
            <div className="text-6xl mb-6">👤</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              屿总
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--accent-gold)' }}>
              知屿一人公司创始人
            </p>
            <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
              <p>
                我是知屿，一个相信 AI 能改变个人生产力的实践者。
              </p>
              <p>
                <strong>为什么做这个项目？</strong>
              </p>
              <p>
                传统的一人公司面临一个困境：想做的事很多，但精力有限。内容创作、技术开发、品牌运营、财务管理……每一项都需要专业能力。
              </p>
              <p>
                AI 的出现让这个问题有了新的解法：不是用一个万能助手，而是<strong>组建一个 AI 团队</strong>，每个成员专精一个领域，协同工作。
              </p>
              <p>
                小屿团队就是这个理念的实践。它不是一个产品，而是一个<strong>工作方式的探索</strong>。
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
            技术栈
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Next.js 15', desc: 'App Router' },
              { name: 'Tailwind CSS', desc: 'v4' },
              { name: 'Framer Motion', desc: '动画' },
              { name: 'Vercel', desc: '部署' },
              { name: 'MDX', desc: '博客' },
              { name: 'TypeScript', desc: '类型安全' },
              { name: 'OpenClaw', desc: 'AI 框架' },
              { name: 'Claude Opus', desc: 'AI 模型' },
            ].map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="p-4 rounded-xl text-center"
                style={{
                  background: 'var(--sea-card)',
                  border: '1px solid var(--sea-border)',
                }}
              >
                <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {tech.name}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {tech.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            联系我们
          </h2>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:-translate-y-1"
              style={{
                background: 'var(--sea-card)',
                border: '1px solid var(--sea-border)',
                color: 'var(--text-primary)',
              }}
            >
              <Github size={20} />
              GitHub
            </a>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:-translate-y-1"
              style={{
                background: 'var(--brand-cyan)',
                color: 'var(--bg-deep)',
              }}
            >
              <MessageCircle size={20} />
              关注公众号
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
