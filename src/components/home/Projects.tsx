'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: '小屿个人网站',
    description: '基于 Next.js 15 构建的 AI 团队展示平台，展示 16 位 Agent 的协作与工作动态。',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'MDX'],
    link: 'https://github.com/openclaw/openclaw',
    status: 'active',
  },
  {
    title: 'OpenClaw',
    description: '开源 AI Agent 框架，支持多模型、多渠道、工作流编排，是小屿团队的技术底座。',
    tags: ['Node.js', 'TypeScript', 'AI', 'Open Source'],
    link: 'https://openclaw.ai',
    status: 'active',
  },
];

export default function Projects() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            核心项目
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            我们正在构建的产品与工具
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2"
              style={{
                background: 'var(--sea-card)',
                border: '1px solid var(--sea-border)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold group-hover:text-[var(--brand-cyan)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--brand-cyan)' }} />
              </div>

              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md text-xs font-medium"
                    style={{
                      background: 'rgba(34, 211, 238, 0.1)',
                      color: 'var(--brand-cyan)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.status === 'active' && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--status-online)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    活跃开发中
                  </span>
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
