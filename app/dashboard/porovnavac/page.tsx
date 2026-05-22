"use client";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  emoji: string;
  priceMWh: string;
  pausal: string;
  fixace: string;
  proKoho: string;
  vyhody: string[];
  nevyhody: string[];
  recommended?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "hf12",
    name: "HOME FIX 12",
    category: "Elektřina",
    emoji: "⚡",
    priceMWh: "3 084,29 Kč/MWh",
    pausal: "156,09 Kč/měs.",
    fixace: "12 měsíců",
    proKoho: "Domácnosti, které chtějí kratší závazek",
    vyhody: ["Nejkratší fixace", "Bez sankce po uplynutí"],
    nevyhody: ["Nejvyšší cena komodity", "Méně stabilní dlouhodobě"],
  },
  {
    id: "hf24",
    name: "HOME FIX 24",
    category: "Elektřina",
    emoji: "⚡",
    priceMWh: "2 842,29 Kč/MWh",
    pausal: "180,29 Kč/měs.",
    fixace: "24 měsíců",
    proKoho: "Většina domácností – nejlepší poměr cena/jistota",
    vyhody: ["Nejpopulárnější produkt", "O 242 Kč/MWh levnější než FIX 12", "2 roky jistá cena"],
    nevyhody: ["Vyšší paušál než FIX 12"],
    recommended: true,
  },
  {
    id: "hf36",
    name: "HOME FIX 36",
    category: "Elektřina",
    emoji: "⚡",
    priceMWh: "2 781,79 Kč/MWh",
    pausal: "180,29 Kč/měs.",
    fixace: "36 měsíců",
    proKoho: "Zákazníci, kteří chtějí maximální jistotu ceny",
    vyhody: ["Nejnižší cena komodity v elektřině", "3 roky bez změny ceny"],
    nevyhody: ["Nejdelší závazek", "Delší vázanost = méně flexibility"],
  },
  {
    id: "ef24",
    name: "EXPERT FIX 24",
    category: "Elektřina (firmy)",
    emoji: "🏢",
    priceMWh: "2 963,29 Kč/MWh",
    pausal: "180,29 Kč/měs.",
    fixace: "24 měsíců",
    proKoho: "Podnikatelé a firmy s IČO",
    vyhody: ["Produkt určený pro firmy", "Výhodná cena pro podnikatele"],
    nevyhody: ["Pouze pro zákazníky s IČO", "Dražší než HOME FIX"],
  },
  {
    id: "pf24",
    name: "HOME FIX 24 (plyn)",
    category: "Plyn",
    emoji: "🔥",
    priceMWh: "1 571,79 Kč/MWh",
    pausal: "108,89 Kč/měs.",
    fixace: "24 měsíců",
    proKoho: "Domácnosti s plynovým vytápěním",
    vyhody: ["Doporučený plynový produkt", "Výhodná kombinace s elektřinou"],
    nevyhody: ["Zálohy nutno nastavit na zimní spotřebu"],
    recommended: true,
  },
  {
    id: "pf36",
    name: "HOME FIX 36 (plyn)",
    category: "Plyn",
    emoji: "🔥",
    priceMWh: "1 571,79 Kč/MWh",
    pausal: "108,89 Kč/měs.",
    fixace: "36 měsíců",
    proKoho: "Zákazníci hledající maximální jistotu u plynu",
    vyhody: ["Stejná cena jako FIX 24", "Delší stabilita"],
    nevyhody: ["Delší závazek"],
  },
  {
    id: "fve-fix",
    name: "Home Solar FIX",
    category: "FVE výkup",
    emoji: "☀️",
    priceMWh: "500 Kč/MWh (výkup)",
    pausal: "59 Kč/měs.",
    fixace: "dle smlouvy",
    proKoho: "FVE do 10 MWh/rok – standardní střešní instalace",
    vyhody: ["Nejoblíbenější výkupní produkt", "Jednoduchá podmínka (do 10 MWh)"],
    nevyhody: ["Nižší cena výkupu než MINI", "Pouze do 10 MWh"],
    recommended: true,
  },
  {
    id: "fve-maxi",
    name: "Home Solar FIX MAXI",
    category: "FVE výkup",
    emoji: "☀️",
    priceMWh: "400 Kč/MWh (výkup)",
    pausal: "99 Kč/měs.",
    fixace: "dle smlouvy",
    proKoho: "Velká FVE nad 10 MWh/rok",
    vyhody: ["Pro velké instalace", "Stabilní výkup"],
    nevyhody: ["Nejnižší výkupní cena", "Vyšší paušál"],
  },
];

const CATEGORIES = ["Elektřina", "Plyn", "FVE výkup", "Elektřina (firmy)"];
const COMPARE_ROWS = [
  { key: "category", label: "Kategorie" },
  { key: "priceMWh", label: "Cena / MWh" },
  { key: "pausal", label: "Měsíční paušál" },
  { key: "fixace", label: "Délka fixace" },
  { key: "proKoho", label: "Pro koho" },
];

