import React from 'react';
import { Briefcase, GraduationCap, Award, Building2 } from "lucide-react";

type ExperienceType = "work" | "education" | "award" | "org";

interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  org: string;
  period: string;
  location?: string;
  desc: string;
  tags?: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    id: "e1",
    type: "education",
    title: "S1 Sistem Informasi",
    org: "Universitas Ma Chung",
    period: "2024 — Present",
    location: "Indonesia",
    desc: "Fokus pada pengembangan sistem berbasis web, analisis data bisnis, dan manajemen proyek teknologi. Aktif sebagai anggota dan pengurus organisasi kemahasiswaan.",
    tags: ["GPA 3.57", "BPM FTD", "Scholarship"],
    color: "#1E3A8A",
  },
  {
    id: "e2",
     type: "work",
    title: "Admin Leader Kota (LevelUp)",
    org: "LevelUp PPHTGD Indonesia",
    period: "2022 - now",
    location: "Kediri - Malang",
    desc: " Sebagai Admin Leaders Kota (ALK) di LevelUP PPHTGD, saya bertanggung jawab atas manajemen administratif dan koordinasi strategis antar pemimpin jaringan di tingkat kota. Fokus utama saya mencakup tata kelola database keanggotaan, memastikan kelancaran operasional program pergerakan skala kota, serta menjadi jembatan komunikasi antara pengurus pusat dan tim lokal agar visi komunitas dapat tereksekusi dengan terstruktur dan efektif..",
    tags: ["Node.js", "MySQL", "REST API", "3 months"],
    color: "#1E3A8A",
  },
  {
    id: "e3",
    type: "org",
    title: "Badan Pengurus Harian (BPH) BPMFTD",
    org: "Badan Perwakilan Mahasiswa Fakultas Teknik dan Desain",
    period: "2024 — 2027",
    location: "Universitas Ma Chung",
    desc: "Sebagai Bendahara di Badan Perwakilan Mahasiswa Fakultas Teknik dan Desain (BPM FTD), saya bertanggung jawab atas tata kelola dan regulasi keuangan dalam ruang lingkup organisasi legislatif. Fokus utama saya mencakup perumusan kebijakan anggaran, pengawasan alokasi dana kemahasiswaan, serta memastikan transparansi dan akuntabilitas finansial di lingkungan fakultas",
    tags: ["Leadership", "Team of 28", "Financial Management"],
    color: "#F97316",
  },
  {
    id: "e4",
    type: "work",
    title: "Digital Transformation Lead & Full-Stack Developer",
    org: "Toko Bangunan Graha Genusa",
    period: "2024 - now",
    location: "Kediri Wates",
    desc: "Memimpin transformasi digital toko bahan bangunan konvensional. Mengembangkan sistem kasir (POS) berbasis web yang terintegrasi dengan pembayaran QRIS dan manajemen inventaris FEFO. Serta mengeksekusi ekspansi pasar omnichannel melalui platform e-commerce Shopee.",
    tags: ["POS System", "E-commerce", "Full-Stack"],
    color: "#8B5CF6",
  },
  {
    id: "e5",
    type: "award",
    title: "Juara 2 — Hackathon Nasional",
    org: "TechFest University 2023",
    period: "Oktober 2023",
    desc: "Memenangkan posisi runner-up dari 80+ tim se-Indonesia dalam kompetisi pengembangan solusi digital untuk UMKM. Membangun MVP dalam 24 jam.",
    tags: ["Hackathon", "80+ Teams", "24 Hours"],
    color: "#F59E0B",
  },
  {
    id: "e6",
    type: "education",
    title: "Siswa Jurusan MIPA/IPS", 
    org: "SMAK St. Augustinus Kediri",
    period: "Jul 2021 - Mei 2024", 
    location: "Kediri",
    desc: "Menyelesaikan pendidikan di salah satu institusi menengah atas terbaik dan berprestasi di Kediri. Membangun fondasi yang kuat dalam kedisiplinan, manajemen waktu, dan pemikiran analitis yang kini mendukung studi lanjutan di bidang Sistem Informasi.",
    tags: ["Analytical Thinking", "Discipline", "High School Diploma"],
    color: "#EF4444" 
  },
];

