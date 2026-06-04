"use client";
import { useState } from "react";

type Supplier = {
  id: string;
  name: string;
  logo: string;
  note: string;
  products: {
    name: string;
    price: string;
    commitment: string;
    monthly: string;
    note: string;
  }[];
};

const SUPPLIERS: Supplier[] = [
  {
    id: "cez",
    name: "ČEZ Prodej",
    logo: "⚡",
    note: "Největší dodavatel elektřiny v ČR. Silná značka, rozsáhlá síť.",
    products: [
      { name: "Elektřina FIX 12M", price: "~3 100 Kč/MWh", commitment: "12 měsíců", monthly: "~180 Kč/měs", note: "Standardní vstupní produkt" },
      { name: "Elektřina FIX 24M", price: "~2 950 Kč/MWh", commitment: "24 měsíců", monthly: "~180 Kč/měs", note: "Nejprodávanější produkt ČEZ" },
      { name: "Plyn FIX 24M", price: "~1 750 Kč/MWh", commitment: "24 měsíců", monthly: "~180 Kč/měs", note: "Standardní plynový produkt" },
    ],
  },
  {
    id: "eon",
    name: "E.ON Energie",
    logo: "🔵",
    note: "Druhý největší dodavatel. Silný v Jihomoravském kraji a FVE segmentu.",
    products: [
      { name: "Elektřina FIX 12M", price: "~3 050 Kč/MWh", commitment: "12 měsíců", monthly: "~165 Kč/měs", note: "Dostupný online" },
      { name: "Elektřina FIX 24M", price: "~2 900 Kč/MWh", commitment: "24 měsíců", monthly: "~175 Kč/měs", note: "Nejprodávanější E.ON" },
      { name: "Plyn FIX", price: "~1 680 Kč/MWh", commitment: "12–24 měsíců", monthly: "~165 Kč/měs", note: "Silný v jižní a střední ČR" },
    ],
  },
  {
    id: "pre",
    name: "PRE (Pražská energetika)",
    logo: "🏙️",
    note: "Dominantní dodavatel v Praze. Silná lokální pozice, prémiová image.",
    products: [
      { name: "Elektřina FIX", price: "~3 200 Kč/MWh", commitment: "12–24 měsíců", monthly: "~190 Kč/měs", note: "Praha a okolí" },
      { name: "Plyn FIX", price: "~1 800 Kč/MWh", commitment: "12–24 měsíců", monthly: "~190 Kč/měs", note: "Prémiový segment" },
    ],
  },
  {
    id: "centropol",
    name: "Centropol Energy",
    logo: "🟡",
    note: "Agresivní cenová politika. Sází na nejnižší ceny, menší servis.",
    products: [
      { name: "Elektřina FIX", price: "~2 800 Kč/MWh", commitment: "24 měsíců", monthly: "~150 Kč/měs", note: "Cena je hlavní argument" },
      { name: "Plyn FIX", price: "~1 550 Kč/MWh", commitment: "24 měsíců", monthly: "~150 Kč/měs", note: "Minimalistický servis" },
    ],
  },
  {
    id: "lumius",
    name: "Lumius",
    logo: "💡",
    note: "Rostoucí dodavatel. Soustředí se na zákazníky s FVE a moderní energetiku.",
    products: [
      { name: "Elektřina FIX 24M", price: "~2 920 Kč/MWh", commitment: "24 měsíců", monthly: "~170 Kč/měs", note: "Populární u zákazníků s FVE" },
      { name: "FVE výkup", price: "~450–550 Kč/MWh", commitment: "12 měsíců", monthly: "~59 Kč/měs", note: "Přímý konkurent ve výkupu" },
    ],
  },
  {
    id: "ep-energy",
    name: "EP Energy Trading",
    logo: "🏭",
    note: "Silný v průmyslovém a komerčním segmentu. Menší přítomnost u domácností.",
    products: [
      { name: "Elektřina FIX", price: "~2 980 Kč/MWh", commitment: "12–36 měsíců", monthly: "~175 Kč/měs", note: "Primárně firemní klientela" },
    ],
  },
  {
    id: "nano",
    name: "Nano Energies",
    logo: "⚛️",
    note: "Technologická firma zaměřená na SPOT a flexibilitu. Cílí na tech-savvy zákazníky.",
    products: [
      { name: "SPOT elektřina", price: "tržní + přirážka", commitment: "na dobu neurčitou", monthly: "~99–199 Kč/měs", note: "Primárně SPOT produkty" },
      { name: "FVE výkup SPOT", price: "tržní cena OTE", commitment: "na dobu neurčitou", monthly: "~99–199 Kč/měs", note: "Silný konkurent ve výkupu SPOT" },
    ],
  },
  {
    id: "mnd",
    name: "MND (Moravské naftové doly)",
    logo: "🔶",
    note: "Silný v dodávce plynu. Vlastní těžba plynu v ČR a SR.",
    products: [
      { name: "Plyn FIX 24M", price: "~1 620 Kč/MWh", commitment: "24 měsíců", monthly: "~165 Kč/měs", note: "Specialista na plyn" },
      { name: "Elektřina FIX", price: "~3 000 Kč/MWh", commitment: "12–24 měsíců", monthly: "~170 Kč/měs", note: "Sekundární produkt" },
    ],
  },
  {
    id: "lama",
    name: "Lama Energy",
    logo: "🦙",
    note: "Online dodavatel s agresivními cenami. Minimální pobočková síť.",
    products: [
      { name: "Elektřina FIX 24M", price: "~2 850 Kč/MWh", commitment: "24 měsíců", monthly: "~140 Kč/měs", note: "Pouze online sjednání" },
    ],
  },
  {
    id: "innogy",
    name: "innogy (RWE)",
    logo: "🌿",
    note: "Silná mezinárodní značka. Zaměřuje se na zelené produkty a udržitelnost.",
    products: [
      { name: "Zelená elektřina FIX", price: "~3 100 Kč/MWh", commitment: "24 měsíců", monthly: "~185 Kč/měs", note: "Prémiový zelený produkt" },
      { name: "Plyn FIX", price: "~1 720 Kč/MWh", commitment: "24 měsíců", monthly: "~180 Kč/měs", note: "Zelený certifikát v ceně" },
    ],
  },
];

