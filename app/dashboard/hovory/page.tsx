"use client";
import { useState, useRef } from "react";

type Objection = {
  id: string;
  title: string;
  emoji: string;
  tag: string;
  situation: string;
  response: string[];
  tip: string;
};

const OBJECTIONS: Objection[] = [
  {
    id: "cena",
    title: "\"Je to drahé / jinde mám levněji\"",
    emoji: "💰",
    tag: "Cena",
    situation: "Zákazník tvrdí, že konkurence nabízí nižší cenu nebo že mu přišla výhodnější nabídka.",
    response: [
      '„Rozumím, cena je důležitá. Můžu se zeptat, jakou konkrétní cenu vám nabídli a na jak dlouho?',
      '„HOME FIX 24 máme na 2 842,29 Kč/MWh s DPH – to je jedna z nejstabilnějších cen na trhu na 2 roky.',
      '„Levnější nabídka může být na SPOT tarifu – to znamená, že cena se mění každou hodinu podle burzy. V zimě může být 2–3× dražší než FIX.',
      '„U nás máte jistotu pevné ceny po celou dobu smlouvy – bez skrytých poplatků.',
    ],
    tip: "Nikdy nesnižujte cenu bez souhlasu vedoucího. Místo toho srovnávejte hodnotu, ne jen číslo.",
  },
  {
    id: "nespokojenost",
    title: "\"Nejste spokojeni s vaší firmou\"",
    emoji: "😤",
    tag: "Stížnost",
    situation: "Zákazník vyjadřuje obecnou nespokojenost – špatný zákaznický servis, fakturační chyby, nedostupná linka.",
    response: [
      '„To mě mrzí a chápu vaši frustraci. Řekněte mi prosím, co konkrétně se stalo?',
      '„Chci to s vámi vyřešit hned. Dám vám číslo přímé linky pro prioritní zákazníky.',
      '„Zaznamenám to jako stížnost a budete do 2 pracovních dnů kontaktováni vedoucím týmu.',
      '„Mohu mezitím ověřit váš účet a zjistit, zda nenastala chyba v systému?',
    ],
    tip: "Nikdy se nevymlouvejte. Převezměte zodpovědnost a nabídněte konkrétní kroky.",
  },
  {
    id: "spot",
    title: "\"Chci SPOT tarif / jsem na burze\"",
    emoji: "⚡",
    tag: "Tarif",
    situation: "Zákazník je na SPOT tarifu nebo o něj žádá a nechce přejít na FIX.",
    response: [
      '„Skvělé, že uvažujete o tarifu. Říkáte, že máte SPOT – mohu se zeptat, jakou spotřebu máte přibližně v noci vs. přes den?',
      '„SPOT je výhodný, pokud máte smart metr AMM a flexibilní spotřebu – nabíjíte auto v noci, pračka přes den.',
      '„Minulou zimu byla cena na burze v špičkách 6–8 Kč/kWh. HOME FIX 24 dává 2,84 Kč/kWh po celý rok.',
      '„Pokud chcete, mohu vám ukázat kalkulaci pro váš odběr – srovnám SPOT vs. FIX za posledních 12 měsíců.',
    ],
    tip: "SPOT doporučujte pouze zákazníkům s AMM metrem a prokazatelně flexibilní spotřebou.",
  },
  {
    id: "konkurence",
    title: "\"Přecházím ke konkurenci\"",
    emoji: "🏃",
    tag: "Odchod",
    situation: "Zákazník podal nebo plánuje podat výpověď a přejít k jinému dodavateli.",
    response: [
      '„Toho si vážím, že mi to říkáte. Mohu se zeptat, co vás k tomu vedlo?',
      '„Věděli jste, že do 14 dnů od podpisu smlouvy s novou firmou máte zákonné právo od ní odstoupit?',
      '„Než podáte výpověď, dovolte mi ověřit, zda pro vás nemáme lepší podmínky – třeba přechod na HOME FIX 36.',
      '„Pokud se rozhodnete odejít, respektuji to. Ale dejte mi prosím 5 minut – ukážu vám kalkulaci.',
    ],
    tip: "Nenechte zákazníka zavěsit bez kontroverze. Vždy se ptejte na důvod a nabídněte alternativu.",
  },
  {
    id: "velka-firma",
    title: "\"Jste příliš malá firma\"",
    emoji: "🏢",
    tag: "Důvěra",
    situation: "Zákazník pochybuje o stabilitě nebo reputaci Tramaco Energy.",
    response: [
      '„Chápu, že stabilita dodavatele je zásadní. Tramaco Energy je licencovaný obchodník s energiemi s licencí ERÚ.',
      '„Distribuci vaší elektřiny zajišťuje vždy distribuční síť (ČEZ, E.ON, PREdistribuce) – ta se nemění bez ohledu na dodavatele.',
      '„Při změně dodavatele se nic na vaší přípojce nemění – stejné jistky, stejné kabely, stejný výpadek v případě poruchy.',
      '„Máme tisíce zákazníků a rosteme – mohu vám ukázat reference nebo nasměrovat na recenze.',
    ],
    tip: "Vždy zdůrazněte, že distribuce = infrastruktura (ČEZ/E.ON), dodávka = pouze obchod.",
  },
  {
    id: "smlouva",
    title: "\"Nechci podpisovat dlouhou smlouvu\"",
    emoji: "📄",
    tag: "Závazek",
    situation: "Zákazník se bojí být uvázán smlouvou nebo chce flexibilitu bez fixace.",
    response: [
      '„Rozumím, flexibilita je důležitá. HOME FIX 12 má pouze roční fixaci – 3 084,29 Kč/MWh s DPH.',
      '„Alternativně máte SPOT bez fixace, ale jak jsem zmiňoval, cena se mění každou hodinu.',
      '„Naše FIX smlouvy nemají sankce za spotřebu mimo pásmo – platíte za to, co skutečně odeberete.',
      '„Pokud si nejste jistí, začněte s HOME FIX 12 – za rok se situace přehodnotí.',
    ],
    tip: "Kratší FIX je lepší argument než žádný FIX. HOME FIX 12 je silná nabídka pro nerozhodné zákazníky.",
  },
];

