'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, UserRound } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            联系我们
          </h2>
          <p className="text-text-secondary">
            关注公众号获取最新内容，或添加微信深度交流
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
          {/* 公众号 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-sea-border bg-sea-card p-8 text-center transition-all duration-300 hover:border-brand-cyan/40"
          >
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-cyan text-sea-deep">
              <MessageCircle size={24} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-text-primary">
              关注公众号
            </h3>
            <p className="mb-6 text-sm text-text-secondary">
              知屿AI编程 · AI编程与出海干货
            </p>
            <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-xl border border-sea-border">
              <Image
                src="/images/wechat-mp-qr.jpg"
                alt="公众号二维码"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs text-text-secondary">
              扫码关注，获取最新文章
            </p>
          </motion.div>

          {/* 个人微信 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-sea-border bg-sea-card p-8 text-center transition-all duration-300 hover:border-accent-gold/40"
          >
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold text-sea-deep">
              <UserRound size={24} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-text-primary">
              添加微信
            </h3>
            <p className="mb-6 text-sm text-text-secondary">
              知屿 · 一对一深度交流
            </p>
            <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-xl border border-sea-border">
              <Image
                src="/images/wechat-qr.jpg"
                alt="个人微信二维码"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs text-text-secondary">
              扫码添加，备注来意
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
