"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

// ─── Content types ────────────────────────────────────────────────────────────

type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "card"; color: "lime" | "green" | "orange" | "blue"; icon: string; title: string; body: string }
  | { t: "list"; items: string[] }
  | { t: "grid"; cols: 2 | 3; items: { icon: string; title: string; desc: string }[] }
  | { t: "table"; headers: string[]; rows: string[][] };

type Section = { id: string; title: string; blocks: Block[] };
type Module = { id: string; icon: string; title: string; subtitle: string; sections: Section[] };

const CARD_STYLES: Record<string, { bg: string; border: string; icon: string; title: string; body: string }> = {
  lime:   { bg: "bg-[#D7FF00]/20",  border: "border-[#D7FF00]/50",  icon: "text-[#5A7A00]",   title: "text-[#2D4A00] font-bold", body: "text-[#2D4A00]/80" },
  green:  { bg: "bg-[#EBF7F1]",     border: "border-[#B8E8D0]",     icon: "text-[#1A6B5A]",   title: "text-[#0D3D34] font-bold", body: "text-[#0D3D34]/70" },
  orange: { bg: "bg-orange-50",     border: "border-orange-200",    icon: "text-orange-600",  title: "text-orange-900 font-bold", body: "text-orange-800/80" },
  blue:   { bg: "bg-blue-50",       border: "border-blue-200",      icon: "text-blue-600",    title: "text-blue-900 font-bold",   body: "text-blue-800/80" },
};

