"use client";
import { useState } from "react";

type Card = { q: string; a: string; category: string };

const CARDS: Card[] = [
  { category: "Elektřina", q: "HOME FIX 12 – cena s DPH?", a: "3 084,29 Kč/MWh\nPaušál: 156,09 Kč/měs." },
  { category: "Elektřina", q: "HOME FIX 24 – cena s DPH?", a: "2 842,29 Kč/MWh\nPaušál: 180,29 Kč/měs.\n⭐ Doporučený produkt" },
  { category: "Elektřina", q: "HOME FIX 36 – cena s DPH?", a: "2 781,79 Kč/MWh\nPaušál: 180,29 Kč/měs.\nNejnižší komodita v elektřině" },
  { category: "Elektřina", q: "EXPERT FIX 12 – cena s DPH?", a: "3 205,29 Kč/MWh\nPaušál: 156,09 Kč/měs.\nPro firmy s IČO" },
  { category: "Elektřina", q: "EXPERT FIX 24 – cena s DPH?", a: "2 963,29 Kč/MWh\nPaušál: 180,29 Kč/měs." },
  { category: "Elektřina", q: "EXPERT FIX 36 – cena s DPH?", a: "2 902,79 Kč/MWh\nPaušál: 180,29 Kč/měs." },
  { category: "Plyn", q: "HOME FIX plyn 12 – cena s DPH?", a: "1 632,29 Kč/MWh\nPaušál: 108,89 Kč/měs." },
  { category: "Plyn", q: "HOME FIX plyn 24 – cena s DPH?", a: "1 571,79 Kč/MWh\nPaušál: 108,89 Kč/měs.\n⭐ Doporučený produkt" },
  { category: "Plyn", q: "HOME FIX plyn 36 – cena s DPH?", a: "1 571,79 Kč/MWh\nPaušál: 108,89 Kč/měs.\nStejná cena jako FIX 24!" },
  { category: "FVE výkup", q: "Home Solar FIX MINI – výkupní cena?", a: "1 000 Kč/MWh\nPaušál: 39 Kč/měs.\nLimit: do 1 MWh/rok" },
  { category: "FVE výkup", q: "Home Solar FIX – výkupní cena?", a: "500 Kč/MWh\nPaušál: 59 Kč/měs.\nLimit: do 10 MWh/rok ⭐" },
  { category: "FVE výkup", q: "Home Solar FIX MAXI – výkupní cena?", a: "400 Kč/MWh\nPaušál: 99 Kč/měs.\nLimit: nad 10 MWh/rok" },
  { category: "Retence", q: "Do kolika dnů od podpisu u jiné firmy může zákazník odstoupit?", a: "14 dní\nZákon o spotřebitelích → zákonné právo odstoupit od smlouvy uzavřené mimo obchodní prostory." },
  { category: "Retence", q: "Co jsou první 3 kroky retenčního hovoru?", a: "1. Nechat zákazníka mluvit\n2. Zjistit skutečný důvod odchodu\n3. Nabídnout řešení šité na míru" },
  { category: "Procesy", q: "Jaký dokument NESMÍ zákazník použít pro výrobní EAN FVE?", a: "UTP (uvedení do trvalého provozu)\n⚠️ V UTP je vždy EAN spotřební, ne výrobní!\nSpráv. zdroj: PPP dokument nebo SoP" },
  { category: "Procesy", q: "Co je HOME FIX vs EXPERT FIX?", a: "HOME FIX = fyzická osoba / domácnost bez IČO\nEXPERT FIX = firma / podnikatel s IČO\n⚠️ Nikdy nezaměňovat!" },
];

const CAT_COLORS: Record<string, string> = {
  "Elektřina": "#0D3D34",
  "Plyn": "#1A6B5A",
  "FVE výkup": "#B8E8D0",
  "Retence": "#EBF7F1",
  "Procesy": "#D1DFD8",
};
const CAT_TEXT: Record<string, string> = {
  "Elektřina": "#D7FF00",
  "Plyn": "#D7FF00",
  "FVE výkup": "#0D3D34",
  "Retence": "#0D3D34",
  "Procesy": "#0D3D34",
};

