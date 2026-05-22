"use client";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  priceMWh: number;
  pausal: number;
  fixace: string;
  type: "home" | "expert";
  tag?: string;
};

const ELEKTRINA: Product[] = [
  { id: "hf12", name: "HOME FIX 12", priceMWh: 3084.29, pausal: 156.09, fixace: "12 měs.", type: "home" },
  { id: "hf24", name: "HOME FIX 24", priceMWh: 2842.29, pausal: 180.29, fixace: "24 měs.", type: "home", tag: "Doporučeno" },
  { id: "hf36", name: "HOME FIX 36", priceMWh: 2781.79, pausal: 180.29, fixace: "36 měs.", type: "home" },
  { id: "ef12", name: "EXPERT FIX 12", priceMWh: 3205.29, pausal: 156.09, fixace: "12 měs.", type: "expert" },
  { id: "ef24", name: "EXPERT FIX 24", priceMWh: 2963.29, pausal: 180.29, fixace: "24 měs.", type: "expert" },
  { id: "ef36", name: "EXPERT FIX 36", priceMWh: 2902.79, pausal: 180.29, fixace: "36 měs.", type: "expert" },
];

const PLYN: Product[] = [
  { id: "pf12", name: "HOME FIX 12", priceMWh: 1632.29, pausal: 108.89, fixace: "12 měs.", type: "home" },
  { id: "pf24", name: "HOME FIX 24", priceMWh: 1571.79, pausal: 108.89, fixace: "24 měs.", type: "home", tag: "Doporučeno" },
  { id: "pf36", name: "HOME FIX 36", priceMWh: 1571.79, pausal: 108.89, fixace: "36 měs.", type: "home" },
];

