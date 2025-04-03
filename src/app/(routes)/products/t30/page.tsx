"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import {
  ArrowRight,
  Check,
  Download,
  BarChart,
  Cpu,
  Server,
  Shield,
  Zap
} from "lucide-react";

// Technical specifications for T30
const technicalSpecs = [
  { name: "Throughput Capacity", value: "500 units/hour" },
  { name: "Physical Dimensions", value: "4m x 1.5m" },
  { name: "Weight", value: "400kg" },
  { name: "Power Requirements", value: "Three-phase, 16A" },
  { name: "Air Consumption", value: "None – 100% electric machine. Eco-friendly to the core!" },
  { name: "Control System", value: "Programmable logic controller (PLC)" },
  { name: "Materials Handled", value: "Wood, recycled plastic, aluminum, steel – Sustainability first!" },
  { name: "Package Size Range", value: "See technical documentation" },
  { name: "Operating Temperature", value: "10°C to 30°C" },
  { name: "Connectivity", value: "Ethernet, 4G module" },
];

// Integration capabilities for T30
const integrationCapabilities = [
  { name: "WMS Compatibility", value: "Compatible with all client WMS systems" },
  { name: "API Documentation", value: "Exchange table, TCP/IP protocol" },
  { name: "Data Exchange Protocols", value: "Exchange table, TCP/IP protocol" },
  { name: "Real-time Monitoring", value: "IConnect Application" },
  { name: "Remote Management", value: "Via 4G module" },
];

// Certifications for T30
const certifications = [
  { name: "UL Certification", value: "UL 1740 - Industrial Robots and Robotic Equipment" },
  { name: "CE Marking", value: "Machinery Directive 2006/42/EC" },
  { name: "ISO Compliance", value: "ISO 14001:2015 (Environmental Management), ISO 9001:2015 (Quality)" },
  { name: "Energy Rating", value: "EU Energy Efficiency Class A+" },
  { name: "Safety Standards", value: "EN ISO 13849-1:2015, EN 62061:2005, IEC 61508" },
];

