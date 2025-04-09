"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check, Server, Shield, Cpu, BarChart3, Leaf, Recycle } from "lucide-react";
import { useTranslation } from "@/components/ui/language-selector";

// Define features with translation keys
import { TFunction } from "i18next";

const getFeatures = (t: TFunction) => [
  {
    id: "integration",
    title: t("home.features.integration.title", "IT Integration"),
    icon: Server,
    description: t("home.features.integration.description", "Seamless compatibility with all major WMS/WCS systems enables efficient warehouse management."),
    benefits: [
      t("home.features.integration.benefit1", "Compatible with all major WMS providers"),
      t("home.features.integration.benefit2", "Real-time inventory tracking"),
      t("home.features.integration.benefit3", "Automated workflow optimization"),
      t("home.features.integration.benefit4", "Centralized control interface"),
    ],
    image: "/images/wms.jpeg",
  },
  {
    id: "certifications",
    title: t("home.features.certifications.title", "Environmental Certifications"),
    icon: Shield,
    description: t("home.features.certifications.description", "UL certification for the US market and international standards compliance for global operation."),
    benefits: [
      t("home.features.certifications.benefit1", "UL certified for US market"),
      t("home.features.certifications.benefit3", "CE marked for European compliance"),
      t("home.features.certifications.benefit4", "Energy efficiency rating A++"),
    ],
    image: "/images/env_cert.jpeg",
  },
  {
    id: "ai-connect",
    title: t("home.features.ai.title", "AI IConnect"),
    icon: Cpu,
    description: t("home.features.ai.description", "Predictive maintenance system that reduces downtime and extends the machine's operational life."),
    benefits: [
      t("home.features.ai.benefit1", "Reduction in unexpected downtime"),
      t("home.features.ai.benefit2", "Predictive component failure alerts"),
      t("home.features.ai.benefit3", "Automatic maintenance scheduling"),
      t("home.features.ai.benefit4", "Remote diagnostics and support"),
    ],
    image: "/images/iconnect.jpeg",
  },
  {
    id: "operational",
    title: t("home.features.operational.title", "Operational Advantages"),
    icon: BarChart3,
    description: t("home.features.operational.description", "Enhanced efficiency metrics that deliver measurable ROI through operational improvements."),
    benefits: [
      t("home.features.operational.benefit1", "30% faster packaging speeds"),
      t("home.features.operational.benefit2", "20% reduction in material consumption"),
      t("home.features.operational.benefit3", "15% lower energy consumption"),
      t("home.features.operational.benefit4", "Dual-mode operation for flexibility"),
    ],
    image: "/images/opad.jpeg",
  },
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

export function FeaturesSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("integration");
  const features = getFeatures(t as unknown as TFunction);

  return (
    <section className="bg-white py-20 md:py-28 relative overflow-hidden">
      {/* Eco-friendly background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute h-32 w-32 top-[15%] left-[5%] rotate-12">
          <Leaf className="h-full w-full text-green-200" />
        </div>
        <div className="absolute h-40 w-40 bottom-[10%] right-[5%] -rotate-12">
          <Recycle className="h-full w-full text-green-200" />
        </div>
      </div>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-primary font-semibold text-sm uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("home.features.sectionLabel", "Key Differentiators")}
          </motion.span>
          <motion.h2
            className="heading-lg mt-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("home.features.sectionTitle", "What Sets TP@CK Apart from Legacy Solutions")}
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("home.features.sectionDescription", "TP@CK leverages cutting-edge technology to deliver a packaging solution that is more efficient, environmentally responsible, and adaptable to your business needs.")}
          </motion.p>
        </div>

        <Tabs defaultValue="integration" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white p-1 rounded-lg mb-8 border border-gray-200">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className={`flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm md:text-base transition-all duration-300 hover:bg-gray-50`}
              >
                <div className={`p-1.5 rounded-full ${activeTab === feature.id ?
                  (feature.id === 'integration' ? 'bg-red-100' :
                   feature.id === 'certifications' ? 'bg-green-100' :
                   feature.id === 'ai-connect' ? 'bg-blue-100' : 'bg-purple-100') :
                  'bg-gray-100'}`}>
                  <feature.icon className={`h-4 w-4 ${activeTab === feature.id ?
                    (feature.id === 'integration' ? 'text-red-600' :
                     feature.id === 'certifications' ? 'text-green-600' :
                     feature.id === 'ai-connect' ? 'text-blue-600' : 'text-purple-600') :
                    'text-gray-500'}`} />
                </div>
                <span className={`hidden md:inline font-medium ${activeTab === feature.id ?
                  (feature.id === 'integration' ? 'text-red-600' :
                   feature.id === 'certifications' ? 'text-green-600' :
                   feature.id === 'ai-connect' ? 'text-blue-600' : 'text-purple-600') :
                  'text-gray-700'}`}>{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2">
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.h3
                      className="heading-md text-black flex items-center gap-3"
                      variants={itemVariants}
                    >
                      <div className={`p-3 rounded-full flex items-center justify-center ${feature.id === 'integration' ? 'bg-red-100' : feature.id === 'certifications' ? 'bg-green-100' : feature.id === 'ai-connect' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                        <feature.icon className={`h-7 w-7 ${feature.id === 'integration' ? 'text-red-600' : feature.id === 'certifications' ? 'text-green-600' : feature.id === 'ai-connect' ? 'text-blue-600' : 'text-purple-600'}`} />
                      </div>
                      <span className={`${feature.id === 'integration' ? 'bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500' : feature.id === 'certifications' ? 'bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500' : feature.id === 'ai-connect' ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500' : 'bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500'}`}>
                        {feature.title}
                      </span>
                    </motion.h3>

                    <motion.p
                      className="text-gray-600"
                      variants={itemVariants}
                    >
                      {feature.id === 'integration' ? (
                        <>Seamless compatibility with all major <span className="font-bold text-red-600 px-1 py-0.5 rounded bg-red-50">WMS/WCS</span> systems enables efficient warehouse management.</>
                      ) : feature.id === 'certifications' ? (
                        <><span className="font-bold text-green-600 px-1 py-0.5 rounded bg-green-50">UL certification</span> for the US market and international standards compliance for global operation.</>
                      ) : feature.id === 'ai-connect' ? (
                        <><span className="font-bold text-blue-600 px-1 py-0.5 rounded bg-blue-50">Predictive maintenance</span> system that reduces downtime and extends the machine's operational life.</>
                      ) : (
                        <>Enhanced <span className="font-bold text-purple-600 px-1 py-0.5 rounded bg-purple-50">efficiency metrics</span> that deliver measurable ROI through operational improvements.</>
                      )}
                    </motion.p>

                    <motion.div
                      className="space-y-3 pt-4"
                      variants={itemVariants}
                    >
                      <h4 className="font-semibold text-black">{t("home.features.keyBenefits", "Key Benefits")}:</h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                            variants={itemVariants}
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                          >
                            <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${feature.id === 'integration' ? 'text-red-500' : feature.id === 'certifications' ? 'text-green-500' : feature.id === 'ai-connect' ? 'text-blue-500' : 'text-purple-500'}`} />
                            <span className="font-medium">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="lg:col-span-3">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden aspect-video bg-white border border-gray-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
                      <div className="flex justify-between items-center">
                        <p className="text-white font-medium">{feature.title} {t("home.features.inAction", "in action")}</p>
                        <div className="flex items-center text-white text-sm">
                          <span>{t("home.features.learnMore", "Learn more")}</span>
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
