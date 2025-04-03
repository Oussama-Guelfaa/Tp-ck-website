import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { TargetMarketsSection } from "@/components/home/TargetMarketsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { DashboardSection } from "@/components/dashboard/DashboardSection";

// Updated page to render homepage content
export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <DashboardSection />
      <FeaturesSection />
      <ProductsSection />
      <TargetMarketsSection />
      <TestimonialsSection />
      <CtaSection />
    </MainLayout>
  );
}