const FMT = (n: number) =>
  n.toLocaleString("cs-CZ", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export default function KalkulatorPage() {
  const [tab, setTab] = useState<"e" | "p">("e");
  const [kwhStr, setKwhStr] = useState("3500");
  const [showExpert, setShowExpert] = useState(false);

  const kwh = parseFloat(kwhStr.replace(/\s/g, "").replace(",", ".")) || 0;
  const mwh = kwh / 1000;

  const products = tab === "e" ? ELEKTRINA : PLYN;
  const filtered = showExpert ? products : products.filter((p) => p.type === "home");

  const rows = filtered
    .map((p) => {
      const komoditaRocne = mwh * p.priceMWh;
      const pausalRocne = p.pausal * 12;
      const totalRocne = komoditaRocne + pausalRocne;
      const totalMesicne = totalRocne / 12;
      return { ...p, komoditaRocne, pausalRocne, totalRocne, totalMesicne };
    })
    .sort((a, b) => a.totalRocne - b.totalRocne);

  const cheapest = rows[0];
  const mostExpensive = rows[rows.length - 1];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Kalkulačka spotřeby</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Zadejte roční spotřebu a porovnejte náklady na všechny produkty</p>
      </div>

      {/* Input */}
      <div className="bg-white border border-[#D1DFD8] rounded-2xl p-6 mb-6">
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex gap-1 bg-[#EBF7F1] p-1 rounded-xl">
            <button onClick={() => setTab("e")} className={`text-sm font-semibold px-4 py-1.5 rounded-lg transition-all ${tab === "e" ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/50"}`}>⚡ Elektřina</button>
            <button onClick={() => setTab("p")} className={`text-sm font-semibold px-4 py-1.5 rounded-lg transition-all ${tab === "p" ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/50"}`}>🔥 Plyn</button>
          </div>

          <div className="flex-1 min-w-48">
            <label className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest block mb-1">Roční spotřeba (kWh)</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={kwhStr}
                onChange={(e) => setKwhStr(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-[#EBF7F1] border border-[#D1DFD8] rounded-xl text-sm text-[#0D3D34] font-semibold focus:outline-none focus:border-[#0D3D34]/30"
                placeholder="3500"
              />
              <span className="text-sm text-[#0D3D34]/50 font-medium">kWh / rok</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {[1500, 2500, 3500, 5000, 8000].map((v) => (
              <button key={v} onClick={() => setKwhStr(String(v))} className={`text-xs px-3 py-2 rounded-lg border font-semibold transition-all ${kwhStr === String(v) ? "bg-[#0D3D34] text-[#D7FF00] border-[#0D3D34]" : "bg-white border-[#D1DFD8] text-[#0D3D34]/60 hover:border-[#0D3D34]/30"}`}>
                {v.toLocaleString("cs")}
              </button>
            ))}
          </div>

          {tab === "e" && (
            <label className="flex items-center gap-2 text-xs text-[#0D3D34]/60 cursor-pointer">
              <input type="checkbox" checked={showExpert} onChange={(e) => setShowExpert(e.target.checked)} className="rounded" />
              Zobrazit EXPERT FIX (firmy)
            </label>
          )}
        </div>

        {kwh > 0 && (
          <div className="mt-4 pt-4 border-t border-[#D1DFD8] grid grid-cols-3 gap-4">
            <div>
              <div className="text-[10px] text-[#0D3D34]/40 uppercase tracking-widest">Spotřeba v MWh</div>
              <div className="text-lg font-bold text-[#0D3D34]">{mwh.toFixed(2)} MWh</div>
            </div>
            <div>
              <div className="text-[10px] text-[#0D3D34]/40 uppercase tracking-widest">Nejlevnější produkt</div>
              <div className="text-lg font-bold text-[#1A6B5A]">{cheapest?.name}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#0D3D34]/40 uppercase tracking-widest">Úspora vs. nejdražší</div>
              <div className="text-lg font-bold text-[#D7FF00] [text-shadow:0_0_0_#0D3D34]" style={{ color: "#1A6B5A" }}>
                {FMT(mostExpensive.totalRocne - cheapest.totalRocne)} Kč/rok
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results table */}
      {kwh > 0 && (
        <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#D1DFD8] bg-[#F7FAF9]">
            <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">
              Srovnání produktů pro {kwh.toLocaleString("cs")} kWh / rok (s DPH)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D1DFD8]">
                  {["Produkt", "Fixace", "Komodita/MWh", "Komodita/rok", "Paušál/rok", "Celkem/rok", "Celkem/měsíc"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const isCheapest = i === 0;
                  return (
                    <tr key={row.id} className={`border-b border-[#D1DFD8] last:border-0 ${isCheapest ? "bg-[#EBF7F1]" : ""}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#0D3D34]">{row.name}</span>
                          {row.tag && <span className="text-[9px] font-bold bg-[#D7FF00] text-[#0D3D34] px-1.5 py-0.5 rounded-full">{row.tag}</span>}
                          {isCheapest && <span className="text-[9px] font-bold bg-[#1A6B5A] text-white px-1.5 py-0.5 rounded-full">NEJLEVNĚJŠÍ</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#0D3D34]/60">{row.fixace}</td>
                      <td className="px-4 py-3 text-xs font-mono text-[#0D3D34]">{row.priceMWh.toLocaleString("cs-CZ", { minimumFractionDigits: 2 })} Kč</td>
                      <td className="px-4 py-3 text-xs font-mono text-[#0D3D34]">{FMT(row.komoditaRocne)} Kč</td>
                      <td className="px-4 py-3 text-xs font-mono text-[#0D3D34]/60">{FMT(row.pausalRocne)} Kč</td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold ${isCheapest ? "text-[#1A6B5A]" : "text-[#0D3D34]"}`}>
                          {FMT(row.totalRocne)} Kč
                        </span>
                        {i > 0 && (
                          <div className="text-[10px] text-red-500">+{FMT(row.totalRocne - cheapest.totalRocne)} Kč</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-[#0D3D34]/70">
                        {FMT(row.totalMesicne)} Kč
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 bg-[#EBF7F1] border-t border-[#D1DFD8]">
            <p className="text-xs text-[#0D3D34]/60">
              Výpočet: roční náklady = (spotřeba v MWh × cena komodity) + (paušál × 12). Ceny jsou s DPH dle ceníku platného od 22. 4. 2026. Skutečné náklady se mohou lišit dle distribuce.
            </p>
          </div>
        </div>
      )}

      {kwh === 0 && (
        <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">🧮</div>
          <p className="text-[#0D3D34]/50 text-sm">Zadejte roční spotřebu v kWh pro výpočet</p>
        </div>
      )}
    </div>
  );
}
