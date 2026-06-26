"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { VIDEOS_BY_ID } from "@/lib/videos";
import VideoPlayerModal from "@/components/VideoPlayerModal";

type Stat = { value: string; label: string };

type Section = {
  id: string;
  title: string;
  lead: string;
  body: string[];
  stat?: Stat;
  insight: string;
  video?: string;
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
        lead: "Brněnská energetická firma, která vyrostla na výkupu sluneční energie.",
        body: [
          "Electree je moderní dodavatel elektřiny a plynu z Brna. Na rozdíl od většiny konkurence ale nezačínala u klasické dodávky energií – historie a know-how firmy stojí na výkupu přetoků z fotovoltaiky.",
          "Dnes nabízíme tři věci: dodávku elektřiny (FIX i SPOT) pro domácnosti i firmy, dodávku plynu a výkup elektřiny z FVE. Za firmou stojí Lubomír Káňa a Ruben Marada.",
        ],
        stat: { value: "3", label: "hlavní produkty: elektřina, plyn, výkup FVE" },
        insight: "Electree nevznikla jako typický dodavatel energií. Od začátku byla postavena na FVE výkupu a moderní práci s obnovitelnými zdroji.",
      },
      {
        id: "trh",
        title: "Kde jsme na trhu",
        lead: "Menší hráč v elektřině. Velký hráč ve výkupu FVE.",
        body: [
          "V dodávce elektřiny a plynu je Electree menší až střední hráč – konkurujeme ČEZ, E.ON i PRE, ale na jiném hřišti. Nesnažíme se být největší, snažíme se být nejosobnější a nejtransparentnější.",
          "Ve výkupu přetoků z fotovoltaiky je to jinak – tady patříme mezi přední poskytovatele v ČR. K tomu máme zhruba 24 000 odběrných míst elektřiny a 3 500 odběrných míst plynu.",
        ],
        stat: { value: "~17 000", label: "výrobních míst ve výkupu FVE – naše největší síla" },
        insight: "Nesrovnávejte se s ČEZ nebo E.ON na jejich hřišti. Hrajeme jinou hru – menší, rychlejší, osobnější. A ve výkupu FVE je Electree opravdu silná.",
      },
      {
        id: "sila",
        title: "Naše výhody v hovoru",
        lead: "Zákazník nemění distribuci – jen dodavatele na faktuře.",
        body: [
          "Co odlišuje Electree od velkých hráčů? Jsme specialisté na FVE a rozumíme fotovoltaice lépe než většina konkurence. Nejsme call centrum pro miliony anonymních zákazníků – stavíme na osobním přístupu a transparentním ceníku, kde zákazník vždy přesně ví, co platí a za co.",
          "K tomu nabízíme Electree Connect – vlastní aplikaci pro správu smlouvy a sledování spotřeby.",
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
        id: "cesta",
        title: "Cesta elektřiny ke spotřebiteli",
        lead: "Než elektřina dorazí do zásuvky, prošla čtyřmi rukama.",
        body: [
          "Vše začíná výrobou – v jádru, uhelných a plynových elektrárnách nebo v obnovitelných zdrojích (FVE, vítr, voda). Vyrobená elektřina jde do přenosové soustavy, kterou v celé ČR provozuje jediná firma – ČEPS. Je to energetická dálnice o napětí 400 a 220 kV, na kterou se elektřina napřed transformuje (zvýší napětí), aby šla na dálku s co nejmenšími ztrátami.",
          "Z přenosové dálnice elektřina sjíždí do lokálních distribučních sítí (vn, nn) – ty vedou už přímo k domům a firmám. Distribuci v dané oblasti vždy zajišťuje jen jeden distributor (ČEZ Distribuce, EG.D nebo PRE Distribuce), bez ohledu na to, koho si zákazník vybere jako dodavatele.",
          "Electree je až ta poslední, obchodní část: nakupujeme elektřinu a prodáváme ji koncovým zákazníkům na odběrném místě. Síť ani elektrárny nevlastníme – to není naše role.",
        ],
        stat: { value: "1", label: "přenosová soustava v ČR – provozuje ji ČEPS" },
        insight: "ČEPS, ERÚ a OTE jsou tři klíčové instituce trhu: ČEPS přenáší, ERÚ reguluje ceny a chrání spotřebitele, OTE zúčtovává odchylky a stanovuje spotovou cenu. Žádná z nich není dodavatel ani distributor.",
      },
      {
        id: "role",
        title: "Dodavatel vs. distributor",
        lead: "Zákazník si vybírá dodavatele. Distributora dostane podle adresy.",
        body: [
          "Distributor vlastní síť a fyzicky dopraví elektřinu ke dveřím zákazníka – ten si ho nemůže vybrat, je daný lokalitou. Při výpadku proudu volají všichni zákazníci v regionu stejné číslo distributora, bez ohledu na to, u koho mají smlouvu.",
          "Dodavatel naopak elektřinu prodává a fakturuje – a tady má zákazník svobodnou volbu. Totéž platí pro plyn: GasNet a Pražská plynárenská Distribuce jsou distributoři, Electree je dodavatel.",
        ],
        stat: { value: "0", label: "věcí, které se fyzicky změní při přechodu k Electree" },
        insight: "Zákazník se bojí 'co bude s elektřinou'. Vysvětlete: kabel zůstane stejný, mění se jen firma na faktuře a číslo pro zákaznický servis.",
      },
      {
        id: "fix-spot",
        title: "FIX a SPOT tarify",
        lead: "FIX = jistota. SPOT = cena podle burzy, hodinu od hodiny.",
        body: [
          "FIX je cena domluvená dopředu na celou dobu smlouvy – žádná překvapení, zákazník přesně ví, kolik bude platit i za dva roky. SPOT naproti tomu kopíruje burzu OTE: cena se měří v hodinových oknech a každou hodinu je jiná.",
          "SPOT vyžaduje smart metr AMM – bez něj ho nelze aktivovat. V zimních špičkách může SPOT vyšplhat na 6–8 Kč/kWh, zatímco FIX 24 zůstává na 2,35 Kč/kWh bez ohledu na sezónu.",
        ],
        stat: { value: "90 %", label: "zákazníků by mělo dostat nabídku FIX" },
        insight: "FIX nabídněte 90 % zákazníků. SPOT pouze těm, kdo rozumí trhu, mají AMM metr a flexibilní spotřebu (EV, FVE, noční nabíjení).",
        video: "fix-vs-spot",
      },
      {
        id: "fve",
        title: "Výkup přebytků z FVE",
        lead: "Co si zákazník nespotřebuje, může prodat zpátky do sítě.",
        body: [
          "Zákazník s fotovoltaikou část elektřiny spotřebuje doma a přebytky (přetoky) pošle do sítě – a Electree je může vykoupit. Odběrné místo je tam, kde zákazník elektřinu kupuje, výrobní místo je tam, kde ji prodává – jsou to dvě různá místa se dvěma různými EAN.",
          "Pro smlouvu o výkupu potřebujeme výrobní EAN, nikdy ne spotřební – najdeme ho v dokumentu PPP nebo ve smlouvě o připojení (SoP), nikdy v dokumentu UTP.",
        ],
        stat: { value: "~17 000", label: "výrobních míst – naše největší síla na trhu" },
        insight: "Máme ~17 000 výrobních míst. To není číslo – to je argument. Electree ve výkupu FVE předčí i velké hráče díky zkušenostem a procesům.",
        video: "fix-vs-spot-vykup",
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
        lead: "HOME FIX 24 je vlajková loď Electree.",
        body: [
          "Tři varianty fixu se liší jen délkou závazku a cenou komodity: HOME FIX 12 za 2 549 Kč/MWh pro kratší závazek, HOME FIX 24 za 2 349 Kč/MWh jako doporučená střední cesta a HOME FIX 36 za 2 299 Kč/MWh pro zákazníky, kterým nevadí tříletý závazek výměnou za nejnižší cenu.",
          "Firmy s IČO a C-sazbou patří do EXPERT FIX 24 za 2 449 Kč/MWh – jinak je proces stejný jako u HOME FIX.",
        ],
        stat: { value: "2 349 Kč", label: "HOME FIX 24 / MWh – doporučený produkt" },
        insight: "Vždy začněte HOME FIX 24. Zákazník ví přesně co platí 2 roky, plus zálohy nebudou překvapovat. Delší fixace = lepší cena.",
      },
      {
        id: "spot-el",
        title: "SPOT tarify elektřiny",
        lead: "Pro zákazníky, kteří umí pracovat s trhem.",
        body: [
          "HOME SPOT (tržní cena + 349 Kč/MWh, paušál 99 Kč/měs) je pro zákazníky s chytrým měřičem a flexibilní spotřebou. HOME ELECTREE DRIVE (tržní cena + 319 Kč/MWh, 130 Kč/měs) je varianta navíc optimalizovaná pro majitele elektromobilů – nabíjení probíhá automaticky v nejlevnějších hodinách přes Electree Connect.",
          "Podmínka bez výjimek: AMM smart metr musí být nainstalovaný distributorem. To není pravidlo Electree, je to technická podmínka celého trhu – neobcházejte to.",
        ],
        stat: { value: "349 Kč", label: "přirážka HOME SPOT / MWh nad spotovou cenu" },
        insight: "Bez AMM metru SPOT není možné aktivovat – to není Electree pravidlo, je to technická podmínka celého trhu. Neobcházejte to.",
      },
      {
        id: "solar",
        title: "FVE výkupní produkty",
        lead: "Dvě cesty: bez chytrého řízení FIX, s chytrým řízením FREE nebo PLUS.",
        body: [
          "Pokud zákazník nechce chytré řízení, nabídneme klasický FIX podle velikosti výroby: Solar FIX MINI (1 000 Kč/MWh, do 1 MWh/rok, jen s odběrnou smlouvou u Electree), Solar FIX (500 Kč/MWh, 1–10 MWh/rok) nebo Solar FIX MAXI (400 Kč/MWh, nad 10 MWh/rok).",
          "Pokud zákazník chytré řízení má nebo si vezme naše (Electree Pulse), nabízíme jiný pricing: Solar FREE pro roční přetoky cca 4–10 MWh, jinak (méně nebo více) Solar PLUS.",
          "Velikost přetoků odhadnete rychlým vzorcem: velikost baterie (kWh) × 180 − velikost FVE (kWp) × 1 000, vydělené 2 – vyjde záporné číslo, jehož absolutní hodnota je odhad MWh/rok do sítě. Příklad: baterie 10 kWh, FVE 10 kWp → (10×180 − 10×1000) ÷ 2 = −4 100 → cca 4,1 MWh/rok → Solar FREE.",
        ],
        stat: { value: "4–10 MWh", label: "roční přetoky → Solar FREE (s chytrým řízením)" },
        insight: "Vždy se ptejte na roční výrobu v MWh, ne jen na výkon v kWp – kWp řekne velikost FVE, ale ne kolik reálně poputuje do sítě. Výrobní EAN najdete v PPP dokumentu nebo smlouvě o připojení.",
      },
      {
        id: "plyn",
        title: "Dodávka plynu",
        lead: "Nejsnazší cross-sell, co máme.",
        body: [
          "HOME FIX PLYN 12 (1 349 Kč/MWh) je kratší závazek, HOME FIX PLYN 24 (1 299 Kč/MWh) doporučený produkt a HOME FIX PLYN 36 má stejnou cenu jako 24M (1 299 Kč/MWh), jen s delší jistotou.",
          "Pravidlo cross-sellu: nabízejte plyn až po uzavření elektřiny, nikdy obojí najednou. Zákazník přechod k Electree už jednou zvládl – druhý je vždy snazší.",
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
        lead: "Sedm kroků. Přeskočení kteréhokoliv riziko zvyšuje.",
        body: [
          "Každý úspěšný hovor má pevnou kostru: otevření (kdo volá a proč, max 10 minut), souhlas s nahráváním, potvrzení dat z leadu (dodavatel, cena, zálohy, spotřeba) a výpočet úspory v korunách.",
          "Pak přichází nejdůležitější část – práce s námitkou. Klidná reakce, zjištění skutečného důvodu, a teprve potom aktivní CTA, ne čekání na to, až se zákazník sám rozhoupe. Hovor uzavřete tak, aby zákazník přesně věděl, co dostane, a vy přesně víte, co zapsat.",
        ],
        stat: { value: "7", label: "kroků každého hovoru" },
        insight: "Zákazník nekupuje MWh elektřiny. Kupuje úsporu v Kč, jistotu fixní ceny a klid. Komunikujte tyto věci, ne technické detaily.",
      },
      {
        id: "otevreni",
        title: "Otevření hovoru",
        lead: "Prvních 15 sekund rozhoduje o celém hovoru.",
        body: [
          "Nikdy nezačínejte rovnou nabídkou – zákazník musí vědět KDO volá a PROČ. „Dobrý den, pan/paní [JMÉNO]? Tady [VAŠE JMÉNO] z Electree. Volám, protože jste si u nás žádal/a o cenovou nabídku na elektřinu.“",
          "Hned na to se zeptejte na čas: „Hodí se vám teď chvilka? Zabere to maximálně 10 minut.“ Otevření bez vysvětlení znamená, že zákazník zavěsí.",
        ],
        insight: "Nikdy nezačínejte rovnou nabídkou. Zákazník musí vědět KDO volá a PROČ. Otevření bez vysvětlení = zákazník zavěsí.",
      },
      {
        id: "uspora",
        title: "Výpočet a prezentace úspory",
        lead: "Číslo v korunách. Ne procenta, ne 'výhodná nabídka'.",
        body: [
          "Vzorec je jednoduchý: (zákazníkova cena − naše cena) × roční spotřeba = roční úspora. Třeba (3 200 − 2 349) × 12 MWh = 10 212 Kč/rok.",
          "Přeložte to do měsíce – 10 212 ÷ 12 = zhruba 851 Kč/měsíc nižší zálohy. V tom si zákazník vidí dovolenou, nákup, auto. Bez všech čtyř dat (dodavatel, cena, zálohy, spotřeba) ale číslo neslibujte.",
        ],
        stat: { value: "851 Kč", label: "reálná měsíční úspora v modelovém příkladu" },
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
        lead: "Za touto větou se schovává konkrétní otázka.",
        body: [
          "Nestačí říct „samozřejmě“ – zjistěte, co konkrétně zákazníka zastavuje: „Rozumím. A co konkrétně si nejste jistá?“ Pak postupně odstraňujte konkrétní bariéry: úsporu jste spočítali, ceny pošlete e-mailem ke kontrole, výpověď u stávajícího dodavatele zařídíte na základě plné moci.",
          "Po každé odpovědi se znovu zeptejte: „Co vám ještě chybí k rozhodnutí?“ Zákazník si tak sám pojmenuje poslední překážku.",
        ],
        insight: "Po odpovědi na každou část námitky se zeptejte: \"Co vám ještě chybí k rozhodnutí?\" Zákazník sám si pojmenuje poslední překážku.",
      },
      {
        id: "drazi",
        title: "Jste příliš drazí",
        lead: "Zákazník porovnává čísla, která nevidí celá.",
        body: [
          "„Naopak – z výpočtu vyšlo, že ušetříte X Kč ročně“ vrátí konverzaci k faktům. Zeptejte se na konkrétní nabídku konkurence – levnější číslo bývá na SPOTu, kde se cena mění každou hodinu.",
          "Nikdy nesnižujte cenu bez souhlasu vedoucího. Srovnávejte hodnotu: jistota, výpověď zdarma a osobní přístup – ne jen číslo na faktuře.",
        ],
        insight: "Nikdy nesnižujte cenu bez souhlasu vedoucího. Místo toho srovnávejte hodnotu: jistota + výpověď zdarma + osobní přístup.",
      },
      {
        id: "preruseni",
        title: "Bojím se přerušení dodávky",
        lead: "Velmi častá a zcela pochopitelná obava.",
        body: [
          "Zákazník si přechod představuje jako odpojení – technika, který něco vypíná. Řekněte to výslovně: žádný technik, žádný výpadek, žádná instalace.",
          "„Přechod probíhá čistě administrativně. Po celou dobu jste připojená, kabel zůstává stejný – mění se jen firma na faktuře a číslo zákaznické linky. Datum zahájení dodávky dostanete e-mailem.“",
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
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const { markLesson, countDone } = useProgress();

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
      ? nextMod ? `Další modul: ${nextMod.title} →` : "Hotovo! Přejít k Testům →"
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

        {/* Main content – presentation slide */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Section header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-[#0D3D34]/8 text-[#0D3D34]/60 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span>{mod.icon}</span>
              <span>{mod.title}</span>
              <span className="text-[#0D3D34]/30">·</span>
              <span>Sekce {sectionIdx + 1} z {mod.sections.length}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-[#0D3D34] leading-[1.05] tracking-tight mb-5">{sec.title}</h1>
            <p className="text-xl sm:text-2xl font-semibold text-[#1A6B5A] leading-snug max-w-2xl">{sec.lead}</p>
          </div>

          {/* Flowing body text – the "slide" explanation, not bullet points */}
          <div className="space-y-4 mb-8 max-w-2xl">
            {sec.body.map((p, i) => (
              <p key={i} className="text-base text-[#0D3D34]/75 leading-relaxed">{p}</p>
            ))}
          </div>

          {/* Big stat callout */}
          {sec.stat && (
            <div className="bg-[#EBF7F1] border border-[#B8E8D0] rounded-2xl px-6 py-5 mb-8 flex items-baseline gap-4">
              <div className="text-4xl sm:text-5xl font-black text-[#0D3D34] leading-none whitespace-nowrap">{sec.stat.value}</div>
              <div className="text-sm text-[#1A6B5A] font-semibold leading-snug">{sec.stat.label}</div>
            </div>
          )}

          {/* Insight callout */}
          <div className="bg-[#0D3D34] rounded-2xl p-6 mb-5">
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

          {/* Related video */}
          {sec.video && VIDEOS_BY_ID[sec.video] && (
            <button
              onClick={() => setPlayingVideo(sec.video!)}
              className="w-full bg-white border border-[#D1DFD8] rounded-2xl p-4 mb-10 flex items-center gap-4 text-left hover:border-[#0D3D34]/25 hover:shadow-md transition-all group"
            >
              <div className="relative w-28 h-16 rounded-xl bg-[#0D3D34] overflow-hidden flex-shrink-0">
                <Image src={VIDEOS_BY_ID[sec.video].thumb} alt={VIDEOS_BY_ID[sec.video].title} fill sizes="112px" className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#D7FF00] flex items-center justify-center group-hover:scale-110 transition-transform ring-2 ring-black/10">
                    <svg width="11" height="11" fill="#0D3D34" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-[#1A6B5A] uppercase tracking-widest mb-1">Doplňkové video</div>
                <div className="text-sm font-bold text-[#0D3D34] truncate">{VIDEOS_BY_ID[sec.video].title}</div>
                <div className="text-xs text-[#0D3D34]/45 truncate">{VIDEOS_BY_ID[sec.video].subheadline}</div>
              </div>
            </button>
          )}
          {!sec.video && <div className="mb-10" />}

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

        {playingVideo && VIDEOS_BY_ID[playingVideo] && (
          <VideoPlayerModal video={VIDEOS_BY_ID[playingVideo]} onClose={() => setPlayingVideo(null)} />
        )}
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
              <h3 className="font-bold text-[#0D3D34] text-sm leading-snug group-hover:text-[#1A6B5A] transition-colors mb-1 line-clamp-2 min-h-[2.5rem]">{mod.title}</h3>
              <p className="text-xs text-[#0D3D34]/40 leading-snug mb-3 line-clamp-3 min-h-[3.1rem]">{mod.subtitle}</p>
              {(() => {
                const done = Math.min(countDone(mod.id), mod.sections.length);
                const pct = Math.round((done / mod.sections.length) * 100);
                return (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-[#0D3D34]/30">{done}/{mod.sections.length} sekcí</span>
                      <span className={`text-[10px] font-bold ${pct === 100 ? "text-[#1A6B5A]" : pct > 0 ? "text-[#0D3D34]/50" : "text-[#0D3D34]/25"}`}>{pct} %</span>
                    </div>
                    <div className="h-1 bg-[#EBF7F1] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: pct === 100 ? "#D7FF00" : "#B8E8D0" }}
                      />
                    </div>
                  </div>
                );
              })()}
            </button>
          ))}
        </div>
      ) : null}

      {activeLevel === "A" && (
        <Link
          href="/dashboard/videa"
          className="mt-6 flex items-center gap-4 bg-[#0D3D34] rounded-2xl p-5 hover:opacity-95 transition-opacity"
        >
          <div className="w-11 h-11 rounded-xl bg-[#D7FF00] flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" fill="none" stroke="#0D3D34" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-sm">Doplňková videa o energetice</h3>
            <p className="text-white/50 text-xs mt-0.5">Jak vzniká cena, nulové a záporné ceny, odchylka a rezervní výkon</p>
          </div>
          <svg width="16" height="16" fill="none" stroke="#D7FF00" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      )}

      {activeLevel !== "A" && (
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
