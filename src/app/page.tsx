import { LoadingScreen } from "@/components/ui/loading-screen";
import { MainLayout } from "@/components/layout/MainLayout";
import { EcoHeroSection } from "@/components/home/EcoHeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { DifferentiatorsCarousel } from "@/components/home/DifferentiatorsCarousel";
import { ScrollVideoSection } from "@/components/home/ScrollVideoSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { DashboardSection } from "@/components/dashboard/DashboardSection";

// Updated page to render homepage content
export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <MainLayout>
        <EcoHeroSection />
        <DifferentiatorsCarousel />
        <ScrollVideoSection />
        <DashboardSection />
        <ProductsSection />
        <TestimonialsSection />
        <CtaSection />
      </MainLayout>
    </>
  );
}
