"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  exit?: MotionProps["exit"];
  transition?: MotionProps["transition"];
  viewport?: MotionProps["viewport"];
  delay?: number;
}

const AnimatedSection = ({
  children,
  className = "",
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: 20 },
  transition = { duration: 0.5 },
  viewport = { once: true },
  delay = 0,
}: AnimatedSectionProps) => {
  const transitionWithDelay = delay
    ? { ...transition, delay }
    : transition;

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transitionWithDelay}
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
