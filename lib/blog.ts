import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Category = 'case-study' | 'strategy' | 'platform' | 'agency';

export type Post = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: Category;
  tags: string[];
  readingTime: string;
  featured?: boolean;
  coverImage?: string;
  content: string;
};

export type Author = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

export const AUTHORS: Record<string, Author> = {
  sarah: {
    name: 'Sarah Adams',
    role: 'Creative Strategist @ The Social Vision',
    bio: 'Sarah leads creative strategy at The Social Vision, turning brand briefs into organic content engines. She has developed the street interview and platform-native formats behind some of our highest-performing campaigns.',
    avatar: '/team/sarah-adams.png',
  },
  zahira: {
    name: 'Zahira Jaigirdar',
    role: 'Founder & Creative Director',
    bio: 'Zahira founded The Social Vision to help brands build real audiences through short-form content. She has overseen campaigns generating over 200M views across TikTok, Instagram Reels, and YouTube Shorts.',
    avatar: '/authors/zahira.png',
  },
  elisa: {
    name: 'Elisa Brookes',
    role: 'Account Manager @ The Social Vision',
    bio: 'Elisa manages client accounts at The Social Vision, working closely with brands to build and execute their short-form content strategy across TikTok and Instagram Reels.',
    avatar: '/logos/tsv-logo.jpeg',
  },
  tsv: {
    name: 'TSV Team',
    role: 'The Social Vision',
    bio: 'The Social Vision is a London-based short-form content agency. We build and run your entire short-form content engine: strategy, production, and posting.',
    avatar: '/logos/tsv-logo.jpeg',
  },
};

export const CATEGORIES: Record<Category, { label: string; color: string; bg: string }> = {
  'case-study': { label: 'Case Study',  color: '#E820A4', bg: 'rgba(232,32,164,0.12)' },
  'strategy':   { label: 'Strategy',    color: '#7C01FF', bg: 'rgba(124,1,255,0.12)'  },
  'platform':   { label: 'Platform',    color: '#08F683', bg: 'rgba(8,246,131,0.12)'  },
  'agency':     { label: 'Agency',      color: '#FFD600', bg: 'rgba(255,214,0,0.12)'  },
};

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

function calcReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function parsePost(slug: string): Post {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    publishedAt: data.publishedAt ?? '',
    updatedAt: data.updatedAt,
    author: data.author ?? 'tsv',
    category: data.category ?? 'strategy',
    tags: data.tags ?? [],
    readingTime: calcReadingTime(content),
    featured: data.featured ?? false,
    coverImage: data.coverImage,
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => parsePost(f.replace('.mdx', '')))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(slug);
}

export function getRelatedPosts(slug: string, category: Category, limit = 3): Post[] {
  return getAllPosts()
    .filter(p => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[2].replace(/\*\*/g, '').replace(/`/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ id, text, level: match[1].length });
  }
  return headings;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thesocialvision.co.uk';
