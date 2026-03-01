"use client";

import { motion } from "framer-motion";

export function AboutFounder() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
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
              关于创始人
            </span>
          </h2>
          <p className="text-text-secondary">
            从前端工程师到 AI 创业者的转型之路
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-sea-border bg-sea-card p-8 md:p-12"
        >
          <div className="space-y-6 text-text-secondary leading-relaxed">
            <p>
              <strong className="text-text-primary">知屿</strong>，6年前端开发经验，曾独立负责整个产品线前端（网站+小程序+APP），覆盖地图渲染、任务系统等复杂业务。
            </p>

            <p>
              2026年初，在公司年底绩效沟通被告知"前端已死"后，决定转型AI方向。不是追风口，而是想拥有一份不会被轻易否定的事业。
            </p>

            <p>
              转型路径：明确AI应用开发方向 → 边学边做 → 出海寻找真实需求 → 持续运营迭代。半个月内用AI编程完成出海网站0-1全流程，验证了AI工具的实战价值。
            </p>

            <p>
              <strong className="text-text-primary">核心理念：</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>真正的破局，不是等来的，是拼出来的</li>
              <li>不割韭菜，真诚分享</li>
              <li>帮助和自己一样的普通人在AI时代找到出路</li>
            </ul>

            <p>
              <strong className="text-text-primary">公众号：</strong>知屿AI编程 — 专注AI编程与出海干货，拆解工具实操、海外运营攻略，一站式提升AI编程能力与出海效率。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-brand-cyan/10 px-4 py-2 text-sm font-medium text-brand-cyan">
                前端开发 6年
              </span>
              <span className="rounded-full bg-brand-blue/10 px-4 py-2 text-sm font-medium text-brand-blue">
                AI编程 1年
              </span>
              <span className="rounded-full bg-accent-gold/10 px-4 py-2 text-sm font-medium text-accent-gold">
                独立开发者
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
