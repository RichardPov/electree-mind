const phases = [
  {
    phase: "Fáze 1",
    num: "01",
    title: "Základy & infrastruktura",
    description: "Nastavení projektu, autentizace, databázové schéma, RBAC role, designový systém a základní navigace.",
    deliverables: [
      "Next.js projekt s TypeScript + Tailwind",
      "Autentizace (NextAuth.js) + role (admin, editor, agent)",
      "PostgreSQL schéma – users, content, roles",
      "Základní rozložení aplikace & navigace",
    ],
    accent: "#D7FF00",
    accentText: "#0D3D34",
  },
  {
    phase: "Fáze 2",
    num: "02",
    title: "Znalostní centrum + SOPs",
    description: "První dva moduly. Operátorky si mohou dohledat produkty, pojmy a pracovní postupy. Fulltextové vyhledávání.",
    deliverables: [
      "Wiki – produkty, srovnání, slovník, FAQ",
      "SOPs – postupy, kontrolní seznamy, rozhodovací větve",
      "Typesense integrace – rychlé vyhledávání",
      "Filtrování podle role, produktu, oblasti",
    ],
    accent: "#B8E8D0",
    accentText: "#0D3D34",
  },
  {
    phase: "Fáze 3",
    num: "03",
    title: "Akademie",
    description: "Řízené vzdělávání s lekcemi, vzdělávacími cestami a sledováním pokroku každého účastníka.",
    deliverables: [
      "Struktura lekcí (cíl, vysvětlení, příklady, shrnutí)",
      "Vzdělávací cesty (nástupní, produktové, obchodní)",
      "Sledování pokroku a absolvovaných lekcí",
      "Podpora videí, PDF a prezentací",
    ],
    accent: "#B8E8D0",
    accentText: "#0D3D34",
  },
  {
    phase: "Fáze 4",
    num: "04",
    title: "Testování & simulace",
    description: "Znalostní testy, modelové situace, časované úkoly a vyhodnocení silných a slabých míst.",
    deliverables: [
      "Testy – MCQ, otevřené otázky, situace",
      "Modelové dialogy se zákazníkem",
      "Časované reakce na námitky",
      "Dashboard výsledků + doporučení opakování",
    ],
    accent: "#EBF7F1",
    accentText: "#0D3D34",
  },
  {
    phase: "Fáze 5",
    num: "05",
    title: "AI Lektor (Copilot)",
    description: "Integrace Claude API. AI vysvětluje, porovnává, zkouší, hraje zákazníka a hodnotí odpovědi operátorek.",
    deliverables: [
      "Streaming chat s Claude Sonnet",
      "Režimy: vysvětli / porovnej / vyzkoušej / hraj zákazníka",
      "Hodnocení odpovědí se zpětnou vazbou",
      "Doporučení dalšího studia na základě historie",
    ],
    accent: "#EBF7F1",
    accentText: "#0D3D34",
  },
  {
    phase: "Fáze 6",
    num: "06",
    title: "Správa obsahu & launch",
    description: "Blokový editor, workflow schvalování, verzování, metadata a plnohodnotné nasazení pro produkci.",
    deliverables: [
      "Blokový editor (text, video, otázky, modelové situace)",
      "Workflow: návrh → schválení → publikování",
      "Verzování, revize, plánované kontroly",
      "Analytika, monitoring a produkční launch",
    ],
    accent: "#0D3D34",
    accentText: "#D7FF00",
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF7F1] border border-[#D1DFD8] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#0D3D34] tracking-wide uppercase">Roadmapa</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3D34] tracking-tight mb-4">
            Od základů po plný launch
          </h2>
          <p className="text-lg text-[#0D3D34]/60 max-w-2xl">
            Iterativní nasazování po vrstvách. Každá fáze přináší hodnotu hned — operátorky nezačnou používat systém až po roce.
          </p>
        </div>

        {/* Timeline */}
        <div>
          {phases.map((phase, i) => (
            <div key={phase.num} className="flex gap-0">

              {/* LEFT: phase label + line + dot */}
              <div className="flex flex-col items-end w-36 md:w-48 flex-shrink-0">
                {/* Label block */}
                <div className="flex flex-col items-end pr-6 pt-1">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-1.5"
                    style={{ backgroundColor: phase.accent, color: phase.accentText }}
                  >
                    {phase.phase}
                  </span>
                </div>

                {/* Connector: dot + vertical line */}
                <div className="flex flex-col items-end flex-1 pr-6">
                  {/* horizontal arm to dot */}
                  <div className="flex items-center gap-0 w-full justify-end mt-4">
                    <div className="flex-1 h-px bg-[#D1DFD8]" />
                  </div>
                  {/* vertical line down (except last) */}
                  {i < phases.length - 1 && (
                    <div className="w-px bg-[#D1DFD8] flex-1 mr-0" style={{ marginRight: 0 }} />
                  )}
                </div>
              </div>

              {/* CENTER: dot */}
              <div className="flex flex-col items-center flex-shrink-0 w-5">
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 border-[3px] border-white shadow-md mt-4 z-10"
                  style={{ backgroundColor: phase.accent === "#EBF7F1" ? "#1A6B5A" : phase.accent, outline: "2px solid #D1DFD8" }}
                />
                {i < phases.length - 1 && (
                  <div className="w-px bg-[#D1DFD8] flex-1" />
                )}
              </div>

              {/* RIGHT: card */}
              <div className={`flex-1 pl-8 ${i < phases.length - 1 ? "pb-10" : "pb-0"}`}>
                <div
                  className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group"
                  style={{ borderLeftWidth: "3px", borderLeftColor: phase.accent === "#EBF7F1" ? "#1A6B5A" : phase.accent }}
                >
                  {/* Card top bar */}
                  <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#D1DFD8]/60">
                    <div>
                      <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-0.5">{phase.num}</div>
                      <h3 className="text-lg font-bold text-[#0D3D34] leading-snug">{phase.title}</h3>
                    </div>
                    </div>

                  {/* Card body */}
                  <div className="px-6 py-5">
                    <p className="text-sm text-[#0D3D34]/60 leading-relaxed mb-5">{phase.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {phase.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-[#0D3D34]/75">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: phase.accent === "#EBF7F1" ? "#1A6B5A" : phase.accent === "#0D3D34" ? "#D7FF00" : phase.accent }}
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
