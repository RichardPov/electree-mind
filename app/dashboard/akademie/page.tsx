"use client";
import { useState } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

const MODULES = [
  {
    id: "kdo-jsme",
    title: "Kdo jsme",
    icon: "🏢",
    sections: [
      { id: "firma", title: "Co je Electree", content: "Electree je moderní energetická firma z Brna. Specialisté na výkup FVE přetoků, poskytují elektřinu a plyn pro domácnosti i firmy." },
      { id: "trh", title: "Kde jsme na trhu", content: "~17 000 výrobních míst (FVE), ~24 000 odběrných míst elektřiny, ~3 500 odběrných míst plynu. Největší konkurenti: ČEZ, E.ON, PRE." },
      { id: "sila", title: "Naše výhody", content: "Specialisté na FVE výkup · Menší a osobnější · Transparentní komunikace · Technologické zázemí (Electree Connect)" },
    ],
  },
  {
    id: "energetika",
    title: "Základy energetiky",
    icon: "⚡",
    sections: [
      { id: "role", title: "Dodavatel vs. distributor", content: "Distributor: vlastní síť, fyzicky dopraví elektřinu. Dodavatel: prodává elektřinu, zákazník si ho vybírá. Totéž pro plyn: GasNet, Gas Distribution = distributoři, Electree = dodavatel." },
      { id: "fix-spot", title: "FIX a SPOT tarify", content: "FIX: cena sjednaná dopředu, jistota. SPOT: kopíruje burzu OTE, mění se každou hodinu, potřeba AMM metr. FIX pro chceme-li jistotu, SPOT pro flexibilní spotřebu." },
      { id: "fve", title: "Výkup FVE", content: "Zákazník s FVE spotřebuje doma část elektřiny, přebytky pošle do sítě. Electree je může vykoupit. Máme ~17 000 výrobních míst — to je naše silná stránka." },
    ],
  },
  {
    id: "produkty",
    title: "Naše produkty",
    icon: "📦",
    sections: [
      { id: "fix-el", title: "Fixní tarify elektřiny", content: "HOME FIX 12: 2 549 Kč/MWh (12 měs) · HOME FIX 24: 2 349 Kč/MWh (24 měs) ⭐ · HOME FIX 36: 2 299 Kč/MWh (36 měs) · EXPERT FIX 24: 2 449 Kč/MWh (firmy)" },
      { id: "spot-el", title: "SPOT tarify elektřiny", content: "HOME SPOT: Spot + 349 Kč/MWh přirážka, 99 Kč/měs · HOME ELECTREE DRIVE: Spot + 319 Kč/MWh, pro EV, 130 Kč/měs · Podmínka: AMM metr" },
      { id: "solar", title: "FVE výkupní produkty", content: "Solar FIX MINI: 1 000 Kč/MWh (do 1 MWh/rok), 39 Kč/měs · Solar FIX: 500 Kč/MWh (1-10 MWh/rok), 59 Kč/měs ⭐ · Solar FIX MAXI: 400 Kč/MWh (10+ MWh/rok), 99 Kč/měs" },
      { id: "plyn", title: "Dodávka plynu", content: "HOME FIX PLYN 12: 1 349 Kč/MWh · HOME FIX PLYN 24: 1 299 Kč/MWh ⭐ · HOME FIX PLYN 36: 1 299 Kč/MWh (stejná cena!) · Cross-sell tip: nabízej obě zároveň" },
    ],
  },
  {
    id: "hovor",
    title: "Prodejní hovor",
    icon: "📞",
    sections: [
      { id: "struktura", title: "Struktura hovoru", content: "1. Otevření (představení, délka) · 2. Souhlas s nahráváním · 3. Potvrzení dat (dodavatel, cena, zálohy, spotřeba) · 4. Výpočet úspory · 5. Námitka (pokud bude) · 6. CTA · 7. Uzavření" },
      { id: "otevreni", title: "Otevření hovoru", content: "Dobrý den, paní Nováková? Tady Petra z Electree. Volám, protože jste si u nás žádala o cenovou nabídku na elektřinu. Hodí se vám teď chvilka? Zabere to max 10 minut." },
      { id: "uspora", title: "Výpočet úspory", content: "(Zákazníkova cena − naše cena) × roční spotřeba = roční úspora. Příklad: (3200 − 2349) × 12 = 10 212 Kč/rok = ~850 Kč/měsíc levnější." },
    ],
  },
  {
    id: "namitky",
    title: "Základní námitky",
    icon: "🛡️",
    sections: [
      { id: "n1", title: "Musím si to rozmyslet", content: '"Rozumím. Co konkrétně si nejste jistá? Úsporu jsme spočítali, ceny vám pošlu e-mailem, výpověď zařídíme my. Co vám chybí?"' },
      { id: "n2", title: "Nejste příliš drazí?", content: '"Naopak — z výpočtu vyšlo, že ušetříte přibližně X Kč ročně. Zálohy vám klesnou o Y Kč měsíčně."' },
      { id: "n3", title: "Bojím se přerušení dodávky", content: '"Nebojte se. Přechod je administrativní, po dobu jste stále připojená. Mění se jen firma na faktuře."' },
    ],
  },
];