function RenderBlock({ b }: { b: Block }) {
  if (b.t === "p") return <p className="text-sm text-[#0D3D34]/75 leading-relaxed">{b.text}</p>;
  if (b.t === "h") return <h3 className="text-base font-bold text-[#0D3D34] mt-2">{b.text}</h3>;
  if (b.t === "card") {
    const s = CARD_STYLES[b.color];
    return (
      <div className={`rounded-xl p-4 border ${s.bg} ${s.border}`}>
        <div className="flex items-start gap-3">
          <span className={`text-xl flex-shrink-0 ${s.icon}`}>{b.icon}</span>
          <div>
            <div className={`text-sm mb-1 ${s.title}`}>{b.title}</div>
            <div className={`text-xs leading-relaxed ${s.body}`}>{b.body}</div>
          </div>
        </div>
      </div>
    );
  }
  if (b.t === "list") return (
    <ul className="space-y-1.5">
      {b.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-[#0D3D34]/75">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF00] flex-shrink-0 mt-2" />
          {item}
        </li>
      ))}
    </ul>
  );
  if (b.t === "grid") return (
    <div className={`grid gap-3 ${b.cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
      {b.items.map((item, i) => (
        <div key={i} className="bg-white border border-[#D1DFD8] rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">{item.icon}</div>
          <div className="text-xs font-bold text-[#0D3D34] mb-0.5">{item.title}</div>
          <div className="text-[10px] text-[#0D3D34]/50 leading-snug">{item.desc}</div>
        </div>
      ))}
    </div>
  );
  if (b.t === "table") return (
    <div className="overflow-x-auto rounded-xl border border-[#D1DFD8]">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[#EBF7F1]">
            {b.headers.map((h, i) => <th key={i} className="px-4 py-2.5 text-left font-bold text-[#0D3D34] border-b border-[#D1DFD8]">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {b.rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-[#F7FAF9]"}>
              {row.map((cell, ci) => <td key={ci} className="px-4 py-2.5 text-[#0D3D34]/70 border-b border-[#D1DFD8] last:border-b-0">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return null;
}

// ─── Level A modules ─────────────────────────────────────────────────────────

const LEVEL_A: Module[] = [
  {
    id: "kdo-jsme", icon: "🏢", title: "Kdo jsme", subtitle: "Identita Electree, naše silné stránky",
    sections: [
      {
        id: "firma", title: "Co je Electree",
        blocks: [
          { t: "grid", cols: 3, items: [
            { icon: "⚡", title: "Dodávka elektřiny", desc: "Pro domácnosti i firmy, fix i spot" },
            { icon: "🔥", title: "Dodávka plynu", desc: "Kompletní energetické řešení" },
            { icon: "☀️", title: "Výkup elektřiny", desc: "FVE přetoky – naše silná stránka" },
          ]},
          { t: "card", color: "lime", icon: "📍", title: "Odkud jsme", body: "Electree je moderní energetická firma z Brna. Za firmou stojí Lubomír Káňa a Ruben Marada." },
          { t: "p", text: "Electree nevznikla jako obyčejný dodavatel energií. Od začátku byla postavena na výkupu elektřiny z obnovitelných zdrojů a moderní práci s fotovoltaikou." },
        ],
      },
      {
        id: "trh", title: "Kde jsme na trhu",
        blocks: [
          { t: "grid", cols: 3, items: [
            { icon: "🏭", title: "~17 000", desc: "výrobních míst (výkup FVE)" },
            { icon: "⚡", title: "~24 000", desc: "odběrných míst elektřiny" },
            { icon: "🔥", title: "~3 500", desc: "odběrných míst plynu" },
          ]},
          { t: "card", color: "blue", icon: "ℹ️", title: "Kontext trhu", body: "Největší hráči v elektřině jsou ČEZ, E.ON a PRE. Electree je menší až střední hráč – ale výkup FVE je naše skutečná síla." },
        ],
      },
      {
        id: "sila", title: "Naše výhody",
        blocks: [
          { t: "list", items: [
            "Specialisté na výkup FVE – rozumíme fotovoltaice lépe než většina konkurence",
            "Jsme menší → rychlejší, osobnější a servisnější přístup",
            "Transparentní komunikace – zákazník vždy ví, co platí a za co",
            "Technologické zázemí – aplikace Electree Connect",
          ]},
          { t: "card", color: "green", icon: "💬", title: "Jak o sobě mluvit se zákazníkem", body: "Nesrovnávejte se s ČEZ nebo E.ON. Mluvte o tom, co Electree umí lépe: férovost, jednoduchost, FVE expertise, osobní přístup." },
        ],
      },
    ],
  },
  {
    id: "energetika", icon: "⚡", title: "Základy energetiky", subtitle: "Dodavatel, distributor, fix, spot",
    sections: [
      {
        id: "role", title: "Dodavatel vs. distributor",
        blocks: [
          { t: "grid", cols: 2, items: [
            { icon: "🔌", title: "Distributor", desc: "Vlastní síť. Fyzicky dopraví elektřinu k zákazníkovi. Zákazník si ho NEVYBÍRÁ – je daný lokalitou." },
            { icon: "🏪", title: "Dodavatel", desc: "Prodává elektřinu. Zákazník s ním uzavírá smlouvu, platí zálohy, dostává faktury. Zákazník si ho VYBÍRÁ." },
          ]},
          { t: "card", color: "lime", icon: "💡", title: "Klíčové pochopení", body: "Distributor elektřinu doveze, dodavatel ji prodá. Zákazník mění dodavatele, ne distributora." },
          { t: "p", text: "Totéž platí pro plyn: GasNet, Gas Distribution a Pražská plynárenská jsou distributoři. Electree je dodavatel." },
        ],
      },
      {
        id: "fix-spot", title: "Fix a Spot",
        blocks: [
          { t: "grid", cols: 2, items: [
            { icon: "🔒", title: "FIX tarif", desc: "Cena sjednaná dopředu na celou dobu smlouvy. Jistota, žádná překvapení." },
            { icon: "📈", title: "SPOT tarif", desc: "Cena kopíruje burzovní trh OTE. Mění se každou hodinu. Může být levný i drahý." },
          ]},
          { t: "card", color: "green", icon: "✅", title: "Kdy nabídnout FIX", body: "Zákazník chce jistotu, předvídatelný účet, nechce sledovat trh. Většina domácností." },
          { t: "card", color: "blue", icon: "⚡", title: "Kdy zvážit SPOT", body: "Zákazník má FVE nebo elektromobil, flexibilní spotřebu, sleduje ceny a rozumí trhu. Nutný smart metr AMM." },
          { t: "card", color: "orange", icon: "⚠️", title: "Záporné ceny", body: "Při přebytku výroby OZE a nízké spotřebě může cena klesnout pod nulu. U spotového výkupu FVE zákazník v tu chvíli nedostane nic nebo musí doplatit." },
        ],
      },
      {
        id: "fve-vykup", title: "Výkup přebytků z FVE",
        blocks: [
          { t: "p", text: "Zákazník s fotovoltaikou část elektřiny spotřebuje doma a přebytky (přetoky) pošle do sítě. Electree je může vykoupit." },
          { t: "grid", cols: 2, items: [
            { icon: "🏠", title: "Dodávka", desc: "Zákazník elektřinu nakupuje (odběrné místo)" },
            { icon: "☀️", title: "Výkup", desc: "Zákazník elektřinu prodává (výrobní místo)" },
          ]},
          { t: "card", color: "lime", icon: "🌟", title: "Proč Electree ve výkupu exceluje", body: "Máme ~17 000 výrobních míst. Výkup FVE je naše historická silná stránka a oblast, kde překonáváme velké hráče." },
        ],
      },
    ],
  },
  {
    id: "produkty", icon: "📦", title: "Naše produkty", subtitle: "HOME FIX, SPOT, Solar výkup, Plyn",
    sections: [
      {
        id: "fix-elektrina", title: "Fixní tarify elektřiny",
        blocks: [
          { t: "table", headers: ["Produkt", "Cena bez DPH", "Vázanost", "Pro koho"], rows: [
            ["HOME FIX 12", "2 549 Kč/MWh", "12 měsíců", "Chce kratší závazek"],
            ["HOME FIX 24 ⭐", "2 349 Kč/MWh", "24 měsíců", "Nejoblíbenější, doporučený"],
            ["HOME FIX 36", "2 299 Kč/MWh", "36 měsíců", "Chce max jistotu"],
            ["EXPERT FIX 24", "2 449 Kč/MWh", "24 měsíců", "Firmy s C-sazbou (IČO)"],
          ]},
          { t: "card", color: "lime", icon: "⭐", title: "Doporučuj HOME FIX 24", body: "Nejlepší poměr cena vs. závazek. Nejoblíbenější produkt. Zákazník ví přesně co platí 2 roky." },
        ],
      },
      {
        id: "spot-elektrina", title: "Spotové tarify elektřiny",
        blocks: [
          { t: "grid", cols: 2, items: [
            { icon: "🌐", title: "HOME SPOT", desc: "Spot + 349 Kč/MWh přirážka · 99 Kč/měs paušál · potřeba AMM metr" },
            { icon: "🚗", title: "HOME ELECTREE DRIVE", desc: "Spot + 319 Kč/MWh · Pro majitele EV · auto nabíjení přes Electree Connect · 130 Kč/měs" },
          ]},
          { t: "card", color: "orange", icon: "⚠️", title: "Podmínka SPOT tarifu", body: "Zákazník musí mít smart metr AMM. Bez AMM metr nelze SPOT aktivovat." },
        ],
      },
      {
        id: "solar-vykup", title: "Výkupní produkty FVE",
        blocks: [
          { t: "table", headers: ["Produkt", "Výkupní cena", "Limit přetoků", "Paušál/měs"], rows: [
            ["Solar FIX MINI", "1 000 Kč/MWh", "do 1 MWh/rok", "39 Kč"],
            ["Solar FIX ⭐", "500 Kč/MWh", "1–10 MWh/rok", "59 Kč"],
            ["Solar FIX MAXI", "400 Kč/MWh", "nad 10 MWh/rok", "99 Kč"],
          ]},
          { t: "card", color: "green", icon: "📌", title: "Podmínka Solar FIX MINI", body: "Zákazník musí mít zároveň odběrovou smlouvu na elektřinu u Electree. Nelze uzavřít samostatně." },
        ],
      },
      {
        id: "plyn", title: "Dodávka plynu",
        blocks: [
          { t: "table", headers: ["Produkt", "Cena bez DPH", "Vázanost"], rows: [
            ["HOME FIX PLYN 12", "1 349 Kč/MWh", "12 měsíců"],
            ["HOME FIX PLYN 24 ⭐", "1 299 Kč/MWh", "24 měsíců"],
            ["HOME FIX PLYN 36", "1 299 Kč/MWh", "36 měsíců (stejná cena jako 24M!)"],
          ]},
          { t: "card", color: "lime", icon: "💬", title: "Cross-sell tip", body: 'Zákazník řeší elektřinu → nabídni i plyn. "Máme výhodné podmínky i na plyn – jedna smlouva, jedna faktura."' },
        ],
      },
    ],
  },
  {
    id: "hovor", icon: "📞", title: "Základní prodejní hovor", subtitle: "Struktura, výpočet úspory, argumentace",
    sections: [
      {
        id: "struktura", title: "Struktura hovoru",
        blocks: [
          { t: "list", items: [
            "1. Otevření – představení, propojení s žádostí, délka hovoru",
            "2. Souhlas s nahráváním – stručné, formální",
            "3. Potvrzení dat z leadu – dodavatel, cena MWh, zálohy, spotřeba",
            "4. Výpočet úspory a emocionální argumentace",
            "5. Zvládnutí námitky (pokud přijde)",
            "6. CTA – výzva k akci, odeslání nabídky",
            "7. Uzavření a zápis",
          ]},
          { t: "card", color: "lime", icon: "💡", title: "Co zákazník opravdu kupuje", body: "Ne MWh elektřiny. Kupuje úsporu v Kč, jistotu fixní ceny, klid (nemusí sledovat trh) a jednoduché řešení." },
        ],
      },
      {
        id: "otevreni", title: "Otevření hovoru",
        blocks: [
          { t: "card", color: "green", icon: "✅", title: "Správné otevření", body: 'Dobrý den, paní Nováková? Tady Petra z Electree. Volám vám, protože jste si u nás žádala o cenovou nabídku na elektřinu. Hodí se vám teď chvilka? Zabere to maximálně 10 minut.' },
          { t: "card", color: "orange", icon: "❌", title: "Chyba – nepřeskakuj", body: "Nikdy nezačínej rovnou nabídkou bez představení. Zákazník neví kdo volá a proč." },
        ],
      },
      {
        id: "uspora", title: "Výpočet a prezentace úspory",
        blocks: [
          { t: "card", color: "blue", icon: "🧮", title: "Vzorec orientační úspory", body: "(Zákazníkova cena/MWh – Naše cena/MWh) × Roční spotřeba v MWh = Roční úspora v Kč" },
          { t: "p", text: "Příklad: Zákazník platí 3 200 Kč/MWh, spotřeba 12 MWh/rok. My nabídneme HOME FIX 24 za 2 349 Kč/MWh." },
          { t: "card", color: "lime", icon: "💰", title: "Výsledek příkladu", body: "(3 200 – 2 349) × 12 = 10 212 Kč/rok = zálohy nižší o ~850 Kč/měs. Plus jistota fixní ceny na 2 roky." },
          { t: "card", color: "orange", icon: "⚠️", title: "Co nesmíš slíbit", body: "Konkrétní úsporu bez všech 4 dat. Slevy mimo ceník. Že fix bude vždy nejlevnější. Cokoliv mimo obchodní podmínky." },
        ],
      },
    ],
  },
  {
    id: "namitky", icon: "🛡️", title: "Základní námitky", subtitle: "Klidná reakce, argumentace, návrat k řešení",
    sections: [
      {
        id: "namitky-1-5", title: "Námitky 1–5",
        blocks: [
          { t: "card", color: "green", icon: "💬", title: "Musím si to rozmyslet", body: '„Rozumím. A co konkrétně si nejste jistá? Úsporu jsme spočítali, ceny vám pošlu e-mailem a výpověď u dodavatele zařídíme my. Co vám ještě chybí k rozhodnutí?"' },
          { t: "card", color: "green", icon: "💬", title: "Mám smlouvu u jiného dodavatele", body: '„To není problém. Výpověď za vás zajistíme my na základě plné moci. Stačí jen podepsat."' },
          { t: "card", color: "green", icon: "💬", title: "Nemám teď čas", body: '„Chápu. Kdy se vám hodí, abych zavolala zpátky? Zabere to jen pár minut."' },
          { t: "card", color: "green", icon: "💬", title: "Nejste příliš drazí?", body: '„Naopak – z výpočtu vyšlo, že ušetříte přibližně X Kč ročně. Zálohy vám klesnou o Y Kč měsíčně."' },
          { t: "card", color: "green", icon: "💬", title: "Slyšela jsem o vás něco špatného", body: '„Děkuji za upřímnost. Část podobných reakcí bývá od zákazníků u nichž byl přechod složitější. U vás by vše probíhalo přesně podle nabídky, kterou vám pošlu."' },
        ],
      },
      {
        id: "namitky-6-10", title: "Námitky 6–10",
        blocks: [
          { t: "card", color: "green", icon: "💬", title: "Fix bude drahý, když ceny klesnou", body: '„Fix není o absolutním minimu. Je o jistotě – víte přesně za kolik budete platit, bez překvapení při nárůstu cen."' },
          { t: "card", color: "green", icon: "💬", title: "Chci porovnat více nabídek", body: '„To je rozumné. Pošlu vám nabídku s konkrétními čísly pro vaši situaci – budete mít nejlepší podklad pro srovnání."' },
          { t: "card", color: "green", icon: "💬", title: "Mám to na partnerovi", body: '„Rozumím. Pošlu vám vše přehledně e-mailem a domluvíme se kdy se ozvu znovu, až to proberete."' },
          { t: "card", color: "green", icon: "💬", title: "Jednou jsem měnila a bylo to hrozné", body: '„Chápu, po špatné zkušenosti je opatrnost na místě. Tentokrát vám popíšu přesně co se kdy stane a co za vás zařídíme."' },
          { t: "card", color: "green", icon: "💬", title: "Bojím se přerušení dodávky", body: '„Toho se bát nemusíte. Přechod probíhá administrativně, po celou dobu jste připojená. Mění se jen firma na faktuře."' },
        ],
      },
    ],
  },
  {
    id: "uzavreni", icon: "✅", title: "Uzavření hovoru a zápis", subtitle: "CTA, plná moc, cross-sell, co zapsat",
    sections: [
      {
        id: "cta", title: "Call to action",
        blocks: [
          { t: "card", color: "lime", icon: "🎯", title: "Pravidlo uzavření", body: "Operátorka vede další krok – nezákazník. Po zpracování námitky přijde jasná výzva k akci." },
          { t: "card", color: "green", icon: "✅", title: "Správné CTA", body: '„Co říkáte, pojďme to zafixovat? Pošlu vám nabídku na e-mail, vy se podíváte a podepíšete online. Spolu s ní přijde plná moc pro výpověď. Zabere to pár minut."' },
          { t: "card", color: "blue", icon: "📋", title: "Plná moc", body: "Electree za zákazníka podá výpověď u stávajícího dodavatele. Zákazník jen podepíše – o nic dalšího se nestará." },
        ],
      },
      {
        id: "zapis", title: "Zápis po hovoru",
        blocks: [
          { t: "list", items: [
            "Zda byl zákazník zastižen a hovor proběhl",
            "Potvrzení vstupních dat (dodavatel, cena, zálohy, spotřeba)",
            "Komunikovaná orientační úspora v Kč",
            "Jaká námitka zazněla a jak jsi reagovala",
            "Zda zákazník souhlasil se zasláním nabídky",
            "Zda byla odeslána nabídka a plná moc",
            "Další krok nebo domluvený termín zpětného volání",
          ]},
          { t: "card", color: "orange", icon: "⚠️", title: "Proč je zápis důležitý", body: "Když se ke zákazníkovi vrátí kolegyně nebo zákazník zavolá sám zpět, musí mít všechny informace bez ptaní." },
        ],
      },
      {
        id: "crosssell", title: "Cross-sell",
        blocks: [
          { t: "card", color: "lime", icon: "💡", title: "Pravidlo cross-sellu", body: "Nejprve uzavři hlavní věc (elektřinu), teprve pak nabídni další produkt. Nikdy nedělej obojí najednou." },
          { t: "grid", cols: 2, items: [
            { icon: "🔥", title: "Plyn", desc: "Topíte plynem? Můžeme spočítat úsporu i tam." },
            { icon: "☀️", title: "Výkup FVE", desc: "Máte fotovoltaiku? Electree patří mezi přední výkupce přetoků." },
          ]},
        ],
      },
    ],
  },
  {
    id: "wiki-praxe", icon: "🔍", title: "Práce s Electree Wiki", subtitle: "Jak rychle najít správnou odpověď",
    sections: [
      {
        id: "jak-hledat", title: "Jak vyhledávat",
        blocks: [
          { t: "card", color: "lime", icon: "🔍", title: "Hledej bez diakritiky", body: '„distribucni sazby" najde „Distribuční sazby". „EAN vyrobce" najde „EAN výrobce vs EAN odběratele". Vyhledávání je chytré.' },
          { t: "grid", cols: 2, items: [
            { icon: "📦", title: "Produkt", desc: "Ceny, podmínky, pro koho" },
            { icon: "📋", title: "SOP", desc: "Krok za krokem v EIS" },
            { icon: "🏗️", title: "Distribuce", desc: "Sazby, jistič, VT/NT" },
            { icon: "🛡️", title: "Retence", desc: "Námitky, zákazník odchází" },
          ]},
        ],
      },
      {
        id: "wiki-vs-sop", title: "Wiki vs. SOP",
        blocks: [
          { t: "grid", cols: 2, items: [
            { icon: "📖", title: "Wiki", desc: "Vysvětluje co to je a jak to funguje. Pro pochopení pojmů." },
            { icon: "📋", title: "SOP", desc: "Říká jak přesně postupovat v EIS krok za krokem. Pro konkrétní akci." },
          ]},
          { t: "card", color: "blue", icon: "ℹ️", title: "Příklad použití", body: '„Co je výrobní EAN?" → Wiki, kategorie Pojmy.\n„Jak uzavřít smlouvu výkup v EIS?" → Wiki, kategorie SOP.' },
        ],
      },
    ],
  },
];

// ─── Level B/C locked modules ─────────────────────────────────────────────────

const LEVEL_B_STUBS = [
  "Rozšířená energetika", "Pokročilé produkty", "Pokročilé vedení hovoru",
  "Diagnostika potřeb", "Pokročilé sales", "Námitky a odpor", "Uzavírání obchodu",
  "Komunikace a přesvědčivost", "Wiki v praxi",
];

const LEVEL_C_STUBS = [
  "Role teamleadra", "Vedení lidí", "Coaching operátorek", "QA a hodnocení",
  "Výkon a KPI", "Problémový výkon", "Eskalace", "Rozvoj týmu",
];

type Level = "A" | "B" | "C";
const LEVEL_META: Record<Level, { label: string; desc: string }> = {
  A: { label: "Level A", desc: "Základní provoz" },
  B: { label: "Level B", desc: "Pokročilý prodej" },
  C: { label: "Level C", desc: "Vedení lidí" },
};

// ─── Module viewer ─────────────────────────────────────────────────────────────

function ModuleViewer({ mod, onBack }: { mod: Module; onBack: () => void }) {
  const { isDone, markLesson } = useProgress();
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTo = (i: number) => {
    setActiveSection(i);
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const allDone = mod.sections.every((_, i) => isDone(mod.id, i));

  return (
    <div className="flex h-full">
      {/* Left TOC */}
      <aside className="w-56 flex-shrink-0 border-r border-[#D1DFD8] bg-white overflow-y-auto sticky top-0 h-screen">
        <div className="p-4 border-b border-[#D1DFD8]">
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-[#0D3D34]/40 hover:text-[#0D3D34] transition-colors mb-3">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Moduly
          </button>
          <div className="text-lg">{mod.icon}</div>
          <div className="font-bold text-[#0D3D34] text-sm mt-1">{mod.title}</div>
          <div className="text-[10px] text-[#0D3D34]/40 mt-0.5">{mod.subtitle}</div>
        </div>
        <nav className="p-2">
          {mod.sections.map((sec, i) => (
            <button key={sec.id} onClick={() => scrollTo(i)}
              className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${activeSection === i ? "bg-[#D7FF00] text-[#0D3D34] font-semibold" : "text-[#0D3D34]/60 hover:bg-[#EBF7F1]"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDone(mod.id, i) ? "bg-[#1A6B5A]" : "bg-[#D1DFD8]"}`} />
              {sec.title}
            </button>
          ))}
        </nav>
        {/* CTA to Skoleni */}
        <div className="p-3 border-t border-[#D1DFD8]">
          <Link href="/dashboard/certifikace"
            className="block text-center bg-[#0D3D34] text-[#D7FF00] text-xs font-bold px-3 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Přejít ke Školení →
          </Link>
          <button onClick={onBack} className="block w-full text-center text-xs text-[#0D3D34]/40 mt-2 hover:text-[#0D3D34] transition-colors">
            Zopakovat Level A
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-8 space-y-12">
          {mod.sections.map((sec, i) => (
            <div key={sec.id} ref={el => { sectionRefs.current[i] = el; }} className="scroll-mt-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-[#D1DFD8]" />
                <button onClick={() => { if (!isDone(mod.id, i)) markLesson(mod.id, i); }} className={`text-xs px-3 py-1 rounded-full border font-medium transition-all ${isDone(mod.id, i) ? "bg-[#EBF7F1] border-[#B8E8D0] text-[#1A6B5A]" : "border-[#D1DFD8] text-[#0D3D34]/40 hover:border-[#0D3D34]/30 hover:text-[#0D3D34] cursor-pointer"}`}>
                  {isDone(mod.id, i) ? "✓ Přečteno" : "Označit jako přečteno"}
                </button>
              </div>
              <h2 className="text-xl font-bold text-[#0D3D34] mb-5">{sec.title}</h2>
              <div className="space-y-4">
                {sec.blocks.map((b, bi) => <RenderBlock key={bi} b={b} />)}
              </div>
            </div>
          ))}

          {/* Bottom CTA */}
          <div className="bg-[#0D3D34] rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🎓</div>
            <h3 className="text-white font-bold text-lg mb-1">Modul dokončen!</h3>
            <p className="text-white/60 text-sm mb-4">Otestuj si znalosti ve Školení nebo se vrať na přehled modulů.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/certifikace"
                className="bg-[#D7FF00] text-[#0D3D34] text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Přejít ke Školení →
              </Link>
              <button onClick={onBack}
                className="border border-white/20 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Zpět na moduly
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function AkademieePage() {
  const [activeLevel, setActiveLevel] = useState<Level>("A");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const { countDone } = useProgress();

  const mod = LEVEL_A.find(m => m.id === selectedModule);

  if (selectedModule && mod) {
    return <ModuleViewer mod={mod} onBack={() => setSelectedModule(null)} />;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Akademie</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Vzdělávací program ve třech úrovních</p>
      </div>

      {/* Level tabs */}
      <div className="flex gap-2 mb-6">
        {(["A", "B", "C"] as Level[]).map((lvl) => {
          const locked = lvl !== "A";
          const active = activeLevel === lvl;
          return (
            <button key={lvl} onClick={() => setActiveLevel(lvl)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${active ? "bg-[#0D3D34] text-[#D7FF00] border-[#0D3D34]" : "bg-white border-[#D1DFD8] text-[#0D3D34]/60 hover:border-[#0D3D34]/30"}`}
            >
              {locked && <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" /></svg>}
              <span>{LEVEL_META[lvl].label}</span>
              <span className={`hidden sm:block text-[9px] font-normal ${active ? "text-[#D7FF00]/70" : "text-[#0D3D34]/35"}`}>{LEVEL_META[lvl].desc}</span>
            </button>
          );
        })}
      </div>

      {activeLevel === "A" && (
        <>
          {/* Progress */}
          <div className="bg-[#0D3D34] rounded-2xl p-5 mb-6 flex items-center gap-6">
            <div className="flex-1">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Level A – celkový pokrok</div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#D7FF00] transition-all"
                  style={{ width: `${Math.round((LEVEL_A.reduce((s, m) => s + countDone(m.id), 0) / LEVEL_A.reduce((s, m) => s + m.sections.length, 0)) * 100)}%` }} />
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#D7FF00] text-xl font-bold">{LEVEL_A.filter(m => countDone(m.id) >= m.sections.length).length}/{LEVEL_A.length}</div>
              <div className="text-white/40 text-xs">modulů</div>
            </div>
          </div>

          {/* Module grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEVEL_A.map((m) => {
              const done = countDone(m.id);
              const total = m.sections.length;
              const pct = Math.round((done / total) * 100);
              return (
                <button key={m.id} onClick={() => setSelectedModule(m.id)}
                  className="bg-white border border-[#D1DFD8] rounded-2xl p-5 text-left hover:shadow-md hover:border-[#0D3D34]/20 transition-all group"
                >
                  <div className="text-2xl mb-3">{m.icon}</div>
                  <div className="font-bold text-[#0D3D34] text-sm group-hover:text-[#1A6B5A] transition-colors">{m.title}</div>
                  <div className="text-xs text-[#0D3D34]/45 mt-0.5 mb-3">{m.subtitle}</div>
                  <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct === 100 ? "#D7FF00" : "#B8E8D0" }} />
                  </div>
                  <div className="text-[10px] text-[#0D3D34]/35 mt-1.5">{done}/{total} sekcí</div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {activeLevel !== "A" && (
        <div>
          <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-8 text-center mb-6">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-[#0D3D34] mb-1">{LEVEL_META[activeLevel].label} – brzy k dispozici</h3>
            <p className="text-[#0D3D34]/50 text-sm">Obsah se připravuje. Nejprve dokončete Level A.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(activeLevel === "B" ? LEVEL_B_STUBS : LEVEL_C_STUBS).map((title) => (
              <div key={title} className="bg-white border border-[#D1DFD8] rounded-xl p-4 opacity-50 flex items-center gap-3">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" /></svg>
                <span className="text-sm text-[#0D3D34]/60">{title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
