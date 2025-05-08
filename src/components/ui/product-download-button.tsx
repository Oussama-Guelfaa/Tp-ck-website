"use client";

import { AnimatedDownloadButton } from "@/components/ui/animated-download-button";
import { downloadProductSpecsPDF } from "@/utils/pdfGenerator";
import { useTranslation } from "@/components/ui/language-selector";
import { Language } from "@/i18n";

interface ProductDownloadButtonProps {
  productName: string;
  technicalSpecs: Array<{ name: string; value: string }>;
  integrationCapabilities: Array<{ name: string; value: string }>;
  certifications: Array<{ name: string; value: string }>;
}

export function ProductDownloadButton({
  productName,
  technicalSpecs,
  integrationCapabilities,
  certifications,
}: ProductDownloadButtonProps) {
  const { language } = useTranslation();

  const handleDownload = () => {
    downloadProductSpecsPDF(
      productName,
      { technicalSpecs, integrationCapabilities, certifications },
      language as Language
    );
  };

  return <AnimatedDownloadButton onClick={handleDownload} />;
}
