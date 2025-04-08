'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import styles from './AdvancedScrollAnimation.module.css';

export function AdvancedScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use scroll progress to animate the machine image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Add spring physics for smoother motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values with more control points for smoother animation
  // Adjusted to ensure the image reaches the exact position in section 2 (right side)
  const machineX = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['5%', '25%', '45%', '65%', '75%', 'calc(100% - 500px - 2rem)']
  );

  // Y position adjustment during animation - adjusted for better alignment
  const machineY = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    ['0%', '-5%', '0%', '5%', '0%']
  );

  // Additional vertical offset to match exact positions in both sections
  const verticalOffset = useTransform(
    smoothProgress,
    [0, 1],
    ['0px', '0px']
  );

  // 3D rotation effects
  const rotateY = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 60, 180, 300, 360]
  );

  const rotateX = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 10, 0, -10, 0]
  );

  const rotateZ = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 5, 0, -5, 0]
  );

  // Scale effect
  const scale = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [1, 1.1, 1.2, 1.1, 1]
  );

  // Perspective and depth effects
  const perspective = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ['800px', '1200px', '800px']
  );

  const z = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 100, 200, 100, 0]
  );

  // Lighting effects
  const brightness = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [1, 1.1, 1.2, 1.1, 1]
  );

  const contrast = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1, 1.05, 1]
  );

  // Shadow effects
  const shadowOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.2, 0.4, 0.5, 0.4, 0.2]
  );

  const shadowBlur = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ['10px', '30px', '10px']
  );

  const shadowY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ['10px', '30px', '10px']
  );

  // Check if the animation should be visible
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If any part of the container is visible
      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always hide the original static images
  useEffect(() => {
    // Find all static images in both sections
    const section1Image = document.querySelector('.section1-image') as HTMLElement;
    const section2Image = document.querySelector('.section2-image') as HTMLElement;

    // Hide both images completely
    if (section1Image) {
      section1Image.classList.add('hidden-image');
      section1Image.style.opacity = '0';
      section1Image.style.visibility = 'hidden';
    }

    if (section2Image) {
      section2Image.classList.add('hidden-image');
      section2Image.style.opacity = '0';
      section2Image.style.visibility = 'hidden';
    }

    // Clean up function not needed as we're just setting styles once
    return () => {
      // If component unmounts, show the images again
      if (section1Image) {
        section1Image.classList.remove('hidden-image');
        section1Image.style.opacity = '';
        section1Image.style.visibility = '';
      }

      if (section2Image) {
        section2Image.classList.remove('hidden-image');
        section2Image.style.opacity = '';
        section2Image.style.visibility = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {isVisible && (
        <motion.div
          className={styles.machineContainer}
          style={{
            x: machineX,
            y: machineY,
            marginTop: verticalOffset,
            scale,
            filter: `brightness(${brightness.get()}) contrast(${contrast.get()})`,
            boxShadow: `0 ${shadowY.get()} ${shadowBlur.get()} rgba(0, 0, 0, ${shadowOpacity.get()})`,
          }}
        >
          <motion.div
            className={styles.machine3d}
            style={{
              rotateY,
              rotateX,
              rotateZ,
              z,
              perspective,
            }}
          >
            <div className={styles.machineImage}>
              <Image
                src="/images/t20-machine.jpg"
                alt="Tp@ck Machine"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
                priority
              />
              <div className={styles.imageOverlay} />
              <div className={styles.imageReflection} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
