const layers = [
  {
    number: "01",
    title: "Znalostní centrum",
    subtitle: "Wiki",
    description: "Místo, kde si každý dohledá produkty, pojmy, rozdíly a obchodní logiku. Přehled produktů, slovník, FAQ, typické situace zákazníků a námitky.",
    items: ["Přehled produktů a služeb", "Srovnání variant", "Slovník pojmů", "Časté dotazy a námitky", "Typické chyby a omyly"],
    color: "#EBF7F1",
    accent: "#0D3D34",
  },
  {
    number: "02",
    title: "Postupy a pravidla",
    subtitle: "SOPs",
    description: "Procesní vrstva s pracovními postupy, interními pravidly, kontrolními seznamy a rozhodovacími větvemi. Stručné, jednoznačné a závazné.",
    items: ["Práce v systému", "Administrativní kroky", "Reklamace a stížnosti", "Ověření zákazníka", "DOs & DON'Ts"],
    color: "#EBF7F1",
    accent: "#0D3D34",
  },
  {
    number: "03",
    title: "Akademie",
    subtitle: "Řízené vzdělávání",
    description: "Systém lekcí, vzdělávacích cest, opakování a ověřování znalostí. Od nástupního školení po rozvoj vedoucích.",
    items: ["Nástupní školení (onboarding)", "Produktové vzdělávání", "Obchodní dovednosti", "Komunikační dovednosti", "Administrace a systémy"],
    color: "#EBF7F1",
    accent: "#0D3D34",
  },
  {
    number: "04",
    title: "AI Lektor",
    subtitle: "Copilot",
    description: "Pomáhá s vysvětlením, procvičením a sebereflexí. Vysvětlí pojem, porovná varianty, zahraje zákazníka, ohodnotí odpověď.",
    items: ["Vysvětli mi to", "Porovnej mi to", "Vyzkoušej mě", "Zahraj zákazníka", "Ohodnoť moji odpověď"],
    color: "#EBF7F1",
    accent: "#0D3D34",
  },
  {
    number: "05",
    title: "Testování a simulace",
    subtitle: "Ověření znalostí",
    description: "Znalostní testy, nácvikové situace, časované úkoly a zpětná vazba. Hodnocení AI + lidská kontrola lídra týmu.",
    items: ["Krátké testy na produkty", "Modelové situace", "Časované reakce", "Výsledky a slabá místa", "Doporučení opakování"],
    color: "#EBF7F1",
    accent: "#0D3D34",
  },
  {
    number: "06",
    title: "Správa obsahu",
    subtitle: "CMS",
    description: "Editor se stavebnicovým systémem bloků. Správce vytváří, upravuje, schvaluje a verzuje všechny typy obsahu bez technických znalostí.",
    items: ["Blokový editor obsahu", "Workflow schvalování", "Role a oprávnění", "Verzování a revize", "Plánované kontroly"],
    color: "#EBF7F1",
    accent: "#0D3D34",
  },
];

const icons = [
  // Knowledge center
  <svg key="01" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // SOPs
  <svg key="02" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Academy
  <svg key="03" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // AI Tutor
  <svg key="04" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Testing
  <svg key="05" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // CMS
  <svg key="06" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function Layers() {
  return (
    <section id="vrstvy" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF7F1] border border-[#D1DFD8] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#0D3D34] tracking-wide uppercase">6 modulů</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3D34] tracking-tight mb-4">
            Vrstvy Electree Mind
          </h2>
          <p className="text-lg text-[#0D3D34]/60 max-w-2xl">
            Každá vrstva řeší jinou oblast — od vyhledávání informací přes strukturované učení až po ověřování znalostí a správu celého obsahu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layers.map((layer, i) => (
            <div
              key={layer.number}
              className="group bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-7 hover:border-[#0D3D34]/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#0D3D34] text-[#D7FF00]">
                  {icons[i]}
                </div>
                <span className="text-xs font-mono font-bold text-[#0D3D34]/30">{layer.number}</span>
              </div>

              <div className="mb-1">
                <span className="text-xs font-semibold text-[#1A6B5A] uppercase tracking-wide">{layer.subtitle}</span>
              </div>
              <h3 className="text-xl font-bold text-[#0D3D34] mb-3">{layer.title}</h3>
              <p className="text-sm text-[#0D3D34]/65 leading-relaxed mb-5">{layer.description}</p>

              <ul className="space-y-2">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[#0D3D34]/75">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF00] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