export default function FlashkartyPage() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Record<number, "znam" | "neznam">>({});
  const [filter, setFilter] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const filtered = filter ? CARDS.filter((c) => c.category === filter) : CARDS;
  const card = filtered[idx];
  const categories = Array.from(new Set(CARDS.map((c) => c.category)));

  const answer = (result: "znam" | "neznam") => {
    const newResults = { ...results, [idx]: result };
    setResults(newResults);
    if (idx + 1 >= filtered.length) {
      setFinished(true);
    } else {
      setIdx(idx + 1);
      setFlipped(false);
    }
  };

  const restart = () => {
    setIdx(0);
    setFlipped(false);
    setResults({});
    setFinished(false);
  };

  const znam = Object.values(results).filter((r) => r === "znam").length;
  const neznam = Object.values(results).filter((r) => r === "neznam").length;

  if (finished) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden text-center">
          <div className="px-6 py-8 bg-[#D7FF00]">
            <div className="text-5xl mb-3">{znam >= filtered.length * 0.8 ? "🏆" : znam >= filtered.length * 0.5 ? "👍" : "📚"}</div>
            <h2 className="text-2xl font-black text-[#0D3D34]">Dokončeno!</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#EBF7F1] rounded-2xl p-5">
                <div className="text-3xl font-black text-[#1A6B5A]">{znam}</div>
                <div className="text-sm text-[#0D3D34]/60 mt-1">Znám ✓</div>
              </div>
              <div className="bg-red-50 rounded-2xl p-5">
                <div className="text-3xl font-black text-red-500">{neznam}</div>
                <div className="text-sm text-[#0D3D34]/60 mt-1">Nevím ✗</div>
              </div>
            </div>
            <div className="text-sm text-[#0D3D34]/50 mb-6">
              {Math.round((znam / filtered.length) * 100)} % správně · {filtered.length} karet celkem
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={restart} className="bg-[#0D3D34] text-[#D7FF00] px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90">
                Zkusit znovu
              </button>
              {neznam > 0 && (
                <button onClick={() => { setResults({}); setIdx(0); setFlipped(false); setFinished(false); setFilter(null); }} className="bg-[#EBF7F1] text-[#0D3D34] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#D1DFD8]">
                  Jen nevím ({neznam})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Flashkarty</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Rychlý trénink klíčových informací – klikněte na kartu pro otočení</p>
      </div>

      {/* Filter + progress */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => { setFilter(null); restart(); }} className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all ${!filter ? "bg-[#0D3D34] text-white" : "bg-white border border-[#D1DFD8] text-[#0D3D34]/60"}`}>Vše ({CARDS.length})</button>
          {categories.map((c) => (
            <button key={c} onClick={() => { setFilter(c); restart(); }} className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all ${filter === c ? "bg-[#0D3D34] text-white" : "bg-white border border-[#D1DFD8] text-[#0D3D34]/60"}`}>
              {c} ({CARDS.filter((x) => x.category === c).length})
            </button>
          ))}
        </div>
        <div className="text-xs text-[#0D3D34]/50">{idx + 1} / {filtered.length}</div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden mb-6">
        <div className="h-full bg-[#D7FF00] rounded-full transition-all" style={{ width: `${((idx) / filtered.length) * 100}%` }} />
      </div>

      {/* Card */}
      {card && (
        <div className="mb-6" style={{ perspective: "1000px" }}>
          <div
            onClick={() => setFlipped(!flipped)}
            className="cursor-pointer relative"
            style={{ transformStyle: "preserve-3d", transition: "transform 0.4s", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", minHeight: "240px" }}
          >
            {/* Front */}
            <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-[#D1DFD8]" style={{ backfaceVisibility: "hidden", backgroundColor: CAT_COLORS[card.category] ?? "#0D3D34" }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-60" style={{ color: CAT_TEXT[card.category] ?? "#D7FF00" }}>{card.category}</div>
              <p className="text-lg font-bold leading-relaxed" style={{ color: CAT_TEXT[card.category] ?? "#D7FF00" }}>{card.q}</p>
              <div className="mt-6 text-[10px] opacity-40" style={{ color: CAT_TEXT[card.category] ?? "#D7FF00" }}>klikněte pro odpověď →</div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-white border border-[#D1DFD8]" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#0D3D34]/40">{card.category}</div>
              <pre className="text-base font-bold text-[#0D3D34] leading-relaxed whitespace-pre-wrap font-sans text-center">{card.a}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {flipped && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => answer("neznam")}
            className="py-3.5 rounded-xl border-2 border-red-200 bg-red-50 text-red-700 font-bold text-sm hover:bg-red-100 transition-all"
          >
            ✗ Nevím
          </button>
          <button
            onClick={() => answer("znam")}
            className="py-3.5 rounded-xl border-2 border-[#1A6B5A] bg-[#EBF7F1] text-[#1A6B5A] font-bold text-sm hover:bg-[#B8E8D0] transition-all"
          >
            ✓ Znám
          </button>
        </div>
      )}

      {!flipped && (
        <div className="flex justify-between items-center mt-4">
          <button onClick={() => { if (idx > 0) { setIdx(idx - 1); setFlipped(false); } }} disabled={idx === 0} className="text-xs text-[#0D3D34]/40 hover:text-[#0D3D34] disabled:opacity-20 transition-colors">← Předchozí</button>
          <div className="flex gap-1.5">
            {Object.values(results).slice(-5).map((r, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${r === "znam" ? "bg-[#1A6B5A]" : "bg-red-400"}`} />
            ))}
          </div>
          <button onClick={() => { setIdx(Math.min(idx + 1, filtered.length - 1)); setFlipped(false); }} disabled={idx >= filtered.length - 1} className="text-xs text-[#0D3D34]/40 hover:text-[#0D3D34] disabled:opacity-20 transition-colors">Přeskočit →</button>
        </div>
      )}
    </div>
  );
}
