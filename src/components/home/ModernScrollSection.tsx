'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
// import { useTranslation } from '@/components/ui/language-selector';
import styles from './ModernScrollSection.module.css';



// Section 1: Profitable by Design
const ProfitableSection = ({ inView }: { inView: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const listItems = [
    '<span class="font-bold text-red-600">+40%</span> productivity gains with cutting-edge automation',
    '<span class="font-bold text-red-600">6-month</span> average ROI vs. traditional packaging',
    '<span class="font-bold text-red-600">35%</span> reduction in consumable usage, cutting inventory and supply costs',
    '<span class="font-bold text-red-600">98%</span> machine uptime, ensuring uninterrupted operations',
    'Compatible with <span class="font-bold text-red-600 px-1 py-0.5 rounded bg-red-50">WMS/WCS/TMS</span> systems for seamless integration',
  ];

  return (
    <div ref={containerRef} className={styles.section}>
      <div className={styles.contentContainer}>
        {/* Text content in vertical stack */}
        <motion.div
          className={styles.textContent}
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
            Profitable by Design
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
            Tp@ck <span className="font-bold">redefines efficiency</span> with its <span className="font-bold text-red-600">advanced automation</span>, delivering <span className="font-bold text-red-600">measurable business impact</span> from day one.
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
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className={styles.sectionFooter}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            With Tp@ck, performance is not a promise — it's engineered.
          </motion.p>
        </motion.div>

        {/* Image below all text content */}
        <motion.div
          className={`${styles.imageContainer} ${styles.fullWidthImage}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.8,
            delay: 0.5
          }}
        >
          <div className={styles.machineImage}>
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
    '<span class="font-bold text-green-600">100% recyclable</span> packaging: kraft paper, corrugated cardboard',
    '<span class="font-bold text-green-600">No glue, no plastic</span>, no chemical adhesives = zero environmental compromise',
    '<span class="font-bold text-green-600">Custom-fit packaging</span> eliminates void fillers and reduces material waste',
    'Accepts materials from <span class="font-bold text-green-600">80g/m²</span> to <span class="font-bold text-green-600">300g/m²</span>',
    'Certified by <span class="font-bold text-green-600 px-1 py-0.5 rounded bg-green-50">EcoVadis</span>',
  ];

  return (
    <div ref={containerRef} className={`${styles.section} ${styles.sustainableSection}`}>
      <div className={styles.contentContainer}>
        {/* Title at the top */}
        <motion.h2
          className={`${styles.sectionTitle} ${styles.greenTitle} bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500 relative inline-block w-full mb-8`}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Built for Tomorrow. Sustainably.
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

        {/* Text content first, just like in Profitable by Design section */}
        <motion.div
          className={styles.textContent}
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
            <span className="font-bold">Eco-design</span> is embedded at every level — <span className="font-bold text-green-600">material</span>, <span className="font-bold text-green-600">method</span>, and <span className="font-bold text-green-600">mission</span>.
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
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className={styles.sectionFooter}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Tp@ck doesn't just reduce waste — it makes sustainability operational.
          </motion.p>
        </motion.div>

        {/* Image below all text content */}
        <motion.div
          className={`${styles.imageContainer} ${styles.fullWidthImage}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.8,
            delay: 0.5
          }}
        >
          <div className={styles.sustainableImage}>
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
  const containerRef = useRef<HTMLDivElement>(null);

  // No animation needed for static image

  const listItems = [
    '<span class="font-bold text-blue-600">Fully designed and manufactured</span> in France',
    'Supports <span class="font-bold text-blue-600">local employment</span>, short circuits, and regional sourcing',
    'Adapts to <span class="font-bold text-blue-600">global compliance standards</span>',
    '<span class="font-bold text-blue-600">Scalable, low-energy</span> integration',
    'Aligned with modern <span class="font-bold text-blue-600 px-1 py-0.5 rounded bg-blue-50">ESG</span> and transparency expectations',
  ];

  return (
    <div ref={containerRef} className={`${styles.section} ${styles.responsibleSection}`}>
      <div className={styles.contentContainer}>
        {/* Text content in vertical stack */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className={`${styles.sectionTitle} ${styles.blueTitle} bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 relative inline-block`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            A Responsible Technology, Ready to Scale
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
            Tp@ck is more than a <span className="font-bold">machine</span> — it's a <span className="font-bold text-blue-600">future-proof ecosystem</span> designed for <span className="font-bold text-blue-600">global impact</span>.
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
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className={styles.sectionFooter}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Because tomorrow's packaging isn't just <span className="font-bold text-blue-600 relative inline-block group">
              efficient
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span> — it's <span className="font-bold text-blue-600 relative inline-block group">
              ethical
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>, <span className="font-bold text-blue-600 relative inline-block group">
              modular
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>, and <span className="font-bold text-blue-600 relative inline-block group">
              global
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>.
          </motion.p>
        </motion.div>

        {/* Image below all text content */}
        <motion.div
          className={`${styles.imageContainer} ${styles.fullWidthImage}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={styles.worldMapContainer}>
            <div className={styles.worldMap}>
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export function ModernScrollSection() {
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
              Tp@ck: The Future of Packaging
            </h2>
            <p className={styles.mainDescription}>
              Redefining industrial packaging with innovation, sustainability, and responsibility.
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
