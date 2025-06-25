"use client";


import { Button } from "@/components/ui/button";
import { FileText, Github, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Research", href: "/#research" },
    { name: "Timeline", href: "/#timeline" },
    { name: "Team", href: "/#team" },
    { name: "Market", href: "/#target-audience" },
    { name: "Partners", href: "/#sponsors" },
    // { name: "Contribute", href: "/#contribute" },
  ];

  // const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  //   e.preventDefault();
  //   const element = document.querySelector(href);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  //   setIsMobileMenuOpen(false);
  // };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100" : "bg-white shadow-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  MicroMarc
                </span>{" "}
                Research
              </h1>
              </div>
          </div>
          </Link>

          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-200 hover:scale-105"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link href="/thesis">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Thesis Paper
            </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100">
          <div className="px-6 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                <FileText className="h-4 w-4 mr-2" />
                Thesis Paper
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
