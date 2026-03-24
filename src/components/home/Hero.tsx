"use client";

import { motion } from "framer-motion";
import { ChevronDown, Bot, Clock4, CalendarDays, Zap } from "lucide-react";
import { Particles } from "./Particles";

const stats = [
  { icon: Bot, value: "16", label: "AI Agent" },
  { icon: Clock4, value: "7×24", label: "全天候运行" },
  { icon: CalendarDays, value: "21+", label: "运行天数" },
  { icon: Zap, value: "100%", label: "自动化率" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-sea-deep via-[#0d1b2e] to-sea-deep" />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 bg-dot-pattern mask-radial-fade opacity-60" />

      {/* Radial cyan glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />
      </div>

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-4 py-1.5 text-sm font-medium text-brand-cyan"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
          </span>
          多 Agent 协作系统 · 实时运行中
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-text-primary">小屿 </span>
            <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
              AI 团队
            </span>
          </h1>
          <p className="mb-3 text-xl font-semibold text-text-secondary md:text-2xl">
            AI 员工总管
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mb-10 max-w-xl text-lg text-text-secondary"
        >
          16 个 AI Agent，一个总管，无限可能
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#team"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue px-8 py-3 font-semibold text-sea-deep transition-all duration-300 hover:shadow-glow"
          >
            认识团队
            <ChevronDown
              size={18}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
          <a
            href="/about"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-sea-border px-8 py-3 font-semibold text-text-secondary transition-all duration-300 hover:border-brand-cyan hover:text-brand-cyan"
          >
            了解更多
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-xl border border-sea-border/60 bg-sea-card/40 px-4 py-4 backdrop-blur-sm"
              >
                <Icon size={16} className="mb-1 text-brand-cyan" />
                <div className="text-xl font-bold text-text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-text-secondary">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-text-secondary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
