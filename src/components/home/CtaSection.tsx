"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Recycle, TreePine } from "lucide-react";
import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/components/ui/language-selector";

// Component for animated statistics with proper TypeScript types
interface AnimatedStatProps {
  end: number;
  suffix?: string;
  label: string;
}

const AnimatedStat = ({ end, suffix = "", label }: AnimatedStatProps) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className="transform transition-all duration-500 hover:scale-105">
      <h3 className="text-primary text-4xl font-bold mb-2 flex justify-center items-baseline">
        {isInView ? (
          <>
            <CountUp
              start={0}
              end={end}
              duration={2.5}
              delay={0.2}
              enableScrollSpy={false}
              decimals={0}
              className="inline-block"
            />
            <span className="inline-block">{suffix}</span>
          </>
        ) : (
          "0" + suffix
        )}
      </h3>
      <p className="text-white text-sm">{label}</p>
    </div>
  );
};

export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-20 md:py-24 relative overflow-hidden border-t border-gray-100">
      {/* Eco-friendly background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute h-40 w-40 top-[5%] left-[10%] rotate-12">
          <TreePine className="h-full w-full text-green-200" />
        </div>
        <div className="absolute h-48 w-48 bottom-[5%] right-[10%] -rotate-12">
          <Leaf className="h-full w-full text-green-200" />
        </div>
        <div className="absolute h-32 w-32 top-[40%] right-[25%] rotate-45">
          <Recycle className="h-full w-full text-green-200" />
        </div>
      </div>
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-white rounded-3xl p-10 md:p-16 relative overflow-hidden border border-green-100">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/30 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-200/30 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                <motion.span
                  className="inline-flex items-center bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Leaf className="mr-1.5 h-3.5 w-3.5" /> {t("cta.tagline", "Ready to Transform Your Packaging?")}
                </motion.span>
                <motion.h2
                  className="heading-lg text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {t("cta.heading", "Schedule a Personalized Demo of TP@CK Solutions")}
                </motion.h2>
                <motion.p
                  className="text-gray-300 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {t("cta.description", "Our experts will guide you through the features that matter most to your operation and provide a tailored recommendation based on your specific needs.")}
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto rounded-md">
                    {t("cta.demoButton", "Request a Demo")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 hover:text-green-800 px-8 py-6 h-auto">
                    {t("cta.exploreButton", "Explore Products")}
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <AnimatedStat end={30} suffix="%" label={t("cta.stat1", "Average Efficiency Increase")} />
                <AnimatedStat end={24} suffix="/7" label={t("cta.stat2", "Technical Support")} />
                <AnimatedStat end={90} suffix="+" label={t("cta.stat3", "Countries Served")} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