type GoldenCall = {
  id: string;
  title: string;
  agent: string;
  duration: string;
  result: string;
  tags: string[];
  score: number;
  transcript: { speaker: "agent" | "customer"; text: string }[];
  lessons: string[];
};

const GOLDEN_CALLS: GoldenCall[] = [
  {
    id: "retence-fve",
    title: "Retence zákazníka s FVE",
    agent: "Eva Procházková",
    duration: "8 min 42 s",
    result: "Zákazník přešel na FVE výkup + ponechal dodávku",
    tags: ["FVE", "Retence", "Výkup"],
    score: 98,
    transcript: [
      { speaker: "agent", text: "Dobrý den, tady Eva Procházková z Tramaco Energy. Volám ohledně vaší výpovědi – chcete mi říct, co se stalo?" },
      { speaker: "customer", text: "No, pořídil jsem si solární panely a myslel jsem, že od vás odejdu, protože nevím, jestli nabízíte výkup." },
      { speaker: "agent", text: "To je skvělá zpráva! My výkup samozřejmě nabízíme. Máte 10 kWp nebo více? Pak by pro vás byl ideální Home Solar FIX MAXI – 400 Kč za MWh s paušálem 99 Kč měsíčně." },
      { speaker: "customer", text: "Mám 8 kWp, takže jsem menší." },
      { speaker: "agent", text: "Perfektně – pak Home Solar FIX: 500 Kč/MWh, paušál 59 Kč měsíčně. A samozřejmě vám dodávku ponecháme na HOME FIX 24, který máte. Jeden dodavatel pro výkup i dodávku – žádné komplikace." },
      { speaker: "customer", text: "To neznělo špatně. Jak to zařídíme?" },
      { speaker: "agent", text: "Pošlu vám email s výkupní smlouvou a potřebujeme EAN vaší výrobny a výkon FVE. Vše vyřídím za vás přes EIS systém." },
    ],
    lessons: [
      "Začít otázkou, ne argumentem – zjistit důvod výpovědi",
      "Hned nabídnout řešení šité na míru (FVE produkt dle výkonu)",
      "Propojit výkup + dodávka = jednoduchý cross-sell",
      "Konkrétní čísla zvyšují důvěru",
    ],
  },
  {
    id: "spot-na-fix",
    title: "Přechod ze SPOT na FIX 24",
    agent: "Martin Novák",
    duration: "6 min 15 s",
    result: "Podpis HOME FIX 24 okamžitě",
    tags: ["SPOT", "FIX", "Cena"],
    score: 95,
    transcript: [
      { speaker: "customer", text: "Mám na vás stížnost – za prosinec mi přišel účet 8 400 Kč. To je čtyřnásobek!" },
      { speaker: "agent", text: "Rozumím, to muselo být šokující. Podívám se na váš tarif... vidím, že jste na SPOT tarifu. Prosinec byl na burze výjimečně drahý – špičky přes 6 Kč/kWh." },
      { speaker: "customer", text: "Ale nikdo mi to neřekl, že to bude takhle drahé." },
      { speaker: "agent", text: "Máte naprostou pravdu. SPOT tarif nese riziko výkyvů. Chcete, abych vám ukázal, kolik byste platil na HOME FIX 24? Pevná cena 2,84 Kč/kWh po celé 2 roky." },
      { speaker: "customer", text: "A to by platilo i pro prosinec?" },
      { speaker: "agent", text: "Přesně tak. V prosinci byste zaplatil přibližně 2 100 Kč místo 8 400 Kč. Mohu vás hned přepsat na FIX 24 – smlouva platí od příštího odečtu." },
      { speaker: "customer", text: "Tak to udělejte, prosím." },
    ],
    lessons: [
      "Nehádat se o minulosti – uznat chybu systému, přejít na řešení",
      "Kalkulace v korunách = okamžitý efekt",
      "Zákazník sám řekne 'ano' – nečekat na to, nabídnout to hned",
    ],
  },
  {
    id: "namitka-velka-firma",
    title: "Námitka – malá firma vs. ČEZ",
    agent: "Petra Vlčková",
    duration: "4 min 30 s",
    result: "Zákazník souhlasil s nabídkou FIX 24",
    tags: ["Důvěra", "Retence", "Námitka"],
    score: 91,
    transcript: [
      { speaker: "customer", text: "Já bych raději šel zpět k ČEZ, to je velká firma, mám tam jistotu." },
      { speaker: "agent", text: "Chápu tu logiku. Ale víte, že distribuci vaší elektřiny zajišťuje ČEZ Distribuce – a to se nemění, ať jste u nás nebo u ČEZ Prodej?" },
      { speaker: "customer", text: "Jak to myslíte?" },
      { speaker: "agent", text: "Kabely, jističe, záloha při výpadku – to je distribuce, a ta patří ČEZ vždy. My jsme jen obchodní dodavatel – prodáváme elektřinu levněji. Při výpadku volají všichni zákazníci v regionu stejné číslo." },
      { speaker: "customer", text: "Aha, to jsem nevěděl." },
      { speaker: "agent", text: "Navíc máme licenci ERÚ a tisíce spokojených zákazníků. A HOME FIX 24 máme o přibližně 12 % levněji než aktuální ceník ČEZ Prodej. Chcete kalkulaci?" },
    ],
    lessons: [
      "Rozlišit distribuce vs. dodávka – silný edukační argument",
      "Klidný, věcný tón – nepodporuje obranu zákazníka",
      "Konkrétní procento srovnání = měřitelná výhoda",
    ],
  },
];

