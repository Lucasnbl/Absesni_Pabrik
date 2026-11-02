import {
  Code2,
  Database,
  Palette,
  Users,
  Globe,
  BarChart2,
  Layers,
  Terminal,
  Figma,
  GitBranch,
  FileSpreadsheet,
  Cpu,
} from "lucide-react";

const techStack = [
  { name: "JavaScript", icon: <Terminal size={14} />, color: "#F7DF1E" },
  { name: "TypeScript", icon: <Code2 size={14} />, color: "#3178C6" },
  { name: "React", icon: <Layers size={14} />, color: "#61DAFB" },
  { name: "Node.js", icon: <Cpu size={14} />, color: "#339933" },
  { name: "MySQL", icon: <Database size={14} />, color: "#4479A1" },
  { name: "Express.js", icon: <Globe size={14} />, color: "#000000" },
  { name: "Python", icon: <Terminal size={14} />, color: "#3776AB" },
  { name: "Tableau", icon: <BarChart2 size={14} />, color: "#E97627" },
  { name: "Figma", icon: <Figma size={14} />, color: "#F24E1E" },
  { name: "Git", icon: <GitBranch size={14} />, color: "#F05032" },
  { name: "Excel/Sheets", icon: <FileSpreadsheet size={14} />, color: "#217346" },
  { name: "Power BI", icon: <BarChart2 size={14} />, color: "#F2C811" },
];

const getBentoCards = (isDark: boolean) => [
  {
    id: "who",
    title: "Who Am I",
    size: "lg:col-span-2",
    bg: isDark ? "bg-gradient-to-br from-[#0D1730] to-[#0A0F1E]" : "bg-white",
    border: isDark ? "border-[#1E3A8A]/30" : "border-slate-200",
    content: (
      <p
        className="leading-relaxed"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9rem",
          color: isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.72)",
        }}
      >
        Mahasiswa Sistem Informasi semester akhir dengan ketertarikan mendalam di
        bidang{" "}
        <span className={isDark ? "text-[#93B4FF]" : "text-[#1E3A8A]"}>pengembangan software</span>,{" "}
        <span className="text-[#F97316]">analisis data bisnis</span>, dan{" "}
        <span className={isDark ? "text-purple-400" : "text-purple-700"}>desain identitas merek</span>. Saya percaya
        bahwa teknologi terbaik adalah yang memecahkan masalah nyata secara elegan
        dan terukur. Selain itu, pengalaman aktif di organisasi kampus membentuk
        saya menjadi pemimpin yang adaptif dan kolaboratif.
      </p>
    ),
  },
  {
    id: "fullstack",
    title: "Full-Stack Dev",
    icon: <Code2 size={20} className="text-[#93B4FF]" />,
    size: "",
    bg: isDark ? "bg-gradient-to-br from-[#0D1730] to-[#0A0F1E]" : "bg-white",
    border: isDark ? "border-[#1E3A8A]/30" : "border-slate-200",
    content: (
      <div className="space-y-2">
        {["REST API Design", "Database Architecture", "UI/UX Implementation", "Authentication & Security"].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
            <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.7)" }}>
              {s}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "data",
    title: "Data & Analytics",
    icon: <BarChart2 size={20} className="text-[#F97316]" />,
    size: "",
    bg: isDark ? "bg-gradient-to-br from-[#1A0D00] to-[#0A0F1E]" : "bg-white",
    border: isDark ? "border-[#F97316]/20" : "border-slate-200",
    content: (
      <div className="space-y-2">
        {["Business Intelligence", "Data Visualization", "ETL Pipeline", "Statistical Analysis"].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.7)" }}>
              {s}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "design",
    title: "Brand Design",
    icon: <Palette size={20} className="text-purple-400" />,
    size: "",
    bg: isDark ? "bg-gradient-to-br from-[#0F0A1A] to-[#0A0F1E]" : "bg-white",
    border: isDark ? "border-purple-500/20" : "border-slate-200",
    content: (
      <div className="flex flex-wrap gap-2 mt-1">
        {["Logo Design", "Visual Identity", "Typography", "Color Systems", "Brand Guidelines"].map((tag) => (
          <span
            key={tag}
            className={`px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-xs ${isDark ? "text-purple-300" : "text-purple-700"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: "org",
    title: "Organizational",
    icon: <Users size={20} className="text-emerald-400" />,
    size: "",
    bg: isDark ? "bg-gradient-to-br from-[#001A10] to-[#0A0F1E]" : "bg-white",
    border: isDark ? "border-emerald-500/20" : "border-slate-200",
    content: (
      <div className="space-y-2">
        {["Team Leadership", "Event Management", "Strategic Planning", "Public Speaking"].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.7)" }}>
              {s}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

export function AboutSection({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const isDark = theme === "dark";
  const bentoCards = getBentoCards(isDark);
  return (
    <section
      id="about"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: isDark ? "#080D1A" : "#F9FAFC" }}
    >
      {/* BG accent */}
      <div className={`absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#1E3A8A]/5 blur-3xl ${isDark ? "" : "hidden"}`} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#F97316]" />
            <span
              className="text-[#F97316] text-xs sm:text-sm uppercase tracking-widest"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              About Me
            </span>
          </div>
          <h2
            className={isDark ? "text-white" : "text-slate-900"}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Lebih dari Sekadar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B7FE8] to-[#F97316]">
              Developer
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {bentoCards.map((card) => (
            <div
              key={card.id}
              className={`rounded-2xl border p-4 sm:p-5 ${card.bg} ${card.border} ${card.size} relative overflow-hidden group shadow-[0_8px_24px_rgba(15,23,42,0.07)] hover:border-opacity-60 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.13)] transition-all duration-300 cursor-pointer`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/2 to-transparent" />

              {/* Hover shadow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-2xl" />

              <div className="relative">
                {card.icon && (
                  <div className="flex items-center gap-2 mb-3">
                    {card.icon}
                    <h3
                      className={`${isDark ? "text-white" : "text-slate-900"} text-sm`}
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                )}
                {!card.icon && (
                  <h3
                    className={`${isDark ? "text-white" : "text-slate-900"} mb-3 text-sm`}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {card.title}
                  </h3>
                )}
                {card.content}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div>
          <p
            className="text-xs uppercase tracking-widest mb-3 sm:mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: isDark ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.55)",
            }}
          >
            Tech Stack & Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shadow-[0_3px_12px_rgba(15,23,42,0.05)] transition-all duration-300 cursor-default group hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.1)] ${isDark ? "border-white/8 bg-white/3 hover:bg-white/8 hover:border-white/15" : "border-slate-200 bg-white hover:border-slate-300"}`}
              >
                <span style={{ color: tech.color }} className="group-hover:scale-110 transition-transform flex-shrink-0">
                  {tech.icon}
                </span>
                <span
                  className={`${isDark ? "text-white/50 group-hover:text-white/70" : "text-slate-600 group-hover:text-slate-900"} transition-colors text-xs`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
