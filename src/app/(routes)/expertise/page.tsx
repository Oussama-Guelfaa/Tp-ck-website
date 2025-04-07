import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, TrendingUp, Search, BookOpen, LineChart, UsersRound } from "lucide-react";

const marketResearchAreas = [
  {
    title: "Competitive Analysis",
    description: "In-depth evaluation of the packaging automation landscape, analyzing competitors' offerings, market positioning, and strategic opportunities.",
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
  },
  {
    title: "Market Trends",
    description: "Continuous monitoring of packaging industry trends, technological innovations, and shifting customer preferences to stay ahead of the curve.",
    icon: <LineChart className="h-6 w-6 text-primary" />,
  },
  {
    title: "International Opportunities",
    description: "Detailed studies of global markets, regulatory environments, and regional packaging needs to identify expansion opportunities.",
    icon: <Globe className="h-6 w-6 text-primary" />,
  },
  {
    title: "Customer Research",
    description: "Direct engagement with businesses across industries to understand packaging challenges, requirements, and potential solutions.",
    icon: <UsersRound className="h-6 w-6 text-primary" />,
  },
  {
    title: "Industry Reports",
    description: "Comprehensive reports on packaging automation trends, sustainability initiatives, and technology adoption across various sectors.",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: "Solution Validation",
    description: "Testing and validation of packaging solutions against real-world scenarios to ensure optimal performance and customer satisfaction.",
    icon: <Search className="h-6 w-6 text-primary" />,
  },
];

export default function ExpertisePage() {
  return (
    <MainLayout>
      {/* Header Section */}
      <section className="bg-black py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Our Research & Insights
            </span>
            <h1 className="heading-xl text-white mb-6">
              Expertise & Market Research
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Powering innovation through comprehensive industry analysis and market insights
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Our Research Methodology</h2>
              <p className="text-gray-600 mb-6">
                At TP@CK, we believe that exceptional packaging solutions start with deep market understanding.
                Our dedicated research team continuously analyzes industry trends, customer needs, and technological
                advancements to inform our product development and business strategy.
              </p>
              <p className="text-gray-600 mb-6">
                Through a combination of quantitative analysis, qualitative research, and direct customer
                engagement, we develop insights that drive innovation across our product portfolio, ensuring
                we deliver solutions that truly address the evolving needs of diverse industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Request Custom Research <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/hero-background.jpg"
                alt="Market Research"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">Data-Driven Solutions</h3>
                  <p>Our research directly influences product development, ensuring solutions that truly meet customer needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Our Research Areas</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We conduct comprehensive research across multiple dimensions to develop a holistic understanding
              of the packaging automation landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketResearchAreas.map((area) => (
              <div
                key={area.title}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Learn How We Can Optimize Your Packaging Process</h2>
            <p className="text-gray-300 mb-8">
              Our experts can analyze your specific requirements and recommend
              the perfect TP@CK solution for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6">
                  Request a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 px-6">
                  Learn About TP@CK
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
