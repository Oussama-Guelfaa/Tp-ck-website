"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import { useTranslation } from "@/components/ui/language-selector";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/ui/language-selector";

interface MenuItem {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    { name: t("nav.home", "Home"), href: "/" },
    {
      name: t("nav.products", "Products"),
      href: "/products",
      children: [
        { name: "T20", href: "/products/t20" },
        { name: "T30", href: "/products/t30" },
        { name: "T50", href: "/products/t50" },
      ],
    },
    { name: t("nav.news", "News"), href: "/news" },
    { name: t("nav.expertise", "Expertise"), href: "/expertise" },
    { name: t("nav.about", "About"), href: "/about" },
    { name: t("nav.contact", "Contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isScrolled
          ? "bg-white shadow-md dark:bg-gray-900"
          : "bg-white/80 backdrop-blur-md dark:bg-gray-900/80"
      } transition-all duration-300`}
    >
      <div className="container-custom mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-9 w-40">
                <Image
                  src="/images/tpack-logo.svg"
                  alt="TP@CK Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-1 lg:space-x-2">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.children ? (
                  <button
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors dark:text-gray-200 dark:hover:bg-gray-800"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {item.name}
                  </Link>
                )}

                {item.children && (
                  <div
                    className={`${
                      activeDropdown === item.name
                        ? "block"
                        : "hidden group-hover:hidden"
                    } absolute left-0 mt-1 w-48 rounded-md bg-white py-2 shadow-lg dark:bg-gray-800`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: Language selector, login button, mobile menu */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />

            <Link href="/admin/login">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center space-x-1 text-sm"
              >
                <Shield className="h-4 w-4" />
                <span>{t("header.login", "Login")}</span>
              </Button>
            </Link>

            {/* Mobile Navigation (Sheet) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] max-w-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="relative h-8 w-32">
                      <Image
                        src="/images/tpack-logo.svg"
                        alt="TP@CK Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        aria-label="Close Menu"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>

                  <nav className="flex-1 pt-4 pb-8">
                    <ul className="space-y-2">
                      {menuItems.map((item) => (
                        <li key={item.name}>
                          {item.children ? (
                            <div>
                              <button
                                className="flex w-full items-center justify-between py-2 text-base font-medium text-gray-700 hover:text-primary dark:text-gray-200"
                                onClick={() => toggleDropdown(item.name)}
                              >
                                {item.name}
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${
                                    activeDropdown === item.name
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>
                              {activeDropdown === item.name && (
                                <ul className="ml-4 mt-2 space-y-2 border-l border-gray-200 pl-4 dark:border-gray-700">
                                  {item.children.map((child) => (
                                    <li key={child.name}>
                                      <Link
                                        href={child.href}
                                        className="block py-2 text-sm text-gray-600 hover:text-primary dark:text-gray-300"
                                      >
                                        {child.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className="block py-2 text-base font-medium text-gray-700 hover:text-primary dark:text-gray-200"
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="border-t pt-4">
                    <Link href="/admin/login">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        <Shield className="h-4 w-4 mr-2" />
                        {t("header.admin", "Admin")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
