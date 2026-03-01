import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: '文章未找到' };
  
  return {
    title: `${post.title} - 小屿博客`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-8 text-sm transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} />
          返回博客列表
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {post.readingTime}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md text-sm font-medium"
                style={{
                  background: 'rgba(34, 211, 238, 0.1)',
                  color: 'var(--brand-cyan)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none"
          style={{
            '--tw-prose-body': 'var(--text-secondary)',
            '--tw-prose-headings': 'var(--text-primary)',
            '--tw-prose-links': 'var(--brand-cyan)',
            '--tw-prose-code': 'var(--brand-cyan)',
            '--tw-prose-pre-bg': 'var(--sea-card)',
          } as React.CSSProperties}
        >
          <MDXRemote source={post.content} />
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--sea-border)' }}>
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="text-sm transition-colors hover:text-[var(--brand-cyan)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              ← 返回博客列表
            </Link>
            <Link
              href="/team"
              className="text-sm transition-colors hover:text-[var(--brand-cyan)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              认识团队 →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
