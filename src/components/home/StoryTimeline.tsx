'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronDown, Clock, GitBranch, Lightbulb, Target, Sparkles, Wind } from 'lucide-react';
import styles from './StoryTimeline.module.css';

// Define the timeline checkpoint data structure
interface TimelineCheckpoint {
  id: number;
  title: string;
  content: string;
  icon: React.ComponentType<any>; // Use a more flexible type for Lucide icons
  iconBg: string;
  year?: string;
}

// Timeline data
const timelineData: TimelineCheckpoint[] = [
  {
    id: 1,
    title: "Our Roots",
    content: "Backed by over five decades of industrial automation expertise, Tp@ck emerged from a rich engineering legacy rooted in French manufacturing excellence.",
    icon: Clock,
    iconBg: "#d32f2f", // Red
    year: "1970s"
  },
  {
    id: 2,
    title: "A Craft Evolving",
    content: "Through the years, our engineering philosophy has evolved to meet new demands — combining industrial performance with environmental responsibility.",
    icon: GitBranch,
    iconBg: "#ff9800", // Orange
    year: "1990s"
  },
  {
    id: 3,
    title: "The Birth of Tp@ck",
    content: "Tp@ck was born from this evolution: an autonomous initiative designed to reshape packaging with zero-waste, eco-conscious automation.",
    icon: Lightbulb,
    iconBg: "#2e7d32", // Green
    year: "2015"
  },
  {
    id: 4,
    title: "Our Mission Today",
    content: "Tp@ck stands for a new generation of packaging: plastic-free, glue-free, and compromise-free. Modular, scalable, and built for tomorrow's industry.",
    icon: Target,
    iconBg: "#0288d1", // Blue
    year: "Today"
  }
];

