"use client";
import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";

type Section = {
  id: string;
  title: string;
  lead: string;
  points: string[];
  insight: string;
};

type Module = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  sections: Section[];
};

const MODULES: Module[] = [
  {
    id: "kdo-jsme",
    title: "Kdo jsme",
    subtitle: "Identita a pozice Electree na trhu",
    icon: "🏢",
    color: "#0D3D34",
    sections: [
      {
        id: "firma",
        title: "Co je Electree",
        lead: "Electree je moderní energetická firma z Brna – specialisté na výkup FVE přetoků s důrazem na transparentnost a osobní přístup.",
        points: [
          "Dodávka elektřiny pro domácnosti i firmy (FIX i SPOT)",
          "Dodávka plynu – kompletní energetické řešení",
          "Výkup přetoků z fotovoltaiky – naše historická síla",
          "Za firmou stojí Lubomír Káňa a Ruben Marada",
        ],
        insight: "Electree nevznikla jako typický dodavatel energií. Od začátku byla postavena na FVE výkupu a moderní práci s obnovitelnými zdroji.",
      },
      {
        id: "trh",
        title: "Kde jsme na trhu",
        lead: "Electree je menší až střední hráč na českém energetickém trhu, ale ve výkupu FVE patříme mezi přední poskytovatele.",
        points: [
          "~17 000 výrobních míst (výkup FVE) – naše největší silná stránka",
          "~24 000 odběrných míst elektřiny",
          "~3 500 odběrných míst plynu",
          "Největší konkurenti: ČEZ, E.ON, PRE",
        ],
        insight: "Nesrovnávejte se s ČEZ nebo E.ON na jejich hřišti. Hrajeme jinou hru – menší, rychlejší, osobnější. A ve výkupu FVE je Electree opravdu silná.",
      },
      {
        id: "sila",
        title: "Naše výhody v hovoru",
        lead: "Zákazník nemění distribuci – jen dodavatele na faktuře. Vědět proč je Electree lepší volba je základ každého hovoru.",
        points: [
          "Specialisté na FVE – rozumíme fotovoltaice lépe než velcí hráči",
          "Osobní přístup – nejsme call centrum pro miliony zákazníků",
          "Transparentní ceník – zákazník vždy ví, co platí a za co",
          "Electree Connect – vlastní aplikace pro správu smlouvy",
        ],
        insight: "Mluvte o férovosti, jednoduchosti a FVE expertíze. Nikdy se přímo nesrovnávejte s ČEZ – srovnejte konkrétní úsporu v Kč.",
      },
    ],
  },
  {
    id: "energetika",
    title: "Základy energetiky",
    subtitle: "Pojmy, které musíte znát zpaměti",
    icon: "⚡",
    color: "#0D3D34",
    sections: [
      {
        id: "role",
        title: "Dodavatel vs. distributor",
        lead: "Zákazník nemůže změnit distributora – ten je daný lokalitou. Mění pouze dodavatele, tedy firmu na faktuře.",
        points: [
          "Distributor: vlastní síť, fyzicky dopraví elektřinu ke dveřím zákazníka",
          "Dodavatel: prodává elektřinu, zákazník si ho svobodně vybírá",
          "Při výpadku volají všichni zákazníci v regionu stejné číslo distributora",
          "Totéž pro plyn: GasNet, Gas Distribution = distributoři",
        ],
        insight: "Zákazník se bojí 'co bude s elektřinou'. Vysvětlete: kabel zůstane stejný, mění se jen firma na faktuře a číslo pro zákaznický servis.",
      },
      {
        id: "fix-spot",
        title: "FIX a SPOT tarify",
        lead: "FIX dává jistotu pevné ceny. SPOT kopíruje burzu OTE – každou hodinu jiná cena.",
        points: [
          "FIX: cena domluvená dopředu na celou dobu smlouvy – žádná překvapení",
          "SPOT: cena závisí na burze OTE, mění se každých 60 minut",
          "SPOT potřebuje smart metr AMM – bez něj nelze aktivovat",
          "V zimních špičkách může SPOT dosáhnout 6–8 Kč/kWh (FIX 24 = 2,35 Kč/kWh)",
        ],
        insight: "FIX nabídněte 90 % zákazníků. SPOT pouze těm, kdo rozumí trhu, mají AMM metr a flexibilní spotřebu (EV, FVE, noční nabíjení).",
      },
      {
        id: "fve",
        title: "Výkup přebytků z FVE",
        lead: "Zákazník s fotovoltaikou část elektřiny spotřebuje doma, přebytky (přetoky) pošle do sítě – a Electree je může vykoupit.",
        points: [
          "Odběrné místo: zákazník elektřinu KUPUJE (faktura za spotřebu)",
          "Výrobní místo: zákazník elektřinu PRODÁVÁ (výkupní faktura)",
          "Potřebujeme výrobní EAN – ne spotřební (jiný dokument!)",
          "Solar FIX MINI (do 1 MWh) vyžaduje odběrnou smlouvu u Electree",
        ],
        insight: "Máme ~17 000 výrobních míst. To není číslo – to je argument. Electree ve výkupu FVE předčí i velké hráče díky zkušenostem a procesům.",
      },
    ],
  },
  {
    id: "produkty",
    title: "Naše produkty",
    subtitle: "Ceník, podmínky, doporučení",
    icon: "📦",
    color: "#0D3D34",
    sections: [
      {
        id: "fix-el",
        title: "Fixní tarify elektřiny",
        lead: "HOME FIX 24 je vlajkový produkt Electree – nejlepší poměr cena vs. délka závazku.",
        points: [
          "HOME FIX 12: 2 549 Kč/MWh – kratší závazek, vyšší cena",
          "HOME FIX 24 ⭐: 2 349 Kč/MWh – doporučený, nejoblíbenější",
          "HOME FIX 36: 2 299 Kč/MWh – max jistota, nejnižší cena",
          "EXPERT FIX 24: 2 449 Kč/MWh – firmy s C-sazbou (IČO)",
        ],
        insight: "Vždy začněte HOME FIX 24. Zákazník ví přesně co platí 2 roky, plus zálohy nebudou překvapovat. Delší fixace = lepší cena.",
      },
      {
        id: "spot-el",
        title: "SPOT tarify elektřiny",
        lead: "SPOT produkty jsou pro zákazníky s chytrým měřičem a flexibilní spotřebou – elektromobil, FVE, přečerpávání.",
        points: [
          "HOME SPOT: tržní cena + 349 Kč/MWh přirážka, paušál 99 Kč/měs",
          "HOME ELECTREE DRIVE: tržní + 319 Kč/MWh, pro EV, 130 Kč/měs",
          "Podmínka bez výjimek: AMM smart metr nainstalovaný distributorem",
          "Electree Connect app: sledování spotřeby a optimalizace nabíjení",
        ],
        insight: "Bez AMM metru SPOT není možné aktivovat – to není Electree pravidlo, je to technická podmínka celého trhu. Neobcházejte to.",
      },
      {
        id: "solar",
        title: "FVE výkupní produkty",
        lead: "Tři varianty podle velikosti FVE – vždy se ptejte na roční výrobu v MWh, ne jen na výkon v kWp.",
        points: [
          "Solar FIX MINI: 1 000 Kč/MWh, do 1 MWh/rok, 39 Kč/měs – jen s odběrnou smlouvou u Electree",
          "Solar FIX ⭐: 500 Kč/MWh, 1–10 MWh/rok, 59 Kč/měs",
          "Solar FIX MAXI: 400 Kč/MWh, nad 10 MWh/rok, 99 Kč/měs",
          "Výrobní EAN: v PPP dokumentu nebo smlouvě o připojení",
        ],
        insight: "8 kWp FVE vyprodukuje cca 7–9 MWh/rok → Solar FIX (500 Kč/MWh). 12 kWp → cca 10–12 MWh → Solar FIX MAXI (400 Kč/MWh).",
      },
      {
        id: "plyn",
        title: "Dodávka plynu",
        lead: "Plyn je snadný cross-sell – zákazník už nám důvěřuje a jedna smlouva navíc ho nic nestojí.",
        points: [
          "HOME FIX PLYN 12: 1 349 Kč/MWh – kratší závazek",
          "HOME FIX PLYN 24 ⭐: 1 299 Kč/MWh – doporučený",
          "HOME FIX PLYN 36: 1 299 Kč/MWh – stejná cena jako 24M, větší jistota",
          "Cross-sell pravidlo: vždy až po uzavření elektřiny, nikdy najednou",
        ],
        insight: '"Topíte plynem? Máme výhodné podmínky i tam – jedna smlouva, jedna faktura, jeden kontakt." Zákazník už přechod zvládl – druhý je snazší.',
      },
    ],
  },
  {
    id: "hovor",
    title: "Prodejní hovor",
    subtitle: "Struktura, argumentace, uzavírání",
    icon: "📞",
    color: "#0D3D34",
    sections: [
      {
        id: "struktura",
        title: "Struktura hovoru",
        lead: "Každý hovor má 7 kroků. Přeskočení kteréhokoliv zvyšuje riziko, že zákazník řekne 'rozmyslím si to'.",
        points: [
          "1. Otevření – představení, důvod volání, délka (max 10 min)",
          "2. Souhlas s nahráváním – krátce, formálně",
          "3. Potvrzení dat z leadu – dodavatel, cena MWh, zálohy, spotřeba",
          "4. Výpočet úspory – konkrétní Kč, přeloženo do měsíčního přínosu",
          "5. Námitka – klidná reakce, zjistit skutečný důvod",
          "6. CTA – aktivní výzva k akci, ne čekání na zákazníka",
          "7. Uzavření + zápis – zákazník ví co dostane, vy víte co zapisovat",
        ],
        insight: "Zákazník nekupuje MWh elektřiny. Kupuje úsporu v Kč, jistotu fixní ceny a klid. Komunikujte tyto věci, ne technické detaily.",
      },
      {
        id: "otevreni",
        title: "Otevření hovoru",
        lead: "Prvních 15 sekund hovoru rozhoduje o tónu celé konverzace. Buďte klidní, jasní a přátelští.",
        points: [
          "\"Dobrý den, pan/paní [JMÉNO]?\" – čekejte na potvrzení",
          "\"Tady [VAŠE JMÉNO] z Electree.\" – jméno firmy hned",
          "\"Volám, protože jste si u nás žádal/a o cenovou nabídku na elektřinu.\"",
          "\"Hodí se vám teď chvilka? Zabere to maximálně 10 minut.\"",
        ],
        insight: "Nikdy nezačínejte rovnou nabídkou. Zákazník musí vědět KDO volá a PROČ. Otevření bez vysvětlení = zákazník zavěsí.",
      },
      {
        id: "uspora",
        title: "Výpočet a prezentace úspory",
        lead: "Úspora musí být konkrétní číslo v Kč – ne procenta, ne \"výhodná nabídka\". Zákazník musí vidět rozdíl.",
        points: [
          "Vzorec: (zákazníkova cena − naše cena) × roční spotřeba = roční úspora",
          "Příklad: (3 200 − 2 349) × 12 MWh = 10 212 Kč/rok",
          "Přeložte do měsíce: 10 212 ÷ 12 = ~851 Kč/měs levnější zálohy",
          "Neslibujte čísla bez všech 4 dat (dodavatel, cena, zálohy, spotřeba)",
        ],
        insight: "851 Kč/měsíc je reálné číslo. Zákazník si v tom vidí dovolenou, nákup, auto. Čísla v Kč jsou mocnější než procenta nebo abstraktní úspora.",
      },
    ],
  },
  {
    id: "namitky",
    title: "Základní námitky",
    subtitle: "Klidná reakce a návrat k řešení",
    icon: "🛡️",
    color: "#0D3D34",
    sections: [
      {
        id: "rozmyslet",
        title: "Musím si to rozmyslet",
        lead: "Tato námitka skrývá konkrétní otázku nebo obavu. Nestačí říct \"samozřejmě\" – zjistěte co konkrétně zákazníka zastavuje.",
        points: [
          "\"Rozumím. A co konkrétně si nejste jistá?\"",
          "\"Úsporu jsme spočítali – to část máte jasnou.\"",
          "\"Ceny vám pošlu e-mailem ke kontrole.\"",
          "\"Výpověď u stávajícího dodavatele zařídíme my na základě plné moci.\"",
        ],
        insight: "Po odpovědi na každou část námitky se zeptejte: \"Co vám ještě chybí k rozhodnutí?\" Zákazník sám si pojmenuje poslední překážku.",
      },
      {
        id: "drazi",
        title: "Jste příliš drazí",
        lead: "Zákazník porovnává čísla, která nevidí celá. Vaším úkolem je ukázat celkový obraz.",
        points: [
          "\"Naopak – z výpočtu vyšlo, že ušetříte X Kč ročně.\"",
          "\"Můžu se zeptat, jakou konkrétní nabídku jste dostal/a?\"",
          "\"Levnější nabídka může být na SPOTu – kde cena každou hodinu mění.\"",
          "\"HOME FIX 24 dává pevnou cenu na 2 roky – bez překvapení.\"",
        ],
        insight: "Nikdy nesnižujte cenu bez souhlasu vedoucího. Místo toho srovnávejte hodnotu: jistota + výpověď zdarma + osobní přístup.",
      },
      {
        id: "preruseni",
        title: "Bojím se přerušení dodávky",
        lead: "Tato obava je velmi častá a zcela pochopitelná – zákazník si přechod představuje jako odpojení.",
        points: [
          "\"Přechod probíhá čistě administrativně – žádné fyzické zásahy.\"",
          "\"Po celou dobu jste připojená – kabel zůstává stejný.\"",
          "\"Mění se pouze firma na faktuře a číslo zákaznické linky.\"",
          "\"Datum zahájení dodávky dostanete e-mailem – přesně víte kdy.\"",
        ],
        insight: "Zákazník si představuje technika, který vypíná elektřinu. Výslovně řekněte: žádný technik, žádný výpadek, žádná instalace.",
      },
    ],
  },
];

