export default function CTA() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0D3D34] rounded-3xl px-10 py-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#1A6B5A] opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#D7FF00] opacity-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#D7FF00]/15 border border-[#D7FF00]/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#D7FF00]" />
              <span className="text-xs font-semibold text-[#D7FF00] tracking-wide uppercase">Další krok</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
              Připraveni začít<br />
              <span className="text-[#D7FF00]">budovat systém?</span>
            </h2>

            <p className="text-lg text-white/55 leading-relaxed mb-10">
              Nakreslíme vám detailní strukturu obrazovek, role uživatelů a co přesně uvidí správce oproti běžné operátorce.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:marketing@electree.cz"
                className="inline-flex items-center gap-2 bg-[#D7FF00] text-[#0D3D34] font-bold px-7 py-3.5 rounded-xl hover:bg-white transition-colors text-base"
              >
                Kontaktovat tým
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#vrstvy"
                className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-7 py-3.5 rounded-xl border border-white/25 hover:bg-white/10 transition-colors text-base"
              >
                Prozkoumat vrstvy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
