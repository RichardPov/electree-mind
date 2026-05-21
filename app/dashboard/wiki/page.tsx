"use client";
import { useState } from "react";

// ── PRODUKTY DATA (reálné ceny z PPTX prezentací, platnost od 22.4.2026) ──────

const ELEKTRINA_HOME = [
  { name: "HOME FIX 12", months: 12, mwh_dph: "3 084,29", mwh_bez: "2 549,00", pausal: "156,09", tag: "" },
  { name: "HOME FIX 24", months: 24, mwh_dph: "2 842,29", mwh_bez: "2 349,00", pausal: "180,29", tag: "Doporučený" },
  { name: "HOME FIX 36", months: 36, mwh_dph: "2 781,79", mwh_bez: "2 299,00", pausal: "180,29", tag: "Nejlevnější" },
];

const ELEKTRINA_EXPERT = [
  { name: "EXPERT FIX 12", months: 12, mwh_dph: "3 205,29", mwh_bez: "2 649,00", pausal: "156,09", tag: "" },
  { name: "EXPERT FIX 24", months: 24, mwh_dph: "2 963,29", mwh_bez: "2 449,00", pausal: "180,29", tag: "Nejoblíbenější ⭐" },
  { name: "EXPERT FIX 36", months: 36, mwh_dph: "2 902,79", mwh_bez: "2 399,00", pausal: "180,29", tag: "Nejlevnější komodita" },
];

const PLYN_HOME = [
  { name: "HOME FIX 12", months: 12, mwh_dph: "1 632,29", mwh_bez: "1 349,00", pausal: "156,09", tag: "" },
  { name: "HOME FIX 24", months: 24, mwh_dph: "1 571,79", mwh_bez: "1 299,00", pausal: "180,29", tag: "Doporučený ⭐" },
  { name: "HOME FIX 36", months: 36, mwh_dph: "1 571,79", mwh_bez: "1 299,00", pausal: "180,29", tag: "Stejná cena jako 24M!" },
];

const FVE_PRODUKTY = [
  { name: "Home Solar FIX MINI", limit: "do 1 MWh/rok", vykup: "1 000", pausal: "39", note: "ZK musí mít odběr elektřiny u Tramaco." },
  { name: "Home Solar FIX", limit: "do 10 MWh/rok", vykup: "500", pausal: "59", note: "Nejpopulárnější. Střední střešní FVE." },
  { name: "Home Solar FIX MAXI", limit: "nad 10 MWh/rok", vykup: "400", pausal: "99", note: "Velká FVE, vysoká výroba." },
  { name: "Expert Solar FIX MINI", limit: "do 1 MWh/rok", vykup: "1 000", pausal: "39", note: "Pro firmy s IČO." },
  { name: "Expert Solar FIX", limit: "do 10 MWh/rok", vykup: "500", pausal: "59", note: "Nejoblíbenější pro firmy." },
  { name: "Expert Solar FIX MAXI", limit: "nad 10 MWh/rok", vykup: "400", pausal: "59", note: "Velká FVE, firma." },
];

const SAZBY = [
  { code: "D01d", desc: "Jednotarifní – malý odběr, chaty, garáže. Jedna sazba celý den, žádný NT." },
  { code: "D02d", desc: "Jednotarifní – běžná domácnost. Standardní odběr." },
  { code: "D25d / D26d", desc: "Dvoutarifní – bojler a akumulační vytápění. 8 hodin NT." },
  { code: "D27d", desc: "Dvoutarifní – elektromobil. 8 hodin NT." },
  { code: "D35d", desc: "Dvoutarifní – kombinované vytápění. 20 hodin NT. Již se nenabízí." },
  { code: "C01d", desc: "Jednotarifní – malé provozovny, obchody, kanceláře." },
  { code: "C02d", desc: "Jednotarifní – střední odběr. Dílny, výrobní haly." },
  { code: "C03d", desc: "Jednotarifní – velký odběr. Továrny, velkovýroba. Vyšší jistič." },
  { code: "C25d / C26d", desc: "Dvoutarifní – akumulační spotřebiče. 8 hodin NT." },
];

// ── SOPs DATA ──────────────────────────────────────────────────────────────────

