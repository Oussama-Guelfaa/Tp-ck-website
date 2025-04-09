'use client';

import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Recycle, Zap, Award, Package, Leaf, Globe, Truck, Trash2, Flame, Lightbulb } from 'lucide-react';
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
      id: 'plastic-free',
      title: t('home.differentiators.plastic-free.title', 'Up to 100% Plastic-Free'),
      description: t('home.differentiators.plastic-free.description', 'Our innovative auto-sealing technology uses recyclable paper materials without requiring glue, tape, or any plastic components.'),
      benefits: [
        t('home.differentiators.plastic-free.benefit1', 'Auto-sealing with recyclable paper'),
        t('home.differentiators.plastic-free.benefit2', 'No glue or adhesives required'),
        t('home.differentiators.plastic-free.benefit3', 'No plastic tape or fasteners'),
        t('home.differentiators.plastic-free.benefit4', 'Fully biodegradable packaging'),
      ],
      color: '#2E7D32', // Eco green
      bgColor: 'rgba(46, 125, 50, 0.03)',
      icon: Recycle,
      benefitIcons: [Recycle, Leaf, Recycle, Leaf],
      learnMoreLink: '/features/plastic-free',
    },

    {
      id: 'ecovadis-certified',
      title: t('home.differentiators.ecovadis.title', 'EcoVadis Certified'),
      description: t('home.differentiators.ecovadis.description', 'Our solutions are EcoVadis certified, verifying our commitment to sustainability and ethical compliance throughout our supply chain and operations.'),
      benefits: [
        t('home.differentiators.ecovadis.benefit1', 'Verified sustainability practices'),
        t('home.differentiators.ecovadis.benefit2', 'Ethical compliance certification'),
        t('home.differentiators.ecovadis.benefit3', 'Supply chain transparency'),
        t('home.differentiators.ecovadis.benefit4', 'Environmental responsibility'),
      ],
      color: '#2E7D32', // Eco green
      bgColor: 'rgba(46, 125, 50, 0.03)',
      icon: Award,
      benefitIcons: [Award, Award, Globe, Leaf],
      learnMoreLink: '/features/certifications',
    },
    {
      id: 'zero-overpackaging',
      title: t('home.differentiators.zero-overpackaging.title', 'Zero Overpackaging'),
      description: t('home.differentiators.zero-overpackaging.description', 'Our intelligent sizing technology creates perfectly fitted packaging for each product, eliminating the need for fillers and reducing material waste.'),
      benefits: [
        t('home.differentiators.zero-overpackaging.benefit1', 'Intelligent sizing = no fillers'),
        t('home.differentiators.zero-overpackaging.benefit2', 'Custom-fit packaging for each product'),
        t('home.differentiators.zero-overpackaging.benefit3', 'Elimination of void fill materials'),
        t('home.differentiators.zero-overpackaging.benefit4', 'Reduced packaging waste'),
      ],
      color: '#2E7D32', // Eco green
      bgColor: 'rgba(46, 125, 50, 0.03)',
      icon: Package,
      benefitIcons: [Package, Package, Trash2, Recycle],
      learnMoreLink: '/features/zero-overpackaging',
    },
    {
      id: 'logistics-costs',
      title: t('home.differentiators.logistics.title', 'Saving Logistic Costs'),
      description: t('home.differentiators.logistics.description', 'Our volume-optimized packaging reduces shipping space requirements, resulting in fewer trips, lower transportation costs, and reduced CO₂ emissions.'),
      benefits: [
        t('home.differentiators.logistics.benefit1', 'Volume-optimized packaging'),
        t('home.differentiators.logistics.benefit2', 'Fewer transportation trips'),
        t('home.differentiators.logistics.benefit3', 'Reduced CO₂ emissions'),
        t('home.differentiators.logistics.benefit4', 'Lower shipping costs'),
      ],
      color: '#0288D1', // Blue
      bgColor: 'rgba(2, 136, 209, 0.03)',
      icon: Truck,
      benefitIcons: [Truck, Truck, Globe, Globe],
      learnMoreLink: '/features/logistics-optimization',
    },
    {
      id: 'recyclable-materials',
      title: t('home.differentiators.recyclable.title', '100% Recyclable Materials'),
      description: t('home.differentiators.recyclable.description', 'We exclusively use paper, kraft, and cardboard materials that are 100% recyclable, avoiding composite materials that complicate the recycling process.'),
      benefits: [
        t('home.differentiators.recyclable.benefit1', 'Paper, kraft, cardboard only'),
        t('home.differentiators.recyclable.benefit2', 'No composite materials'),
        t('home.differentiators.recyclable.benefit3', 'Easy single-stream recycling'),
        t('home.differentiators.recyclable.benefit4', 'Supports circular economy'),
      ],
      color: '#2E7D32', // Eco green
      bgColor: 'rgba(46, 125, 50, 0.03)',
      icon: Leaf,
      benefitIcons: [Recycle, Leaf, Recycle, Globe],
      learnMoreLink: '/features/recyclable-materials',
    },
  ];

  // Define slide navigation functions with useCallback
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % differentiators.length);
  }, [differentiators.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + differentiators.length) % differentiators.length);
  }, [differentiators.length]);

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
  }, [isAutoPlaying, nextSlide]);

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

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10 relative overflow-hidden">
                {/* Content section */}
                <div className="space-y-6 z-10">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`${styles.iconContainer} p-5 rounded-xl shadow-lg bg-gradient-to-br`}
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${currentDifferentiator.color} 0%, ${currentDifferentiator.color}99 100%)`,
                        boxShadow: `0 10px 15px -3px ${currentDifferentiator.color}30, 0 4px 6px -4px ${currentDifferentiator.color}20`
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <currentDifferentiator.icon className="h-10 w-10 text-white drop-shadow-md" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent relative inline-block"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${currentDifferentiator.color} 0%, ${currentDifferentiator.color}99 100%)`
                        }}
                      >
                        {currentDifferentiator.id === 'plastic-free' ? (
                          <>100% <span className="text-4xl md:text-6xl">Plastic-Free</span></>
                        ) : currentDifferentiator.id === 'ecovadis-certified' ? (
                          <><span className="text-4xl md:text-6xl">EcoVadis</span> Certified</>
                        ) : currentDifferentiator.id === 'zero-overpackaging' ? (
                          <>Zero <span className="text-4xl md:text-6xl">Overpackaging</span></>
                        ) : currentDifferentiator.id === 'logistics-costs' ? (
                          <>Saving <span className="text-4xl md:text-6xl">Logistic Costs</span></>
                        ) : (
                          <><span className="text-4xl md:text-6xl">100% Recyclable</span> Materials</>
                        )}
                      </h3>
                      <motion.div
                        className="h-1 bg-gradient-to-r rounded-full mt-2"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${currentDifferentiator.color}, ${currentDifferentiator.color}50)`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  <motion.div
                    className="text-gray-700 text-lg leading-relaxed p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ boxShadow: `0 10px 15px -3px ${currentDifferentiator.color}20, 0 4px 6px -4px ${currentDifferentiator.color}10` }}
                  >
                    {currentDifferentiator.id === 'plastic-free' ? (
                      <>Our innovative <span className="font-bold text-green-600 relative inline-block group text-xl">auto-sealing technology <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></span> uses recyclable paper materials without requiring glue, tape, or any plastic components.</>
                    ) : currentDifferentiator.id === 'energy-consumption' ? (
                      <>Our <span className="font-bold text-orange-600 relative inline-block group text-xl">optimized sealing process <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></span> significantly reduces energy usage with a lower thermal footprint compared to traditional packaging methods.</>
                    ) : currentDifferentiator.id === 'ecovadis-certified' ? (
                      <>Our solutions are <span className="font-bold text-green-600 relative inline-block group text-xl">EcoVadis certified <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></span>, verifying our commitment to sustainability and ethical compliance throughout our supply chain and operations.</>
                    ) : currentDifferentiator.id === 'zero-overpackaging' ? (
                      <>Our intelligent <span className="font-bold text-orange-600 relative inline-block group text-xl">sizing technology <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></span> creates perfectly fitted packaging for each product, eliminating the need for fillers and reducing material waste.</>
                    ) : currentDifferentiator.id === 'logistics-costs' ? (
                      <>Our <span className="font-bold text-blue-600 relative inline-block group text-xl">volume-optimized packaging <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></span> reduces shipping space requirements, resulting in fewer trips, lower transportation costs, and reduced CO₂ emissions.</>
                    ) : (
                      <>Our packaging is made from <span className="font-bold text-green-600 relative inline-block group text-xl">100% recyclable materials <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></span>, contributing to a circular economy and reducing environmental impact.</>
                    )}
                  </motion.div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                      <span className="p-1.5 rounded-full bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                      </span>
                      {t('home.differentiators.keyBenefits', 'Key Benefits')}:
                    </h4>
                    <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentDifferentiator.benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          className={`${styles.benefitItem} flex items-start p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm`}
                          whileHover={{
                            x: 5,
                            backgroundColor: `${currentDifferentiator.color}05`,
                            boxShadow: `0 4px 6px -1px ${currentDifferentiator.color}20, 0 2px 4px -2px ${currentDifferentiator.color}10`,
                            borderColor: `${currentDifferentiator.color}30`
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className={`${styles.benefitIcon} p-2 rounded-full mr-3 flex-shrink-0 mt-0.5 shadow-sm`}
                            style={{
                              backgroundColor: `${currentDifferentiator.color}20`,
                              boxShadow: `0 2px 4px -1px ${currentDifferentiator.color}20`
                            }}
                            whileHover={{ scale: 1.1, backgroundColor: `${currentDifferentiator.color}30` }}
                          >
                            {(() => {
                              const IconComponent = currentDifferentiator.benefitIcons[idx % currentDifferentiator.benefitIcons.length];
                              return <IconComponent className="h-4 w-4" style={{ color: currentDifferentiator.color }} />;
                            })()}
                          </motion.div>
                          <span className="text-gray-700 font-medium">
                            {benefit.includes(':') ? (
                              <>
                                <span className="font-bold" style={{ color: currentDifferentiator.color }}>
                                  {benefit.split(':')[0]}:
                                </span>
                                {benefit.split(':')[1]}
                              </>
                            ) : benefit.includes('=') ? (
                              <>
                                <span className="font-bold" style={{ color: currentDifferentiator.color }}>
                                  {benefit.split('=')[0]}
                                </span>
                                = {benefit.split('=')[1]}
                              </>
                            ) : (
                              <>
                                {benefit.split(' ').slice(0, 2).join(' ')} <span className="font-bold" style={{ color: currentDifferentiator.color }}>{benefit.split(' ').slice(2).join(' ')}</span>
                              </>
                            )}
                          </span>
                        </motion.li>
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

                  {/* Recycle pattern for Plastic-Free */}
                  {currentDifferentiator.id === 'plastic-free' && (
                    <div className={styles.recyclePattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30,70 C40,40 60,40 70,70 M30,70 L50,40 L70,70 Z' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='none' /%3E%3C/svg%3E")` }}></div>
                  )}

                  {/* Energy pattern */}
                  {currentDifferentiator.id === 'energy-consumption' && (
                    <div className={styles.energyPattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50,20 L40,50 L60,50 L50,80' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='2' fill='none' /%3E%3C/svg%3E")` }}></div>
                  )}

                  {/* Certificate pattern for EcoVadis */}
                  {currentDifferentiator.id === 'ecovadis-certified' && (
                    <div className={styles.certificatePattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='30' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='none' /%3E%3Cpath d='M35,50 L45,60 L65,40' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' /%3E%3C/svg%3E")` }}></div>
                  )}

                  {/* Package pattern for Zero Overpackaging */}
                  {currentDifferentiator.id === 'zero-overpackaging' && (
                    <div className={styles.packagePattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='30' y='30' width='40' height='40' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='none' /%3E%3Cpath d='M30,30 L50,10 L70,30 M50,10 L50,30 M70,30 L90,50 L70,70 M90,50 L70,50' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='none' /%3E%3C/svg%3E")` }}></div>
                  )}

                  {/* Logistics pattern */}
                  {currentDifferentiator.id === 'logistics-costs' && (
                    <div className={styles.logisticsPattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,80 L40,60 L60,70 L80,40' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='2' fill='none' /%3E%3Ccircle cx='20' cy='80' r='3' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='${encodeURIComponent(currentDifferentiator.color)}' /%3E%3Ccircle cx='80' cy='40' r='3' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='${encodeURIComponent(currentDifferentiator.color)}' /%3E%3C/svg%3E")` }}></div>
                  )}

                  {/* Recyclable Materials pattern */}
                  {currentDifferentiator.id === 'recyclable-materials' && (
                    <div className={styles.leafPattern} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30,70 Q50,20 70,70 T30,70 Z' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='none' /%3E%3Cpath d='M50,70 L50,30 M40,40 L50,30 L60,40' stroke='${encodeURIComponent(currentDifferentiator.color)}' stroke-width='1' fill='none' /%3E%3C/svg%3E")` }}></div>
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
