import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { MachineProvider } from "@/lib/MachineContext";
import { AuthProvider } from "@/lib/AuthContext";
import { TranslationProvider } from "@/components/ui/language-selector";

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TP@CK | Innovative Packaging Solutions by Tecnimodern",
  description: "TP@CK offers revolutionary packaging solutions with advanced technology integration, environmental certifications, and operational advantages for modern businesses.",
  keywords: ["packaging solution", "T20", "T30", "T50", "WMS integration", "sustainability", "Tecnimodern", "TP@CK"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          <MachineProvider>
            <TranslationProvider>
              {children}
            </TranslationProvider>
          </MachineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
