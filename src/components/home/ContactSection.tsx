'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, User } from 'lucide-react';

export function ContactSection() {
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
            联系我们
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            关注公众号获取最新内容，或添加微信深度交流
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* 公众号 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl text-center"
            style={{
              background: 'var(--sea-card)',
              border: '1px solid var(--sea-border)',
            }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ background: 'var(--brand-cyan)', color: 'var(--bg-deep)' }}
            >
              <MessageCircle size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              关注公众号
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              知屿AI编程 · AI编程与出海干货
            </p>
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden"
              style={{ border: '2px solid var(--sea-border)' }}
            >
              <Image
                src="/images/wechat-mp-qr.jpg"
                alt="公众号二维码"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              扫码关注，获取最新文章
            </p>
          </motion.div>

          {/* 个人微信 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl text-center"
            style={{
              background: 'var(--sea-card)',
              border: '1px solid var(--sea-border)',
            }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ background: 'var(--accent-gold)', color: 'var(--bg-deep)' }}
            >
              <User size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              添加微信
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              知屿 · 一对一深度交流
            </p>
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden"
              style={{ border: '2px solid var(--sea-border)' }}
            >
              <Image
                src="/images/wechat-qr.jpg"
                alt="个人微信二维码"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              扫码添加，备注来意
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
