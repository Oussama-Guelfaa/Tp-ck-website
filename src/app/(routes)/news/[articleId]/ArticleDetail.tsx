"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/ui/language-selector";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link2
} from "lucide-react";
import { Article } from "@/types/article"; // Importing Article type

// Format date helper function
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Related Article Card component
const RelatedArticleCard = ({ article }: { article: Article }) => {
  const { t } = useTranslation();

  return (
    <Link href={`/news/${article.id}`} className="group block">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-900">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {t(`news.tag_${article.tags[0]}`, article.tags[0])}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-primary dark:text-white">
            {article.title}
          </h3>
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{formatDate(article.publishDate)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>{article.readTime} {t("news.minutes_read", "min read")}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Social Share component
const SocialShare = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 border-l border-gray-200 pl-6 dark:border-gray-800">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {t("news.share", "Share")}
      </span>
      <div className="flex flex-col space-y-3">
        <button className="rounded-full bg-blue-600 p-2 text-white transition-transform hover:scale-110">
          <Facebook size={20} />
        </button>
        <button className="rounded-full bg-sky-500 p-2 text-white transition-transform hover:scale-110">
          <Twitter size={20} />
        </button>
        <button className="rounded-full bg-blue-700 p-2 text-white transition-transform hover:scale-110">
          <Linkedin size={20} />
        </button>
        <button
          onClick={copyToClipboard}
          className="relative rounded-full bg-gray-200 p-2 text-gray-700 transition-transform hover:scale-110 dark:bg-gray-700 dark:text-gray-300"
        >
          <Link2 size={20} />
          {copied && (
            <span className="absolute -right-20 top-0 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

// Main Article Detail component
export default function ArticleDetail({
  article,
  relatedArticles
}: {
  article: Article | null | undefined;
  relatedArticles: Article[]
}) {
  const router = useRouter();
  const { t } = useTranslation();

  // If no article is found, redirect to news page
  useEffect(() => {
    if (!article) {
      router.push('/news');
    }
  }, [article, router]);

  if (!article) {
    return (
      <div className="container-custom mx-auto py-20 text-center">
        <div className="animate-pulse">
          <div className="h-10 w-1/2 bg-gray-300 dark:bg-gray-700 mx-auto rounded mb-6"></div>
          <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 mx-auto rounded mb-8"></div>
          <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-xl mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pb-20 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/news?tag=${tag}`}
                  className="rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white hover:bg-primary"
                >
                  {t(`news.tag_${tag}`, tag)}
                </Link>
              ))}
            </div>
            <h1 className="heading-xl text-white mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center space-x-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/30">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{formatDate(article.publishDate)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{article.readTime} {t("news.minutes_read", "min read")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container-custom mx-auto py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Sidebar for Social Sharing (on desktop) */}
          <div className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-32">
              <SocialShare />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* Tags */}
            <div className="mt-12 border-t border-b border-gray-200 py-6 dark:border-gray-800">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("news.categories", "Categories")}:
                </span>
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/news?tag=${tag}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-gray-300"
                  >
                    {t(`news.tag_${tag}`, tag)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Share (on mobile) */}
            <div className="mt-8 block lg:hidden">
              <div className="flex items-center justify-center space-x-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("news.share", "Share")}:
                </span>
                <button className="rounded-full bg-blue-600 p-2 text-white transition-transform hover:scale-110">
                  <Facebook size={18} />
                </button>
                <button className="rounded-full bg-sky-500 p-2 text-white transition-transform hover:scale-110">
                  <Twitter size={18} />
                </button>
                <button className="rounded-full bg-blue-700 p-2 text-white transition-transform hover:scale-110">
                  <Linkedin size={18} />
                </button>
                <button
                  onClick={() => {
                    if (typeof navigator !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href).catch(() => {});
                    }
                  }}
                  className="rounded-full bg-gray-200 p-2 text-gray-700 transition-transform hover:scale-110 dark:bg-gray-700 dark:text-gray-300"
                >
                  <Link2 size={18} />
                </button>
              </div>
            </div>

            {/* Back to News */}
            <div className="mt-10">
              <Link href="/news">
                <Button variant="outline" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  {t("news.all", "All Articles")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Related Articles Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-32 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                {t("news.related", "Related Articles")}
              </h3>
              <div className="space-y-6">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map((relatedArticle) => (
                    <RelatedArticleCard key={relatedArticle.id} article={relatedArticle} />
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    No related articles found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
