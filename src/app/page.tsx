import { LoadingScreen } from "@/components/ui/loading-screen";
import { MainLayout } from "@/components/layout/MainLayout";
import { EcoHeroSection } from "@/components/home/EcoHeroSection";
import { StoryTimeline } from "@/components/home/StoryTimeline";
import { SocialMediaSection } from "@/components/home/SocialMediaSection";
import { DifferentiatorsCarousel } from "@/components/home/DifferentiatorsCarousel";
import { ModernScrollSection } from "@/components/home/ModernScrollSection";
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
        <StoryTimeline />
        <DifferentiatorsCarousel />
        <ModernScrollSection />
        <DashboardSection />
        <ProductsSection />
        <TestimonialsSection />
        <SocialMediaSection />
        <CtaSection />
      </MainLayout>
    </>
  );
}
