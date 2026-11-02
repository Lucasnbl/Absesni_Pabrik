import { useState, useEffect } from "react";
import { Menu, X, SunMedium, MoonStar } from "lucide-react";
import type { ThemeMode } from "../App";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: ThemeMode;
  onToggleTheme: () => void;
}) {
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "projects", "experience", "contact"];
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 72;
      const activationLine = Math.min(window.innerHeight * 0.5, window.innerHeight - headerHeight);
      let currentSection = sections[0];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= activationLine) currentSection = id;
        else break;
      }

      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? isDark
            ? "py-3 bg-black/50 border-white/10 shadow-lg shadow-black/20"
            : "py-3 bg-white/80 border-slate-100/50 shadow-lg shadow-slate-200/40"
          : isDark
            ? "py-3 sm:py-5 bg-black/40 border-white/10"
            : "py-3 sm:py-5 bg-white/70 border-slate-100/50"
      }`}
    >
      <nav className="relative max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#hero")}
          className="flex items-center gap-2 group cursor-pointer flex-shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#F97316] flex items-center justify-center">
            <span className="text-white text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              SI
            </span>
          </div>
          <span
            className={`group-hover:opacity-100 transition-colors hidden sm:inline ${isDark ? "text-white/90 group-hover:text-white" : "text-slate-800 group-hover:text-slate-900"}`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)" }}
          >
            Portfolio<span className="text-[#F97316]">.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1 ml-4 lg:absolute lg:left-1/2 lg:top-1/2 lg:ml-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`relative px-3 lg:px-4 py-2 rounded-lg text-xs sm:text-sm transition-all duration-200 cursor-pointer will-change-transform ${
                    isActive
                      ? isDark ? "text-white" : "text-slate-900"
                      : isDark ? "text-white/50 hover:text-white/80" : "text-slate-600 hover:text-slate-900"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: isActive ? 500 : 400 }}
                >
                  {isActive && (
                    <span className={`absolute inset-0 rounded-lg border ${isDark ? "bg-white/8 border-white/10" : "bg-slate-100 border-slate-200"}`} />
                  )}
                  <span className="relative">{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F97316]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 active:scale-95 hover:border-[#1E3A8A]/60 ${isDark ? "border-white/10 bg-white/5 text-white/80 hover:text-white" : "border-slate-300 bg-white/80 text-slate-700 hover:text-slate-950"}`}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>

          <div className="animated-gradient-border">
            <span aria-hidden="true" className="animated-gradient-border__spin" />
            <button
              onClick={() => handleNav("#contact")}
              className="relative z-10 flex items-center gap-2 rounded-[calc(0.5rem-2px)] bg-[#F97316] px-5 py-2 text-sm text-white transition-all duration-300 hover:bg-[#ea6c0a] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Hire Me
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 active:scale-95 ${isDark ? "border-white/10 bg-white/5 text-white/80" : "border-slate-300 bg-white/80 text-slate-700"}`}
          >
            {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
          </button>
          <button
            className={`${isDark ? "text-white/70 hover:text-white" : "text-slate-600 hover:text-slate-950"} transition-colors cursor-pointer`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden backdrop-blur-xl border-t px-4 sm:px-6 py-4 ${isDark ? "bg-[#0A0F1E]/95 border-white/5" : "bg-white/95 border-slate-200"}`}>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm cursor-pointer ${isDark ? "text-white/70 hover:text-white hover:bg-white/5" : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className={`mt-3 pt-3 border-t ${isDark ? "border-white/5" : "border-slate-200"}`}>
              <div className="animated-gradient-border w-full">
                <span aria-hidden="true" className="animated-gradient-border__spin" />
                <button
                  onClick={() => handleNav("#contact")}
                  className="relative z-10 w-full rounded-[calc(0.5rem-2px)] bg-[#F97316] px-4 py-3 text-sm text-white cursor-pointer transition-all duration-300 hover:bg-[#ea6c0a] hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                >
                  Hire Me
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