const LEVEL_META = {
  A: { label: "Level A", desc: "Základní provoz" },
  B: { label: "Level B", desc: "Pokročilý prodej" },
  C: { label: "Level C", desc: "Vedení lidí" },
};

export default function AkademieePage() {
  const [activeLevel, setActiveLevel] = useState("A");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [sectionIdx, setSectionIdx] = useState(0);
  const { isDone, markLesson } = useProgress();

  // Single section view — jedna sekcia na page
  if (selectedModule) {
    const mod = MODULES.find(m => m.id === selectedModule)!;
    const sec = mod.sections[sectionIdx];
    const isLastSection = sectionIdx === mod.sections.length - 1;
    const nextModule = MODULES[MODULES.findIndex(m => m.id === selectedModule) + 1];

    const handleNext = () => {
      if (isLastSection) {
        if (nextModule) {
          markLesson(mod.id, sectionIdx);
          setSelectedModule(nextModule.id);
          setSectionIdx(0);
        } else {
          markLesson(mod.id, sectionIdx);
          setSelectedModule(null);
        }
      } else {
        markLesson(mod.id, sectionIdx);
        setSectionIdx(sectionIdx + 1);
      }
    };

    return (
      <div className="min-h-screen bg-[#F4F7F6] p-6 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {/* Back button */}
          <button
            onClick={() => { setSelectedModule(null); setSectionIdx(0); }}
            className="text-xs text-[#0D3D34]/40 hover:text-[#0D3D34] mb-6 flex items-center gap-1.5"
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Moduly
          </button>

          {/* Content card */}
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-[#D1DFD8]">
            {/* Header */}
            <div className="mb-8">
              <div className="text-5xl mb-4">{mod.icon}</div>
              <h1 className="text-3xl font-bold text-[#0D3D34] mb-1">{mod.title}</h1>
              <p className="text-base font-semibold text-[#0D3D34] mb-3">{sec.title}</p>
              <p className="text-sm text-[#0D3D34]/50">Sekce {sectionIdx + 1}/{mod.sections.length}</p>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-2 bg-[#D1DFD8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D7FF00] transition-all duration-300"
                  style={{ width: `${((sectionIdx + 1) / mod.sections.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[#0D3D34]/40">{sectionIdx + 1}/{mod.sections.length}</span>
            </div>

            {/* Content */}
            <div className="bg-[#F4F7F6] rounded-2xl p-8 mb-10 min-h-56">
              <p className="text-lg leading-relaxed text-[#0D3D34]/80 whitespace-pre-line">{sec.content}</p>
            </div>

            {/* CTA buttons */}
            <div className="space-y-3">
              <button
                onClick={handleNext}
                className="w-full bg-[#0D3D34] text-[#D7FF00] font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity text-base"
              >
                {isLastSection ? (
                  nextModule ? (
                    `Ďalší modul: ${nextModule.title} →`
                  ) : (
                    "Hotovo! Jdi na Školení →"
                  )
                ) : (
                  "Přečteno. Ďalej →"
                )}
              </button>
              <button
                onClick={() => markLesson(mod.id, sectionIdx)}
                className="w-full text-xs text-[#0D3D34]/40 hover:text-[#0D3D34] py-2 hover:bg-[#EBF7F1] rounded-lg transition-colors"
              >
                ✓ Označit jako přečteno
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Module grid
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0D3D34] mb-6">Akademie</h1>

      {/* Level tabs */}
      <div className="flex gap-2 mb-6">
        {(["A", "B", "C"] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setActiveLevel(lvl)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
              activeLevel === lvl
                ? "bg-[#0D3D34] text-[#D7FF00] border-[#0D3D34]"
                : "bg-white border-[#D1DFD8] text-[#0D3D34]/60 hover:border-[#0D3D34]/30"
            }`}
          >
            {LEVEL_META[lvl as keyof typeof LEVEL_META].label}
          </button>
        ))}
      </div>

      {activeLevel === "A" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => { setSelectedModule(mod.id); setSectionIdx(0); }}
              className="bg-white border border-[#D1DFD8] rounded-2xl p-5 text-left hover:shadow-md hover:border-[#0D3D34]/20 transition-all group"
            >
              <div className="text-3xl mb-3">{mod.icon}</div>
              <h3 className="font-bold text-[#0D3D34] text-sm group-hover:text-[#1A6B5A]">{mod.title}</h3>
              <p className="text-xs text-[#0D3D34]/45 mt-1">{mod.sections.length} sekcí</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-bold text-[#0D3D34]">Brzy k dispozici</h3>
          <p className="text-sm text-[#0D3D34]/50 mt-1">Obsah se připravuje. Nejprve dokončete Level A.</p>
        </div>
      )}
    </div>
  );
}
