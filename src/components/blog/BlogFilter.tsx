'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/mdx';

interface BlogFilterProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogFilter({ posts, tags }: BlogFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <>
      {/* Tag Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex flex-wrap gap-2"
      >
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedTag === null
              ? 'bg-[var(--brand-cyan)] text-[var(--bg-deep)]'
              : 'bg-[var(--sea-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          全部
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTag === tag
                ? 'bg-[var(--brand-cyan)] text-[var(--bg-deep)]'
                : 'bg-[var(--sea-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPosts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--sea-card)',
                border: '1px solid var(--sea-border)',
              }}
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {post.title}
              </h2>
              
              <p className="mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {post.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString('zh-CN')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readingTime}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
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
            </Link>
          </motion.article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          暂无文章
        </div>
      )}
    </>
  );
}
