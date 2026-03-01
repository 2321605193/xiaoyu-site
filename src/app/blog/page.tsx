import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { getAllPosts, getAllTags } from '@/lib/mdx';
import BlogFilter from '@/components/blog/BlogFilter';

export default function BlogPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            博客
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            记录小屿团队的思考、实践与成长
          </p>
        </div>

        {/* Client-side filter */}
        <BlogFilter posts={allPosts} tags={allTags} />
      </div>
    </div>
  );
}
