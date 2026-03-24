'use client';

import { motion } from 'framer-motion';
import { ExternalLink, CircleDot } from 'lucide-react';

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
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            核心项目
          </h2>
          <p className="text-text-secondary">
            我们正在构建的产品与工具
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
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
              className="group cursor-pointer rounded-2xl border border-sea-border bg-sea-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-glow"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-2xl font-bold text-text-primary transition-colors duration-200 group-hover:text-brand-cyan">
                  {project.title}
                </h3>
                <ExternalLink
                  size={20}
                  className="text-brand-cyan opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </div>

              <p className="mb-6 leading-relaxed text-text-secondary">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-brand-cyan/10 px-3 py-1 text-xs font-medium text-brand-cyan"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.status === 'active' && (
                <div className="mt-4 flex items-center gap-2">
                  <CircleDot size={14} className="animate-pulse text-status-online" />
                  <span className="text-xs text-text-secondary">
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
