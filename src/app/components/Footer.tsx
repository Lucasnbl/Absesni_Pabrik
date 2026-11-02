import { ArrowUp, Mail } from "lucide-react";

const BrandLogo = ({ brand }: { brand: "github" | "linkedin" | "instagram" | "x" }) => {
  if (brand === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
        <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.08c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.28-5.13-5.58 0-1.23.43-2.23 1.15-3.02-.12-.29-.5-1.43.11-2.98 0 0 .94-.3 3.1 1.15a10.78 10.78 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.69.11 2.98.72.79 1.15 1.79 1.15 3.02 0 4.31-2.63 5.28-5.14 5.57.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
      </svg>
    );
  }

  if (brand === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
        <path d="M5.16 3.2a2.1 2.1 0 1 1-.02 4.2 2.1 2.1 0 0 1 .02-4.2ZM3.35 8.9h3.62v11.7H3.35V8.9Zm5.88 0h3.47v1.6h.05a3.8 3.8 0 0 1 3.42-1.88c3.66 0 4.34 2.4 4.34 5.52v6.46h-3.62v-5.73c0-1.37-.02-3.13-1.91-3.13-1.92 0-2.22 1.5-2.22 3.03v5.83H9.23V8.9Z" />
      </svg>
    );
  }

  if (brand === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[19px] w-[19px] fill-none stroke-current" strokeWidth="2.2">
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.2" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.7" cy="6.5" r="1" className="fill-current stroke-none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[17px] w-[17px] fill-current">
      <path d="M18.9 1.5h3.68l-8.04 9.19L24 22.5h-7.4l-5.8-7.58L4.16 22.5H.48l8.6-9.83L0 1.5h7.6l5.24 6.93L18.9 1.5Zm-1.29 19h2.04L6.49 3.39H4.3L17.61 20.5Z" />
    </svg>
  );
};

const socialLinks = [
  { icon: <BrandLogo brand="github" />, href: "https://github.com/lucasnbll", label: "GitHub", tile: "bg-gradient-to-br from-[#24292F] to-[#49515A] hover:shadow-[#24292F]/35" },
  { icon: <BrandLogo brand="linkedin" />, href: "https://www.linkedin.com", label: "LinkedIn", tile: "bg-gradient-to-br from-[#0A66C2] to-[#2E9BFF] hover:shadow-[#0A66C2]/40" },
  { icon: <Mail size={18} strokeWidth={2.5} />, href: "mailto:lucasnbl111@gmail.com", label: "Email", tile: "bg-gradient-to-br from-[#EA4335] to-[#F97316] hover:shadow-[#EA4335]/40" },
  { icon: <BrandLogo brand="instagram" />, href: "https://www.instagram.com/lucasnbll?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram", tile: "bg-gradient-to-br from-[#FEDA75] via-[#D62976] to-[#4F5BD5] hover:shadow-[#D62976]/40" },
  { icon: <BrandLogo brand="x" />, href: "https://x.com", label: "X", tile: "bg-gradient-to-br from-[#111827] to-[#374151] hover:shadow-[#111827]/35" },
];

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const isDark = theme === "dark";
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="border-t relative overflow-hidden"
      style={{ background: isDark ? "#060A14" : "#F9FAFC", borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.08)" }}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/60 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#F97316] flex items-center justify-center flex-shrink-0">
                <span
                  className="text-white text-xs"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                >
                  SI
                </span>
              </div>
              <span
                className="text-sm"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  color: isDark ? "rgba(255,255,255,0.8)" : "#0f172a",
                }}
              >
                Lucas Vincent<span className="hidden sm:inline"> Kurniawan</span><span className="text-[#F97316]">.</span>
              </span>
            </div>
            <p
              className="text-xs"
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.7,
                color: isDark ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.65)",
              }}
            >
              Mahasiswa Sistem Informasi yang passionate membangun solusi digital inovatif dan berdampak.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-3 sm:gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="transition-colors text-xs sm:text-sm cursor-pointer"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: isDark ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.7)",
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-white/20 text-white flex items-center justify-center shadow-[0_6px_18px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:rotate-2 hover:scale-110 hover:shadow-xl active:scale-95 ${s.tile}`}
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p
            className="text-xs"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: isDark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.6)",
            }}
          >
            © 2025 Lucas Vincent Kurniawan Obedius Nobel. Built with React + Tailwind CSS.
          </p>

          <div className="flex items-center gap-4">
            <span
              className="text-xs"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: isDark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.6)",
              }}
            >
              Designed & Developed with ❤️
            </span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(148,163,184,0.25)",
                color: isDark ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.7)",
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
