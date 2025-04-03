"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    <section className="bg-black py-20 md:py-24">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                <motion.span
                  className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {t("cta.tagline", "Ready to Transform Your Packaging?")}
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
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 h-auto">
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
