"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useTranslation } from "@/components/ui/language-selector";
import type { CarouselApi } from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  quoteKey: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  logo: string;
}

const getTestimonials = (t: (key: string, fallback?: string) => string): Testimonial[] => [
  {
    id: 1,
    quoteKey: "testimonials.quote1",
    quote: t("testimonials.quote1", "The TP@CK T30 has transformed our warehouse operations. The WMS integration was seamless, and we've seen a 32% increase in packaging efficiency within the first month."),
    name: t("testimonials.name1", "Mohamed amine Hanchouch"),
    title: t("testimonials.title1", "Operations Director"),
    company: t("testimonials.company1", "Global Logistics Inc."),
    logo: "/images/schneider_logo.png",
  },
  {
    id: 2,
    quoteKey: "testimonials.quote2",
    quote: t("testimonials.quote2", "What impressed me most about TP@CK was the predictive maintenance system. We've had zero unexpected downtime since implementation, which is unprecedented for our 24/7 operation."),
    name: t("testimonials.name2", "Noa Akayad"),
    title: t("testimonials.title2", "Head of Production"),
    company: t("testimonials.company2", "FastShip Enterprises"),
    logo: "/images/zalando_logo.png",
  },
  {
    id: 3,
    quoteKey: "testimonials.quote3",
    quote: t("testimonials.quote3", "As a company committed to sustainability, the environmental certifications of TP@CK's systems were a deciding factor. The reduced material waste has also contributed to our bottom line."),
    name: t("testimonials.name3", "Oussama Guelfaa"),
    title: t("testimonials.title3", "Sustainability Manager"),
    company: t("testimonials.company3", "EcoPackage Solutions"),
    logo: "/images/CGP_logo.png",
  },
  {
    id: 4,
    quoteKey: "testimonials.quote4",
    quote: t("testimonials.quote4", "The T50 system exceeded our throughput expectations. The dual-mode operation gives us flexibility to adapt to seasonal demand fluctuations without compromising on quality."),
    name: t("testimonials.name4", "Oussama Guelfaa"),
    title: t("testimonials.title4", "Technical Director"),
    company: t("testimonials.company4", "European Distribution GmbH"),
    logo: "/images/branopac_logo.png",
  },
];

export function TestimonialsSection() {
  const { t } = useTranslation();
  const testimonials = getTestimonials(t);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  // Handle auto-scrolling
  useEffect(() => {
    // Clear any existing timer when the component mounts or dependencies change
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }

    // Only set up auto-scrolling if it's enabled and API is available
    if (isAutoScrolling && carouselApi) {
      autoScrollTimerRef.current = setInterval(() => {
        const nextIndex = (activeIndex + 1) % testimonials.length;
        carouselApi.scrollTo(nextIndex);
      }, 7000);
    }

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    };
  }, [testimonials.length, isAutoScrolling, activeIndex, carouselApi]);

  // Handle manual navigation
  const handleNavigate = (index: number) => {
    // Temporarily disable auto-scrolling when user manually navigates
    setIsAutoScrolling(false);

    // Scroll the carousel to the selected index if API is available
    if (carouselApi) {
      carouselApi.scrollTo(index);
    }

    // Re-enable auto-scrolling after a delay
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 10000);
  };

  // Update activeIndex when carousel changes
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-primary font-semibold text-sm uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("testimonials.sectionLabel", "Client Success Stories")}
          </motion.span>
          <motion.h2
            className="heading-lg mt-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("testimonials.sectionTitle", "Trusted by Industry Leaders")}
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("testimonials.sectionDescription", "Hear directly from our clients about how TP@CK's innovative solutions have transformed their operations and delivered measurable results.")}
          </motion.p>
        </div>

        <Carousel
          ref={carouselRef}
          className="w-full max-w-5xl mx-auto"
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <Card className="border-none shadow-lg p-8 md:p-12 overflow-hidden bg-white hover:bg-gray-50 group hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col items-center text-center md:text-left">
                    <Quote className="h-12 w-12 text-primary/30 mb-6 group-hover:text-primary/40 transition-colors duration-300" />
                    <p className="text-xl md:text-2xl font-medium text-gray-800 mb-8 group-hover:text-black transition-colors duration-300 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col items-center">
                      <div className="h-14 w-14 relative flex-shrink-0 bg-white rounded-full p-1 shadow-sm group-hover:shadow-md transition-all duration-300 mb-4">
                        <Image
                          src={testimonial.logo}
                          alt={testimonial.company}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-black text-lg">{testimonial.name}</p>
                        <p className="text-gray-600">{testimonial.title}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 space-x-2">
            <CarouselPrevious className="relative inset-auto mx-2" />
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            <CarouselNext className="relative inset-auto mx-2" />
          </div>
        </Carousel>

        {/* Company logos */}
        <div className="mt-20">
          <p className="text-center text-sm text-gray-500 mb-8 uppercase font-semibold tracking-wider">
            {t("testimonials.trustedBy", "Trusted By Companies Worldwide")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="w-24 h-16 md:w-32 md:h-20 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 bg-white rounded-lg p-2 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * testimonial.id }}
              >
                <Image
                  src={testimonial.logo}
                  alt={testimonial.company}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
