import { useEffect, useState } from "react";
import { ArrowDown, Download } from "lucide-react";
import type { ThemeMode } from "../App";

const ROLES = [
  "Information System",
  "Data Analyst",
  "Student Legislative Council",
  "Student Representative Council",
];

export function HeroSection({ theme = "dark" }: { theme?: ThemeMode }) {
  const isDark = theme === "dark";
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIdx((current) => (current + 1) % ROLES.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: isDark ? "#0A0F1E" : "#F9FAFC" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-[#1E3A8A]/20" : "hidden"}`} />
        <div className={`absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl ${isDark ? "bg-[#F97316]/10" : "hidden"}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${isDark ? "bg-[#1E3A8A]/5" : "hidden"}`} />

        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 ${isDark ? "opacity-[0.03]" : "hidden"}`}
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${isDark ? "" : "hidden"}`}
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              background: i % 2 === 0 ? "#1E3A8A" : "#F97316",
              opacity: 0.3 + (i * 0.05),
              top: `${15 + i * 12}%`,
              left: `${10 + i * 14}%`,
              animation: `float ${3 + i}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-20 grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        {/* Left: Text */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#1E3A8A]/20 border border-[#1E3A8A]/40 mb-6 sm:mb-8 animate-float-slow">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            <span
              className="text-sm sm:text-base"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: isDark ? "#93B4FF" : "#1e3a8a",
              }}
            >
              Open for Internship & Collaboration
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="mb-4 sm:mb-6 opacity-0 animate-fade-in-up"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: isDark ? "#ffffff" : "#0f172a",
              animationDelay: "80ms",
            }}
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent inline-block cursor-default transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:drop-shadow-[0_8px_12px_rgba(37,99,235,0.28)]">
              Lucas Vincent Kurniawan
            </span>
            <br />
            <span style={{ color: isDark ? "#ffffff" : "#0f172a" }}>Obedius Nobel</span>
            <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
              ✨ Test Update
            </span>
          </h1>

          {/* Typewriter Role */}
          <div
            className="flex items-center gap-2 mb-6 sm:mb-8 opacity-0 animate-fade-in-up"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
              color: isDark ? "rgba(255,255,255,0.8)" : "rgba(15, 23, 42, 0.75)",
              animationDelay: "180ms",
            }}
          >
            <span className="inline-flex min-w-0 max-w-full items-center overflow-hidden">
              <span
                key={roleIdx}
                className="typewriter-text inline-block overflow-hidden whitespace-nowrap"
                style={{ "--typewriter-steps": ROLES[roleIdx].length } as React.CSSProperties}
              >
                {ROLES[roleIdx]}
              </span>
              <span aria-hidden="true" className="typewriter-caret ml-0.5 h-[1.25em] w-0.5 flex-shrink-0 bg-[#F97316]" />
            </span>
          </div>

          {/* Description */}
          <p
            className={`mb-8 sm:mb-10 max-w-xl opacity-0 animate-fade-in-up ${isDark ? "text-white/60" : "text-slate-600"}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
              lineHeight: 1.8,
              animationDelay: "280ms",
            }}
          >
            Mahasiswa Sistem Informasi yang passionate dalam membangun solusi
            digital end-to-end — dari code yang clean hingga insight data yang
            actionable, dan brand identity yang berkesan.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 sm:mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="shine-button group relative overflow-hidden flex items-center justify-center sm:justify-start gap-2 px-8 py-4 rounded-xl bg-[#1E3A8A] text-white hover:bg-[#2547B0] transition-transform transition-shadow transition-colors duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer text-base sm:text-lg"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                View Projects
                <ArrowDown size={18} className="rotate-[-90deg]" />
              </span>
            </button>
            <button
              className={`flex items-center justify-center sm:justify-start gap-2 px-8 py-4 rounded-xl border border-[#1E3A8A]/20 transition-all duration-300 cursor-pointer text-base sm:text-lg active:scale-[0.98] hover:-translate-y-1 ${isDark ? "bg-white/5 text-white/80 hover:text-white hover:bg-white/10" : "bg-white/80 text-slate-700 hover:text-slate-950 hover:border-[#1E3A8A]/40 hover:bg-white"}`}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              <Download size={18} />
              Download CV
            </button>
          </div>

        </div>

        {/* Right: Glassmorphism Card / Visual */}
        <div className="flex justify-center lg:justify-end mt-10 lg:mt-0">
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Main Glass Card */}
            <div
              className={isDark
                ? "relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 overflow-hidden backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:rotate-1 hover:scale-[1.02] hover:-translate-y-2 opacity-0 animate-fade-in-up"
                : "relative bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-transform duration-500 hover:rotate-1 hover:scale-[1.02] hover:-translate-y-2 opacity-0 animate-fade-in-up"}
              style={{ animationDelay: "220ms" }}
            >
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/60 to-transparent" />

              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-7">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#2547B0] flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-white text-xl"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                  >
                    YN
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="text-lg"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      color: isDark ? "#ffffff" : "#0f172a",
                    }}
                  >
                    Lucas Vincent Kurniawan
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: isDark ? "rgba(255,255,255,0.4)" : "rgba(15, 23, 42, 0.65)",
                    }}
                  >
                    Information Systems Student
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className={`${isDark ? "text-emerald-400" : "text-emerald-700"} text-xs`} style={{ fontFamily: "'Inter', sans-serif" }}>
                    Available
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-7">
                {[
                  { label: "Projects", value: "15+" },
                  { label: "Tech Stack", value: "12+" },
                  { label: "GPA", value: "3.8" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3 sm:p-4 text-center shadow-[0_3px_12px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(15,23,42,0.12)]"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
                      border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(148,163,184,0.18)",
                    }}
                  >
                    <p
                      className="text-lg sm:text-xl"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        color: isDark ? "#ffffff" : "#0f172a",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-xs sm:text-sm"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        marginTop: "4px",
                        color: isDark ? "rgba(255,255,255,0.4)" : "rgba(15, 23, 42, 0.6)",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills Preview */}
              <div className="space-y-4">
                {[
                  { skill: "Full-Stack Dev", pct: 85, color: "#1E3A8A" },
                  { skill: "Data Analytics", pct: 80, color: "#F97316" },
                  { skill: "Brand Design", pct: 72, color: "#8B5CF6" },
                ].map((item) => (
                  <div key={item.skill}>
                    <div className="flex justify-between mb-2">
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          color: isDark ? "rgba(255,255,255,0.7)" : "#334155",
                        }}
                      >
                        {item.skill}
                      </span>
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: isDark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.7)",
                        }}
                      >
                        {item.pct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0" }}>
                      <div
                        className="skill-progress-fill h-full rounded-full"
                        style={{
                          "--progress-target": `${item.pct}%`,
                          background: `linear-gradient(90deg, ${item.color}80, ${item.color})`,
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom decorative */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-3 -right-3 px-4 py-2 rounded-lg bg-[#F97316] text-white text-sm shadow-lg shadow-[#F97316]/30 animate-float-slow"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              🎓 2025
            </div>

            {/* Floating Tag */}
            <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-lg bg-[#1E3A8A] border border-[#1E3A8A]/60 text-white text-xs shadow-lg shadow-[#1E3A8A]/30"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              💻 React · Node.js · MySQL
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors cursor-pointer ${isDark ? "text-white/30 hover:text-white/60" : "text-slate-500 hover:text-slate-800"}`}
      >
        <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Scroll</span>
        <ArrowDown size={18} className="animate-bounce" />
      </button>

    </section>
  );
}
