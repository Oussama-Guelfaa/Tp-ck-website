'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import styles from './ModernScrollSection.module.css';

interface ScrollAnimationContainerProps {
  children: ReactNode;
}

export function ScrollAnimationContainer({ children }: ScrollAnimationContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use scroll progress to animate the machine image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform values for the floating machine image - more precise control points
  const machineX = useTransform(scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.5],
    ['10%', '15%', '35%', '55%', '60%']
  );
  const machineScale = useTransform(scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.5],
    [0.95, 1, 1.1, 1.05, 1]
  );
  const machineRotate = useTransform(scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.5],
    [0, 2, 5, 3, 0]
  );
  const machineOpacity = useTransform(scrollYProgress,
    [0, 0.05, 0.1, 0.4, 0.45, 0.5],
    [0, 0.5, 1, 1, 0.5, 0]
  );
  const machineZ = useTransform(scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.5],
    [0, 10, 30, 10, 0]
  );
  const machineY = useTransform(scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.5],
    ['0%', '-2%', '-5%', '-2%', '0%']
  );

  // Add a subtle shadow effect that changes with scroll
  const shadowBlur = useTransform(scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.5],
    ['15px', '20px', '25px', '20px', '15px']
  );
  const shadowOpacity = useTransform(scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.5],
    [0.2, 0.3, 0.4, 0.3, 0.2]
  );

  // Add a brightness effect that changes with scroll
  const brightness = useTransform(scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.5],
    [1, 1.05, 1.1, 1.05, 1]
  );

  // Track when the animation should be visible - with a slightly expanded range
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && latest < 0.55) { // Slightly expanded range for smoother transition
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  // Add a scroll listener to handle mobile devices better
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visiblePercentage = Math.min(
        Math.max(0, (windowHeight - rect.top) / windowHeight),
        Math.max(0, (rect.bottom) / windowHeight)
      );

      // More generous visibility threshold for mobile
      if (visiblePercentage > 0.05 && visiblePercentage < 0.95) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.animationContainer}>
      {/* Floating machine image that moves with scroll */}
      <motion.div
        className={styles.floatingMachine}
        style={{
          x: machineX,
          y: machineY,
          scale: machineScale,
          rotate: machineRotate,
          opacity: machineOpacity,
          z: machineZ,
          filter: `brightness(${brightness.get()})`,
          boxShadow: isVisible ? `0 10px ${shadowBlur.get()} rgba(0, 0, 0, ${shadowOpacity.get()})` : 'none',
          display: isVisible ? 'block' : 'none'
        }}
        initial={{ opacity: 0, x: '10%' }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1] // Custom easing function for smoother motion
        }}
      >
        <div className={styles.machineImageWrapper}>
          <Image
            src="/images/t20-machine.jpg"
            alt="Tp@ck Machine"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className={styles.machineImageOverlay} />

          {/* Add a subtle reflection effect */}
          <div className={styles.machineReflection} />
        </div>
      </motion.div>

      {/* Render the children (sections) */}
      {children}
    </div>
  );
}