const SOPS = [
  {
    id: "zalozeni",
    title: "Založení zákazníka",
    icon: "👤",
    steps: [
      { title: "Ověřit existenci ZK", content: "Otevřeme EIS. V prvním kroku vždy zkusíme, jestli ZK u nás není. Klikneme na Hledat, zadáme e-mail nebo jméno a dáme ENTER." },
      { title: "Nový zákazník (domácnost)", content: "Pokud ZK nenajdeme → klikneme NOVÝ. Vyplníme: Typ zákazníka (Domácnost / Podnikatel), Jméno, Příjmení, Datum narození, Telefon, E-mail, Adresa trvalého bydliště. Uložíme." },
      { title: "Nový zákazník (podnikatel)", content: "Vyplníme IČO → klikneme Ověřit v ARES. Automaticky se natáhnou údaje ze systému ARES. Vyplníme Zastupující osobu, telefon, e-mail. Uložíme." },
    ],
    warning: 'NIKDY nepodpisuj HOME smlouvu firmě a EXPERT smlouvu fyzické osobě! Vždy se zeptej: „Podepisujete jako fyzická osoba nebo firma?“',
  },
  {
    id: "smlouva-dodavka",
    title: "Smlouva – dodávka elektřiny",
    icon: "⚡",
    steps: [
      { title: "Podklady od ZK", content: "Potřebujeme: vyplněnou žádost + poslední fakturu od stávajícího obchodníka (z ní zjistíme EAN, distribuční sazbu, spotřebu, jistič)." },
      { title: "Vytvoření smluvního účtu", content: "V záložce Smlouvy a Odběrná místa klikneme NOVÝ. Zadáme: Typ smlouvy → Spotřeba. Vygenerujeme číslo smlouvy. Typ: Doba neurčitá (SPOT) nebo Doba určitá (FIX). Datum od dle stávající smlouvy. Výpovědní doba: SPOT domácnost 1 měsíc, SPOT firma 3 měsíce. FIX domácnost: nejpozději 20 dní před koncem fixace. FIX firma: nejpozději 3 měsíce." },
      { title: "Technické údaje", content: "Typ měření: A = vysoké napětí, B = chytrý elektroměr (FVE, měsíční fakturace), C1 = nový standard místo B. Distribuční sazbu opíšeme z faktury. Roční spotřeba VT/NT. Způsob připojení: jednofázové nebo třífázové. Hodnota jističe: jen číslo (ne fáze) – např. 3×25A → zadáme 25. Číslo měřidla = číslo elektroměru." },
      { title: "Odeslání k podpisu", content: "Vyplníme adresu OM → Uložíme. Veškeré podklady uložíme do Dokumentů. Klikneme Vytvořit a odeslat novou smlouvu k podpisu do SIGNI. Záložka Zprávy → pošleme e-mail ZK s návodem na podpis." },
      { title: "Uzavření úkolu", content: 'V záložce Zákazník se vytvoří automaticky úkol Registrace zákazníka. Editujeme: Stav = Dokončený, Typ = Nová smlouva, Přiřadit = vlastní jméno. Do poznámky: „Smlouva na dodávku odeslána [datum]". Uložit.' },
    ],
    warning: "VT/NT výpočet: pokud znáš jen celkovou spotřebu a ZK má dvoutarifní sazbu: 8h NT = 33 % VT, 16h NT = 67 % VT, 20h NT = 83 % VT, 22h NT = 91 % VT.",
  },
  {
    id: "smlouva-vykup",
    title: "Smlouva – výkup elektřiny (FVE)",
    icon: "☀️",
    steps: [
      { title: "Podklady – výrobní EAN", content: "Potřebujeme výrobní EAN (≠ spotřební EAN). Zákazník ho najde v: dokumentu o prvním paralelním připojení (PPP), smlouvě o připojení (SoP), předchozím vyúčtování, nebo e-mailu od distribuce. ⚠️ POZOR: v dokumentu UTP (uvedení do trvalého provozu) je VŽDY uveden EAN spotřební – nezaměňovat!" },
      { title: "Smluvní účet", content: "Záložka Smlouvy a Odběrná místa → NOVÝ. Typ smlouvy: Výroba. Vygenerujeme číslo. Typ: Doba neurčitá (SPOT) nebo Doba určitá (FIX). Datum od: dle předchozí smlouvy, u nové FVE 10–14 dní. Výpovědní doba: 3 měsíce vždy. SPOT: od 1. dne následujícího měsíce po výpovědi. FIX: zákazník musí dát výpověď nejpozději 3 měsíce před koncem fixace." },
      { title: "Výběr produktu", content: "Partner = Electree Interní. BO = Smlouva Online. Do poznámky: EAN výrobce, o jakou smlouvu jde, co je potřeba udělat. Vybereme produkt dle výroby: do 1 MWh = FIX MINI (1 000 Kč/MWh, 39 Kč paušál), do 10 MWh = FIX (500 Kč/MWh, 59 Kč paušál), nad 10 MWh = FIX MAXI (400 Kč/MWh, 99 Kč paušál)." },
      { title: "Technické údaje FVE", content: "Instalovaný výkon (kWp) z projektu nebo smlouvy s instalátorem. Druh výrobny: Fotovoltaika. Kapacita baterie (pokud má). Typ měření: B nebo C1. Střídač – značka a model. OM = adresa FVE. Uložíme." },
      { title: "Odeslání a uzavření", content: "Podklady do Dokumentů → odeslat smlouvu k podpisu do SIGNI. Úkol Registrace zákazníka: Stav = Dokončený, Typ = Nová smlouva, do poznámky datum odeslání. Orientační výpočet roční dodávky do sítě: (velikost baterie × 180 – instalovaný výkon) ÷ 2 = MWh/rok. Příklad: (14,2 × 180 – 10 000) ÷ 2 = 3,7 MWh/rok." },
    ],
  },
  {
    id: "prepis",
    title: "Přepis výrobny",
    icon: "🔄",
    steps: [
      { title: "Formulář k přepisu", content: "Od ZK potřebujeme: Žádost o změnu zákazníka – část A (původní ZK) i část B (nový ZK). Doklad o nabytí nebo zániku užívacího práva (kupní/nájemní smlouva). Přepis výrobny se NEZADÁVÁ na distribuci." },
      { title: "Dohledání stávajícího ZK", content: "V EIS dohledáme stávajícího ZK. Nechám si EIS se stávajícím ZK otevřeného – budeme ho potřebovat." },
      { title: "Nový ZK", content: "Otevřeme novou záložku EIS. Kontrola, zda nového ZK nemáme. Pokud ne → Nový ZK klasickým způsobem jako u nové smlouvy. Poté založíme pouze smluvní účet." },
      { title: "Přepis výrobního EAN", content: "U stávajícího ZK zadáme datum ukončení smlouvy (smlouvy musí navazovat). Klikneme u smlouvy na Možnosti → Přepis OM. Vyběhne tabulka – napíšeme jméno nového ZK a vybereme. Nový ZK se zobrazí v kolonce Nový zákazník – pokud ZK u nás je, pozor na výběr správného čísla smlouvy." },
      { title: "Dokončení přepisu", content: "Nyní vybereme produkt (NEPONECHÁVÁME stávající). Zkontrolujeme datum začátku výkupu (musí navazovat). Do poznámky: na koho se přepisuje. Zkontrolujeme technické údaje a adresu OM. Uložíme. Vytvoříme úkol Přepis výrobny. Uložíme podklady. Odešleme smlouvu k podpisu. Uzavřeme úkol registrace ZK." },
    ],
    warning: "Přepis se nezadává na distribuci. Datum přepisu snažíme dodržet do budoucna – v případě úmrtí nebo přelomu měsíce lze provést k 1. dni měsíce.",
  },
  {
    id: "zmena-ceniku",
    title: "Změna ceníku",
    icon: "📋",
    steps: [
      { title: "Formulář ke změně", content: "Při změně cenového produktu chceme od ZK zaslat vyplněný formulář. Pokud ho nechce zaslat, provedeme kontrolu kontaktních a platebních údajů alespoň po telefonu." },
      { title: "Postup v EIS", content: 'Nejprve zadáme konec původní smlouvy – smlouvy musí navazovat. Příklad: nová smlouva od 1.1.2026 → původní ukončíme k 31.12.2025. Uložíme. Proklikneme šedý obdélník s číslem smlouvy → vybereme Nový (kopie). Vyplníme smlouvu dle postupu Smlouva na výkup elektřiny. Do poznámky: „Změna ceníku od 1.1.2026".' },
      { title: "Obnovení původního data", content: "Ihned po uložení nové smlouvy se vrátíme na smlouvu původní a datum konce smlouvy nastavíme na původní datum (většinou 31.12.9999 nebo 31.12.2099). Uložíme." },
      { title: "Dokončení procesu", content: "Uložíme dokumenty. Odešleme mail s informací k podpisu. Odešleme smlouvu k podpisu do SIGNI. Uzavřeme úkol registrace ZK." },
    ],
  },
];

