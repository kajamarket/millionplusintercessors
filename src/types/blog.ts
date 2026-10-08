export interface PostCategory {
  name: string;
  slug: string;
}

export interface PostFeaturedImage {
  url: string;
  alt: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  date: string;
  modified: string;
  author: string;
  featuredImage: PostFeaturedImage;
  categories: PostCategory[];
  tags: string[];
  readingTime: number;
}
