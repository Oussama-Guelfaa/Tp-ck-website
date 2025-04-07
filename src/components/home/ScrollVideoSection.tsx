"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from './ScrollVideo.module.css';

// Animated number counter component
const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (inView) {
      let startValue = 0;
      const duration = 1500; // ms
      const step = Math.max(1, Math.floor(value / (duration / 16))); // 16ms per frame approx
      
      const timer = setInterval(() => {
        startValue += step;
        if (startValue > value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(startValue);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [inView, value]);
  
  return (
    <span ref={ref} className="inline-block">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

// Content section with image
const ContentSection = ({ 
  index, 
  title, 
  description, 
  items, 
  imageUrl, 
  color, 
  bgColor,
  progress,
  finalNote
}: { 
  index: number, 
  title: string, 
  description: string, 
  items: string[], 
  imageUrl: string, 
  color: string,
  bgColor: string,
  progress: number,
  finalNote?: string
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Calculate if this section is active based on scroll progress
  const sectionProgress = (progress - index * 0.2) * 5; // 0 to 1 for this section
  const isActive = sectionProgress > 0 && sectionProgress < 1;
  
  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <div 
      ref={sectionRef}
      className={`relative mb-32 pt-16 pb-16 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
      id={`section-${index}`}
    >
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute ${index % 2 === 0 ? '-right-32 top-0' : '-left-32 bottom-0'} w-64 h-64 rounded-full ${bgColor} opacity-10 blur-3xl`}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section number indicator */}
          <div className="flex justify-center mb-8">
            <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center`}>
              <span className={`text-2xl font-bold ${color}`}>{index + 1}</span>
            </div>
          </div>
          
          {/* Title */}
          <motion.h3
            className={`text-3xl md:text-4xl font-bold text-center mb-8 ${color}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {title}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Content column */}
            <motion.div
              className="md:col-span-5 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-lg text-gray-700">
                {description}
              </p>
              
              <ul className="space-y-4">
                {items.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  >
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full ${bgColor} flex items-center justify-center mt-0.5 mr-3`}>
                      <span className={`text-sm font-bold ${color}`}>{idx + 1}</span>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              {finalNote && (
                <motion.div
                  className={`p-4 rounded-lg border-l-4 ${bgColor} bg-opacity-10 mt-8`}
                  style={{ borderColor: color.replace('text-', 'border-') }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <p className="text-gray-800 font-medium">{finalNote}</p>
                </motion.div>
              )}
            </motion.div>
            
            {/* Image column */}
            <motion.div
              ref={imageRef}
              className="md:col-span-7 relative"
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ height: '500px' }}>
                <Image 
                  src={imageUrl} 
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className={`absolute inset-0 ${bgColor} opacity-20 mix-blend-overlay`}></div>
                
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full ${bgColor} opacity-30 blur-xl`}></div>
                  <div className={`absolute top-6 left-6 w-16 h-16 rounded-full ${bgColor} opacity-20 blur-lg`}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats section
const StatsSection = () => {
  return (
    <div className="bg-gray-900 text-white py-16 mb-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                <AnimatedCounter value={40} suffix="%" />
              </div>
              <div className="text-sm text-gray-300">Performance Gain</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
                <AnimatedCounter value={6} suffix=" mo" />
              </div>
              <div className="text-sm text-gray-300">Average ROI</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                <AnimatedCounter value={98} suffix="%" />
              </div>
              <div className="text-sm text-gray-300">Machine Availability</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                <AnimatedCounter value={100} suffix="+" />
              </div>
              <div className="text-sm text-gray-300">Global Certifications</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ScrollVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  
  // Get scroll progress for this section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the section
      let sectionProgress = 0;
      
      if (top < windowHeight && top + height > 0) {
        // Section is in view
        const visibleHeight = Math.min(windowHeight, top + height) - Math.max(0, top);
        const visibleRatio = visibleHeight / Math.min(height, windowHeight);
        sectionProgress = Math.max(0, Math.min(1, visibleRatio));
      }
      
      // If we've scrolled past the section
      if (top + height <= 0) {
        sectionProgress = 1;
      }
      
      setProgress(sectionProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Content sections data
  const sections = [
    {
      title: "Optimal Profitability",
      description: "With Tp@ck, you significantly boost your operational performance through advanced technology and optimized processes:",
      items: [
        "+40% performance gain through advanced automation",
        "Average ROI of just 6 months compared to traditional packaging methods",
        "35% reduction in consumable inventory, optimizing supply costs",
        "98% machine availability, ensuring continuous and efficient production"
      ],
      imageUrl: "/images/t20-machine.jpg",
      color: "text-red-700",
      bgColor: "bg-red-200"
    },
    {
      title: "Concrete Environmental Commitment",
      description: "Tp@ck turns eco-responsibility into a daily reality with sustainable materials and processes:",
      items: [
        "Use of 100% recyclable kraft paper and corrugated cardboard, eliminating plastic",
        "Drastic waste reduction through perfectly fitted packaging, eliminating the need for fillers",
        "Self-sealing technology without glue or chemical adhesives, fully compliant with EU and global regulations"
      ],
      imageUrl: "/images/slideshow/t20-slide.jpg",
      color: "text-green-700",
      bgColor: "bg-green-200"
    },
    {
      title: "Eco-Design at Every Stage",
      description: "Our machines are engineered to minimize environmental impact from day one:",
      items: [
        "Zero material waste through custom, product-fitted packaging",
        "Compatible with durable materials from 80g/m² to 300g/m² to meet strict sustainability requirements",
        "Transport optimization, reducing logistics costs and related emissions by up to 15%"
      ],
      imageUrl: "/images/t30-machine.jpg",
      color: "text-green-800",
      bgColor: "bg-green-100"
    },
    {
      title: "Strong Social Responsibility",
      description: "Tp@ck is committed beyond technical performance to ethical business practices:",
      items: [
        "Certified by EcoVadis, integrating environmental, ethical, and human rights principles",
        "100% French-made, supporting local employment and reducing transportation-related emissions",
        "Transparent, ethical commercial practices aligned with modern corporate responsibility expectations"
      ],
      imageUrl: "/images/slideshow/t30-slide.jpg",
      color: "text-blue-700",
      bgColor: "bg-blue-100"
    },
    {
      title: "Future-Ready Technology",
      description: "Designed for seamless integration and global scalability:",
      items: [
        "Easily integrates with existing warehouse systems (WMS, TMS, WCS), enabling a seamless digital transition",
        "Designed for international scalability, with adaptable solutions that comply with region-specific standards"
      ],
      imageUrl: "/images/t50-machine.jpg",
      color: "text-purple-700",
      bgColor: "bg-purple-100",
      finalNote: "Tp@ck is the choice for technology that delivers not only superior productivity but also a greener, more responsible future. Let's innovate together for efficient and sustainable packaging."
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
    >
      {/* Introduction */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-blue-700 to-red-700">
              Tp@ck embodies innovation at the heart of industrial packaging
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Combining profitability, sustainability, and social responsibility in every machine we build.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Stats section */}
      <StatsSection />
      
      {/* Content sections */}
      {sections.map((section, index) => (
        <ContentSection 
          key={index}
          index={index}
          title={section.title}
          description={section.description}
          items={section.items}
          imageUrl={section.imageUrl}
          color={section.color}
          bgColor={section.bgColor}
          progress={progress}
          finalNote={section.finalNote}
        />
      ))}
    </section>
  );
}
