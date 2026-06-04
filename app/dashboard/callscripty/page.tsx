"use client";
import { useState } from "react";

type ScriptStep = { id: string; title: string; goal: string; text: string; tip?: string; dont?: string };
type Script = { id: string; title: string; icon: string; desc: string; steps: ScriptStep[] };

const SCRIPTS: Script[] = [
  {
    id: "inbound-elektrina",
    title: "Příchozí hovor – elektřina",
    icon: "📞",
    desc: "Zákazník žádal o nabídku elektřiny. Máme data z leadu.",
    steps: [
      {
        id: "opening",
        title: "Zahájení hovoru",
        goal: "Zákazník ví kdo volá, proč a jak dlouho to potrvá.",
        text: "Dobrý den, pan/paní [JMÉNO]? Tady [VAŠE JMÉNO] z Electree. Volám vám, protože jste si u nás žádal/a o cenovou nabídku na elektřinu. Hodí se vám teď chvilka? Zabere to maximálně 10 minut.",
        tip: "Mluvte klidně a jistě. První věty dávají tón celému hovoru.",
        dont: "Neskákejte rovnou na nabídku bez představení.",
      },
      {
        id: "recording",
        title: "Souhlas s nahráváním",
        goal: "Formální oznámení – compliance.",
        text: "Pro pořádek vás chci informovat, že je hovor z důvodu kvality nahráván. Souhlasíte? Děkuji.",
        tip: "Buďte struční. Jakmile zákazník souhlasí, okamžitě pokračujte.",
      },
      {
        id: "data",
        title: "Potvrzení dat z leadu",
        goal: "Ověřit vstupní data pro výpočet úspory.",
        text: "V dotazníku jste uvedl/a, že máte teď cenu přibližně [CENA] Kč za MWh, zálohy [ZÁLOHY] Kč měsíčně a roční spotřebu [SPOTŘEBA] MWh. Sedí to?",
        tip: "Potvrďte vždy všechna 4 data: dodavatel, cena MWh, zálohy, spotřeba. Bez toho neslibujte konkrétní úsporu.",
        dont: "Neslibujte konkrétní úsporu bez všech dat.",
      },
      {
        id: "savings",
        title: "Výpočet a prezentace úspory",
        goal: "Zákazník pochopí konkrétní přínos v Kč.",
        text: "S HOME FIX 24 za [NAŠE CENA] Kč/MWh byste ušetřil/a přibližně [ÚSPORA] Kč ročně – to jsou zálohy přibližně o [MĚSÍČNÍ ÚSPORA] Kč nižší každý měsíc. A navíc máte cenu zafixovanou na 2 roky, takže žádná překvapení.",
        tip: "Vzorec: (zákazníkova cena − naše cena) × spotřeba = roční úspora. Přeložte do měsíčního přínosu.",
        dont: "Nezůstávejte jen u čísel – řekněte zákazníkovi co to pro něj znamená.",
      },
      {
        id: "objection",
        title: "Zvládnutí námitky",
        goal: "Klidná reakce, zjistit skutečný důvod, vrátit k řešení.",
        text: "Rozumím. A co konkrétně si nejste jistý/á? Úsporu jsme spočítali, ceny vám potvrdím e-mailem a výpověď u stávajícího dodavatele zařídíme my. Co vám ještě chybí k rozhodnutí?",
        tip: "Námitka = příležitost. Zjistěte skutečný důvod, nenechte zákazníka odejít bez dalšího kroku.",
      },
      {
        id: "cta",
        title: "Call to action",
        goal: "Zákazník ví co se stane dál a souhlasí.",
        text: "Co říkáte, pojďme to zafixovat? Pošlu vám nabídku na e-mail ke kontrole a spolu s ní plnou moc pro výpověď u [STÁVAJÍCÍ DODAVATEL]. Vy jen podepíšete online – zabere to pár minut.",
        tip: "Závěr musí být aktivní. Vy vedete krok, ne zákazník.",
        dont: "Nepasivní závěr jako 'rozmyslete si to a zavolejte nám.'",
      },
      {
        id: "closing",
        title: "Uzavření a zápis",
        goal: "Zákazník ví co dostane, operátorka zapíše vše potřebné.",
        text: "Výborně! Pošlu vám nabídku a plnou moc na e-mail. Vy podepíšete a my zajistíme výpověď u [DODAVATEL] i celý přechod. Datum zahájení dostanete e-mailem. Děkuji za váš čas a těším se na spolupráci!",
        tip: "Zápis: zastižení, potvrzená data, komunikovaná úspora, námitka + reakce, souhlas, odeslání nabídky, další krok.",
      },
    ],
  },
  {
    id: "retence",
    title: "Retenční hovor",
    icon: "🛡️",
    desc: "Zákazník podal výpověď nebo chce odejít ke konkurenci.",
    steps: [
      {
        id: "opening",
        title: "Otevření – zjistit důvod",
        goal: "Zákazník musí nejdřív říct sám, proč odchází.",
        text: "Dobrý den, pan/paní [JMÉNO]? Tady [VAŠE JMÉNO] z Electree. Volám vám k vaší výpovědi / žádosti o přechod. Mohu se zeptat – co vás k tomuto rozhodnutí vedlo?",
        tip: "Nechte zákazníka mluvit. Čím víc řekne, tím lépe víte co nabídnout.",
        dont: "Neskákejte hned na nabídku bez pochopení důvodu.",
      },
      {
        id: "cena",
        title: "Reakce: cena / levnější nabídka",
        goal: "Porovnání konkrétní čísla, ne obecné debaty.",
        text: "Rozumím, cena je samozřejmě důležitá. Mohu se zeptat, jakou nabídku jste dostal/a? Ráda se podívám, co pro vás dokážeme udělat. [Po čísle:] S vaší spotřebou [X] MWh by to ročně znamenalo... [kalkulace]",
        tip: "Vždy zjistěte konkrétní číslo od zákazníka. Pak srovnejte celkové náklady.",
      },
      {
        id: "competitor",
        title: "Reakce: podepsal jinde",
        goal: "Připomenout 14denní lhůtu pro odstoupení.",
        text: "Chápu. Mohu se zeptat, kdy jste smlouvu podepsal/a? Pokud je to do 14 dní, máte ze zákona právo od nové smlouvy odstoupit. Ráda se podívám, jestli vám dokážeme nabídnout lepší podmínky.",
        tip: "14 dní = zákonná lhůta pro odstoupení od smlouvy uzavřené na dálku.",
      },
      {
        id: "closing",
        title: "CTA nebo zápis o odmítnutí",
        goal: "Buď hovor uzavřete, nebo zákazníka zápisem uvolníte.",
        text: "[Pokud zájem:] Výborně – pošlu vám novou nabídku na e-mail. [Pokud ne:] Rozumím, respektuji vaše rozhodnutí. Pro pořádek zapíši důvod odchodu. Kdyby se situace změnila, jsme tu. Hezký den.",
        tip: "I odcházejícího zákazníka nechte s dobrým pocitem – může se vrátit.",
      },
    ],
  },
  {
    id: "fve-vykup",
    title: "FVE výkup – nová smlouva",
    icon: "☀️",
    desc: "Zákazník má fotovoltaiku a zajímá se o výkup přetoků.",
    steps: [
      {
        id: "qualifying",
        title: "Zjistit základní informace",
        goal: "Znát výkon FVE, roční výrobu a zda má odběr u Electree.",
        text: "Dobrý den, rád/a bych se zeptal/a na pár základních věcí o vaší fotovoltaice. Jaký je výkon vaší FVE v kilowattech-peak (kWp)? A víte přibližně, kolik MWh ročně vyrobíte?",
        tip: "Do 1 MWh/rok → FIX MINI. 1–10 MWh/rok → FIX (standard). Nad 10 MWh/rok → FIX MAXI.",
      },
      {
        id: "product",
        title: "Doporučení produktu",
        goal: "Zákazník pochopí výkupní cenu a podmínky.",
        text: "Na základě vaší výroby [X] MWh/rok doporučuji Home Solar FIX [VARIANTA] – vykupujeme za [CENA] Kč/MWh a máte garantovanou cenu po celou dobu smlouvy. Administrativní paušál je [PAUŠÁL] Kč/měsíc.",
      },
      {
        id: "ean",
        title: "Zjistit výrobní EAN",
        goal: "Zákazník musí dodat výrobní EAN – ne spotřební.",
        text: "Abychom mohli smlouvu uzavřít, potřebuji váš výrobní EAN. Najdete ho v dokumentu PPP (první paralelní připojení) nebo ve smlouvě o připojení od distributora. Pozor – v dokumentu UTP je vždy spotřební EAN, ne výrobní.",
        tip: "Výrobní EAN: v PPP dokumentu, SoP, nebo předchozím vyúčtování od výkupce.",
        dont: "Nepomáhejte zákazníkovi hledat EAN v UTP dokumentu – tam je spotřební EAN.",
      },
    ],
  },
];

