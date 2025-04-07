"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../../components/ui/language-selector";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// Define testimonial type
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  logo: string;
  rating: number;
}

// Testimonial data
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The TP@CK T30 has transformed our warehouse operations. The WMS integration was seamless, and we've seen a 32% increase in packaging efficiency within the first month.",
    name: "Mohamed Amine H.",
    title: "Operations Director",
    company: "Global Logistics Inc.",
    logo: "/images/schneider_logo.png",
    rating: 5,
  },
  {
    id: 2,
    quote: "What impressed me most about TP@CK was the predictive maintenance system. We've had zero unexpected downtime since implementation, which is unprecedented for our 24/7 operation.",
    name: "Noa A.",
    title: "Head of Production",
    company: "FastShip Enterprises",
    logo: "/images/zalando_logo.png",
    rating: 5,
  },
  {
    id: 3,
    quote: "As a company committed to sustainability, the environmental certifications of TP@CK's systems were a deciding factor. The reduced material waste has also contributed to our bottom line.",
    name: "Oussama G.",
    title: "Sustainability Manager",
    company: "EcoPackage Solutions",
    logo: "/images/CGP_logo.png",
    rating: 5,
  },
  {
    id: 4,
    quote: "The T50 system exceeded our throughput expectations. The dual-mode operation gives us flexibility to adapt to seasonal demand fluctuations without compromising on quality.",
    name: "Thomas K.",
    title: "Technical Director",
    company: "European Distribution GmbH",
    logo: "/images/branopac_logo.png",
    rating: 5,
  },
];

// Testimonial Card Component
const TestimonialCard = ({ testimonial, direction }: { testimonial: Testimonial; direction: number }) => {
  // Card variants for entrance animation
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 30 : -30,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 30 : -30,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  };

  // Rating stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-3xl mx-auto"
      custom={direction}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      style={{ transformPerspective: "1200px" }}
    >
      <div className="p-8 md:p-10 relative">
        {/* Background gradient elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-green-100/50 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-red-100/50 blur-3xl"></div>
        
        {/* Quote mark */}
        <div className="relative mb-6">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600/20"
          >
            <path 
              d="M14.4 24H8.4C7.2 24 6 22.8 6 21.6V15.6C6 14.4 7.2 13.2 8.4 13.2H14.4C15.6 13.2 16.8 14.4 16.8 15.6V21.6C16.8 22.8 15.6 24 14.4 24ZM33.6 24H27.6C26.4 24 25.2 22.8 25.2 21.6V15.6C25.2 14.4 26.4 13.2 27.6 13.2H33.6C34.8 13.2 36 14.4 36 15.6V21.6C36 22.8 34.8 24 33.6 24ZM14.4 43.2H8.4C7.2 43.2 6 42 6 40.8V34.8C6 33.6 7.2 32.4 8.4 32.4H14.4C15.6 32.4 16.8 33.6 16.8 34.8V40.8C16.8 42 15.6 43.2 14.4 43.2ZM33.6 43.2H27.6C26.4 43.2 25.2 42 25.2 40.8V34.8C25.2 33.6 26.4 32.4 27.6 32.4H33.6C34.8 32.4 36 33.6 36 34.8V40.8C36 42 34.8 43.2 33.6 43.2Z" 
              fill="currentColor"
            />
          </svg>
        </div>
        
        {/* Rating */}
        {renderRating(testimonial.rating)}
        
        {/* Quote text */}
        <motion.p 
          className="text-xl md:text-2xl font-medium text-gray-800 mb-8 leading-relaxed relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          "{testimonial.quote}"
        </motion.p>
        
        {/* Author info and company logo */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
            <p className="text-gray-600 text-sm">{testimonial.title}, {testimonial.company}</p>
          </motion.div>
          
          <motion.div 
            className="h-12 w-24 relative bg-white rounded-md p-1 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Image
              src={testimonial.logo}
              alt={testimonial.company}
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export function TestimonialsSection() {
  const { t } = useTranslation();
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Translate testimonials
  const translatedTestimonials = testimonials.map(testimonial => ({
    ...testimonial,
    quote: t(`testimonials.quote${testimonial.id}`, testimonial.quote),
    name: t(`testimonials.name${testimonial.id}`, testimonial.name),
    title: t(`testimonials.title${testimonial.id}`, testimonial.title),
    company: t(`testimonials.company${testimonial.id}`, testimonial.company),
  }));
  
  // Handle auto-scrolling
  useEffect(() => {
    // Clear any existing timer when the component mounts or dependencies change
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }
    
    // Only set up auto-scrolling if it's enabled
    if (isAutoScrolling) {
      autoScrollTimerRef.current = setInterval(() => {
        setActiveIndex(prev => {
          const nextIndex = (prev[0] + 1) % translatedTestimonials.length;
          return [nextIndex, 1]; // Moving forward
        });
      }, 8000);
    }
    
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    };
  }, [translatedTestimonials.length, isAutoScrolling, activeIndex]);
  
  // Handle navigation
  const navigate = (newDirection: number) => {
    setIsAutoScrolling(false);
    
    setActiveIndex(prev => {
      let nextIndex;
      if (newDirection > 0) {
        nextIndex = (prev[0] + 1) % translatedTestimonials.length;
      } else {
        nextIndex = (prev[0] - 1 + translatedTestimonials.length) % translatedTestimonials.length;
      }
      return [nextIndex, newDirection];
    });
    
    // Re-enable auto-scrolling after a delay
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 10000);
  };
  
  // Handle dot navigation
  const goToSlide = (index: number) => {
    setIsAutoScrolling(false);
    
    setActiveIndex(prev => {
      const newDirection = index > prev[0] ? 1 : -1;
      return [index, newDirection];
    });
    
    // Re-enable auto-scrolling after a delay
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 10000);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-100/80 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-red-50 blur-3xl opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 bg-green-50 text-green-700 font-medium text-sm rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("testimonials.sectionLabel", "Client Success Stories")}
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-green-700">Trusted</span> by Industry Leaders
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("testimonials.sectionDescription", "Hear directly from our clients about how TP@CK's innovative solutions have transformed their operations and delivered measurable results.")}
          </motion.p>
        </div>
        
        {/* Testimonial cards carousel */}
        <div className="relative max-w-4xl mx-auto min-h-[400px] md:min-h-[350px] mb-16">
          <AnimatePresence custom={direction} mode="wait">
            <TestimonialCard
              key={activeIndex}
              testimonial={translatedTestimonials[activeIndex]}
              direction={direction}
            />
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center items-center gap-4 mt-8">
            <motion.button
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            
            <div className="flex items-center space-x-3">
              {translatedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-green-600" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-400"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <motion.button
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(1)}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Company logos */}
        <motion.div 
          className="mt-24 pt-12 border-t border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-center text-sm text-gray-500 mb-10 uppercase font-medium tracking-wider">
            {t("testimonials.trustedBy", "Trusted By Companies Worldwide")}
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {translatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="w-28 h-20 md:w-32 md:h-24 relative grayscale hover:grayscale-0 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
              >
                <div className="absolute inset-0 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center">
                  <Image
                    src={testimonial.logo}
                    alt={testimonial.company}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
