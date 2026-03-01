"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Particles } from "./Particles";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sea-deep via-sea-deep to-sea-card" />

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span>小屿 </span>
            <span className="inline-block animate-bounce text-5xl md:text-6xl lg:text-7xl">
              🏝️
            </span>
          </h1>

          <p className="mb-2 bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
            AI 员工总管
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mb-10 max-w-xl text-lg text-text-secondary"
        >
          16 个 AI Agent，一个总管，无限可能
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#team"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue px-8 py-3 font-semibold text-sea-deep transition-all duration-300 hover:shadow-glow"
          >
            认识团队
            <ChevronDown
              size={18}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
          <a
            href="/about"
            className="inline-flex items-center gap-2 rounded-lg border border-sea-border px-8 py-3 font-semibold text-text-secondary transition-all duration-300 hover:border-brand-cyan hover:text-brand-cyan"
          >
            了解更多
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-text-secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
