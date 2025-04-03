import { Metadata } from 'next';
import ArticleDetail from './ArticleDetail';
import { mockArticles } from '@/data/articles';

// Generate static params for build time
export function generateStaticParams() {
  return mockArticles.map((article) => ({
    articleId: article.id,
  }));
}

// Generate metadata for the page
export function generateMetadata({ params }: { params: { articleId: string } }): Metadata {
  const article = mockArticles.find(a => a.id === params.articleId);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

// Server component that passes the article data to the client component
export default function ArticlePage({ params }: { params: { articleId: string } }) {
  const article = mockArticles.find(a => a.id === params.articleId);
  const relatedArticles = article
    ? mockArticles.filter(a => a.id !== params.articleId && a.tags.some(tag => article.tags.includes(tag))).slice(0, 3)
    : [];

  // If no article is found, we still render the client component which will handle the redirect
  return <ArticleDetail article={article} relatedArticles={relatedArticles} />;
}
