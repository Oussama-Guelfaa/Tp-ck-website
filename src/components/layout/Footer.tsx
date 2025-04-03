"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/components/ui/language-selector";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t("nav.products", "Products"),
      links: [
        { name: "T20", href: "/products/t20" },
        { name: "T30", href: "/products/t30" },
        { name: "T50", href: "/products/t50" },
        { name: "Custom Solutions", href: "/products" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: t("nav.about", "About"), href: "/about" },
        { name: t("nav.expertise", "Expertise"), href: "/expertise" },
        { name: "Market Research", href: "/expertise#market-research" },
        { name: "Certifications", href: "/about#certifications" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Case Studies", href: "/expertise#case-studies" },
        { name: "Technical Documentation", href: "/resources/documentation" },
        { name: "FAQ", href: "/resources/faq" },
        { name: "Blog", href: "/resources/blog" },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-6">
            <Link href="/">
              <Image
                src="/images/tpack-logo-white.svg"
                alt="TP@CK Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Pioneering the future of packaging technology with AI integration and sustainable solutions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/tpack-fr/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@Tecnimodern"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </Link>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-semibold text-lg mb-4">{t("nav.contact", "Contact")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Manufacturing Street,
                  <br /> Industrial Zone XYZ,
                  <br /> 75001 Paris, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-400 text-sm">+33 (0)1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:info@tpack-solutions.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  info@tpack-solutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            {t("footer.copyright", `© ${currentYear} TP@CK by Tecnimodern. All rights reserved.`)}
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t("footer.links.privacy", "Privacy Policy")}
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t("footer.links.terms", "Terms of Service")}
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t("footer.links.contact", "Contact Us")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