const ELECTREE_PRODUCTS = [
  { name: "HOME FIX 12", price: "2 549 Kč/MWh", commitment: "12 měsíců", monthly: "~156 Kč/měs", type: "el" },
  { name: "HOME FIX 24 ⭐", price: "2 349 Kč/MWh", commitment: "24 měsíců", monthly: "~180 Kč/měs", type: "el" },
  { name: "HOME FIX 36", price: "2 299 Kč/MWh", commitment: "36 měsíců", monthly: "~180 Kč/měs", type: "el" },
  { name: "HOME FIX PLYN 24 ⭐", price: "1 299 Kč/MWh", commitment: "24 měsíců", monthly: "~180 Kč/měs", type: "plyn" },
  { name: "Solar FIX (FVE)", price: "500 Kč/MWh výkup", commitment: "12 měsíců", monthly: "59 Kč/měs", type: "fve" },
];

export default function KonkurencePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const supplier = SUPPLIERS.find(s => s.id === selected);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Konkurence</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Srovnání s top 10 českými dodavateli energií</p>
      </div>

      {/* Supplier dropdown */}
      <div className="relative mb-8 max-w-sm">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-3 bg-white border-2 border-[#D1DFD8] hover:border-[#0D3D34]/30 rounded-2xl px-5 py-3.5 text-left transition-all"
        >
          {supplier ? (
            <div className="flex items-center gap-3">
              <span className="text-xl">{supplier.logo}</span>
              <span className="font-semibold text-[#0D3D34] text-sm">{supplier.name}</span>
            </div>
          ) : (
            <span className="text-[#0D3D34]/40 text-sm">Vyberte dodavatele...</span>
          )}
          <svg className={`text-[#0D3D34]/40 transition-transform ${open ? "rotate-180" : ""}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D1DFD8] rounded-2xl shadow-xl overflow-hidden z-20">
            {SUPPLIERS.map((s) => (
              <button key={s.id} onClick={() => { setSelected(s.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-[#EBF7F1] transition-colors border-b border-[#D1DFD8] last:border-0 ${selected === s.id ? "bg-[#EBF7F1]" : ""}`}
              >
                <span className="text-lg">{s.logo}</span>
                <div>
                  <div className="text-sm font-semibold text-[#0D3D34]">{s.name}</div>
                  <div className="text-[10px] text-[#0D3D34]/40 truncate">{s.note}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {!supplier && (
        <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-12 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h3 className="font-bold text-[#0D3D34] mb-1">Vyberte dodavatele ze seznamu</h3>
          <p className="text-[#0D3D34]/50 text-sm">Zobrazíme srovnání jejich produktů s nabídkou Electree</p>
        </div>
      )}

      {supplier && (
        <div>
          {/* Supplier header */}
          <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5 mb-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EBF7F1] flex items-center justify-center text-2xl flex-shrink-0">{supplier.logo}</div>
            <div>
              <h2 className="font-bold text-[#0D3D34] text-lg">{supplier.name}</h2>
              <p className="text-[#0D3D34]/60 text-sm mt-0.5">{supplier.note}</p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Competitor products */}
            <div>
              <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="text-base">{supplier.logo}</span> Produkty {supplier.name}
              </div>
              <div className="space-y-2">
                {supplier.products.map((p, i) => (
                  <div key={i} className="bg-white border border-[#D1DFD8] rounded-xl p-4">
                    <div className="font-semibold text-[#0D3D34] text-sm mb-2">{p.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-[#0D3D34]/40">Cena: </span><span className="font-medium text-[#0D3D34]">{p.price}</span></div>
                      <div><span className="text-[#0D3D34]/40">Vázanost: </span><span className="font-medium text-[#0D3D34]">{p.commitment}</span></div>
                      <div><span className="text-[#0D3D34]/40">Paušál: </span><span className="font-medium text-[#0D3D34]">{p.monthly}</span></div>
                    </div>
                    {p.note && <div className="text-[10px] text-[#0D3D34]/40 mt-2 italic">{p.note}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Electree products */}
            <div>
              <div className="text-xs font-bold text-[#1A6B5A] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span>⚡</span> Naše produkty – Electree
              </div>
              <div className="space-y-2">
                {ELECTREE_PRODUCTS.map((p, i) => (
                  <div key={i} className="bg-[#EBF7F1] border border-[#B8E8D0] rounded-xl p-4">
                    <div className="font-semibold text-[#0D3D34] text-sm mb-2">{p.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-[#0D3D34]/40">Cena: </span><span className="font-bold text-[#1A6B5A]">{p.price}</span></div>
                      <div><span className="text-[#0D3D34]/40">Vázanost: </span><span className="font-medium text-[#0D3D34]">{p.commitment}</span></div>
                      <div><span className="text-[#0D3D34]/40">Paušál: </span><span className="font-medium text-[#0D3D34]">{p.monthly}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Electree advantages */}
          <div className="mt-6 bg-[#0D3D34] rounded-2xl p-5">
            <div className="text-[10px] font-bold text-[#D7FF00] uppercase tracking-widest mb-3">Naše argumenty oproti {supplier.name}</div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: "💰", title: "Cena komodity", text: "HOME FIX 24 za 2 349 Kč/MWh je konkurenceschopná cena s 2letou fixací" },
                { icon: "☀️", title: "FVE expertise", text: "17 000 výrobních míst – jsme specialisté na výkup FVE přetoků" },
                { icon: "🤝", title: "Plná moc", text: "Přechod bez starostí – výpověď za zákazníka zařídíme my" },
              ].map((a, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3">
                  <div className="text-lg mb-1">{a.icon}</div>
                  <div className="text-white text-xs font-semibold mb-0.5">{a.title}</div>
                  <div className="text-white/50 text-[10px] leading-relaxed">{a.text}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-[#0D3D34]/30 mt-4 text-center">
            * Ceny konkurence jsou orientační a mohou se lišit. Vždy ověřte aktuální ceník na webu dodavatele.
          </p>
        </div>
      )}
    </div>
  );
}
