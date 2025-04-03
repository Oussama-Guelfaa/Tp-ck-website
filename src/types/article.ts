export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: number;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
}
