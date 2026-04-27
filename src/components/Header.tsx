"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            aria-label={`${COMPANY_INFO.nameKo} 홈으로 이동`}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent text-white font-bold text-lg leading-none select-none">
              DS
            </div>
            <span className="text-white font-semibold text-lg tracking-tight hidden sm:block">
              디에스
              <span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="주요 메뉴" className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="ml-2 px-5 py-2 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-colors duration-200"
            >
              데모 요청
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/10">
          <nav
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
            aria-label="모바일 메뉴"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className="text-left px-3 py-3 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="mt-2 px-3 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-colors text-left"
            >
              데모 요청하기
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
