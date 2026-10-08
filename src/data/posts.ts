import rawPosts from '../generated/posts.json';
import { BlogPost, PostCategory } from '../types/blog';

export const posts: BlogPost[] = rawPosts as BlogPost[];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRecentPosts(limit = 4): BlogPost[] {
  return posts.slice(0, limit);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return posts.filter((p) => p.categories.some((c) => c.slug === categorySlug));
}

export function getAllCategories(): PostCategory[] {
  const map = new Map<string, string>();
  for (const post of posts) {
    for (const cat of post.categories) {
      if (!map.has(cat.slug)) {
        map.set(cat.slug, cat.name);
      }
    }
  }
  return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
}
