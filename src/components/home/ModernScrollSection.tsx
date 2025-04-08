'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
// import { useTranslation } from '@/components/ui/language-selector';
import styles from './ModernScrollSection.module.css';



// Section 1: Profitable by Design
const ProfitableSection = ({ inView }: { inView: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const listItems = [
    '+40% productivity gains with cutting-edge automation',
    '6-month average ROI vs. traditional packaging',
    '35% reduction in consumable usage, cutting inventory and supply costs',
    '98% machine uptime, ensuring uninterrupted operations',
    'Compatible with WMS/WCS/TMS systems for seamless integration',
  ];

  return (
    <div ref={containerRef} className={styles.section}>
      <div className={`${styles.contentContainer} ${styles.reversedContainer}`}>
        {/* Image container with layoutId for animation - positioned on the left */}
        <motion.div
          layoutId="machineImage"
          className={`${styles.imageContainer} section1-image`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            layout: { duration: 1, type: "spring", stiffness: 100, damping: 20 }
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

        {/* Text content - now on the right */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Profitable by Design
          </motion.h2>

          <motion.p
            className={styles.sectionDescription}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Tp@ck redefines efficiency with its advanced automation, delivering measurable business impact from day one.
          </motion.p>

          <motion.ul className={styles.featureList}>
            {listItems.map((item, index) => (
              <motion.li
                key={index}
                className={styles.featureItem}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <span className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                  </svg>
                </span>
                {item}
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
    '100% recyclable packaging: kraft paper, corrugated cardboard',
    'No glue, no plastic, no chemical adhesives = zero environmental compromise',
    'Custom-fit packaging eliminates void fillers and reduces material waste',
    'Accepts materials from 80g/m² to 300g/m²',
    '15% reduction in transport emissions',
    'Certified by EcoVadis',
  ];

  return (
    <div ref={containerRef} className={`${styles.section} ${styles.sustainableSection}`}>
      <div className={`${styles.contentContainer} ${styles.standardContainer}`}>
        {/* Text content first for standardContainer (image will be on right) */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
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
          <motion.h2
            className={`${styles.sectionTitle} ${styles.greenTitle}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Built for Tomorrow. Sustainably.
          </motion.h2>

          <motion.p
            className={styles.sectionDescription}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Eco-design is embedded at every level — material, method, and mission.
          </motion.p>

          <motion.ul className={styles.featureList}>
            {listItems.map((item, index) => (
              <motion.li
                key={index}
                className={`${styles.featureItem} ${styles.greenFeature}`}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <span className={`${styles.featureIcon} ${styles.greenIcon}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                  </svg>
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className={styles.sectionFooter}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Tp@ck doesn't just reduce waste — it makes sustainability operational.
          </motion.p>
        </motion.div>

        {/* Image container with same layoutId for automatic animation - positioned on the right */}
        <motion.div
          layoutId="machineImage"
          className={`${styles.imageContainer} section2-image`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            layout: { duration: 1, type: "spring", stiffness: 100, damping: 20 }
          }}
        >
          <div className={styles.sustainableImage}>
            <Image
              src="/images/t20-machine.jpg"
              alt="Tp@ck Machine - Sustainable Design"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Simple image animation
  const imageScale = useTransform(scrollYProgress, [0.3, 0.8], [0.65, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const listItems = [
    'Fully designed and manufactured in France',
    'Supports local employment, short circuits, and regional sourcing',
    'Adapts to global compliance standards',
    'Scalable, low-energy integration',
    'Aligned with modern ESG and transparency expectations',
  ];

  return (
    <div ref={containerRef} className={`${styles.section} ${styles.responsibleSection}`}>
      <div className={`${styles.contentContainer} ${styles.mapSectionContainer}`}>
        {/* Text content - now explicitly on the left */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className={`${styles.sectionTitle} ${styles.blueTitle}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            A Responsible Technology, Ready to Scale
          </motion.h2>

          <motion.p
            className={styles.sectionDescription}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Tp@ck is more than a machine — it's a future-proof ecosystem.
          </motion.p>

          <motion.ul className={styles.featureList}>
            {listItems.map((item, index) => (
              <motion.li
                key={index}
                className={`${styles.featureItem} ${styles.blueFeature}`}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <span className={`${styles.featureIcon} ${styles.blueIcon}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                  </svg>
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className={styles.sectionFooter}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Because tomorrow's packaging isn't just efficient — it's ethical, modular, and global.
          </motion.p>
        </motion.div>

        {/* Simple map image container - now explicitly on the right */}
        <motion.div
          className={styles.mapWrapper}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className={styles.worldMapContainer}
            style={{
              opacity: imageOpacity,
              scale: imageScale
            }}
          >
            <div className={styles.worldMap}>
              <Image
                src="/images/world-map-with-pins.png"
                alt="World Map with Global Presence"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
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