export default function AkademieePage() {
  const [activeLevel, setActiveLevel] = useState("A");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [sectionIdx, setSectionIdx] = useState(0);
  const { markLesson } = useProgress();

  if (selectedModule) {
    const mod = MODULES.find(m => m.id === selectedModule)!;
    const modIdx = MODULES.findIndex(m => m.id === selectedModule);
    const sec = mod.sections[sectionIdx];
    const isFirst = sectionIdx === 0;
    const isLast = sectionIdx === mod.sections.length - 1;
    const nextMod = MODULES[modIdx + 1];
    const prevMod = MODULES[modIdx - 1];

    const goNext = () => {
      markLesson(mod.id, sectionIdx);
      if (!isLast) {
        setSectionIdx(sectionIdx + 1);
      } else if (nextMod) {
        setSelectedModule(nextMod.id);
        setSectionIdx(0);
      } else {
        setSelectedModule(null);
      }
    };

    const goPrev = () => {
      if (!isFirst) {
        setSectionIdx(sectionIdx - 1);
      } else if (prevMod) {
        setSelectedModule(prevMod.id);
        setSectionIdx(prevMod.sections.length - 1);
      } else {
        setSelectedModule(null);
        setSectionIdx(0);
      }
    };

    const nextLabel = isLast
      ? nextMod ? `Další modul: ${nextMod.title} →` : "Hotovo! Přejít ke Školení →"
      : `${mod.sections[sectionIdx + 1].title} →`;

    const prevLabel = isFirst
      ? prevMod ? `← ${prevMod.title}` : "← Moduly"
      : `← ${mod.sections[sectionIdx - 1].title}`;

    // Overall Level A progress
    const totalSections = MODULES.reduce((s, m) => s + m.sections.length, 0);
    const doneBefore = MODULES.slice(0, modIdx).reduce((s, m) => s + m.sections.length, 0);
    const overallDone = doneBefore + sectionIdx + 1;
    const overallPct = Math.round((overallDone / totalSections) * 100);

    return (
      <div className="min-h-screen bg-[#F4F7F6]">
        {/* Top bar */}
        <div className="bg-[#0D3D34] px-6 py-4">
          {/* Level A overall progress */}
          <div className="max-w-3xl mx-auto mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Level A celkem</span>
              <span className="text-[10px] font-bold text-white/40">{overallDone}/{totalSections} sekcí · {overallPct} %</span>
            </div>
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/30 rounded-full transition-all" style={{ width: `${overallPct}%` }} />
            </div>
          </div>

          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={() => { setSelectedModule(null); setSectionIdx(0); }}
              className="flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Zpět na moduly
            </button>
            <div className="text-white/40 text-xs">{mod.title}</div>
            <div className="text-[#D7FF00] text-xs font-bold">{sectionIdx + 1}/{mod.sections.length}</div>
          </div>
          {/* Progress dots */}
          <div className="max-w-3xl mx-auto mt-3 flex items-center gap-1.5">
            {mod.sections.map((_, i) => (
              <button
                key={i}
                onClick={() => setSectionIdx(i)}
                className={`h-1 rounded-full transition-all ${
                  i < sectionIdx ? "bg-[#D7FF00] flex-1" :
                  i === sectionIdx ? "bg-[#D7FF00] flex-[2]" :
                  "bg-white/20 flex-1"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto px-6 py-10">
          {/* Section header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#0D3D34]/8 text-[#0D3D34]/60 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <span>{mod.icon}</span>
              <span>{mod.title}</span>
              <span className="text-[#0D3D34]/30">·</span>
              <span>Sekce {sectionIdx + 1} z {mod.sections.length}</span>
            </div>
            <h1 className="text-4xl font-bold text-[#0D3D34] leading-tight mb-4">{sec.title}</h1>
            <p className="text-lg text-[#0D3D34]/65 leading-relaxed max-w-2xl">{sec.lead}</p>
          </div>

          {/* Key points */}
          <div className="bg-white border border-[#D1DFD8] rounded-2xl p-6 mb-5">
            <div className="text-[10px] font-bold text-[#0D3D34]/35 uppercase tracking-widest mb-4">Klíčové body</div>
            <ul className="space-y-3">
              {sec.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EBF7F1] border border-[#B8E8D0] flex items-center justify-center text-[9px] font-bold text-[#1A6B5A] flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#0D3D34]/80 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Insight callout */}
          <div className="bg-[#0D3D34] rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-[#D7FF00] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" fill="none" stroke="#0D3D34" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#D7FF00] uppercase tracking-widest mb-2">Tip z praxe</div>
                <p className="text-white/80 text-sm leading-relaxed">{sec.insight}</p>
              </div>
            </div>
          </div>

          {/* Double CTA */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={goPrev}
              className="flex items-center justify-center gap-2 bg-white border-2 border-[#D1DFD8] text-[#0D3D34]/70 hover:border-[#0D3D34]/40 hover:text-[#0D3D34] font-semibold py-4 rounded-2xl transition-all text-sm"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {prevLabel}
            </button>
            <button
              onClick={goNext}
              className="flex items-center justify-center gap-2 bg-[#0D3D34] text-[#D7FF00] hover:opacity-90 font-bold py-4 rounded-2xl transition-opacity text-sm"
            >
              {nextLabel}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Module grid overview
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Akademie</h1>
        <p className="text-sm text-[#0D3D34]/50 mt-1">Vzdělávací program ve třech úrovních</p>
      </div>

      {/* Level tabs */}
      <div className="flex gap-2 mb-6">
        {(["A", "B", "C"] as const).map((lvl) => {
          const labels = { A: "Level A – Základní provoz", B: "Level B – Pokročilý prodej", C: "Level C – Vedení lidí" };
          return (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                activeLevel === lvl
                  ? "bg-[#0D3D34] text-[#D7FF00] border-[#0D3D34]"
                  : "bg-white border-[#D1DFD8] text-[#0D3D34]/60 hover:border-[#0D3D34]/30"
              }`}
            >
              {labels[lvl]}
            </button>
          );
        })}
      </div>

      {activeLevel === "A" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod, mi) => (
            <button
              key={mod.id}
              onClick={() => { setSelectedModule(mod.id); setSectionIdx(0); }}
              className="bg-white border border-[#D1DFD8] rounded-2xl p-5 text-left hover:shadow-md hover:border-[#0D3D34]/25 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF7F1] flex items-center justify-center text-xl group-hover:bg-[#D7FF00] transition-colors">
                  {mod.icon}
                </div>
                <span className="text-xs text-[#0D3D34]/30 font-mono">{String(mi + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-bold text-[#0D3D34] text-sm group-hover:text-[#1A6B5A] transition-colors mb-1">{mod.title}</h3>
              <p className="text-xs text-[#0D3D34]/40 leading-snug mb-3">{mod.subtitle}</p>
              <div className="text-[10px] text-[#0D3D34]/30">{mod.sections.length} sekcí</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#D1DFD8] flex items-center justify-center mx-auto mb-4">
            <svg width="18" height="18" fill="none" stroke="#0D3D34" strokeWidth="1.8" strokeOpacity="0.3" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" /></svg>
          </div>
          <h3 className="font-bold text-[#0D3D34] mb-1">Brzy k dispozici</h3>
          <p className="text-sm text-[#0D3D34]/50">Obsah se připravuje. Nejprve dokončete Level A.</p>
        </div>
      )}
    </div>
  );
}
