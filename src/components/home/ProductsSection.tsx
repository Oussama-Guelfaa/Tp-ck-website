"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useTranslation } from "@/components/ui/language-selector";

const getProducts = (t: (key: string, fallback?: string) => string) => [
  {
    id: "t20",
    name: "T20",
    description: t(
      "products.t20.description",
      "Compact, entry-level packaging solution ideal for small to medium businesses with moderate output requirements."
    ),
    features: [
      t("products.t20.feature1", "Throughput: 500u/heure"),
      t("products.t20.feature2", "Dimensions: 4m x 1.5m"),
      t("products.t20.feature3", "Weight: 400kg"),
      t("products.t20.feature4", "Electrical Supply: Triphasé 16A"),

    ],
    image: "/images/t20-machine.jpg",
    href: "/products/t20",
  },
  {
    id: "t30",
    name: "T30",
    description: t(
      "products.t30.description",
      "Mid-range packaging system with enhanced speed and flexibility, designed for growing enterprises."
    ),
    features: [
      t("products.t30.feature5", "Control System: Automate programmable"),
      t("products.t30.feature6", "Materials Processed: Bois, plastique recyclé, aluminium, acier"),
      t("products.t30.feature7", "Package Size Range: See technical documentation"),
      t("products.t30.feature8", "Operating Temperature: 10°C to 30°C"),
      t("products.t30.feature9", "Connectivity: Ethernet, Module 4g"),
    ],
    image: "/images/t30-machine.jpg",
    href: "/products/t30",
  },
  {
    id: "t50",
    name: "T50",
    description: t(
      "products.t50.description",
      "High-performance packaging solution for large-scale operations requiring maximum throughput and reliability."
    ),
    features: [
      t("products.t50.feature10", "WMS Compatibility: Adapted to all client WMS"),
      t("products.t50.feature11", "API Documentation: Available"),
      t("products.t50.feature12", "Data Exchange Protocol: Exchange Table, TCPIC protocol"),
      t("products.t50.feature13", "Real-time Monitoring: Iconect Application"),
      t("products.t50.feature14", "Remote Management: Via 4G Module")
    ],
    image: "/images/t50-machine.jpg",
    href: "/products/t50",
  },
];

export function ProductsSection() {
  const { t } = useTranslation();
  const products = getProducts(t);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-20 md:py-28 overflow-hidden"
    >
      {/* Dynamic background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent z-0"
        style={{ opacity: bgOpacity }}
      />

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
            {t("home.products.range", "Product Range")}
          </motion.span>
          <motion.h2
            className="heading-lg text-gray-900 mt-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("home.products.heading", "Choose the Perfect TP@CK Machine for Your Needs")}
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("home.products.description", "Our range of packaging solutions is designed to meet various operational scales and requirements, from small businesses to large enterprises.")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg group transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={product.image}
                  alt={`TP@CK ${product.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  {product.name}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                <h3 className="text-xl font-bold text-black mb-2">TP@CK {product.name}</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={product.href} className="block">
                  <Button
                    variant="default"
                    className="w-full bg-primary hover:bg-primary/90 text-white group-hover:shadow-md transition-all duration-300 transform group-hover:translate-y-[-2px]"
                  >
                    {t("home.products.viewButton", "View Specifications")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-600 mb-6">
            {t("home.products.helpText", "Need help choosing the right solution? Our experts can provide a customized recommendation.")}
          </p>
          <Link href="/products">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary transition-colors duration-300"
            >
              {t("home.products.compareButton", "Compare All Products")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}