const typeConfig: Record<ExperienceType, { icon: React.JSX.Element; label: string }> = {
  work: { icon: <Briefcase size={14} />, label: "Work" },
  education: { icon: <GraduationCap size={14} />, label: "Education" },
  award: { icon: <Award size={14} />, label: "Achievement" },
  org: { icon: <Building2 size={14} />, label: "Organization" },
};

export function ExperienceSection({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const isDark = theme === "dark";
  return (
    <section
      id="experience"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: isDark ? "#080D1A" : "#F9FAFC" }}
    >
      <div className={`absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#1E3A8A]/5 blur-3xl ${isDark ? "" : "hidden"}`} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#F97316]" />
            <span
              className="text-[#F97316] text-xs sm:text-sm uppercase tracking-widest"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Experience
            </span>
          </div>
          <h2
            className=""
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: isDark ? "#ffffff" : "#0f172a",
            }}
          >
            Perjalanan &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B7FE8] to-[#F97316]">
              Pencapaian
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#1E3A8A]/60 ${isDark ? "via-white/10" : "via-slate-200"} to-transparent`} />

          <div className="space-y-4 sm:space-y-5">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const config = typeConfig[exp.type];

              return (
                <div
                  key={exp.id}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Mobile/Desktop: Content card */}
                  <div
                    className={`ml-10 md:ml-0 w-full md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-10" : "md:pl-10"
                    }`}
                  >
                    <div
                      className="group relative rounded-2xl border p-4 sm:p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.14)]"
                      style={{
                        borderLeft: `2px solid ${exp.color}40`,
                        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(148,163,184,0.18)",
                        background: isDark ? "#0D1124" : "rgba(255,255,255,0.9)",
                      }}
                    >
                      {/* Hover glow left border */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl transition-all duration-300 group-hover:opacity-100 opacity-50"
                        style={{ background: exp.color }}
                      />

                      {/* Type badge */}
                      <div className="flex items-start sm:items-center justify-between mb-3 gap-2">
                        <div
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs whitespace-nowrap"
                          style={{
                            background: `${exp.color}15`,
                            color: exp.color,
                            border: `1px solid ${exp.color}30`,
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {config.icon}
                          {config.label}
                        </div>
                        <span
                          className="text-xs whitespace-nowrap"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: isDark ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.55)",
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className="mb-1 text-sm sm:text-base"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          color: isDark ? "#ffffff" : "#0f172a",
                        }}
                      >
                        {exp.title}
                      </h3>
                      <p
                        className="mb-2 text-xs sm:text-sm"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: exp.color,
                          fontWeight: 500,
                        }}
                      >
                        {exp.org}
                        {exp.location && (
                          <span className={`${isDark ? "text-white/30" : "text-slate-500"} font-normal ml-2`}>
                            · {exp.location}
                          </span>
                        )}
                      </p>

                      {/* Description */}
                      <p
                        className="text-xs sm:text-sm mb-3"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          lineHeight: 1.65,
                          color: isDark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.7)",
                        }}
                      >
                        {exp.desc}
                      </p>

                      {/* Tags */}
                      {exp.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2 py-0.5 rounded-md text-xs ${isDark ? "bg-white/4 border border-white/6 text-white/35" : "bg-slate-100 border border-slate-200 text-slate-600"}`}
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center dot - Desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 z-10 ${isDark ? "border-[#0A0F1E]" : "border-[#F9FAFC]"}`}
                      style={{ background: exp.color }}
                    />
                  </div>

                  {/* Left dot - Mobile */}
                  <div
                    className="md:hidden absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full mt-6 z-10"
                    style={{ background: exp.color }}
                  />

                  {/* Spacer for right side on desktop */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