export default function T30ProductPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pt-32 pb-16 md:pt-36 md:pb-24">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(176,0,0,0.15),transparent_50%)]"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Mid-Range Solution
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  TP@CK <span className="text-primary">T30</span>
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  Mid-range packaging system with enhanced speed and flexibility, designed for growing enterprises.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Check className="text-primary mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">Enhanced throughput for medium to high volume operations</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="text-primary mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">Dual-mode operation for maximum versatility</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="text-primary mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">Advanced analytics and predictive maintenance system</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="text-primary mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">Comprehensive certifications for international deployment</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 h-auto">
                      Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-6 h-auto">
                    <Download className="mr-2 h-4 w-4" /> Download Specifications
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <Image
                  src="/images/t30-machine.jpg"
                  alt="TP@CK T30 Machine"
                  fill
                  className="object-contain"
                />
                <div className="absolute -bottom-4 -left-4 bg-black px-4 py-2 rounded-lg shadow-lg z-10">
                  <p className="text-white font-semibold">30 packages/hour</p>
                  <p className="text-xs text-gray-400">Maximum throughput</p>
                </div>
                <div className="absolute -top-4 -right-4 bg-black px-4 py-2 rounded-lg shadow-lg z-10">
                  <p className="text-white font-semibold">3.2m x 2.1m</p>
                  <p className="text-xs text-gray-400">Balanced footprint</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Key T30 Features</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The versatile T30 model offers enhanced features designed to meet the demands
              of growing businesses with increasing packaging requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Dual-Mode Operation</h3>
              </div>
              <p className="text-gray-600">
                Switch between high-speed and precision modes to accommodate varying product types
                and production demands with minimal reconfiguration time.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Enhanced Integration</h3>
              </div>
              <p className="text-gray-600">
                Advanced compatibility with all major WMS/WCS systems plus custom API support
                for seamless integration into your existing workflow.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Advanced Analytics</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive performance monitoring with AI-driven analytics to optimize operations,
                reduce waste, and identify opportunities for efficiency improvements.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Extended Material Support</h3>
              </div>
              <p className="text-gray-600">
                Handles a wider range of packaging materials including specialty papers,
                biodegradable options, and custom protective solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Technical Specifications</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Detailed technical information about the T30 model to help you determine if it meets your operational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <BarChart className="mr-3 text-primary" />
                  Physical & Performance Specifications
                </h3>
                <div className="space-y-4">
                  {technicalSpecs.map((spec, index) => (
                    <div key={index} className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{spec.name}</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Server className="mr-3 text-primary" />
                  Integration Capabilities
                </h3>
                <div className="space-y-4">
                  {integrationCapabilities.map((spec, index) => (
                    <div key={index} className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{spec.name}</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Shield className="mr-3 text-primary" />
                  Certifications & Compliance
                </h3>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{cert.name}</span>
                      <span className="text-gray-600">{cert.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Customer Success Story</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See how the T30 has transformed operations for one of our clients.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="/images/company-logo-2.svg"
                  alt="Case Study T30 Implementation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <div className="px-8">
                    <h3 className="text-2xl font-bold text-white">FastShip Enterprises</h3>
                    <p className="text-gray-300">Distribution Center Modernization</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex -space-x-2 mr-4">
                    <Image
                      src="/images/company-logo-2.svg"
                      alt="FastShip Enterprises"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Michael Rodriguez, Head of Production</p>
                  </div>
                </div>

                <blockquote className="text-lg text-gray-700 italic mb-6">
                  "What impressed me most about TP@CK T30 was the predictive maintenance system. We've had zero unexpected downtime since implementation, which is unprecedented for our 24/7 operation. The dual-mode flexibility has been crucial for our varied product line."
                </blockquote>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="w-16 flex-shrink-0 font-bold">Challenge:</div>
                    <p className="text-gray-600">Frequent equipment downtime and inconsistent packaging quality</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-16 flex-shrink-0 font-bold">Solution:</div>
                    <p className="text-gray-600">Implemented the T30 with predictive maintenance and dual-mode operation</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-16 flex-shrink-0 font-bold">Results:</div>
                    <p className="text-gray-600">
                      Zero unexpected downtime in 6 months<br />
                      28% increase in production capacity<br />
                      15% reduction in operating costs
                    </p>
                  </div>
                </div>

                <Link href="/expertise#case-studies">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Model Comparison</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Compare the T30 with other models in the TP@CK range to find the perfect solution for your business.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="py-4 px-6 text-left">Features</th>
                  <th className="py-4 px-6 text-center">T20</th>
                  <th className="py-4 px-6 text-center relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                      YOU ARE VIEWING
                    </div>
                    T30
                  </th>
                  <th className="py-4 px-6 text-center">T50</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Throughput</td>
                  <td className="py-4 px-6 text-center">20 packages/hour</td>
                  <td className="py-4 px-6 text-center">30 packages/hour</td>
                  <td className="py-4 px-6 text-center">50 packages/hour</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Footprint</td>
                  <td className="py-4 px-6 text-center">2.4m x 1.6m</td>
                  <td className="py-4 px-6 text-center">3.2m x 2.1m</td>
                  <td className="py-4 px-6 text-center">4.5m x 2.8m</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Power Consumption</td>
                  <td className="py-4 px-6 text-center">8kW</td>
                  <td className="py-4 px-6 text-center">12kW</td>
                  <td className="py-4 px-6 text-center">18kW</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Package Size Range</td>
                  <td className="py-4 px-6 text-center">10x10x5 - 60x40x40 cm</td>
                  <td className="py-4 px-6 text-center">10x10x5 - 80x60x40 cm</td>
                  <td className="py-4 px-6 text-center">10x10x5 - 100x80x60 cm</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Material Types</td>
                  <td className="py-4 px-6 text-center">Standard</td>
                  <td className="py-4 px-6 text-center">Extended</td>
                  <td className="py-4 px-6 text-center">All Types</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Dual Mode Operation</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-red-500">✕</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-500">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Advanced Analytics</td>
                  <td className="py-4 px-6 text-center">Basic</td>
                  <td className="py-4 px-6 text-center">Advanced</td>
                  <td className="py-4 px-6 text-center">Enterprise</td>
                </tr>
                <tr>
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6 text-center">
                    <Link href="/products/t20">
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                        View T20
                      </Button>
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link href="/products/t30">
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        Current Selection
                      </Button>
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link href="/products/t50">
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                        View T50
                      </Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Ready to Enhance Your Packaging Operations?
              </h2>
              <p className="text-gray-300 mb-8">
                Schedule a personalized demo to see the T30 in action and discover how it can
                transform your packaging process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 h-auto">
                    Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-6 h-auto">
                    Explore Other Models
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