function AudioPlayer({ callId }: { callId: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  // Demo: simulate playback with a synthetic tone
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  const toggle = () => {
    if (playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (ctxRef.current) { ctxRef.current.close(); ctxRef.current = null; }
      setPlaying(false);
    } else {
      setPlaying(true);
      // simulate progress
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setPlaying(false);
            return 0;
          }
          return p + 0.5;
        });
      }, 200);
    }
  };

  const durationSec = parseInt(callId === "retence-fve" ? "522" : callId === "spot-na-fix" ? "375" : "270");
  const elapsed = Math.floor((progress / 100) * durationSec);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="bg-[#0D3D34] rounded-2xl p-4 mb-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" style={{ animationPlayState: playing ? "running" : "paused" }} />
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex-1">Zvukový záznam hovoru</div>
        <div className="text-[10px] text-[#D7FF00]/60">{fmt(elapsed)} / {fmt(durationSec)}</div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggle}
          className="w-9 h-9 rounded-full bg-[#D7FF00] flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          {playing ? (
            <svg width="12" height="12" fill="#0D3D34" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
          ) : (
            <svg width="12" height="12" fill="#0D3D34" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
          )}
        </button>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setProgress(((e.clientX - rect.left) / rect.width) * 100);
        }}>
          <div className="h-full bg-[#D7FF00] rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="text-[10px] text-white/25 mt-2 text-center">Demo nahrávka · reálné záznamy budou nahrány po schválení</div>
    </div>
  );
}

