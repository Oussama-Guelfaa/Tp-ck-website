'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './MachineScrollAnimation.module.css';

export function MachineScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use scroll progress to animate the machine image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  // Transform values for the machine image
  const machineX = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    ['calc(0% + 2rem)', 'calc(50% - 250px)', 'calc(100% - 500px - 2rem)']
  );
  
  const machineY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['calc(100vh * 0.25)', 'calc(100vh * 0.5)', 'calc(100vh * 0.75)']
  );
  
  const machineRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 5, 0]
  );
  
  const machineScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.1, 1]
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
  
  return (
    <div ref={containerRef} className={styles.container}>
      {isVisible && (
        <motion.div
          className={styles.machineContainer}
          style={{
            x: machineX,
            y: machineY,
            rotate: machineRotate,
            scale: machineScale,
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
          </div>
        </motion.div>
      )}
    </div>
  );
}
