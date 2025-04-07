"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Server, Shield, Cpu } from "lucide-react";
import { useTranslation } from "@/components/ui/language-selector";

const products = [
  {
    id: "t20",
    name: "T20",
    tagline: "Compact, entry-level packaging solution ideal for small to medium businesses",
    description: "The T20 is a robust solution for businesses with moderate output requirements. Its compact footprint makes it perfect for facilities with limited space while maintaining excellent performance and reliability.",
    specs: ["Throughput: 500 units/hour", "Dimensions: 4m x 1.5m", "Weight: 400kg", "Power: Three-phase, 16A", "100% electric machine"],
    benefits: [
      "Space-efficient design",
      "Easy to operate and maintain",
      "Eco-friendly operation",
      "Compatible with all client WMS systems"
    ],
    image: "/images/t20-product.jpg",
    href: "/products/t20"
  },
  {
    id: "t30",
    name: "T30",
    tagline: "Mid-range packaging system with enhanced speed and flexibility",
    description: "The T30 offers the perfect balance of performance and versatility. Designed for growing enterprises, it delivers increased throughput while maintaining operational efficiency and reliability.",
    specs: ["Throughput: 500 units/hour", "Dimensions: 4m x 1.5m", "Weight: 400kg", "Power: Three-phase, 16A", "100% electric machine"],
    benefits: [
      "Advanced material handling capabilities",
      "Works with wood, recycled plastic, aluminum, steel",
      "Enhanced WMS/WCS integration",
      "Real-time monitoring via IConnect Application"
    ],
    image: "/images/t30-product.jpg",
    href: "/products/t30"
  },
  {
    id: "t50",
    name: "T50",
    tagline: "High-performance packaging solution for enterprise-scale operations",
    description: "The T50 is our premium solution for large-scale operations requiring maximum throughput and reliability. With advanced automation and intelligent controls, it represents the pinnacle of packaging technology.",
    specs: ["Throughput: 500 units/hour", "Dimensions: 4m x 1.5m", "Weight: 400kg", "Power: Three-phase, 16A", "100% electric machine"],
    benefits: [
      "Industry-leading throughput capacity",
      "Sustainability-focused material handling",
      "Programmable logic controller (PLC)",
      "Remote management via 4G module"
    ],
    image: "/images/t50-product.jpg",
    href: "/products/t50"
  }
];

export default function ProductsPage() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="bg-black py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {t("products.header.label", "Our Product Range")}
            </motion.span>
            <motion.h1
              className="heading-xl text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("products.header.title", "Choose the Perfect TP@CK Machine for Your Needs")}
            </motion.h1>
            <motion.p
              className="text-gray-300 text-lg md:text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("products.header.description", "Our range of packaging solutions is designed to meet various operational scales and requirements, from small businesses to large enterprises.")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/model-selection"
                className="inline-flex items-center px-5 py-2 bg-white text-primary rounded-lg shadow-md hover:bg-gray-50 transition-colors"
              >
                <span className="mr-2">View 3D Models</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Common Key Features */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-primary mb-6">{t("products.features.title", "Key Differentiators")}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t("products.features.description", "All TP@CK machines share these revolutionary features that set them apart from legacy solutions, with specifications tailored to each model's capacity requirements.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t("products.features.integration.title", "IT Integration")}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("products.features.integration.description", "Seamless compatibility with all major WMS/WCS systems enables efficient warehouse management.")}
              </p>
              <ul className="space-y-2">
                {[
                  t("products.features.integration.benefit1", "Compatibility with all major WMS providers"),
                  t("products.features.integration.benefit2", "Real-time inventory tracking"),
                  t("products.features.integration.benefit3", "Automated workflow optimization")
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-primary mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t("products.features.certifications.title", "Certifications")}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("products.features.certifications.description", "UL certification for the US market and international standards compliance for global operation.")}
              </p>
              <ul className="space-y-2">
                {[
                  t("products.features.certifications.benefit1", "UL certified for US market"),
                  t("products.features.certifications.benefit2", "ISO 14001 environmental management"),
                  t("products.features.certifications.benefit3", "CE marked for European compliance")
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-primary mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t("products.features.ai.title", "AI e-Connect")}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("products.features.ai.description", "Predictive maintenance system that reduces downtime and extends the machine's operational life.")}
              </p>
              <ul className="space-y-2">
                {[
                  t("products.features.ai.benefit1", "74% reduction in unexpected downtime"),
                  t("products.features.ai.benefit2", "Predictive component failure alerts"),
                  t("products.features.ai.benefit3", "Remote diagnostics and support")
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-primary mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">{t("products.list.title", "Our Product Range")}</h2>

          <div className="space-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={product.image}
                      alt={`TP@CK ${product.name}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                      <div className="px-8">
                        <span className="bg-primary text-white text-sm py-1 px-3 rounded-full">TP@CK</span>
                        <h2 className="text-4xl font-bold text-white mt-2">{product.name}</h2>
                        <p className="text-gray-300 mt-2">{t(`products.${product.id}.tagline`, product.tagline)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-gray-600 mb-6">{t(`products.${product.id}.description`, product.description)}</p>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">{t("products.specs.title", "Key Specifications")}</h3>
                      <ul className="space-y-2">
                        {product.specs.map((spec, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                            {t(`products.${product.id}.specs.${idx}`, spec)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">{t("products.benefits.title", "Benefits")}</h3>
                      <ul className="space-y-2">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="text-primary mr-2 flex-shrink-0 mt-0.5" size={16} />
                            <span className="text-sm">{t(`products.${product.id}.benefits.${idx}`, benefit)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={product.href}>
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        {t("products.viewDetails", "View Details")} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
