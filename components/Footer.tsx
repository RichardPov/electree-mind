export default function Footer() {
  return (
    <footer className="bg-[#0D3D34] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#D7FF00]">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9C3 5.686 5.686 3 9 3s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z" fill="#0D3D34" />
                  <path d="M9 6v3l2 2" stroke="#0D3D34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-semibold text-white text-lg tracking-tight">Electree <span className="text-[#D7FF00]">Mind</span></span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Inteligentní znalostní systém pro moderní call centra. Onboarding, vzdělávání a operační excelence na jednom místě.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="text-xs font-bold text-[#D7FF00] uppercase tracking-wider mb-4">Moduly</div>
              <ul className="space-y-2.5">
                {["Znalostní centrum", "Postupy a pravidla", "Akademie", "AI Lektor", "Testování", "Správa obsahu"].map((item) => (
                  <li key={item} className="text-sm text-white/55 hover:text-white transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold text-[#D7FF00] uppercase tracking-wider mb-4">Projekt</div>
              <ul className="space-y-2.5">
                {[
                  { label: "Architektura", href: "#architektura" },
                  { label: "Roadmapa", href: "#roadmap" },
                  { label: "Ceník", href: "#cennik" },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-white/55 hover:text-white transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">© 2025 Electree. Všechna práva vyhrazena.</p>
          <p className="text-xs text-white/35">Postaveno na Next.js · Powered by Claude AI</p>
        </div>
      </div>
    </footer>
  );
}
