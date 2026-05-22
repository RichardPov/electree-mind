"use client";
import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";

const COURSES = [
  {
    id: "elektrina",
    icon: "⚡",
    title: "Dodávka elektřiny",
    subtitle: "Tarify, produkty, distribuce",
    progress: 100,
    done: 8,
    total: 8,
    cert: true,
    lessons: [
      { title: "Jak funguje trh s elektřinou", done: true, mins: 6, type: "video" },
      { title: "FIX vs SPOT – zásadní rozdíl", done: true, mins: 8, type: "reading" },
      { title: "HOME FIX – produkty a ceny", done: true, mins: 10, type: "reading" },
      { title: "EXPERT FIX – produkty pro firmy", done: true, mins: 8, type: "reading" },
      { title: "HOME vs EXPERT – kdy co použít", done: true, mins: 5, type: "quiz" },
      { title: "Distribuční sazby D-sazby", done: true, mins: 12, type: "video" },
      { title: "Distribuční sazby C-sazby", done: true, mins: 10, type: "video" },
      { title: "VT/NT, jistič a typový diagram", done: true, mins: 8, type: "quiz" },
    ],
    content: {
      "HOME FIX – produkty a ceny": {
        body: `Tramaco nabízí tři varianty fixního tarifu pro domácnosti. Ceny jsou platné od 22. 4. 2026.

HOME FIX 12 — 3 084,29 Kč/MWh s DPH (2 549,00 bez DPH)
• Vázanost 12 měsíců
• Paušál 156,09 Kč/měsíc s DPH
• Nejkratší závazek, vhodné pro zákazníky, kteří chtějí flexibilitu

HOME FIX 24 — 2 842,29 Kč/MWh s DPH (2 349,00 bez DPH) ⭐ Doporučený
• Vázanost 24 měsíců
• Paušál 180,29 Kč/měsíc s DPH
• Nejlepší poměr cena/jistota. Nejoblíbenější produkt.

HOME FIX 36 — 2 781,79 Kč/MWh s DPH (2 299,00 bez DPH)
• Vázanost 36 měsíců
• Paušál 180,29 Kč/měsíc s DPH
• Nejnižší komodita, ale delší závazek

Tip pro operátorku: Zákazník chce jistotu → doporuč FIX 24. Zákazník váhá kvůli závazku → připomeň, že po uplynutí může odejít bez sankce.`,
        quiz: [
          { q: "Kolik stojí HOME FIX 24 s DPH?", a: ["2 781,79 Kč/MWh", "3 084,29 Kč/MWh", "2 842,29 Kč/MWh", "2 349,00 Kč/MWh"], correct: 2 },
          { q: "Jaký je paušál u HOME FIX 12?", a: ["180,29 Kč/měs.", "156,09 Kč/měs.", "129,00 Kč/měs.", "200,00 Kč/měs."], correct: 1 },
        ],
      },
      "FIX vs SPOT – zásadní rozdíl": {
        body: `FIX tarif: cena komodity je pevně daná na celou dobu smlouvy. Zákazník ví přesně, za kolik bude platit. Žádná překvapení z burzovních výkyvů.

SPOT tarif: cena kopíruje hodinové burzové ceny OTE. Může být výhodný při levné elektřině, ale v drahých obdobích může výrazně zdražit.

Kdy doporučit FIX:
• Zákazník chce jistotu a předvídatelný účet
• Zákazník nechce sledovat burzu
• Domácnost nebo malá firma bez flexibility spotřeby

Kdy doporučit SPOT:
• Zákazník má flexibilní spotřebu (nabíjí auto v noci)
• Zákazník má domácí FVE nebo baterii
• Zákazník sleduje ceny a umí optimalizovat spotřebu

Klíčová formulace: „Na FIXu máte garantovanou cenu po celou dobu smlouvy – nezávisle na tom, co se děje na burze."`,
        quiz: [
          { q: "Kdy SPOT tarif může zdražit?", a: ["Nikdy", "Pouze v létě", "Při vysokých burzovních cenách", "Vždy v poledne"], correct: 2 },
        ],
      },
    },
  },
  {
    id: "fve",
    icon: "☀️",
    title: "FVE & Výkup elektřiny",
    subtitle: "Fotovoltaika, produkty, EAN",
    progress: 50,
    done: 3,
    total: 6,
    cert: false,
    lessons: [
      { title: "Co je FVE a jak funguje výkup", done: true, mins: 7, type: "video" },
      { title: "EAN odběratele vs EAN výrobce", done: true, mins: 5, type: "reading" },
      { title: "Home Solar FIX MINI / FIX / FIX MAXI", done: true, mins: 8, type: "reading" },
      { title: "SPOT výkup a Electree Pulse", done: false, mins: 10, type: "video" },
      { title: "Sdílení elektřiny a komunitní energie", done: false, mins: 8, type: "reading" },
      { title: "Checklist uzavření smlouvy výkup", done: false, mins: 6, type: "quiz" },
    ],
    content: {
      "Home Solar FIX MINI / FIX / FIX MAXI": {
        body: `Tramaco nabízí tři varianty fixního výkupního produktu dle roční výroby FVE.

Home Solar FIX MINI — 1 000 Kč/MWh výkup
• Limit: do 1 MWh/rok
• Administrativní paušál: 39 Kč/měs.
• Podmínka: zákazník musí mít zároveň odběr elektřiny u Tramaco

Home Solar FIX — 500 Kč/MWh výkup ⭐ Nejpopulárnější
• Limit: do 10 MWh/rok
• Administrativní paušál: 59 Kč/měs.
• Ideální pro standardní střešní FVE na rodinném domě

Home Solar FIX MAXI — 400 Kč/MWh výkup
• Limit: nad 10 MWh/rok
• Administrativní paušál: 99 Kč/měs.
• Velká FVE, vysoká výroba (zemědělské areály, komerční budovy)

Pozor: Pokud je výroba menší než administrativní paušál, pohledávka se převádí do dalšího měsíce. Zákazník vždy dostane nezápornou fakturu.`,
        quiz: [
          { q: "Jaká je výkupní cena Home Solar FIX (standard)?", a: ["1 000 Kč/MWh", "500 Kč/MWh", "400 Kč/MWh", "2 100 Kč/MWh"], correct: 1 },
          { q: "Jaký je limit výroby pro FIX MAXI?", a: ["do 1 MWh/rok", "do 5 MWh/rok", "do 10 MWh/rok", "nad 10 MWh/rok"], correct: 3 },
        ],
      },
      "EAN odběratele vs EAN výrobce": {
        body: `EAN odběratele (spotřební EAN): identifikuje odběrné místo – kam elektřina přichází do domu. 18místné číslo. Zákazník ho najde na faktuře od distributora.

EAN výrobce (výrobní EAN): identifikuje místo, odkud elektřina odchází do sítě (výrobní FVE). Bez tohoto EAN nelze smlouvu o výkupu aktivovat!

Kde zákazník výrobní EAN najde:
✅ Dokument PPP (první paralelní připojení)
✅ Smlouva o připojení (SoP) u nově připojených FVE
✅ Předchozí vyúčtování od výkupce
✅ E-mail od distributora (ČEZ, E.ON, PRE)

⚠️ POZOR: V dokumentu UTP (uvedení do trvalého provozu) je VŽDY uveden EAN spotřební, NE výrobní!`,
        quiz: [
          { q: "Kde zákazník NESMÍ hledat výrobní EAN?", a: ["Smlouva o připojení (SoP)", "Dokument PPP", "Dokument UTP", "E-mail od distributora"], correct: 2 },
        ],
      },
    },
  },
  {
    id: "plyn",
    icon: "🔥",
    title: "Zemní plyn",
    subtitle: "Distributoři, produkty, pásma",
    progress: 25,
    done: 2,
    total: 5,
    cert: false,
    lessons: [
      { title: "Jak funguje trh se zemním plynem", done: true, mins: 6, type: "video" },
      { title: "HOME FIX plyn – produkty a ceny", done: true, mins: 8, type: "reading" },
      { title: "Distribuční pásma a zálohy", done: false, mins: 10, type: "reading" },
      { title: "Sezónnost a výpočet zálohy", done: false, mins: 7, type: "video" },
      { title: "Quiz: Plyn celkový", done: false, mins: 12, type: "quiz" },
    ],
    content: {
      "HOME FIX plyn – produkty a ceny": {
        body: `Tramaco nabízí tři varianty fixního tarifu na zemní plyn pro domácnosti.

HOME FIX 12 — 1 632,29 Kč/MWh s DPH (1 349,00 bez DPH)
• Vázanost 12 měsíců
• Paušál 156,09 Kč/měsíc s DPH

HOME FIX 24 — 1 571,79 Kč/MWh s DPH (1 299,00 bez DPH) ⭐ Doporučený
• Vázanost 24 měsíců
• Paušál 180,29 Kč/měsíc s DPH

HOME FIX 36 — 1 571,79 Kč/MWh s DPH (1 299,00 bez DPH)
• Vázanost 36 měsíců – stejná cena jako 24M!
• Paušál 180,29 Kč/měsíc s DPH

Cross-sell tip: Zákazník řeší elektřinu → nabídni i plyn! „Máme výhodné podmínky i na plyn, vše v jedné smlouvě."

Distributoři plynu v ČR:
• GasNet – sever a střed ČR
• Gas Distribution – jih ČR
• Pražská plynárenská – Praha`,
        quiz: [
          { q: "Kolik stojí HOME FIX plyn 24 s DPH?", a: ["1 632,29 Kč/MWh", "1 571,79 Kč/MWh", "1 299,00 Kč/MWh", "1 800,00 Kč/MWh"], correct: 1 },
        ],
      },
    },
  },
  {
    id: "retence",
    icon: "🛡️",
    title: "Retence & komunikace",
    subtitle: "Callscripty, námitky, techniky",
    progress: 68,
    done: 5,
    total: 7,
    cert: false,
    lessons: [
      { title: "Úvod do retenčního hovoru", done: true, mins: 5, type: "video" },
      { title: "Otevření hovoru a zjištění důvodu", done: true, mins: 8, type: "reading" },
      { title: "Reakce na různé důvody odchodu", done: true, mins: 12, type: "reading" },
      { title: "Překonání námitek po nabídce", done: true, mins: 10, type: "reading" },
      { title: "Zákazník podepsal jinde – co dělat", done: true, mins: 6, type: "reading" },
      { title: "Nabídka a závěr hovoru", done: false, mins: 8, type: "video" },
      { title: "Quiz: Retence celkový", done: false, mins: 15, type: "quiz" },
    ],
    content: {
      "Reakce na různé důvody odchodu": {
        body: `Každý zákazník odchází z jiného důvodu. Nejprve ho nechte mluvit – čím víc řekne sám, tím lépe víte, co nabídnout.

CENA / chce ušetřit:
„Rozumím, cena je samozřejmě důležitá. Mohu se zeptat, jakou nabídku jste dostal/a? Ráda se podívám, co pro vás dokážeme udělat." → Pokud řekne číslo: porovnejte s vaší nabídkou. Pokud ne: přejděte rovnou na kalkulaci.

NESPOKOJENOST se službami:
„To mě mrzí a beru to vážně. Mohu se zeptat, co konkrétně se stalo?" → Pokud jde o řešitelný problém: nabídněte nápravu, pak teprve přejděte na cenu.

CHCE ODEJÍT K JINÉ FIRMĚ:
„Chápu. Mohu se zeptat, co vás u té druhé nabídky zaujalo nejvíc? Jde o cenu, nebo o něco jiného?" → Odpověď vám přesně řekne, co musíte nabídnout.

ZÁKAZNÍK UŽ PODEPSAL JINDE:
• Do 14 dnů od podpisu → může od nové smlouvy odstoupit
• Do 15 dnů od zahájení dodávky → stále možné odstoupení
• Dodávka ještě nezačala → možnost zpětvzetí výpovědi u nás`,
        quiz: [
          { q: "Co uděláte jako první při retenčním hovoru?", a: ["Rovnou nabídnete lepší cenu", "Nechte zákazníka mluvit a nepřerušujte", "Sdělíte výpovědní lhůtu", "Zeptáte se na e-mail"], correct: 1 },
        ],
      },
    },
  },
  {
    id: "systemy",
    icon: "💻",
    title: "Systémy & CRM (EIS)",
    subtitle: "Postupy v systému, formuláře",
    progress: 0,
    done: 0,
    total: 6,
    cert: false,
    lessons: [
      { title: "Úvod do EIS – orientace v systému", done: false, mins: 10, type: "video" },
      { title: "Založení zákazníka krok za krokem", done: false, mins: 12, type: "reading" },
      { title: "Smlouva na dodávku elektřiny v EIS", done: false, mins: 15, type: "reading" },
      { title: "Smlouva na výkup elektřiny v EIS", done: false, mins: 12, type: "reading" },
      { title: "Přepis výrobny – postup", done: false, mins: 8, type: "reading" },
      { title: "Změna ceníku – postup", done: false, mins: 6, type: "reading" },
    ],
    content: {},
  },
];

