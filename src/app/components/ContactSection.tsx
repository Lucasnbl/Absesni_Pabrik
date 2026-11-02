import { Mail, MapPin, Send, Copy, Check, Upload, X } from "lucide-react";
import { useState, useRef } from "react";

export function ContactSection({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const isDark = theme === "dark";
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const email = "lucasnbl111@gmail.com";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const temp = document.createElement("textarea");
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      alert("Salinan email gagal dibuat. Silakan salin manual: lucasnbl111@gmail.com");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Max 5 files, max 10MB each
      const validFiles = newFiles.filter((file) => file.size <= 10 * 1024 * 1024);
      if (validFiles.length < newFiles.length) {
        alert("Beberapa file terlalu besar (max 10MB). File tersebut tidak ditambahkan.");
      }
      setFiles((prev) => [...prev, ...validFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Nama, email, dan pesan wajib diisi.");
      return;
    }

    setIsSending(true);
    setSendError('');

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", form.subject);
      formData.append("message", form.message);
      files.forEach((file) => {
        formData.append("attachments", file);
      });

      const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
      const response = await fetch(`${apiBaseUrl}/api/send-email`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.error || "Gagal mengirim pesan. Silakan coba lagi.");
      }

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      setSendError(error instanceof Error ? error.message : "Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung melalui email.");
    } finally {
      setIsSending(false);
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: isDark ? "#0A0F1E" : "#F9FAFC" }}
    >
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-80 sm:h-96 rounded-full bg-[#1E3A8A]/8 blur-3xl ${isDark ? "" : "hidden"}`} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 text-left">
          <div className="flex items-center justify-start gap-3 mb-3">
            <span className="w-6 sm:w-8 h-px bg-[#F97316]" />
            <span
              className="text-[#F97316] text-xs sm:text-sm uppercase tracking-widest"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Contact
            </span>
            <span className="w-6 sm:w-8 h-px bg-[#F97316]" />
          </div>
          <h2
            className={`${isDark ? "text-white" : "text-slate-900"} mb-3`}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Mari{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B7FE8] to-[#F97316]">
              Berkolaborasi
            </span>
          </h2>
          <p
            className={`${isDark ? "text-white/40" : "text-slate-600"} max-w-2xl text-sm sm:text-base`}
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
          >
            Terbuka untuk peluang magang, project freelance, kolaborasi riset, atau sekadar diskusi teknologi!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left: Info */}
          <div className="space-y-4 sm:space-y-5">
            {/* Email card */}
            <div className="rounded-2xl border border-white/8 bg-[#0D1124] p-4 sm:p-5 group hover:border-white/15 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1E3A8A]/20 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A8A]/20 border border-[#1E3A8A]/30 flex items-center justify-center group-hover:bg-[#1E3A8A]/30 transition-colors flex-shrink-0">
                  <Mail size={18} className="text-[#93B4FF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/30 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Email</p>
                  <p className="text-white text-xs sm:text-sm break-all" style={{ fontFamily: "'Inter', sans-serif" }}>{email}</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all cursor-pointer flex-shrink-0"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Location card */}
            <div className="rounded-2xl border border-white/8 bg-[#0D1124] p-4 sm:p-5 group hover:border-white/15 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F97316]/20 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center group-hover:bg-[#F97316]/20 transition-colors flex-shrink-0">
                  <MapPin size={18} className="text-[#F97316]" />
                </div>
                <div>
                  <p className="text-white/30 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Location</p>
                  <p className="text-white text-xs sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Indonesia 🇮🇩</p>
                </div>
              </div>
            </div>

            {/* Status card */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5 group hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <p
                    className="text-emerald-400"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    Available for Opportunities
                  </p>
                  <p
                    className="text-emerald-400/60 text-xs mt-0.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Internship · Freelance · Collaboration
                  </p>
                </div>
              </div>
            </div>

            {/* Response time */}
            <p
              className="text-white/25 text-xs px-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ⚡ Biasanya membalas dalam 24 jam
            </p>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/8 bg-[#0D1124] p-4 sm:p-6 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1E3A8A]/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-white/40 text-xs mb-1.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Nama
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama kamu"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/4 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-[#1E3A8A]/60 focus:bg-white/6 focus:shadow-lg focus:shadow-[#1E3A8A]/20 hover:border-white/15 hover:bg-white/5 transition-all duration-300 text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-white/40 text-xs mb-1.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@contoh.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/4 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-[#1E3A8A]/60 focus:bg-white/6 focus:shadow-lg focus:shadow-[#1E3A8A]/20 hover:border-white/15 hover:bg-white/5 transition-all duration-300 text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-white/40 text-xs mb-1.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Subjek
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Topik diskusi..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/4 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-[#1E3A8A]/60 focus:bg-white/6 focus:shadow-lg focus:shadow-[#1E3A8A]/20 hover:border-white/15 hover:bg-white/5 transition-all duration-300 text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            <div>
              <label
                className="block text-white/40 text-xs mb-1.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Pesan
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Ceritakan project atau peluang kolaborasimu..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl bg-white/4 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-[#1E3A8A]/60 focus:bg-white/6 focus:shadow-lg focus:shadow-[#1E3A8A]/20 hover:border-white/15 hover:bg-white/5 transition-all duration-300 text-sm resize-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label
                className="block text-white/40 text-xs mb-1.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Lampiran (Opsional) - PDF, DOC, IMG, TXT (Max 10MB, 5 file)
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 border-dashed text-white/60 hover:text-white hover:border-[#F97316]/60 hover:bg-[#F97316]/5 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Upload size={16} />
                Klik untuk upload file atau drag & drop
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* File Preview */}
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            {sendError && (
              <p role="alert" className="rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-sm text-rose-600">
                {sendError}
              </p>
            )}
            {sent && (
              <p role="status" className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-700">
                Pesan berhasil terkirim. Terima kasih sudah menghubungi saya!
              </p>
            )}
            <button
              type="submit"
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#2547B0] hover:scale-105 hover:shadow-2xl hover:shadow-[#1E3A8A]/40 text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 text-sm"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              {isSending ? (
                <>
                  <Send size={16} className="animate-spin" />
                  Mengirim...
                </>
              ) : sent ? (
                <>
                  <Check size={16} className="text-emerald-300" />
                  Pesan Terkirim!
                </>
              ) : (
                <>
                  <Send size={16} />
                  Kirim Pesan
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
