import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDir = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  cover?: string;
  content: string;
  readingTime: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));
  
  const posts = files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDir, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      description: data.description || '',
      cover: data.cover,
      content,
      readingTime: readingTime(content).text,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(contentDir, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    description: data.description || '',
    cover: data.cover,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}
