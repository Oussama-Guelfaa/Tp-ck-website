"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/ui/language-selector";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  ArrowRight,
  Share2,
  Search,
  Tag as TagIcon,
  X
} from "lucide-react";

// Define the Article type
interface Article {
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

// Mock data for articles
const mockArticles: Article[] = [
  {
    id: "article-1",
    title: "TP@CK Launches Revolutionary T30 Packaging Solution",
    excerpt: "We're excited to announce the launch of our latest innovation - the T30 packaging machine with enhanced AI capabilities and improved energy efficiency.",
    content: "Full article content here...",
    publishDate: "2025-03-20",
    readTime: 5,
    image: "/images/article1.png",
    author: {
      name: "Maria Rodriguez",
      avatar: "/images/article1.png"
    },
    tags: ["innovations", "technology"],
    featured: true
  },
  {
    id: "article-2",
    title: "Sustainability Initiative: Our Path to Carbon Neutrality",
    excerpt: "TP@CK is committed to sustainability. Learn about our comprehensive plan to achieve carbon neutrality across all operations by 2030.",
    content: "Full article content here...",
    publishDate: "2025-03-15",
    readTime: 7,
    image: "/images/hero-background.jpg",
    author: {
      name: "Thomas Weber",
      avatar: "/images/hero-background.jpg"
    },
    tags: ["company", "insights"]
  },
  {
    id: "article-3",
    title: "Partnership Announcement: TP@CK and GlobalShip Join Forces",
    excerpt: "We're thrilled to announce our strategic partnership with GlobalShip to revolutionize packaging solutions for the shipping industry.",
    content: "Full article content here...",
    publishDate: "2025-03-10",
    readTime: 4,
    image: "/images/t20-slide.jpg",
    author: {
      name: "James Wilson",
      avatar: "/images/hero-background.jpg"
    },
    tags: ["partnerships", "company"]
  },
  {
    id: "article-4",
    title: "AI Maintenance System Reduces Downtime by 74%",
    excerpt: "Our new AI-powered predictive maintenance system has been shown to reduce machine downtime by an impressive 74% in real-world testing.",
    content: "Full article content here...",
    publishDate: "2025-03-05",
    readTime: 6,
    image: "/images/t50-slide.jpg",
    author: {
      name: "Sarah Chen",
      avatar: "/images/hero-background.jpg"
    },
    tags: ["technology", "innovations"],
    featured: true
  },
  {
    id: "article-5",
    title: "TP@CK to Present at PackExpo 2025",
    excerpt: "Join us at PackExpo 2025 where we'll be showcasing our latest packaging solutions and offering live demonstrations of our innovative technology.",
    content: "Full article content here...",
    publishDate: "2025-02-28",
    readTime: 3,
    image: "/images/t20-slide.jpg",
    author: {
      name: "Robert Johnson",
      avatar: "/images/hero-background.jpg"
    },
    tags: ["events", "company"]
  },
  {
    id: "article-6",
    title: "Industry Insight: The Future of Automated Packaging",
    excerpt: "Explore our in-depth analysis of trends shaping the future of automated packaging solutions in a rapidly changing global market.",
    content: "Full article content here...",
    publishDate: "2025-02-20",
    readTime: 8,
    image: "/images/t30-slide.jpg",
    author: {
      name: "Emma Brown",
      avatar: "/images/hero-background.jpg"
    },
    tags: ["insights", "technology"]
  },
];

// Format date helper function
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Tag component
const TagButton = ({ tag, active, onClick }: { tag: string, active: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
        active
          ? "bg-primary text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {tag}
    </button>
  );
};

// Article Card component
const ArticleCard = ({ article, featured = false }: { article: Article, featured?: boolean }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-900 dark:shadow-gray-800/30 ${
        featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div className={`flex flex-col ${featured ? "md:flex-row" : ""}`}>
        <div className={`relative overflow-hidden ${featured ? "md:w-1/2" : ""}`}>
          <div className="aspect-video relative">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          </div>
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
              >
                {t(`news.tag_${tag}`, tag)}
              </span>
            ))}
          </div>
          {article.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                {t("news.featured", "Featured")}
              </span>
            </div>
          )}
        </div>
        <div className={`flex flex-col justify-between p-6 ${featured ? "md:w-1/2" : ""}`}>
          <div>
            <h3 className="mb-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">
              {article.title}
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {article.excerpt}
            </p>
          </div>
          <div>
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {article.author.name}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{formatDate(article.publishDate)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{article.readTime} {t("news.minutes_read", "min read")}</span>
                </div>
              </div>
            </div>
            <Link href={`/news/${article.id}`}>
              <Button
                variant="link"
                className="px-0 text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
              >
                {t("news.read_more", "Read More")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main News page component
export default function NewsPage() {
  const { t } = useTranslation();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);

  // All unique tags
  const allTags = Array.from(
    new Set(mockArticles.flatMap(article => article.tags))
  );

  // Filter articles based on tag and search
  useEffect(() => {
    let result = mockArticles;

    if (activeTag) {
      result = result.filter(article =>
        article.tags.includes(activeTag)
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(result);
  }, [activeTag, searchQuery]);

  // Featured articles
  const featuredArticles = filteredArticles.filter(article => article.featured);

  return (
    <div className="bg-white dark:bg-gray-900 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image
            src="/images/hero-background.jpg"
            alt="News Hero Background"
            fill
            priority
            className="object-cover object-center z-0"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-20"></div>
        </div>

        <div className="container-custom relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="heading-xl text-white mb-6">
              {t("news.hero_title", "What's New at TP@CK")}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t("news.hero_subtitle", "Stay up to date with the latest innovations, announcements, and insights from our team")}
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("news.search_placeholder", "Search articles...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 px-6 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tags */}
      <div className="bg-gray-50 dark:bg-gray-800 py-6 sticky top-16 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center overflow-x-auto pb-2">
            <div className="text-gray-700 dark:text-gray-300 mr-4 whitespace-nowrap">
              <TagIcon size={16} className="inline mr-2" />
              {t("news.filter_by", "Filter by")}:
            </div>
            <div className="flex gap-2">
              <TagButton
                tag={t("news.all", "All Articles")}
                active={activeTag === null}
                onClick={() => setActiveTag(null)}
              />
              {allTags.map(tag => (
                <TagButton
                  key={tag}
                  tag={t(`news.tag_${tag}`, tag)}
                  active={activeTag === tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom mt-16">
        {/* Results Summary */}
        <div className="mb-10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeTag
              ? t(`news.tag_${activeTag}`, activeTag)
              : t("news.latest", "Latest Articles")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="bg-gray-50 rounded-xl p-12 text-center dark:bg-gray-800">
            <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {t("news.no_results", "No articles found matching your search.")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setActiveTag(null);
              }}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {t("news.all", "All Articles")}
            </Button>
          </div>
        )}

        {filteredArticles.length > 0 && (
          <>
            {/* Featured Articles Section */}
            {featuredArticles.length > 0 && !activeTag && !searchQuery && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t("news.featured", "Featured Stories")}
                </h2>
                <div className="grid grid-cols-1 gap-8">
                  {featuredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} featured={true} />
                  ))}
                </div>
              </div>
            )}

            {/* All Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles
                .filter(article => !article.featured || activeTag || searchQuery)
                .map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