const TABS = [
  { id: "elektrina", label: "⚡ Elektřina" },
  { id: "plyn", label: "🔥 Plyn" },
  { id: "fve", label: "☀️ FVE výkup" },
  { id: "sazby", label: "🔌 Distribuční sazby" },
  { id: "sops", label: "📋 SOPs / Postupy" },
];

function ProductRow({ item }: { item: typeof ELEKTRINA_HOME[0] }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-[#D1DFD8] last:border-0">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#0D3D34]">{item.name}</span>
          {item.tag && <span className="text-[10px] bg-[#D7FF00] text-[#0D3D34] font-bold px-1.5 py-0.5 rounded-full">{item.tag}</span>}
        </div>
        <div className="text-xs text-[#0D3D34]/45 mt-0.5">{item.months} měsíců · paušál {item.pausal} Kč/měs.</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold text-[#0D3D34] font-mono">{item.mwh_dph} Kč/MWh</div>
        <div className="text-[10px] text-[#0D3D34]/40 font-mono">{item.mwh_bez} Kč bez DPH</div>
      </div>
    </div>
  );
}

function SopCard({ sop }: { sop: typeof SOPS[0] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
      <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8] flex items-center gap-3">
        <span className="text-2xl">{sop.icon}</span>
        <h3 className="font-bold text-[#0D3D34]">{sop.title}</h3>
      </div>
      <div className="divide-y divide-[#D1DFD8]">
        {sop.steps.map((step, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-[#F7FAF9] transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-[#0D3D34] text-[#D7FF00] text-[10px] font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <span className="text-sm font-semibold text-[#0D3D34] flex-1">{step.title}</span>
              <svg width="16" height="16" fill="none" stroke="#0D3D34" strokeWidth="2" viewBox="0 0 24 24" className={`flex-shrink-0 opacity-30 transition-transform ${open === i ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open === i && (
              <div className="px-5 pb-4 pt-1">
                <p className="text-sm text-[#0D3D34]/70 leading-relaxed pl-9">{step.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {sop.warning && (
        <div className="px-5 py-3 bg-[#FFF8E1] border-t border-[#D1DFD8] flex gap-2">
          <span className="text-base flex-shrink-0">⚠️</span>
          <p className="text-xs text-[#7A5C00] leading-relaxed">{sop.warning}</p>
        </div>
      )}
    </div>
  );
}

export default function WikiPage() {
  const [tab, setTab] = useState("elektrina");
  const [sopSearch, setSopSearch] = useState("");

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Wiki & SOPs</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Produkty, ceníky (platnost od 22. 4. 2026) a pracovní postupy v EIS.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#EBF7F1] p-1 rounded-xl mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 min-w-fit text-xs font-semibold py-2 px-3 rounded-lg transition-all whitespace-nowrap ${tab === t.id ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/55"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ELEKTŘINA */}
      {tab === "elektrina" && (
        <div className="space-y-5">
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
              <h2 className="font-bold text-[#0D3D34]">HOME FIX – Domácnosti</h2>
              <p className="text-xs text-[#0D3D34]/50 mt-0.5">Fyzická osoba bez IČO. Ceny s DPH.</p>
            </div>
            {ELEKTRINA_HOME.map((p) => <ProductRow key={p.name} item={p} />)}
          </div>
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
              <h2 className="font-bold text-[#0D3D34]">EXPERT FIX – Firmy a podnikatelé</h2>
              <p className="text-xs text-[#0D3D34]/50 mt-0.5">Fyzická nebo právnická osoba s IČO. Ceny s DPH.</p>
            </div>
            {ELEKTRINA_EXPERT.map((p) => <ProductRow key={p.name} item={p} />)}
          </div>
          <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-4 flex gap-3">
            <span className="text-xl">⚠️</span>
            <div className="text-sm text-[#0D3D34]/75 leading-relaxed">
              <strong>NEZAMĚŇOVAT kategorie!</strong> HOME = domácnost bez IČO. EXPERT = firma/podnikatel s IČO. Vždy se zeptej: <em>„Podepisujete smlouvu jako fyzická osoba nebo firma?"</em>
            </div>
          </div>
          <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5">
            <h3 className="font-bold text-[#0D3D34] mb-3">Regulované poplatky (stejné pro HOME i EXPERT)</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                ["Daň z elektřiny", "28,30 Kč/MWh bez DPH"],
                ["Systémové služby (ČEPS)", "164,24 Kč/MWh bez DPH"],
                ["Podpora OZE (POZE)", "0,00 Kč/MWh (aktuálně)"],
                ["Provoz infrastruktury", "12,87 Kč/měs. bez DPH"],
                ["1. upomínka", "zdarma e-mailem"],
                ["2. upomínka", "200 Kč bez DPH"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 py-1 border-b border-[#D1DFD8]">
                  <span className="text-[#0D3D34]/60">{k}</span>
                  <span className="font-mono text-[#0D3D34] font-semibold text-xs">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PLYN */}
      {tab === "plyn" && (
        <div className="space-y-5">
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
              <h2 className="font-bold text-[#0D3D34]">HOME FIX – Zemní plyn pro domácnosti</h2>
              <p className="text-xs text-[#0D3D34]/50 mt-0.5">Ceny s DPH. Distribuci zajišťuje GasNet / Gas Distribution / Pražská plynárenská.</p>
            </div>
            {PLYN_HOME.map((p) => <ProductRow key={p.name} item={p} />)}
          </div>
          <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5">
            <h3 className="font-bold text-[#0D3D34] mb-4">Distribuční pásma zemního plynu</h3>
            <div className="space-y-2">
              {[
                ["do 1,89 MWh/rok", "Velmi malý odběr – chata, garáž s kotlíkem. Nejvyšší distribuční sazba."],
                ["1,89 – 7,56 MWh/rok", "Malý byt nebo firma s minimálním topením."],
                ["7,56 – 15 MWh/rok", "Průměrná domácnost (byt s plynovým kotlem). Nejčastější pásmo."],
                ["15 – 25 MWh/rok", "Větší domácnost nebo malá firma. Rodinný dům."],
                ["25 MWh/rok a více", "Velká spotřeba – výrobní prostory, obchodní centra."],
              ].map(([range, desc]) => (
                <div key={range} className="flex gap-3 py-2 border-b border-[#D1DFD8] last:border-0">
                  <span className="text-xs font-mono font-bold text-[#0D3D34] w-36 flex-shrink-0">{range}</span>
                  <span className="text-xs text-[#0D3D34]/60">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-4">
            <p className="text-sm text-[#0D3D34]/75 leading-relaxed">
              <strong>Zálohy:</strong> Nastavit vždy na zimní spotřebu! Zálohy moc nízké → nedoplatek (zákazník nešťastný). Správné zálohy = klid. U nového zákazníka vždy doporučit zálohu dle reálné spotřeby.
            </p>
          </div>
        </div>
      )}

      {/* FVE */}
      {tab === "fve" && (
        <div className="space-y-5">
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
              <h2 className="font-bold text-[#0D3D34]">Výkupní produkty – pevná cena (FIX)</h2>
              <p className="text-xs text-[#0D3D34]/50 mt-0.5">Zákazník dostává fixní výkupní cenu bez ohledu na burzu. Žádné DPH z výkupu.</p>
            </div>
            <div className="divide-y divide-[#D1DFD8]">
              {FVE_PRODUKTY.map((p) => (
                <div key={p.name} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-[#0D3D34]">{p.name}</div>
                      <div className="text-xs text-[#0D3D34]/45 mt-0.5">Limit: {p.limit} · Paušál: {p.pausal} Kč/měs.</div>
                      <div className="text-xs text-[#1A6B5A] mt-1">{p.note}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-[#0D3D34] font-mono">{p.vykup}</div>
                      <div className="text-[10px] text-[#0D3D34]/40">Kč/MWh</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5">
            <h3 className="font-bold text-[#0D3D34] mb-4">Checklist uzavření smlouvy na výkup</h3>
            <div className="space-y-2">
              {[
                ["01", "Výrobní EAN", "Bez výrobního EAN smlouvu nelze aktivovat. Zákazník ho najde v PPP, SoP nebo u distributora. POZOR: UTP dokument obsahuje EAN spotřební!"],
                ["02", "Typ FVE", "FVE musí být připojena k distribuční síti. Ostrovní systémy (bez připojení) výkupovat nemůžeme."],
                ["03", "Instalovaný výkon (kWp)", "Z projektu FVE nebo smlouvy s instalátorem. Pomůže vybrat FIX MINI / FIX / FIX MAXI."],
                ["04", "Roční výroba (MWh)", "Odhad z projektu nebo monitoringu FVE. Klíčový parametr pro produkt."],
                ["05", "Licenci ERÚ", "Výrobce elektřiny musí mít licenci od ERÚ (Energetický regulační úřad)."],
                ["06", "Smart meter (AMM)", "Pro SPOT výkup je nutný chytrý elektroměr pro hodinové měření."],
              ].map(([num, title, desc]) => (
                <div key={num} className="flex gap-3 items-start py-2 border-b border-[#D1DFD8] last:border-0">
                  <span className="w-6 h-6 rounded-full bg-[#0D3D34] text-[#D7FF00] text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{num}</span>
                  <div>
                    <div className="text-sm font-semibold text-[#0D3D34]">{title}</div>
                    <div className="text-xs text-[#0D3D34]/55 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-4">
            <p className="text-sm text-[#0D3D34]/75 leading-relaxed">
              <strong>Orientační výpočet roční dodávky do sítě:</strong><br />
              (Velikost baterie × 180 − instalovaný výkon FVE) ÷ 2 = MWh/rok<br />
              Příklad: (14,2 × 180 − 10 000) ÷ 2 = <strong>3,7 MWh/rok</strong>. Vždy jen orientačně.
            </p>
          </div>
        </div>
      )}

      {/* SAZBY */}
      {tab === "sazby" && (
        <div className="space-y-5">
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
              <h2 className="font-bold text-[#0D3D34]">Distribuční sazby</h2>
              <p className="text-xs text-[#0D3D34]/50 mt-0.5">Sazbu zákazníka najdeš na jeho faktuře od distributora. Tramaco ji nenastavuje.</p>
            </div>
            <div className="divide-y divide-[#D1DFD8]">
              {SAZBY.map((s) => (
                <div key={s.code} className="flex gap-4 px-5 py-3.5">
                  <span className="text-xs font-mono font-bold text-[#0D3D34] w-24 flex-shrink-0 mt-0.5">{s.code}</span>
                  <span className="text-sm text-[#0D3D34]/65">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5">
            <h3 className="font-bold text-[#0D3D34] mb-4">Typy elektroměrů / měření</h3>
            <div className="space-y-3">
              {[
                ["Typ C – Maloodběr", "Přímé zapojení bez transformátorů, napěťová hladina NN. Standardní odečet ročně nebo samoodečet. Typicky domácnosti a drobní podnikatelé. Jednotarifní nebo dvoutarifní měření."],
                ["Typ B – Střední odběr", "Zapojení přes proudové transformátory, průběhové měření každých 15 minut. Typicky větší firmy, obchodní centra, majitelé FVE nebo ti, co sdílejí elektřinu."],
                ["Typ A – Velkoodběr", "Zapojení přes proudové i napěťové transformátory, napěťová hladina VN a VVN. Povinné průběhové měření každých 15 minut. Průmyslové podniky."],
                ["Typ C1 – Nový standard", "Nyní se místo B instaluje většinou C1. Zákazníci s FVE, měsíční fakturace. Nahrazuje typ B pro nové instalace."],
              ].map(([typ, desc]) => (
                <div key={typ} className="border border-[#D1DFD8] rounded-xl p-4">
                  <div className="text-sm font-bold text-[#0D3D34] mb-1">{typ}</div>
                  <div className="text-xs text-[#0D3D34]/60 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-4">
            <p className="text-sm text-[#0D3D34]/75 leading-relaxed">
              <strong>VT / NT:</strong> Tramaco účtuje STEJNOU cenu komodity za VT i NT. Výhodu NT tarifu zákazník má pouze v distribuci (levnější v noci u dvoutarifních sazeb D25d, D26d...).
            </p>
          </div>
        </div>
      )}

      {/* SOPs */}
      {tab === "sops" && (
        <div className="space-y-5">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D3D34]/30" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              value={sopSearch}
              onChange={(e) => setSopSearch(e.target.value)}
              placeholder="Hledat v postupech..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1DFD8] rounded-xl text-sm text-[#0D3D34] focus:outline-none focus:border-[#0D3D34]/30"
            />
          </div>
          {SOPS.filter((s) =>
            !sopSearch || s.title.toLowerCase().includes(sopSearch.toLowerCase()) ||
            s.steps.some((st) => st.title.toLowerCase().includes(sopSearch.toLowerCase()) || st.content.toLowerCase().includes(sopSearch.toLowerCase()))
          ).map((sop) => <SopCard key={sop.id} sop={sop} />)}
        </div>
      )}
    </div>
  );
}