export default function CallScriptyPage() {
  const [activeScript, setActiveScript] = useState(SCRIPTS[0].id);
  const [openStep, setOpenStep] = useState<string | null>("opening");

  const script = SCRIPTS.find(s => s.id === activeScript)!;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Call scripty</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Strukturované skripty pro nejčastější typy hovorů</p>
      </div>

      {/* Script tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {SCRIPTS.map(s => (
          <button key={s.id} onClick={() => { setActiveScript(s.id); setOpenStep("opening"); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${activeScript === s.id ? "bg-[#0D3D34] text-[#D7FF00] border-[#0D3D34]" : "bg-white border-[#D1DFD8] text-[#0D3D34]/60 hover:border-[#0D3D34]/30"}`}
          >
            <span>{s.icon}</span> {s.title}
          </button>
        ))}
      </div>

      {/* Script header */}
      <div className="bg-[#EBF7F1] border border-[#B8E8D0] rounded-2xl p-5 mb-6 flex items-center gap-4">
        <span className="text-3xl">{script.icon}</span>
        <div>
          <h2 className="font-bold text-[#0D3D34]">{script.title}</h2>
          <p className="text-sm text-[#0D3D34]/60 mt-0.5">{script.desc}</p>
        </div>
        <div className="ml-auto text-xs text-[#0D3D34]/40">{script.steps.length} kroků</div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {script.steps.map((step, i) => (
          <div key={step.id} className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <button onClick={() => setOpenStep(openStep === step.id ? null : step.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#F7FAF9] transition-colors"
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${openStep === step.id ? "bg-[#D7FF00] text-[#0D3D34]" : "bg-[#EBF7F1] text-[#0D3D34]/50"}`}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#0D3D34] text-sm">{step.title}</div>
                <div className="text-xs text-[#0D3D34]/40 mt-0.5">{step.goal}</div>
              </div>
              <svg className={`text-[#0D3D34]/30 transition-transform flex-shrink-0 ${openStep === step.id ? "rotate-180" : ""}`}
                width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {openStep === step.id && (
              <div className="px-5 pb-5 space-y-3">
                {/* Script text */}
                <div className="bg-[#F4F7F6] rounded-xl p-4">
                  <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-2">Text hovoru</div>
                  <p className="text-sm text-[#0D3D34] leading-relaxed font-medium">{step.text}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {step.tip && (
                    <div className="bg-[#EBF7F1] border border-[#B8E8D0] rounded-xl p-3">
                      <div className="text-[10px] font-bold text-[#1A6B5A] uppercase tracking-widest mb-1">💡 Tip</div>
                      <p className="text-xs text-[#0D3D34]/70 leading-relaxed">{step.tip}</p>
                    </div>
                  )}
                  {step.dont && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                      <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">⚠️ Nedělej</div>
                      <p className="text-xs text-orange-800/70 leading-relaxed">{step.dont}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-[#EBF7F1] border border-[#D1DFD8] rounded-xl p-4 text-center">
        <p className="text-xs text-[#0D3D34]/50">Skripty jsou živý dokument – budou se rozrůstat o nové varianty a situace.</p>
      </div>
    </div>
  );
}
