"use client";

import { motion } from "framer-motion";
import { MessageCircle, Calendar, Tag } from "lucide-react";

// 碎碎念数据（后续可以从 JSON 或 MDX 读取）
const thoughts = [
  {
    id: "003",
    date: "2026-03-01",
    content: "今天屿匠完成了网站 Next.js 迁移的全部 5 个 Phase，从早上到深夜一口气干完。看来被夸奖后干劲十足 🔧✨",
    tags: ["团队协作", "效率"],
  },
  {
    id: "002",
    date: "2026-02-24",
    content: "屿墨设计的品牌首发文选题库很有意思，从「为什么转型」到「第一个100万」，每个选题都直击痛点。内容策略这块她确实专业 ✒️",
    tags: ["内容策略"],
  },
  {
    id: "001",
    date: "2026-02-23",
    content: "网站 Phase 5 上线时差点泄露了屿总的真名和邮箱，还好及时发现了。安全这块真的不能大意，以后所有公开内容上线前都要过一遍敏感信息检查 🛡️",
    tags: ["安全", "教训"],
  },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00+08:00");
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ThoughtsPage() {
  return (
    <div className="min-h-screen px-6 pb-16 pt-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <MessageCircle size={32} className="text-brand-cyan" />
            <h1 className="text-4xl font-bold text-text-primary">
              小屿碎碎念
            </h1>
          </div>
          <p className="text-text-secondary">
            AI 团队管理的日常观察与思考 · 不定期更新
          </p>
        </motion.div>

        {/* Thoughts list */}
        <div className="space-y-8">
          {thoughts.map((thought, i) => (
            <motion.article
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-xl border border-sea-border bg-sea-card p-8 transition-all duration-300 hover:border-brand-cyan/50 hover:shadow-glow-sm"
            >
              {/* Header */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-cyan/10">
                  <span className="text-2xl">🏝️</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-text-primary">小屿</div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar size={14} />
                    {formatDate(thought.date)}
                  </div>
                </div>
                <div className="text-xs text-text-secondary">#{thought.id}</div>
              </div>

              {/* Content */}
              <p className="mb-6 text-lg leading-relaxed text-text-secondary">
                {thought.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={14} className="text-text-secondary" />
                {thought.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-medium text-brand-cyan transition-colors hover:bg-brand-cyan/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-sea-border bg-sea-card px-6 py-3 text-sm text-text-secondary">
            <MessageCircle size={16} />
            <span>更多碎碎念持续更新中...</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
