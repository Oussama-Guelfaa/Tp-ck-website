"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Store,
  ShoppingBag,
  Utensils,
  ChevronRight
} from "lucide-react";
import { useTranslation } from "@/components/ui/language-selector";

const getMarketSectors = (t: (key: string, fallback?: string) => string) => [
  {
    id: "logisticiens",
    title: t("markets.logistics.title", "Logisticiens"),
    icon: Truck,
    description: t("markets.logistics.description", "TP@CK offers logisticians an optimal integration with their WMS/WCS systems, enabling real-time traceability and efficient flow management. By reducing transport costs and improving space utilization, TP@CK is the ideal solution to optimize supply chains and meet the evolving demands of the logistics sector.")
  },
  {
    id: "distribution",
    title: t("markets.distribution.title", "Grandes Distributions"),
    icon: Store,
    description: t("markets.distribution.description", "Large distribution networks benefit from a reliable and high-performance packaging solution. TP@CK minimizes waste and optimizes storage spaces, ensuring better supply management and significant reductions in logistical costs. Tailored to the high demands of the sector, TP@CK delivers an innovative solution to maintain competitive advantage.")
  },
  {
    id: "ecommerce",
    title: t("markets.ecommerce.title", "E-commerce"),
    icon: ShoppingBag,
    description: t("markets.ecommerce.description", "For the e-commerce sector, TP@CK represents a tailor-made solution that combines speed, flexibility, and environmental responsibility. With customized, optimized packaging, TP@CK reduces transport costs and enhances the customer experience while meeting increasing expectations for sustainability and innovation.")
  },
  {
    id: "cuisinistes",
    title: t("markets.cuisine.title", "Cuisinistes"),
    icon: Utensils,
    description: t("markets.cuisine.description", "Cuisinists will find in TP@CK a solution perfectly suited to their needs, combining robustness with aesthetic appeal. By ensuring optimal product protection and efficient space utilization, TP@CK adds value to products while reducing costs. This innovative solution is particularly relevant for installations requiring high performance and strong profitability.")
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function TargetMarketsSection() {
  const { t } = useTranslation();
  const marketSectors = getMarketSectors(t);

  return (
    <section className="bg-black py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container-custom relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-primary font-semibold text-sm uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("markets.sectionLabel", "Industry Solutions")}
          </motion.span>
          <motion.h2
            className="heading-lg text-white mt-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("markets.sectionTitle", "Target Markets")}
          </motion.h2>
          <motion.p
            className="text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("markets.sectionDescription", "Our packaging solutions are tailored to meet the specific requirements of various industries, delivering exceptional value and operational efficiency.")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {marketSectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-white flex items-center gap-3"
                  variants={itemVariants}
                >
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <sector.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="heading-md">{sector.title}</h3>
                </motion.div>

                <motion.p
                  className="text-gray-300"
                  variants={itemVariants}
                >
                  {sector.description}
                </motion.p>

                <motion.div
                  className="mt-4 pt-4 border-t border-white/10"
                  variants={itemVariants}
                >
                  <button className="text-primary flex items-center group">
                    <span>{t("markets.learnMore", "Learn more about TP@CK for")} {sector.title}</span>
                    <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
