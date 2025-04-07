"use client";

import { useState } from "react";
import Link from "next/link";
// Image import removed as it's no longer needed
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Leaf, Recycle, Wind, Droplets, TreePine } from "lucide-react";
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
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-24 lg:pt-32 lg:pb-32 bg-white">
      {/* Floating eco icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Leaf className="absolute top-[10%] left-[5%] text-green-400 h-8 w-8 opacity-40 animate-pulse" style={{animationDuration: '4s'}} />
        <Recycle className="absolute top-[15%] right-[10%] text-green-500 h-10 w-10 opacity-30 animate-pulse" style={{animationDuration: '6s'}} />
        <Wind className="absolute bottom-[20%] left-[15%] text-green-400 h-6 w-6 opacity-40 animate-pulse" style={{animationDuration: '5s'}} />
        <Droplets className="absolute top-[40%] right-[20%] text-green-400 h-7 w-7 opacity-30 animate-pulse" style={{animationDuration: '7s'}} />
        <TreePine className="absolute bottom-[10%] right-[5%] text-green-500 h-9 w-9 opacity-40 animate-pulse" style={{animationDuration: '8s'}} />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-50/30 to-transparent pointer-events-none"></div>

      {/* Leaf pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute h-24 w-24 top-[5%] left-[25%] rotate-12">
          <TreePine className="h-full w-full text-green-200" />
        </div>
        <div className="absolute h-32 w-32 bottom-[15%] right-[30%] -rotate-12">
          <Leaf className="h-full w-full text-green-200" />
        </div>
        <div className="absolute h-20 w-20 top-[40%] right-[15%] rotate-45">
          <Recycle className="h-full w-full text-green-200" />
        </div>
        <div className="absolute h-28 w-28 bottom-[30%] left-[10%] -rotate-12">
          <Droplets className="h-full w-full text-green-200" />
        </div>
      </div>
      {/* Background elements removed */}

      <div className="container-custom relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="text-gray-800 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                <Leaf className="mr-1 h-3.5 w-3.5" />
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
              className="text-lg md:text-xl text-gray-600 max-w-xl"
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
              <Link href="/model-selection">
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 h-12 px-6">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  View 3D Models
                </Button>
              </Link>
              <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 h-12 px-6">
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
                        style={{border: 0}}
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
              className="flex flex-col gap-4 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg p-3">
                <Leaf className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-700">
                  {t('home.eco_friendly', 'Our eco-friendly packaging solutions reduce waste by up to 30% and minimize environmental impact')}
                </p>
              </div>
              <p className="text-sm text-gray-600 flex items-center">
                <Recycle className="h-4 w-4 mr-2 text-green-600" />
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
              <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xl shadow-primary/20 border border-gray-100">
                {/* Loading indicator shown until video loads */}
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
                    <div className="animate-pulse flex flex-col items-center">
                      <Play className="h-12 w-12 text-primary mb-2" />
                      <p className="text-gray-700 text-sm">Loading video...</p>
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
                    style={{border: 0}}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="TP@CK Product Video"
                    onLoad={handleIframeLoad}
                    loading="lazy"
                  ></iframe>
                </div>

                {/* Video label - positioned above the video but allows interaction with the video */}
                <div className="absolute bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-md z-20 pointer-events-none flex items-center">
                  <Recycle className="mr-2 h-5 w-5" /><p className="font-bold text-xl">TP@CK Technology</p>
                </div>
              </div>



              <div className="absolute -top-5 -right-5 md:right-0 bg-primary rounded-lg px-4 py-3 shadow-lg z-10 flex items-center">
                <TreePine className="mr-2 h-5 w-5 text-white" /><p className="text-white font-semibold">{t('home.ai_maintenance', 'AI Predictive Maintenance')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
