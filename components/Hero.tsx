export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#EBF7F1] opacity-60 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#EBF7F1] opacity-40 -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#EBF7F1] border border-[#D1DFD8] rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#D7FF00]" />
            <span className="text-xs font-semibold text-[#0D3D34] tracking-wide uppercase">Knowledge Platform pro Call Centra</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0D3D34] leading-[1.05] tracking-tight mb-6">
            Znalosti, které{" "}
            <span className="relative inline-block">
              <span className="relative z-10">prodávají.</span>
              <span className="absolute inset-x-0 bottom-1 h-4 bg-[#D7FF00] -z-0 rounded" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#0D3D34]/65 leading-relaxed mb-10 max-w-2xl">
            Electree Mind je integrovaný systém pro vzdělávání, onboarding a operační
            excelenci. Znalostní centrum, SOPs, akademie, AI lektor a správa obsahu
            — vše na jednom místě.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#vrstvy"
              className="inline-flex items-center gap-2 bg-[#0D3D34] text-[#D7FF00] font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1A6B5A] transition-colors text-base"
            >
              Prozkoumat vrstvy
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#cennik"
              className="inline-flex items-center gap-2 bg-[#EBF7F1] text-[#0D3D34] font-semibold px-6 py-3.5 rounded-xl border border-[#D1DFD8] hover:bg-[#D1DFD8] transition-colors text-base"
            >
              Zobrazit cenu
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "6", label: "modulů systému" },
            { value: "∞", label: "témat a lekcí" },
            { value: "AI", label: "lektor & hodnocení" },
            { value: "24/7", label: "dostupnost" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-6">
              <div className="text-3xl font-bold text-[#0D3D34] mb-1">{stat.value}</div>
              <div className="text-sm text-[#0D3D34]/60 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
