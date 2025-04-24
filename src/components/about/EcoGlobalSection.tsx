"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/components/ui/language-selector";
import { 
  Globe, 
  Leaf, 
  ChevronRight, 
  ChevronLeft, 
  Minus, 
  TrendingDown, 
  Truck, 
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
interface CarouselImage {
  src: string;
  alt: string;
}

interface ProductCard {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface StatBox {
  icon: React.ReactNode;
  text: string;
}

// Main component
export function EcoGlobalSection() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Carousel images
  const carouselImages: CarouselImage[] = [
    { src: "/images/t20-machine.jpg", alt: "T20 Machine in action" },
    { src: "/images/t30-machine.jpg", alt: "T30 Machine in action" },
    { src: "/images/t50-machine.jpg", alt: "T50 Machine in action" },
    { src: "/images/paper-sealing.jpg", alt: "Auto-sealing paper technology" },
  ];

  // Product cards data
  const productCards: ProductCard[] = [
    {
      title: t("about.cards.range.title", "Product Range"),
      description: t("about.cards.range.description", "T20 (500 u/h), T30 (500 u/h), T50 (250 u/h)"),
    },
    {
      title: t("about.cards.benefits.title", "Key Benefits"),
      description: t("about.cards.benefits.description", "Zero glue, 100% paper, waste reduction"),
    },
    {
      title: t("about.cards.performance.title", "Throughput & Performance"),
      description: t("about.cards.performance.description", "Logistics optimization, space saving"),
    },
  ];

  // Stat boxes data
  const statBoxes: StatBox[] = [
    {
      icon: <TrendingDown className="h-6 w-6 text-green-600" />,
      text: t("about.stats.waste", "-25% plastic waste"),
    },
    {
      icon: <Truck className="h-6 w-6 text-green-600" />,
      text: t("about.stats.transport", "-15% transport costs"),
    },
    {
      icon: <Award className="h-6 w-6 text-green-600" />,
      text: t("about.stats.compliance", "AGEC & EPR law compliant"),
    },
  ];

  // Carousel navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Toggle about section
  const toggleAbout = () => {
    setIsAboutExpanded(!isAboutExpanded);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full mb-4">
            <Globe className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("about.title", "TP@CK – Eco-Responsible Auto-Sealing Packaging")}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("about.subtitle", "A revolutionary packaging solution that combines efficiency, sustainability, and innovation")}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg" ref={carouselRef}>
          <div className="aspect-video relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={carouselImages[currentImageIndex].src}
                  alt={carouselImages[currentImageIndex].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Carousel controls */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
          
          {/* Pagination dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentImageIndex ? "bg-white w-4" : "bg-white/60"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {productCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stat Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statBoxes.map((box, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4"
            >
              <div className="bg-green-100 p-3 rounded-full">
                {box.icon}
              </div>
              <p className="font-medium text-gray-800">{box.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive "Learn More" Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-md overflow-hidden"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {t("about.learnMore.title", "Learn More About TP@CK")}
            </h3>
            <Button 
              onClick={toggleAbout}
              variant="ghost" 
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              {isAboutExpanded ? t("about.learnMore.less", "Show Less") : t("about.learnMore.more", "Show More")}
            </Button>
          </div>
          
          <AnimatePresence>
            {isAboutExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="prose max-w-none text-gray-700">
                  <p>{t("about.content.intro", "TP@CK is a 100% paper auto-sealing packaging solution, without glue or adhesive, developed by Tecnimodern Automation.")}</p>
                  
                  <h4>{t("about.content.range.title", "Machine Range:")}</h4>
                  <ul>
                    <li>{t("about.content.range.t20", "T20: envelopes, 500 u/h")}</li>
                    <li>{t("about.content.range.t30", "T30: packages, 500 u/h")}</li>
                    <li>{t("about.content.range.t50", "T50: large formats, 250 u/h")}</li>
                  </ul>
                  
                  <h4>{t("about.content.benefits.title", "Key Benefits:")}</h4>
                  <ul>
                    <li>{t("about.content.benefits.plastic", "Elimination of plastic consumables (glue/tape)")}</li>
                    <li>{t("about.content.benefits.waste", "Up to 25% reduction in packaging waste")}</li>
                    <li>{t("about.content.benefits.volume", "Optimized transport volume (15% logistics cost reduction)")}</li>
                    <li>{t("about.content.benefits.compliance", "Compliance with CSR standards (AGEC law, EPR directive, PPWR 2026)")}</li>
                  </ul>
                  
                  <h4>{t("about.content.models.title", "Economic Models:")}</h4>
                  <p>{t("about.content.models.description", "Direct purchase, green leasing, payment per box (0.03 €/unit)")}</p>
                  
                  <h4>{t("about.content.integration.title", "Integration & Traceability:")}</h4>
                  <p>{t("about.content.integration.description", "WMS/ERP API, optional RFID chips, Digital Twin")}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
