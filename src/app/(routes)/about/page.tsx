"use client";

import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Zap, Factory, Award, Wrench, BarChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const tpackMachines = [
  {
    id: "t20",
    name: "T20",
    description: "Compact, entry-level packaging solution for small to medium businesses with lower volume requirements.",
    features: [
      "WMS Compatibility: Adapted to all client WMS",
      "API Documentation: Available",
      "Data Exchange Protocol: Exchange Table, TCPIC protocol",
      "Real-time Monitoring: Iconect Application",
      "Remote Management: Via 4G Module"
    ],
    image: "/images/t20-machine.jpg",
    href: "/products/t20"
  },
  {
    id: "t30",
    name: "T30",
    description: "Mid-range packaging system offering enhanced speed and flexibility for growing operations.",
    features: [
      "Throughput: Up to 30 packages/hour",
      "Medium footprint (3.2m x 2.1m)",
      "Balanced energy consumption (12kW)",
      "Dual operation modes",
      "Advanced material handling"
    ],
    image: "/images/t30-machine.jpg",
    href: "/products/t30"
  },
  {
    id: "t50",
    name: "T50",
    description: "High-performance solution for enterprise-scale operations requiring maximum efficiency and throughput.",
    features: [
      "Throughput: Up to 50 packages/hour",
      "Larger footprint (4.5m x 2.8m)",
      "Higher power capacity (18kW)",
      "Full automation capabilities",
      "Multi-station design"
    ],
    image: "/images/t50-machine.jpg",
    href: "/products/t50"
  }
];

const advantages = [
  {
    title: "Eco-Friendly Operation",
    description: "Our machines reduce material waste by up to 30% compared to conventional systems, with energy-efficient components that minimize carbon footprint.",
    icon: <Leaf className="h-6 w-6 text-primary" />,
  },
  {
    title: "Advanced Automation",
    description: "Intelligent systems that optimize package sizing, material usage, and process flow without requiring constant operator intervention.",
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    title: "Manufacturing Excellence",
    description: "Designed and manufactured in France to exacting standards, with premium components that ensure longevity and reliable operation.",
    icon: <Factory className="h-6 w-6 text-primary" />,
  },
  {
    title: "Award-Winning Design",
    description: "Recognized for innovation in industrial design, combining ergonomics, safety, and efficiency in a user-friendly package.",
    icon: <Award className="h-6 w-6 text-primary" />,
  },
  {
    title: "Easy Maintenance",
    description: "Modular construction with accessible components reduces maintenance time and costs, minimizing downtime.",
    icon: <Wrench className="h-6 w-6 text-primary" />,
  },
  {
    title: "Real-Time Analytics",
    description: "Integrated monitoring systems provide actionable insights into operational efficiency, material usage, and maintenance needs.",
    icon: <BarChart className="h-6 w-6 text-primary" />,
  },
];


export default function AboutPage() {
  return (
    <MainLayout>
      {/* Header Section */}
      <section className="bg-black py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Automated Packaging Solutions
            </span>
            <h1 className="heading-xl text-white mb-6">
              About TP@CK
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Revolutionary packaging automation that transforms efficiency, reduces waste, and scales with your business
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="heading-lg mb-6">Revolutionizing Industrial Packaging</h2>
              <p className="text-gray-600 mb-4">
                TP@CK represents a paradigm shift in packaging automation, combining cutting-edge technology with
                sustainable practices to deliver solutions that meet the demands of modern businesses across industries.
              </p>
              <p className="text-gray-600 mb-6">
                Developed by Tecnimodern, a leader in industrial automation with over 25 years of expertise, our
                TP@CK line of machines delivers unparalleled efficiency, flexibility, and reliability while
                reducing environmental impact and operational costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    View Our Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg order-1 lg:order-2">
              <Image
                src="/images/tpack-machine.svg"
                alt="TP@CK Machine"
                fill
                className="object-contain p-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Machine Lineup Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">The TP@CK Machine Lineup</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our comprehensive range of packaging machines caters to businesses of all sizes, from small operations to enterprise-scale manufacturers.
            </p>
          </div>

          <Tabs defaultValue="t20" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="t20">T20</TabsTrigger>
              <TabsTrigger value="t30">T30</TabsTrigger>
              <TabsTrigger value="t50">T50</TabsTrigger>
            </TabsList>

            {tpackMachines.map((machine) => (
              <TabsContent key={machine.id} value={machine.id} className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-sm">
                  <div className="relative h-[300px] lg:h-auto rounded-xl overflow-hidden">
                    <Image
                      src={machine.image}
                      alt={`TP@CK ${machine.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="heading-md text-primary mb-3">TP@CK {machine.name}</h3>
                    <p className="text-gray-600 mb-4">{machine.description}</p>

                    <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2 mb-6">
                      {machine.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={machine.href}>
                      <Button className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto">
                        Full Specifications <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* TP@CK Advantages Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">The TP@CK Advantage</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our machines offer significant benefits over conventional packaging systems, driving efficiency,
              sustainability, and operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className="bg-gray-50 p-8 rounded-xl shadow-sm"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Video Section */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-6">See TP@CK in Action</h2>
            <p className="text-gray-300 mb-8">
              Watch our machines transform packaging operations with their revolutionary approach to efficiency,
              automation, and sustainability.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video flex items-center justify-center p-8">
              <div className="text-center">
                <p className="text-lg mb-4">Video placeholder - Actual video content would be embedded here</p>
                <p className="text-gray-400 text-sm">Feature demonstration of TP@CK machines in operation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Transform Your Packaging Operation?</h2>
            <p className="text-white/90 mb-8">
              Contact our team today to discuss how TP@CK can optimize your processes, reduce costs, and improve sustainability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-white/90 px-6">
                  Request a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 px-6">
                  Explore Our Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
