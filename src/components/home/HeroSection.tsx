"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from '@/components/ui/language-selector';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

// Function to format text with highlights
function formatHighlightedText(text: string) {
  if (!text) return '';

  // Split by highlight markers
  const parts = text.split(/{highlight}|{\/highlight}/);

  // If no highlights or incorrect format, return the original text
  if (parts.length <= 1) return text;

  // Create highlighted elements
  const result = parts.map((part, index) => {
    // Even indices are regular text, odd indices are highlighted text
    if (index % 2 === 0) {
      return part;
    } else {
      return <span key={index} className="text-primary">{part}</span>;
    }
  });

  return result;
}

export function HeroSection() {
  const { t } = useTranslation();
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Function to handle when iframe has loaded
  const handleIframeLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <section className="relative overflow-hidden bg-black pt-20 pb-16 md:pt-24 md:pb-24 lg:pt-32 lg:pb-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <Image
          src="/images/hero-background.jpg"
          alt="TP@CK Hero Background"
          fill
          priority
          className="object-cover object-center z-0"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-20"></div>
      </div>

      <div className="container-custom relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="text-white space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {t('home.intro', 'Introducing TP@CK')}
              </span>
            </motion.div>

            <motion.h1
              className="heading-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {formatHighlightedText(t('home.title', 'The Future of Intelligent Packaging Solutions'))}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('home.description', 'TP@CK revolutionizes packaging with advanced IT integration, environmental certifications, and operational advantages designed for the modern business landscape.')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 h-12 rounded-md">
                  {t('home.demo', 'Request a Demo')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-white text-black hover:bg-white/10 h-12 px-6">
                    <Play className="mr-2 h-4 w-4" /> {t('home.video', 'Watch Video')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] p-0 bg-black border-none">
                  <DialogTitle className="sr-only">TP@CK Product Overview Video</DialogTitle>
                  <div className="relative aspect-video">
                    <div className="absolute inset-0">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube-nocookie.com/embed/9h4EU2F9yQA?autoplay=1&origin=https://tpack-website.vercel.app&playsinline=1&rel=0&modestbranding=1"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title="TP@CK Product Overview"
                        className="absolute inset-0 w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex -space-x-2">
              </div>
              <p className="text-sm text-gray-400">
                {t('home.certification', 'Certified for all major international markets')}
              </p>
            </motion.div>
          </div>

          {/* Video Column - Replacing the slideshow images */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full">
              {/* Video container with styling */}
              <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xl shadow-primary/20 border border-white/10">
                {/* Loading indicator shown until video loads */}
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                    <div className="animate-pulse flex flex-col items-center">
                      <Play className="h-12 w-12 text-primary mb-2" />
                      <p className="text-white text-sm">Loading video...</p>
                    </div>
                  </div>
                )}

                {/* Gradient overlay to match site aesthetics - positioned below the video for interaction */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

                {/* Enhanced YouTube Embed with correct parameters for better playback */}
                <div className="absolute inset-0 z-10">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube-nocookie.com/embed/9h4EU2F9yQA?origin=https://tpack-website.vercel.app&playsinline=1&rel=0&modestbranding=1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="TP@CK Product Video"
                    onLoad={handleIframeLoad}
                    loading="lazy"
                  ></iframe>
                </div>

                {/* Video label - positioned above the video but allows interaction with the video */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-md z-20 pointer-events-none">
                  <p className="font-bold text-xl">TP@CK Technology</p>
                </div>
              </div>

              

              <div className="absolute -top-5 -right-5 md:right-0 bg-black rounded-lg px-4 py-3 shadow-lg z-10">
                <p className="text-white font-semibold">{t('home.ai_maintenance', 'AI Predictive Maintenance')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
