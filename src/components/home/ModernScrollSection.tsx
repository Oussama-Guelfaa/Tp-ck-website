'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/components/ui/language-selector';
import styles from './ModernScrollSection.module.css';



// Section 1: Profitable by Design
const ProfitableSection = ({ inView }: { inView: boolean }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const listItems = [
    t('home.profitable.item1', '+40% productivity gains with cutting-edge automation'),
    t('home.profitable.item2', '6-month average ROI vs. traditional packaging'),
    t('home.profitable.item3', '35% reduction in consumable usage, cutting inventory and supply costs'),
    t('home.profitable.item4', '98% machine uptime, ensuring uninterrupted operations'),
    t('home.profitable.item5', 'Compatible with WMS/WCS/TMS systems for seamless integration'),
  ];

  return (
    <div ref={containerRef} className={styles.section}>
      <div className="flex flex-col md:flex-row items-start gap-8 container mx-auto px-4">
        {/* Text content on the left */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className={`${styles.sectionTitle} bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500 relative inline-block`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {t('home.profitable.title', 'Profitable by Design')}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-red-500 to-red-300 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.h2>

          <motion.p
            className={styles.sectionDescription}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('home.profitable.description', 'Tp@ck redefines efficiency with its advanced automation, delivering measurable business impact from day one.')}
          </motion.p>

          <motion.ul className={styles.featureList}>
            {listItems.map((item, index) => (
              <motion.li
                key={index}
                className={`${styles.featureItem} p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-start gap-2`}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
              >
                <span className="text-red-500 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className={styles.sectionFooter}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {t('home.profitable.footer', 'With Tp@ck, performance is not a promise — it\'s engineered.')}
          </motion.p>
        </motion.div>

        {/* Image on the right */}
        <motion.div
          className="w-full md:w-1/2 h-[450px] relative rounded-xl overflow-hidden shadow-xl self-end mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.8,
            delay: 0.5
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/t20-machine.jpg"
              alt="Tp@ck Machine"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className={styles.imageOverlay} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Section 2: Built for Tomorrow. Sustainably.
const SustainableSection = ({ inView }: { inView: boolean }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Paper folding animation
  const foldProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 100]);
  const foldOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const foldRotate = useTransform(scrollYProgress, [0, 0.5], [0, 180]);

  const listItems = [
    t('home.sustainable.item1', '100% recyclable packaging: kraft paper, corrugated cardboard'),
    t('home.sustainable.item2', 'No glue, no plastic, no chemical adhesives = zero environmental compromise'),
    t('home.sustainable.item3', 'Custom-fit packaging eliminates void fillers and reduces material waste'),
    t('home.sustainable.item4', 'Accepts materials from 80g/m² to 300g/m²'),
    t('home.sustainable.item5', 'Certified by EcoVadis'),
  ];

  return (
    <div ref={containerRef} className={`${styles.section} ${styles.sustainableSection}`}>
      <div className="flex flex-col md:flex-row items-start gap-8 container mx-auto px-4">
        {/* Left side - Text content */}
        <div className="w-full md:w-1/2">
          {/* Title at the top */}
          <motion.h2
            className={`${styles.sectionTitle} ${styles.greenTitle} bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500 relative inline-block mb-8`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {t('home.sustainable.title', 'Built for Tomorrow. Sustainably.')}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-green-500 to-green-300 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.h2>

          {/* Paper folding animation elements */}
          <motion.div
            className={styles.paperFoldContainer}
            style={{ opacity: foldOpacity }}
          >
            <motion.div
              className={styles.paperSheet}
              style={{
                transform: `perspective(1000px) rotateY(${foldRotate.get()}deg)`,
                backgroundImage: 'url(/images/kraft-paper-texture.jpg)'
              }}
            />
            <motion.div
              className={styles.paperFold}
              style={{
                width: foldProgress.get() + '%',
                backgroundImage: 'url(/images/cardboard-texture.jpg)'
              }}
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className={styles.sectionDescription}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('home.sustainable.description', 'Eco-design is embedded at every level — material, method, and mission.')}
            </motion.p>

            <motion.ul className={styles.featureList}>
              {listItems.map((item, index) => (
                <motion.li
                  key={index}
                  className={`${styles.featureItem} p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-start gap-2 text-green-900`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5, backgroundColor: 'rgba(22, 163, 74, 0.05)' }}
                >
                  <span className="text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              className={styles.sectionFooter}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {t('home.sustainable.footer', 'Tp@ck doesn\'t just reduce waste — it makes sustainability operational.')}
            </motion.p>
          </motion.div>
        </div>

        {/* Right side - Image */}
        <motion.div
          className="w-full md:w-1/2 h-[450px] relative rounded-xl overflow-hidden shadow-xl self-end mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.8,
            delay: 0.5
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/built-for-tomorrow.jpeg"
              alt="Built for Tomorrow - Sustainable Design"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className={`${styles.imageOverlay} ${styles.greenOverlay}`} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Section 3: A Responsible Technology, Ready to Scale
const ResponsibleSection = ({ inView }: { inView: boolean }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // No animation needed for static image

  const listItems = [
    t('home.responsible.item1', 'Fully designed and manufactured in France'),
    t('home.responsible.item2', 'Supports local employment, short circuits, and regional sourcing'),
    t('home.responsible.item3', 'Adapts to global compliance standards'),
    t('home.responsible.item4', 'Scalable, low-energy integration'),
    t('home.responsible.item5', 'Aligned with modern ESG and transparency expectations'),
  ];

  return (
    <div ref={containerRef} className={`${styles.section} ${styles.responsibleSection}`}>
      <div className="flex flex-col md:flex-row items-start gap-8 container mx-auto px-4">
        {/* Left side - Text content */}
        <div className="w-full md:w-1/2">
          <motion.h2
            className={`${styles.sectionTitle} ${styles.blueTitle} bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 relative inline-block`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {t('home.responsible.title', 'A Responsible Technology, Ready to Scale')}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.h2>

          <motion.p
            className={styles.sectionDescription}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('home.responsible.description', 'Tp@ck is more than a machine — it\'s a future-proof ecosystem designed for global impact.')}
          </motion.p>

          <motion.ul className={styles.featureList}>
            {listItems.map((item, index) => (
              <motion.li
                key={index}
                className={`${styles.featureItem} ${styles.blueFeature} p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-start gap-2 bg-white/80 backdrop-blur-sm shadow-sm border border-blue-50 mb-3`}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              >
                <span className="text-blue-500 mt-0.5 bg-blue-50 p-2 rounded-full">
                  {index === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  ) : index === 1 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  ) : index === 2 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  ) : index === 3 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  )}
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className={styles.sectionFooter}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {t('home.responsible.footer', 'Because tomorrow\'s packaging isn\'t just efficient — it\'s ethical, modular, and global.')}
          </motion.p>
        </div>

        {/* Right side - Image */}
        <motion.div
          className="w-full md:w-1/2 h-[450px] relative rounded-xl overflow-hidden shadow-xl self-end mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/responsible-technology.jpeg"
              alt="Responsible Technology"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className={`${styles.imageOverlay} ${styles.blueOverlay}`} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export function ModernScrollSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  const section1InView = useInView(section1Ref, { once: false, amount: 0.3 });
  const section2InView = useInView(section2Ref, { once: false, amount: 0.3 });
  const section3InView = useInView(section3Ref, { once: false, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className={styles.modernScrollSection}
    >
      {/* Introduction */}
      <div className={styles.introSection}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.mainTitle}>
              {t('home.modernScroll.title', 'Tp@ck: The Future of Packaging')}
            </h2>
            <p className={styles.mainDescription}>
              {t('home.modernScroll.description', 'Redefining industrial packaging with innovation, sustainability, and responsibility.')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Content sections with automatic image animation via layoutId */}
      <div>
        <div ref={section1Ref} className={styles.sectionWrapper}>
          <ProfitableSection inView={section1InView} />
        </div>

        <div ref={section2Ref} className={styles.sectionWrapper}>
          <SustainableSection inView={section2InView} />
        </div>

        <div ref={section3Ref} className={styles.sectionWrapper}>
          <ResponsibleSection inView={section3InView} />
        </div>
      </div>
    </section>
  );
}