export function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Handle scroll event to hide the scroll prompt
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return (
    <section ref={containerRef} className={styles.timelineSection}>
      {/* Background decorative elements */}
      <div className={styles.bgDecoration}>
        {/* Natural texture background */}
        <div className={styles.naturalTexture}></div>

        {/* Animated background elements */}
        <div className={styles.animatedBackground}>
          {/* Animated blobs */}
          <div className={styles.blob} style={{ top: '10%', left: '5%', animationDelay: '0s' }}></div>
          <div className={styles.blob} style={{ bottom: '15%', right: '8%', animationDelay: '2s' }}></div>
          <div className={styles.blob} style={{ top: '40%', right: '15%', animationDelay: '4s' }}></div>
          <div className={styles.blob} style={{ bottom: '30%', left: '20%', animationDelay: '6s' }}></div>

          {/* Animated lines */}
          <div className={styles.growingLine} style={{ top: '20%', left: '30%', width: '150px', transform: 'rotate(30deg)' }}></div>
          <div className={styles.growingLine} style={{ bottom: '25%', right: '25%', width: '120px', transform: 'rotate(-20deg)' }}></div>
          <div className={styles.growingLine} style={{ top: '60%', left: '15%', width: '100px', transform: 'rotate(70deg)' }}></div>
        </div>

        {/* Organic shapes */}
        <svg className={styles.organicShape} width="400" height="400" viewBox="0 0 200 200" style={{ top: '5%', left: '0%', opacity: 0.15 }}>
          <path d="M48.8,-57.3C63.9,-46.7,77.5,-32.6,81.6,-16.2C85.7,0.2,80.3,18.9,70.1,32.6C59.9,46.3,44.8,55,28.7,62.4C12.6,69.8,-4.6,75.9,-20.8,72.5C-37,69.1,-52.2,56.2,-62.8,40.5C-73.4,24.8,-79.5,6.2,-76.9,-11.2C-74.3,-28.6,-63,-44.8,-48.4,-55.5C-33.8,-66.2,-16.9,-71.3,-0.2,-71C16.5,-70.8,33.7,-67.9,48.8,-57.3Z" transform="translate(100 100)" fill="rgba(76, 175, 80, 0.2)" />
        </svg>

        <svg className={styles.organicShape} width="350" height="350" viewBox="0 0 200 200" style={{ bottom: '0%', right: '0%', opacity: 0.15 }}>
          <path d="M54.7,-67.1C71.9,-55.3,87.5,-38.6,91.9,-19.5C96.3,-0.3,89.5,21.3,77.6,38.6C65.7,55.9,48.7,68.9,29.7,76.2C10.7,83.5,-10.3,85.1,-29.7,78.7C-49.1,72.3,-66.9,57.9,-77.4,39.1C-87.9,20.3,-91.1,-2.9,-84.6,-22.2C-78.1,-41.5,-61.9,-56.9,-44.5,-68.6C-27.1,-80.3,-8.6,-88.3,8.1,-87.9C24.8,-87.5,37.5,-78.8,54.7,-67.1Z" transform="translate(100 100)" fill="rgba(33, 150, 243, 0.2)" />
        </svg>

        {/* Wind effect */}
        <div className={styles.windEffect} style={{ top: '30%', left: '20%' }}>
          <Wind size={40} color="rgba(76, 175, 80, 0.1)" />
        </div>
        <div className={styles.windEffect} style={{ bottom: '40%', right: '15%' }}>
          <Wind size={30} color="rgba(33, 150, 243, 0.1)" />
        </div>

        {/* Animated gradient overlay */}
        <div className={styles.gradientOverlay}></div>

        {/* Wave background with eco colors */}
        <div className={styles.waveContainer}>
          <svg className={styles.wave} viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="rgba(76, 175, 80, 0.1)" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg className={styles.wave} viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ animationDelay: '0.3s' }}>
            <path fill="rgba(33, 150, 243, 0.08)" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.sectionTitleWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className={styles.titleDecoration}
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Story & Purpose
          </motion.h2>
          <motion.div
            className={styles.titleDecoration}
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover the journey that shaped our vision for sustainable packaging
        </motion.p>

        {/* Scroll prompt */}
        <motion.div
          className={styles.scrollPrompt}
          initial={{ opacity: 1 }}
          animate={{ opacity: hasScrolled ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>Scroll to explore our journey</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <motion.div
            className={styles.timelineAxis}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          ></motion.div>

          {timelineData.map((checkpoint, index) => (
            <TimelineCheckpoint
              key={checkpoint.id}
              checkpoint={checkpoint}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Individual timeline checkpoint component
function TimelineCheckpoint({
  checkpoint,
  index,
  scrollProgress
}: {
  checkpoint: TimelineCheckpoint;
  index: number;
  scrollProgress: any;
}) {
  const checkpointRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(checkpointRef, { once: false, amount: 0.5 });

  // Calculate the progress for this specific checkpoint
  const checkpointProgress = useTransform(
    scrollProgress,
    [index * 0.15, index * 0.15 + 0.15],
    [0, 1]
  );

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      ref={checkpointRef}
      className={styles.checkpointContainer}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        opacity: isInView ? 1 : 0.3,
      }}
    >
      <motion.div
        className={styles.checkpointMarker}
        style={{
          scale: isInView ? 1.2 : 1,
          backgroundColor: isInView ? checkpoint.iconBg : '#ccc'
        }}
        transition={{ duration: 0.4 }}
      >
        {checkpoint.year && (
          <motion.div
            className={styles.yearBadge}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {checkpoint.year}
          </motion.div>
        )}
        <checkpoint.icon size={20} color="white" />
      </motion.div>

      <motion.div
        className={styles.checkpointContent}
        variants={itemVariants}
        style={{
          borderTop: `3px solid ${checkpoint.iconBg}`
        }}
      >
        <motion.div className={styles.contentHeader} variants={itemVariants}>
          <div
            className={styles.iconCircle}
            style={{ backgroundColor: `${checkpoint.iconBg}20` }} // 20 is hex for 12% opacity
          >
            <checkpoint.icon size={24} color={checkpoint.iconBg} />
          </div>
          <motion.h3>{checkpoint.title}</motion.h3>
        </motion.div>
        <motion.p variants={itemVariants}>{checkpoint.content}</motion.p>

        <motion.div
          className={styles.contentFooter}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Sparkles size={16} />
          <span>Learn more</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
