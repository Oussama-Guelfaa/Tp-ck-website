"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from './EcoHero.module.css';
import { Button } from "../../components/ui/button";
import {
  ArrowRight,
  Play,
  Leaf,
  Recycle,
  Wind,
  Droplets,
  TreePine,
  Globe,
  Sprout,
  Zap
} from "lucide-react";
import { useTranslation } from '../../components/ui/language-selector';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "../../components/ui/dialog";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import { HeroModel } from "./HeroModel";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

// Animated background component with organic shapes
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background with animated blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50/30"></div>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>

      {/* Animated blobs */}
      <motion.div
        className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-green-100/30 blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div
        className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-green-200/20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div
        className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full bg-red-100/20 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-400"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.1, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating eco icons with subtle animations */}
      <motion.div
        className="absolute top-[15%] left-[8%]"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Leaf className="text-green-500 h-10 w-10 opacity-20" />
      </motion.div>

      <motion.div
        className="absolute top-[25%] right-[12%]"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Recycle className="text-green-600 h-12 w-12 opacity-15" />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[15%]"
        animate={{
          y: [0, 8, 0],
          x: [0, 5, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Wind className="text-green-400 h-8 w-8 opacity-20" />
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[20%]"
        animate={{
          y: [0, -12, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Droplets className="text-blue-400 h-9 w-9 opacity-20" />
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] right-[8%]"
        animate={{
          y: [0, 10, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <TreePine className="text-green-500 h-11 w-11 opacity-15" />
      </motion.div>

      <motion.div
        className="absolute top-[60%] left-[25%]"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Globe className="text-blue-500 h-10 w-10 opacity-15" />
      </motion.div>

      <motion.div
        className="absolute top-[10%] left-[40%]"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Sprout className="text-green-400 h-8 w-8 opacity-20" />
      </motion.div>
    </div>
  );
};

// Stats component
const EcoStats = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <motion.div
        className="flex flex-col items-center text-center p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        whileHover={{ scale: 1.03 }}
      >
        <div className="text-green-600 mb-2 bg-green-50 p-3 rounded-full">
          <Recycle className="h-7 w-7" />
        </div>
        <div className={`${styles.countUp} text-3xl font-bold text-green-800 mb-1`}>30%</div>
        <div className="text-sm font-medium text-green-700">{t('home.stats.waste', 'Waste Reduction')}</div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center text-center p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        whileHover={{ scale: 1.03 }}
      >
        <div className="text-amber-500 mb-2 bg-amber-50 p-3 rounded-full">
          <Zap className="h-7 w-7" />
        </div>
        <div className={`${styles.countUp} text-3xl font-bold text-amber-600 mb-1`}>40%</div>
        <div className="text-sm font-medium text-amber-700">{t('home.stats.energy', 'Energy Efficient')}</div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center text-center p-2 bg-white/90 backdrop-blur-sm rounded-xl border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        whileHover={{ scale: 1.03 }}
      >
        <div className="text-blue-600 mb-2 bg-blue-50 p-3 rounded-full">
          <Globe className="h-7 w-7" />
        </div>
        <div className={`${styles.countUp} text-2xl font-bold text-blue-800 mb-1`}>EcoVadis</div>
        <div className="text-sm font-medium text-blue-700">{t('home.stats.Certification', 'Certification')}</div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center text-center p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        whileHover={{ scale: 1.03 }}
      >
        <div className="text-green-600 mb-2 bg-green-50 p-3 rounded-full">
          <Leaf className="h-7 w-7" />
        </div>
        <div className={`${styles.countUp} text-3xl font-bold text-green-800 mb-1`}>98% </div>
        <div className="text-sm font-medium text-green-700">{t('home.stats.MachineUptime', 'Machine Uptime')}</div>
      </motion.div>
    </div>
  );
};

export function EcoHeroSection() {
  const { t } = useTranslation();
  const [videoOpen, setVideoOpen] = useState(false);
  const [bgVideoVisible, setBgVideoVisible] = useState(false);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Typing effect for the headline
  const headlineText = "Tp@ck: Smart, Sustainable & Profitable Packaging";
  const [hasTyped, setHasTyped] = useState(false);
  // Removed unused finalText state

  // Only use the typing effect if we haven't typed it yet
  const { displayText, isDone, cursorVisible } = useTypingEffect({
    text: hasTyped ? "" : headlineText,
    typingSpeed: 45,
    delayBeforeStart: 500,
    showCursor: true,
  });

  // When typing is done, mark as typed
  useEffect(() => {
    if (isDone && !hasTyped) {
      setHasTyped(true);
    }
  }, [isDone, hasTyped]);

  // Set up intersection observer for background video
  useEffect(() => {
    if (!bgVideoRef.current || !sectionRef.current) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the element is visible
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setBgVideoVisible(true);
          if (bgVideoRef.current) {
            bgVideoRef.current.play().catch((e: Error) => console.error('Video play error:', e));
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Content section with headline and buttons */}
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 md:pt-32 md:pb-24 relative">
        {/* Animated background elements */}
        <AnimatedBackground />

        {/* Main content and 3D model container */}
        <div className="container mx-auto px-4 sm:px-6 relative z-20 flex flex-col md:flex-row items-center">
          {/* 3D Model - visible on desktop, hidden on mobile initially */}
          <div className="hidden md:block md:absolute md:inset-0">
            <HeroModel />
            {/* BeforeAfter Slider positioned below the 3D model */}
            <div className="absolute top-[72%] right-[5%] w-[45%] z-10">
              <BeforeAfterSlider className="rounded-xl shadow-xl" height="220px" />
            </div>
          </div>

          {/* Text content */}
          <div className="max-w-xl mx-auto text-center md:text-left md:ml-0 md:mr-auto md:w-1/2">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-md">
                  <Leaf className={`mr-1.5 h-3.5 w-3.5 ${styles.glowingGreen}`} />
                  {t('home.intro', 'Introducing TP@CK')}
                </span>
              </motion.div>

              {/* Typing headline */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight font-sans">
                  <span className={styles.gradientText}>
                    {hasTyped ? (
                      <>
                        <span className="font-extrabold">Tp@ck:</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-600 hover:scale-105 transition-transform inline-block font-normal">Smart</span>, <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500 hover:scale-105 transition-transform inline-block font-normal">Sustainable</span> & <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500 hover:scale-105 transition-transform inline-block font-normal">Profitable</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500 hover:scale-105 transition-transform inline-block font-normal">Pack@ging</span>
                      </>
                    ) : displayText}
                    <AnimatePresence>
                      {!hasTyped && cursorVisible && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={styles.typingCursor}
                        >
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </h1>
              </div>

              {/* Subheading that fades in after typing */}
              <AnimatePresence>
                {(isDone || hasTyped) && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-gray-600 max-w-xl mx-auto"
                  >
                    A French-made, <span className="font-bold text-green-600 relative group">
                      auto-sealing
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span> packaging solution—<span className="font-bold text-red-600 relative group">
                      no glue
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>, <span className="font-bold text-blue-600 relative group">
                      no plastic
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>—designed to reduce waste, optimize costs, and drive your ecological transition.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* CTA buttons that fade in after typing */}
              <AnimatePresence>
                {(isDone || hasTyped) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mt-8"
                  >
                    <Link href="/contact">
                      <Button className={`${styles.ecoCta} bg-green-700 hover:bg-green-800 text-white px-6 py-6 h-14 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}>
                        {t('home.demo', 'Request a Demo')} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>

                    <Link href="/model-selection">
                      <Button variant="outline" className={`${styles.ecoCta} border-red-300 text-red-700 hover:bg-red-50 h-14 px-6 py-6 text-lg font-medium transition-all duration-300`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('home.view3dModels', 'View 3D Models')}
                      </Button>
                    </Link>

                    <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className={`${styles.ecoCta} border-green-300 text-green-700 hover:bg-green-50 h-14 px-6 py-6 text-lg font-medium transition-all duration-300`}>
                          <Play className="mr-2 h-5 w-5" /> {t('home.video', 'Watch Video')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px] p-0 bg-black border-none">
                        <DialogTitle className="sr-only">{t('home.videoTitle', 'TP@CK Product Overview Video')}</DialogTitle>
                        <div className="relative aspect-video">
                          <div className="absolute inset-0">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube-nocookie.com/embed/9h4EU2F9yQA?autoplay=1&origin=https://tpack-website.vercel.app&playsinline=1&rel=0&modestbranding=1"
                              style={{border: 0}}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              title={t('home.videoTitle', 'TP@CK Product Overview')}
                              className="absolute inset-0 w-full h-full"
                            ></iframe>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Eco stats that appear after typing */}
              <AnimatePresence>
                {(isDone || hasTyped) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <EcoStats />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3D Model and BeforeAfter Slider - visible on mobile only */}
              <div className="md:hidden w-full mt-8">
                <div className="h-64 mb-4">
                  <HeroModel />
                </div>
                <BeforeAfterSlider className="rounded-xl shadow-xl" height="200px" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Removed the standalone Before/After Slider Section as it's now integrated in the Hero Section */}

      {/* Background video section that appears below the content */}
      <div ref={sectionRef} className="w-full relative" style={{ height: '80vh' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: bgVideoVisible ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <video
            ref={bgVideoRef}
            src="/tpack%20intro.mp4"
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          />
        </motion.div>
      </div>
    </section>
  );
}