export default function PorovnavacPage() {
  const [selected, setSelected] = useState<string[]>(["hf24", "hf12", "pf24"]);
  const [catFilter, setCatFilter] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const compareProducts = PRODUCTS.filter((p) => selected.includes(p.id));
  const filteredProducts = catFilter ? PRODUCTS.filter((p) => p.category === catFilter) : PRODUCTS;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Porovnávač produktů</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Vyberte až 3 produkty a porovnejte je vedle sebe</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: product selector */}
        <div>
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D1DFD8] flex items-center justify-between">
              <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">Vybrat produkty</div>
              <div className="text-[10px] text-[#0D3D34]/50">{selected.length}/3 vybrány</div>
            </div>

            <div className="p-3 border-b border-[#D1DFD8] flex flex-wrap gap-1">
              <button onClick={() => setCatFilter(null)} className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${!catFilter ? "bg-[#0D3D34] text-white" : "bg-[#EBF7F1] text-[#0D3D34]/60"}`}>Vše</button>
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCatFilter(catFilter === c ? null : c)} className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${catFilter === c ? "bg-[#0D3D34] text-white" : "bg-[#EBF7F1] text-[#0D3D34]/60"}`}>{c}</button>
              ))}
            </div>

            <div className="divide-y divide-[#D1DFD8]">
              {filteredProducts.map((p) => {
                const isSelected = selected.includes(p.id);
                const isDisabled = !isSelected && selected.length >= 3;
                return (
                  <button
                    key={p.id}
                    onClick={() => !isDisabled && toggle(p.id)}
                    disabled={isDisabled}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${isSelected ? "bg-[#EBF7F1]" : isDisabled ? "opacity-40" : "hover:bg-[#F7FAF9]"}`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? "bg-[#0D3D34] border-[#0D3D34]" : "border-[#D1DFD8]"}`}>
                      {isSelected && <span className="text-[#D7FF00] text-[9px] font-bold">✓</span>}
                    </div>
                    <span className="text-sm flex-shrink-0">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#0D3D34] truncate">{p.name}</div>
                      <div className="text-[10px] text-[#0D3D34]/40">{p.category}</div>
                    </div>
                    {p.recommended && <span className="text-[8px] font-bold bg-[#D7FF00] text-[#0D3D34] px-1.5 py-0.5 rounded-full flex-shrink-0">⭐</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: comparison table */}
        <div className="lg:col-span-2">
          {compareProducts.length === 0 ? (
            <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-10 text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <p className="text-[#0D3D34]/50 text-sm">Vyberte produkty vlevo pro porovnání</p>
            </div>
          ) : (
            <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="grid border-b border-[#D1DFD8]" style={{ gridTemplateColumns: `160px repeat(${compareProducts.length}, 1fr)` }}>
                <div className="px-4 py-3 bg-[#F7FAF9]" />
                {compareProducts.map((p) => (
                  <div key={p.id} className={`px-4 py-4 text-center border-l border-[#D1DFD8] ${p.recommended ? "bg-[#EBF7F1]" : ""}`}>
                    <div className="text-2xl mb-1">{p.emoji}</div>
                    <div className="text-sm font-bold text-[#0D3D34]">{p.name}</div>
                    {p.recommended && <div className="text-[9px] font-bold text-[#1A6B5A] mt-0.5">⭐ Doporučeno</div>}
                    <button onClick={() => toggle(p.id)} className="mt-2 text-[10px] text-[#0D3D34]/30 hover:text-red-500 transition-colors">✕ odebrat</button>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {COMPARE_ROWS.map((row) => (
                <div key={row.key} className="grid border-b border-[#D1DFD8] last:border-0" style={{ gridTemplateColumns: `160px repeat(${compareProducts.length}, 1fr)` }}>
                  <div className="px-4 py-3 bg-[#F7FAF9] flex items-center">
                    <span className="text-[10px] font-bold text-[#0D3D34]/50 uppercase tracking-widest">{row.label}</span>
                  </div>
                  {compareProducts.map((p) => (
                    <div key={p.id} className={`px-4 py-3 border-l border-[#D1DFD8] flex items-center ${p.recommended ? "bg-[#EBF7F1]/50" : ""}`}>
                      <span className="text-xs text-[#0D3D34] font-medium">{p[row.key as keyof Product] as string}</span>
                    </div>
                  ))}
                </div>
              ))}

              {/* Výhody */}
              <div className="grid border-b border-[#D1DFD8]" style={{ gridTemplateColumns: `160px repeat(${compareProducts.length}, 1fr)` }}>
                <div className="px-4 py-3 bg-[#F7FAF9] flex items-start pt-4">
                  <span className="text-[10px] font-bold text-[#0D3D34]/50 uppercase tracking-widest">Výhody</span>
                </div>
                {compareProducts.map((p) => (
                  <div key={p.id} className={`px-4 py-3 border-l border-[#D1DFD8] ${p.recommended ? "bg-[#EBF7F1]/50" : ""}`}>
                    <ul className="space-y-1">
                      {p.vyhody.map((v) => (
                        <li key={v} className="text-xs text-[#1A6B5A] flex items-start gap-1.5">
                          <span className="text-[#D7FF00] bg-[#1A6B5A] rounded-full w-3 h-3 flex items-center justify-center text-[8px] flex-shrink-0 mt-0.5">✓</span>
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Nevýhody */}
              <div className="grid" style={{ gridTemplateColumns: `160px repeat(${compareProducts.length}, 1fr)` }}>
                <div className="px-4 py-3 bg-[#F7FAF9] flex items-start pt-4">
                  <span className="text-[10px] font-bold text-[#0D3D34]/50 uppercase tracking-widest">Nevýhody</span>
                </div>
                {compareProducts.map((p) => (
                  <div key={p.id} className={`px-4 py-3 border-l border-[#D1DFD8] ${p.recommended ? "bg-[#EBF7F1]/50" : ""}`}>
                    <ul className="space-y-1">
                      {p.nevyhody.map((v) => (
                        <li key={v} className="text-xs text-[#0D3D34]/60 flex items-start gap-1.5">
                          <span className="text-red-400 flex-shrink-0 mt-0.5">–</span>
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
