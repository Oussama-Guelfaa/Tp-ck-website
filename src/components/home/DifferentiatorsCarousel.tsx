'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Server, Shield, Cpu, BarChart3, Database, Zap, BrainCircuit, Gauge, Workflow, Award, Leaf, Recycle, Wind } from 'lucide-react';
import { useTranslation } from '@/components/ui/language-selector';
import styles from './DifferentiatorsCarousel.module.css';

// Define the differentiator data structure
interface Differentiator {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  color: string;
  bgColor: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  benefitIcons: React.ComponentType<{ className?: string; style?: React.CSSProperties }>[];
  learnMoreLink: string;
}

export function DifferentiatorsCarousel() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Define the differentiators with their respective themes
  const differentiators: Differentiator[] = [
    {
      id: 'it-integration',
      title: t('home.differentiators.it.title', 'IT Integration'),
      description: t('home.differentiators.it.description', 'Seamless compatibility with all major WMS/WCS systems enables efficient warehouse management and real-time data synchronization.'),
      benefits: [
        t('home.differentiators.it.benefit1', 'Compatible with all major WMS providers'),
        t('home.differentiators.it.benefit2', 'Real-time inventory tracking'),
        t('home.differentiators.it.benefit3', 'Automated workflow optimization'),
        t('home.differentiators.it.benefit4', 'Centralized control interface'),
      ],
      color: '#D32F2F', // Tech red
      bgColor: 'rgba(211, 47, 47, 0.03)',
      icon: Server,
      benefitIcons: [Database, Server, Workflow, Zap],
      learnMoreLink: '/features/it-integration',
    },
    {
      id: 'environmental',
      title: t('home.differentiators.environmental.title', 'Environmental Certifications'),
      description: t('home.differentiators.environmental.description', 'UL certification for the US market and international standards compliance for global operation with eco-friendly materials.'),
      benefits: [
        t('home.differentiators.environmental.benefit1', 'UL certified for US market'),
        t('home.differentiators.environmental.benefit2', 'CE marked for European compliance'),
        t('home.differentiators.environmental.benefit3', 'ISO 14001 environmental management'),
        t('home.differentiators.environmental.benefit4', 'Energy efficiency rating A++'),
      ],
      color: '#2E7D32', // Eco green
      bgColor: 'rgba(46, 125, 50, 0.03)',
      icon: Shield,
      benefitIcons: [Award, Shield, Leaf, Recycle],
      learnMoreLink: '/features/environmental-certifications',
    },
    {
      id: 'ai-iconnect',
      title: t('home.differentiators.ai.title', 'AI IConnect'),
      description: t('home.differentiators.ai.description', 'Advanced predictive maintenance system powered by AI that reduces downtime by 74% and extends the machine\'s operational life.'),
      benefits: [
        t('home.differentiators.ai.benefit1', '74% reduction in unexpected downtime'),
        t('home.differentiators.ai.benefit2', 'Predictive component failure alerts'),
        t('home.differentiators.ai.benefit3', 'Automatic maintenance scheduling'),
        t('home.differentiators.ai.benefit4', 'Remote diagnostics and support'),
      ],
      color: '#0288D1', // Electric blue
      bgColor: 'rgba(2, 136, 209, 0.03)',
      icon: Cpu,
      benefitIcons: [BrainCircuit, Zap, Cpu, Server],
      learnMoreLink: '/features/ai-iconnect',
    },
    {
      id: 'operational',
      title: t('home.differentiators.operational.title', 'Operational Advantages'),
      description: t('home.differentiators.operational.description', 'Enhanced efficiency metrics that deliver measurable ROI through operational improvements and workflow optimization.'),
      benefits: [
        t('home.differentiators.operational.benefit1', '30% faster packaging speeds'),
        t('home.differentiators.operational.benefit2', '20% reduction in material consumption'),
        t('home.differentiators.operational.benefit3', '15% lower energy consumption'),
        t('home.differentiators.operational.benefit4', 'Dual-mode operation for flexibility'),
      ],
      color: '#6A1B9A', // Dynamic purple
      bgColor: 'rgba(106, 27, 154, 0.03)',
      icon: BarChart3,
      benefitIcons: [Gauge, BarChart3, Wind, Workflow],
      learnMoreLink: '/features/operational-advantages',
    },
  ];

  // Handle auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      // Swipe left
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 100) {
      // Swipe right
      prevSlide();
    }
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % differentiators.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + differentiators.length) % differentiators.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const currentDifferentiator = differentiators[currentIndex];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-white">
      {/* Section header */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            className="inline-block text-sm font-semibold uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('home.differentiators.sectionLabel', 'What Makes Us Different')}
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('home.differentiators.sectionTitle', 'Key Differentiators')}
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('home.differentiators.sectionDescription', 'Discover what sets TP@CK apart from legacy solutions with our innovative approach to packaging technology.')}
          </motion.p>
        </div>
      </div>

      {/* Carousel container */}
      <div
        className={`${styles.carouselContainer} relative max-w-7xl mx-auto px-4 md:px-6`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className={`${styles.slide} w-full`}
              style={{
                borderTop: `4px solid ${currentDifferentiator.color}`,
                background: currentDifferentiator.bgColor,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
                {/* Content section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`${styles.iconContainer} p-3 rounded-lg`}
                      style={{ backgroundColor: currentDifferentiator.color }}
                    >
                      <currentDifferentiator.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold" style={{ color: currentDifferentiator.color }}>
                      {currentDifferentiator.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 text-lg">
                    {currentDifferentiator.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      {t('home.differentiators.keyBenefits', 'Key Benefits')}:
                    </h4>
                    <ul className="space-y-3">
                      {currentDifferentiator.benefits.map((benefit, idx) => (
                        <li key={idx} className={`${styles.benefitItem} flex items-start`}>
                          <div
                            className={`${styles.benefitIcon} p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5`}
                            style={{ backgroundColor: `${currentDifferentiator.color}20` }}
                          >
                            {(() => {
                              const IconComponent = currentDifferentiator.benefitIcons[idx % currentDifferentiator.benefitIcons.length];
                              return <IconComponent className="h-4 w-4" style={{ color: currentDifferentiator.color }} />;
                            })()}
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={currentDifferentiator.learnMoreLink}
                    className={`${styles.learnMoreLink} inline-flex items-center font-medium mt-4 group`}
                    style={{ color: currentDifferentiator.color }}
                  >
                    {t('home.differentiators.learnMore', 'Learn more')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

                {/* Visual section */}
                <div className="relative rounded-xl overflow-hidden h-full min-h-[300px] flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `radial-gradient(circle at center, ${currentDifferentiator.color} 0%, transparent 70%)`
                    }}
                  ></div>

                  {/* Circuit pattern for IT Integration */}
                  {currentDifferentiator.id === 'it-integration' && (
                    <div className={styles.circuitPattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 H100 M50 0 V100 M25 25 H75 V75 H25 Z' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='none' /%3E%3C/svg%3E")` }}></div>
                  )}

                  {/* Leaf pattern for Environmental */}
                  {currentDifferentiator.id === 'environmental' && (
                    <div className={styles.leafPattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30,70 Q50,20 70,70 T30,70 Z' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='none' /%3E%3C/svg%3E")` }}></div>
                  )}

                  {/* AI pattern for AI IConnect */}
                  {currentDifferentiator.id === 'ai-iconnect' && (
                    <div className={styles.aiPattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='none' /%3E%3Cpath d='M30,50 L70,50 M50,30 L50,70' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' /%3E%3C/svg%3E")` }}></div>
                  )}

                  {/* Operational pattern */}
                  {currentDifferentiator.id === 'operational' && (
                    <div className={styles.operationalPattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,80 L40,40 L60,60 L80,20' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='2' fill='none' /%3E%3C/svg%3E")` }}></div>
                  )}

                  {/* Centered icon */}
                  <div
                    className={`${styles.pulseAnimation} relative z-10 p-8 rounded-full`}
                    style={{ backgroundColor: `${currentDifferentiator.color}15` }}
                  >
                    <div
                      className={`${styles.iconContainer} p-6 rounded-full`}
                      style={{ backgroundColor: `${currentDifferentiator.color}30` }}
                    >
                      <currentDifferentiator.icon
                        className="h-16 w-16"
                        style={{ color: currentDifferentiator.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className={`${styles.navigationButton} ${styles.navigationButtonPrev} absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg z-10 hover:bg-gray-50 transition-colors`}
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className={`${styles.navigationButton} ${styles.navigationButtonNext} absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg z-10 hover:bg-gray-50 transition-colors`}
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {differentiators.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''} transition-all duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