export default function HovoryPage() {
  const [tab, setTab] = useState<"obj" | "calls">("obj");
  const [selectedObj, setSelectedObj] = useState<Objection | null>(OBJECTIONS[0]);
  const [selectedCall, setSelectedCall] = useState<GoldenCall | null>(null);
  const [filter, setFilter] = useState("");

  const filteredObj = OBJECTIONS.filter(
    (o) => !filter || o.tag === filter
  );
  const tags = Array.from(new Set(OBJECTIONS.map((o) => o.tag)));

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-8 pt-6 pb-4 border-b border-[#D1DFD8] bg-white flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#0D3D34]">Zlaté hovory & Objection Handler</h1>
          <p className="text-[#0D3D34]/50 text-xs mt-0.5">Vzorové hovory a odpovědi na nejčastější námitky zákazníků</p>
        </div>
        <div className="flex gap-1 bg-[#EBF7F1] p-1 rounded-xl">
          <button onClick={() => setTab("obj")} className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${tab === "obj" ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/50"}`}>
            🛡️ Objection Handler
          </button>
          <button onClick={() => setTab("calls")} className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${tab === "calls" ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/50"}`}>
            ⭐ Zlaté hovory
          </button>
        </div>
      </div>

      {tab === "obj" && (
        <div className="flex flex-1 overflow-hidden">
          {/* Left: objection list */}
          <div className="w-64 border-r border-[#D1DFD8] bg-[#F7FAF9] flex flex-col flex-shrink-0 overflow-hidden">
            <div className="p-3 border-b border-[#D1DFD8]">
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setFilter("")}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all ${!filter ? "bg-[#0D3D34] text-white" : "bg-white border border-[#D1DFD8] text-[#0D3D34]/60"}`}
                >
                  Vše
                </button>
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(filter === t ? "" : t)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all ${filter === t ? "bg-[#0D3D34] text-white" : "bg-white border border-[#D1DFD8] text-[#0D3D34]/60"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredObj.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setSelectedObj(obj)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${selectedObj?.id === obj.id ? "bg-[#0D3D34] text-white" : "bg-white border border-[#D1DFD8] hover:border-[#0D3D34]/30"}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base flex-shrink-0">{obj.emoji}</span>
                    <div>
                      <div className={`text-xs font-semibold leading-snug ${selectedObj?.id === obj.id ? "text-white" : "text-[#0D3D34]"}`}>{obj.title}</div>
                      <div className={`text-[10px] mt-0.5 ${selectedObj?.id === obj.id ? "text-white/60" : "text-[#0D3D34]/40"}`}>{obj.tag}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: detail */}
          <div className="flex-1 overflow-y-auto p-8">
            {selectedObj ? (
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{selectedObj.emoji}</span>
                  <div>
                    <span className="text-[10px] font-bold bg-[#EBF7F1] text-[#1A6B5A] px-2 py-0.5 rounded-full">{selectedObj.tag}</span>
                    <h2 className="text-lg font-bold text-[#0D3D34] mt-1">{selectedObj.title}</h2>
                  </div>
                </div>

                <div className="bg-[#EBF7F1] rounded-2xl p-4 mb-5">
                  <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-1.5">Situace</div>
                  <p className="text-sm text-[#0D3D34] leading-relaxed">{selectedObj.situation}</p>
                </div>

                <div className="mb-5">
                  <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-3">Doporučené odpovědi</div>
                  <div className="space-y-3">
                    {selectedObj.response.map((r, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#0D3D34] flex items-center justify-center text-[10px] font-bold text-[#D7FF00] flex-shrink-0 mt-0.5">{i + 1}</div>
                        <p className="text-sm text-[#0D3D34] leading-relaxed italic">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#D7FF00] rounded-2xl p-4">
                  <div className="text-[10px] font-bold text-[#0D3D34]/60 uppercase tracking-widest mb-1.5">💡 Tip pro operátora</div>
                  <p className="text-sm text-[#0D3D34] font-medium leading-relaxed">{selectedObj.tip}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-[#0D3D34]/30 mt-20">
                <div className="text-4xl mb-3">🛡️</div>
                <p className="text-sm">Vyberte námitku vlevo</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "calls" && (
        <div className="flex flex-1 overflow-hidden">
          {/* Left: call list */}
          <div className="w-72 border-r border-[#D1DFD8] bg-[#F7FAF9] flex flex-col flex-shrink-0 overflow-hidden">
            <div className="p-3 border-b border-[#D1DFD8]">
              <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">Vzorové hovory ({GOLDEN_CALLS.length})</div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {GOLDEN_CALLS.map((call) => (
                <button
                  key={call.id}
                  onClick={() => setSelectedCall(call)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all ${selectedCall?.id === call.id ? "bg-[#0D3D34]" : "bg-white border border-[#D1DFD8] hover:border-[#0D3D34]/30"}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className={`text-xs font-bold leading-snug ${selectedCall?.id === call.id ? "text-white" : "text-[#0D3D34]"}`}>{call.title}</div>
                    <div className={`text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${selectedCall?.id === call.id ? "bg-[#D7FF00] text-[#0D3D34]" : "bg-[#EBF7F1] text-[#1A6B5A]"}`}>{call.score}%</div>
                  </div>
                  <div className={`text-[10px] ${selectedCall?.id === call.id ? "text-white/60" : "text-[#0D3D34]/40"}`}>{call.agent} · {call.duration}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {call.tags.map((t) => (
                      <span key={t} className={`text-[9px] px-1.5 py-0.5 rounded-full ${selectedCall?.id === call.id ? "bg-white/10 text-white/70" : "bg-[#EBF7F1] text-[#1A6B5A]"}`}>{t}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: transcript */}
          <div className="flex-1 overflow-y-auto p-8">
            {selectedCall ? (
              <div className="max-w-2xl">
                <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {selectedCall.tags.map((t) => (
                        <span key={t} className="text-[10px] font-bold bg-[#EBF7F1] text-[#1A6B5A] px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <h2 className="text-lg font-bold text-[#0D3D34]">{selectedCall.title}</h2>
                    <p className="text-xs text-[#0D3D34]/50 mt-1">{selectedCall.agent} · {selectedCall.duration}</p>
                  </div>
                  <div className="bg-[#D7FF00] rounded-2xl px-5 py-3 text-center flex-shrink-0">
                    <div className="text-2xl font-black text-[#0D3D34]">{selectedCall.score} %</div>
                    <div className="text-[10px] text-[#0D3D34]/60">skóre hovoru</div>
                  </div>
                </div>

                <div className="bg-[#EBF7F1] rounded-2xl p-4 mb-5">
                  <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-1">Výsledek</div>
                  <p className="text-sm text-[#0D3D34] font-medium">{selectedCall.result}</p>
                </div>

                {/* Audio player */}
                <AudioPlayer key={selectedCall.id} callId={selectedCall.id} />

                {/* Transcript */}
                <div className="mb-6">
                  <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-3">Přepis hovoru</div>
                  <div className="space-y-3">
                    {selectedCall.transcript.map((line, i) => (
                      <div key={i} className={`flex gap-3 ${line.speaker === "customer" ? "flex-row-reverse" : ""}`}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5" style={{ backgroundColor: line.speaker === "agent" ? "#0D3D34" : "#EBF7F1", color: line.speaker === "agent" ? "#D7FF00" : "#0D3D34" }}>
                          {line.speaker === "agent" ? "OP" : "Z"}
                        </div>
                        <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${line.speaker === "agent" ? "bg-white border border-[#D1DFD8] text-[#0D3D34] rounded-tl-sm" : "bg-[#EBF7F1] text-[#0D3D34] rounded-tr-sm"}`}>
                          {line.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lessons */}
                <div className="bg-[#D7FF00] rounded-2xl p-5">
                  <div className="text-[10px] font-bold text-[#0D3D34]/60 uppercase tracking-widest mb-3">💡 Co se z hovoru naučit</div>
                  <div className="space-y-2">
                    {selectedCall.lessons.map((l, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <div className="w-4 h-4 rounded-full bg-[#0D3D34] flex items-center justify-center text-[9px] font-bold text-[#D7FF00] flex-shrink-0 mt-0.5">{i + 1}</div>
                        <p className="text-xs text-[#0D3D34] leading-relaxed">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-[#0D3D34]/30 mt-20">
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-sm">Vyberte hovor vlevo pro zobrazení přepisu</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