const typeIcon: Record<string, string> = { video: "▶️", reading: "📄", quiz: "📝" };
const typeBadge: Record<string, string> = { video: "Video", reading: "Četba", quiz: "Kvíz" };

function QuizCard({ quiz }: { quiz: { q: string; a: string[]; correct: number }[] }) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  return (
    <div className="space-y-4 mt-4">
      <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest">Ověřte si znalosti</div>
      {quiz.map((q, qi) => (
        <div key={qi} className="bg-[#EBF7F1] rounded-xl p-4">
          <p className="text-sm font-semibold text-[#0D3D34] mb-3">{q.q}</p>
          <div className="space-y-2">
            {q.a.map((a, ai) => {
              const selected = answers[qi] === ai;
              const answered = answers[qi] !== undefined && answers[qi] !== null;
              const correct = ai === q.correct;
              return (
                <button
                  key={ai}
                  onClick={() => !answered && setAnswers((prev) => ({ ...prev, [qi]: ai }))}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${
                    answered
                      ? correct
                        ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                        : selected
                          ? "bg-red-50 border-red-300 text-red-700"
                          : "bg-white border-[#D1DFD8] text-[#0D3D34]/40"
                      : "bg-white border-[#D1DFD8] hover:border-[#0D3D34]/30 text-[#0D3D34]"
                  }`}
                >
                  {a}
                </button>
              );
            })}
          </div>
          {answers[qi] !== undefined && answers[qi] !== null && (
            <p className={`text-xs mt-2 font-semibold ${answers[qi] === q.correct ? "text-green-700" : "text-red-600"}`}>
              {answers[qi] === q.correct ? "✓ Správně!" : `✗ Správně je: ${q.a[q.correct]}`}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AkademieePage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const { progress, markLesson, isDone, countDone } = useProgress();

  const course = COURSES.find((c) => c.id === selectedCourse);
  const lessonContent = course && selectedLesson ? (course.content as Record<string, { body: string; quiz?: { q: string; a: string[]; correct: number }[] }>)[selectedLesson] : null;
  const lessonIdx = course && selectedLesson ? course.lessons.findIndex((l) => l.title === selectedLesson) : -1;

  if (selectedCourse && course) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <button onClick={() => { setSelectedCourse(null); setSelectedLesson(null); }} className="flex items-center gap-2 text-[#0D3D34]/50 text-sm hover:text-[#0D3D34] mb-6 transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Zpět na kurzy
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: lesson list */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden sticky top-8">
              <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
                <div className="text-2xl mb-1">{course.icon}</div>
                <h2 className="font-bold text-[#0D3D34] text-sm">{course.title}</h2>
                <div className="mt-2">
                  {(() => {
                    const done = countDone(course.id);
                    const pct = Math.round((done / course.total) * 100);
                    return (
                      <>
                        <div className="flex justify-between text-[10px] text-[#0D3D34]/40 mb-1">
                          <span>{done}/{course.total} lekcí</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#D7FF00]" style={{ width: `${pct}%` }} />
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
              <div className="divide-y divide-[#D1DFD8]">
                {course.lessons.map((lesson, i) => (
                  <button
                    key={lesson.title}
                    onClick={() => setSelectedLesson(selectedLesson === lesson.title ? null : lesson.title)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F7FAF9] transition-colors ${selectedLesson === lesson.title ? "bg-[#EBF7F1]" : ""}`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] ${isDone(course.id, i) ? "bg-[#D7FF00] text-[#0D3D34]" : "border-2 border-[#D1DFD8] text-[#0D3D34]/30"}`}>
                      {isDone(course.id, i) ? "✓" : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-medium truncate ${isDone(course.id, i) ? "text-[#0D3D34]" : "text-[#0D3D34]/60"}`}>{lesson.title}</div>
                      <div className="text-[10px] text-[#0D3D34]/35">{typeIcon[lesson.type]} {typeBadge[lesson.type]} · {lesson.mins} min</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="lg:col-span-2">
            {lessonContent ? (
              <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#D1DFD8] bg-[#EBF7F1]">
                  <h3 className="font-bold text-[#0D3D34]">{selectedLesson}</h3>
                </div>
                <div className="px-6 py-5">
                  <pre className="text-sm text-[#0D3D34]/80 leading-relaxed whitespace-pre-wrap font-sans">{lessonContent.body}</pre>
                  {lessonContent.quiz && <QuizCard quiz={lessonContent.quiz} />}
                  {course && lessonIdx >= 0 && (
                    <div className="mt-5 pt-4 border-t border-[#D1DFD8]">
                      {isDone(course.id, lessonIdx) ? (
                        <div className="flex items-center gap-2 text-[#1A6B5A] text-sm font-semibold">
                          <span className="w-5 h-5 rounded-full bg-[#D7FF00] flex items-center justify-center text-[10px] text-[#0D3D34]">✓</span>
                          Lekce dokončena · +50 bodů
                        </div>
                      ) : (
                        <button
                          onClick={() => markLesson(course.id, lessonIdx)}
                          className="bg-[#0D3D34] text-[#D7FF00] px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                        >
                          Označit jako dokončenou · +50 b
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#D1DFD8] rounded-2xl p-10 text-center">
                <div className="text-4xl mb-3">{course.icon}</div>
                <h3 className="font-bold text-[#0D3D34] text-lg mb-2">{course.title}</h3>
                <p className="text-[#0D3D34]/50 text-sm mb-6">{course.subtitle}</p>
                <p className="text-[#0D3D34]/40 text-xs">← Vyberte lekci ze seznamu vlevo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Akademie</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">5 kurzů · 32 lekcí · obsah z reálných školení Tramaco Energy</p>
      </div>

      {/* Overall progress */}
      <div className="bg-[#0D3D34] rounded-2xl p-5 mb-6 flex items-center gap-6">
        <div className="flex-1">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Celkový pokrok</div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#D7FF00]" style={{ width: "56%" }} />
          </div>
          <div className="flex justify-between text-xs text-white/50 mt-1">
            <span>18 / 32 lekcí</span>
            <span>56 %</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[#D7FF00] text-2xl font-bold">2/5</div>
          <div className="text-white/40 text-xs">kurzů dokončeno</div>
        </div>
      </div>

      {/* Course grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {COURSES.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourse(c.id)}
            className="bg-white border border-[#D1DFD8] rounded-2xl p-5 text-left hover:shadow-md hover:border-[#0D3D34]/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF7F1] flex items-center justify-center text-xl">{c.icon}</div>
                <div>
                  <div className="font-bold text-[#0D3D34] text-sm group-hover:text-[#1A6B5A] transition-colors">{c.title}</div>
                  <div className="text-xs text-[#0D3D34]/45 mt-0.5">{c.subtitle}</div>
                </div>
              </div>
              {c.cert && <span className="text-[10px] bg-[#D7FF00] text-[#0D3D34] font-bold px-2 py-0.5 rounded-full flex-shrink-0">✓ Cert.</span>}
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-[#0D3D34]/40 mb-1">
                <span>{c.done}/{c.total} lekcí</span>
                <span>{c.progress}%</span>
              </div>
              <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${c.progress}%`, backgroundColor: c.progress === 100 ? "#D7FF00" : "#B8E8D0" }}
                />
              </div>
            </div>
            <div className="mt-3 flex gap-3">
              {c.lessons.slice(0, 4).map((l) => (
                <div key={l.title} title={l.title} className={`w-2 h-2 rounded-full flex-shrink-0 ${l.done ? "bg-[#D7FF00]" : "bg-[#D1DFD8]"}`} />
              ))}
              {c.total > 4 && <span className="text-[10px] text-[#0D3D34]/30">+{c.total - 4}</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
