"use client";

import { useState } from "react";

// ── BOD 1: Objection Handler ──────────────────────────────────────────────────
const OBJECTIONS = [
  {
    label: "Je to drahé",
    responses: [
      `Rozumím. Pokud porovnáme jen komoditu, FIX 24 vás stojí 3,45 Kč/kWh — to je méně než průměrná spotová cena za posledních 12 měsíců.`,
      `Mohu vám ukázat vaši aktuální spotřebu a porovnat, o kolik byste ušetřili na FIX tarifu?`,
    ],
  },
  {
    label: "Odcházím ke konkurenci",
    responses: [
      `Chápu. Smím se zeptat, co vás k tomu vede? Někdy dokážeme najít řešení přímo u nás.`,
      `Pokud jde o cenu, mohu vám nabídnout aktuální ceník — konkurence ne vždy vychází levněji po započtení všech poplatků.`,
    ],
  },
  {
    label: "Nechci se vázat",
    responses: [
      `Na FIX 12 je vázanost jen rok. Po uplynutí můžete odejít bez poplatku — a máte jistou cenu po celý rok.`,
      `Rozumíte, že bez vázanosti bychom nemohli garantovat cenu? Na SPOTu se může měnit každou hodinu.`,
    ],
  },
  {
    label: "Mám špatnou zkušenost",
    responses: [
      `Je mi to líto. Můžete mi říct více, co se stalo? Chci to zaregistrovat a zjistit, co můžeme udělat.`,
      `Každá reklamace se u nás eviduje a řeší do 30 dní. Mohu vám dát referenční číslo hned teď.`,
    ],
  },
];

function ObjectionHandler() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 mb-1">
        {OBJECTIONS.map((o, i) => (
          <button
            key={o.label}
            onClick={() => setActive(active === i ? null : i)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${active === i ? "bg-[#0D3D34] text-[#D7FF00] border-[#0D3D34]" : "bg-white text-[#0D3D34] border-[#D1DFD8] hover:border-[#0D3D34]/40"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-xl p-4 space-y-3 animate-in">
          <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">Doporučené formulace</div>
          {OBJECTIONS[active].responses.map((r, i) => (
            <div key={i} className="flex gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D7FF00] text-[#0D3D34] text-[10px] font-black flex items-center justify-center mt-0.5">{i + 1}</span>
              <p className="text-sm text-[#0D3D34] leading-relaxed italic">{r}</p>
            </div>
          ))}
        </div>
      )}
      {active === null && (
        <p className="text-xs text-[#0D3D34]/40 pl-1">← Klikněte na námitku zákazníka</p>
      )}
    </div>
  );
}

// ── BOD 3: Certifikační systém ────────────────────────────────────────────────
const CERTS = [
  { name: "Produktový specialista", icon: "⚡", progress: 100, color: "#D7FF00", textColor: "#0D3D34", done: true },
  { name: "Retenční expert", icon: "🛡️", progress: 68, color: "#B8E8D0", textColor: "#0D3D34", done: false },
  { name: "FVE & Výkup", icon: "☀️", progress: 35, color: "#EBF7F1", textColor: "#0D3D34", done: false },
  { name: "Komunikační dovednosti", icon: "🎯", progress: 100, color: "#D7FF00", textColor: "#0D3D34", done: true },
];

const TEAM_CERTS = [
  { name: "Jana K.", certs: 4, badge: "🥇" },
  { name: "Monika S.", certs: 3, badge: "🥈" },
  { name: "Petra V.", certs: 2, badge: "🥉" },
  { name: "Lucie M.", certs: 1, badge: "" },
];

function CertSystem() {
  const [tab, setTab] = useState<"moje" | "tim">("moje");
  return (
    <div>
      <div className="flex gap-1 mb-4 bg-[#EBF7F1] rounded-lg p-1">
        {(["moje", "tim"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-all ${tab === t ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/50"}`}
          >
            {t === "moje" ? "Moje certifikáty" : "Tým"}
          </button>
        ))}
      </div>

      {tab === "moje" ? (
        <div className="space-y-3">
          {CERTS.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${c.done ? "bg-[#D7FF00]" : "bg-[#EBF7F1]"}`}>{c.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#0D3D34] truncate">{c.name}</span>
                  {c.done
                    ? <span className="text-[10px] font-bold text-[#1A6B5A] ml-2 flex-shrink-0">✓ Certifikováno</span>
                    : <span className="text-[10px] text-[#0D3D34]/40 ml-2 flex-shrink-0">{c.progress}%</span>
                  }
                </div>
                <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${c.progress}%`, backgroundColor: c.done ? "#D7FF00" : "#B8E8D0" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {TEAM_CERTS.map((p, i) => (
            <div key={p.name} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${i === 0 ? "bg-[#D7FF00]/15 border border-[#D7FF00]/40" : "bg-[#EBF7F1]"}`}>
              <span className="text-base w-5 text-center">{p.badge || "·"}</span>
              <span className="text-sm font-semibold text-[#0D3D34] flex-1">{p.name}</span>
              <span className="text-xs text-[#0D3D34]/50">{p.certs} / 4 certifikátů</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── BOD 4: Leaderboard & Gamifikace ─────────────────────────────────────────
const LEADERS = [
  { name: "Jana K.", points: 2840, streak: 14, badges: ["⚡", "🔥", "🎯"], change: +2 },
  { name: "Monika S.", points: 2510, streak: 9, badges: ["⚡", "🔥"], change: 0 },
  { name: "Petra V.", points: 2190, streak: 5, badges: ["⚡"], change: -1 },
  { name: "Lucie M.", points: 1870, streak: 3, badges: [], change: +1 },
  { name: "Zuzana P.", points: 1640, streak: 1, badges: [], change: -1 },
];

const ACHIEVEMENTS = [
  { icon: "⚡", name: "První certifikát", earned: true },
  { icon: "🔥", name: "7denní streak", earned: true },
  { icon: "🎯", name: "100% test", earned: true },
  { icon: "👑", name: "Top týmu", earned: false },
];

function Leaderboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">Týdenní žebříček</span>
        <span className="text-[10px] text-[#0D3D34]/30">resetuje se v pondělí</span>
      </div>
      <div className="space-y-2 mb-4">
        {LEADERS.map((l, i) => (
          <div
            key={l.name}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 ${i === 0 ? "bg-[#0D3D34] text-white" : i === 1 ? "bg-[#EBF7F1]" : "bg-white border border-[#D1DFD8]"}`}
          >
            <span className={`text-sm font-black w-5 text-center ${i === 0 ? "text-[#D7FF00]" : "text-[#0D3D34]/30"}`}>
              {i + 1}
            </span>
            <span className={`text-xs font-semibold flex-1 ${i === 0 ? "text-white" : "text-[#0D3D34]"}`}>{l.name}</span>
            <span className="flex gap-0.5">{l.badges.map((b) => <span key={b} className="text-xs">{b}</span>)}</span>
            <span className={`text-[10px] font-medium ${i === 0 ? "text-white/60" : "text-[#0D3D34]/40"}`}>
              🔥{l.streak}d
            </span>
            <span className={`text-xs font-bold tabular-nums ${i === 0 ? "text-[#D7FF00]" : "text-[#0D3D34]"}`}>
              {l.points.toLocaleString()}b
            </span>
            <span className={`text-[10px] w-5 text-center ${l.change > 0 ? "text-green-500" : l.change < 0 ? "text-red-400" : "text-[#0D3D34]/20"}`}>
              {l.change > 0 ? "↑" : l.change < 0 ? "↓" : "–"}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-[#D1DFD8] pt-3">
        <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-2">Vaše odznaky</div>
        <div className="flex gap-2">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.name}
              title={a.name}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border ${a.earned ? "bg-[#D7FF00]/20 border-[#D7FF00]/50" : "bg-[#EBF7F1] border-[#D1DFD8] opacity-35 grayscale"}`}
            >
              {a.icon}
            </div>
          ))}
          <div className="w-9 h-9 rounded-xl border-2 border-dashed border-[#D1DFD8] flex items-center justify-center text-[#0D3D34]/20 text-lg">+</div>
        </div>
      </div>
    </div>
  );
}

// ── BOD 8: Zlaté hovory ───────────────────────────────────────────────────────
const CALLS = [
  {
    name: "Jana K.",
    tag: "Retence FVE zákazník",
    duration: "4:23",
    date: "12. 5.",
    score: 98,
    note: "Perfektní příklad jak vysvětlit výkup a zároveň nabídnout FIX 24. Zákazník zůstal.",
    playing: false,
  },
  {
    name: "Monika S.",
    tag: "Námitka – konkurence",
    duration: "6:11",
    date: "8. 5.",
    score: 94,
    note: "Ukázková retenční technika. Zákazník neodešel, přešel na FIX 12.",
    playing: false,
  },
  {
    name: "Petra V.",
    tag: "Onboarding nového zákazníka",
    duration: "3:45",
    date: "3. 5.",
    score: 91,
    note: "Rychlý a jasný onboarding. Všechny body checklistu splněny.",
    playing: false,
  },
];

function GoldenCalls() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">Ukázkové nahrávky · květen 2025</span>
        <span className="text-[10px] text-[#0D3D34]/30">3 nahrávky</span>
      </div>
      {CALLS.map((c, i) => (
        <div
          key={i}
          className={`rounded-xl border overflow-hidden transition-all cursor-pointer ${expanded === i ? "border-[#0D3D34]/30 shadow-md" : "border-[#D1DFD8] bg-white"}`}
          onClick={() => setExpanded(expanded === i ? null : i)}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            {/* Play button */}
            <button
              onClick={(e) => { e.stopPropagation(); setPlaying(playing === i ? null : i); }}
              className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${playing === i ? "bg-[#0D3D34]" : "bg-[#D7FF00]"}`}
            >
              {playing === i
                ? <svg width="10" height="10" fill="white" viewBox="0 0 10 10"><rect x="1" y="1" width="3" height="8" rx="1"/><rect x="6" y="1" width="3" height="8" rx="1"/></svg>
                : <svg width="10" height="10" fill="#0D3D34" viewBox="0 0 10 10"><path d="M2 1.5l7 3.5-7 3.5V1.5z"/></svg>
              }
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0D3D34]">{c.name}</span>
                <span className="text-[10px] bg-[#D7FF00] text-[#0D3D34] font-bold px-1.5 py-0.5 rounded-full">★ zlatý</span>
              </div>
              <div className="text-[10px] text-[#0D3D34]/50 truncate">{c.tag}</div>
            </div>

            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
              <span className="text-[10px] font-bold text-[#1A6B5A]">{c.score}%</span>
              <span className="text-[10px] text-[#0D3D34]/35">{c.duration} · {c.date}</span>
            </div>
          </div>

          {/* Waveform mockup */}
          {playing === i && (
            <div className="px-4 pb-2">
              <div className="flex items-center gap-0.5 h-6">
                {Array.from({ length: 48 }).map((_, j) => {
                  const h = 20 + Math.sin(j * 0.7) * 10 + Math.cos(j * 1.3) * 8;
                  const active = j < 22;
                  return (
                    <div
                      key={j}
                      className="flex-1 rounded-full transition-colors"
                      style={{ height: `${Math.max(4, h)}%`, backgroundColor: active ? "#0D3D34" : "#D1DFD8" }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-[#0D3D34]/40">1:54</span>
                <span className="text-[10px] text-[#0D3D34]/40">{c.duration}</span>
              </div>
            </div>
          )}

          {/* Expanded note */}
          {expanded === i && (
            <div className="px-4 pb-4 border-t border-[#D1DFD8] pt-3 bg-[#EBF7F1]/60">
              <p className="text-xs text-[#0D3D34]/70 leading-relaxed italic">„{c.note}"</p>
              <div className="flex gap-2 mt-3">
                <button className="text-xs bg-[#0D3D34] text-[#D7FF00] px-3 py-1.5 rounded-lg font-semibold">Přidat do kurzu</button>
                <button className="text-xs bg-white border border-[#D1DFD8] text-[#0D3D34] px-3 py-1.5 rounded-lg">Sdílet týmu</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const FEATURE_META = [
  { num: "01", title: "Objection Handler",        subtitle: "Databáze námitek",    tag: "Real-time",    desc: "Klikněte na námitku zákazníka — okamžitě dostanete 2–3 ověřené formulace od top prodejců. Žádná AI, jen kurátorovaná moudrost týmu." },
  { num: "03", title: "Certifikační systém",       subtitle: "Ověření znalostí",    tag: "Compliance",   desc: "Operátorka absolvuje kurz, udělá test a získá digitální certifikát. Vedoucí týmu vidí, kdo co má certifikováno a kdo ještě ne." },
  { num: "04", title: "Leaderboard & Gamifikace",  subtitle: "Týdenní žebříček",    tag: "Motivace",     desc: "Bodovací systém za lekce, testy a streaky. Duolingo efekt — lidé se vracejí sami. Resetuje se každé pondělí." },
  { num: "08", title: "Zlaté hovory",              subtitle: "Knihovna ukázek",     tag: "Best practice", desc: "Vedoucí označí nahrávku jako ukázkovou → přidá se do Akademie. Nové operátorky poslouchají reálné situace od kolegyň, ne vymyšlené scénáře." },
];

function FeatureCard({ meta, children }: { meta: typeof FEATURE_META[0]; children: React.ReactNode }) {
  return (
    <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="px-6 pt-6 pb-5 border-b border-[#D1DFD8]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono font-bold text-[#0D3D34]/30">{meta.num}</span>
          <span className="text-[10px] font-bold bg-[#D7FF00] text-[#0D3D34] px-2 py-0.5 rounded-full uppercase tracking-wide">{meta.tag}</span>
        </div>
        <h3 className="text-lg font-bold text-[#0D3D34]">{meta.title}</h3>
        <p className="text-xs text-[#1A6B5A] font-semibold mb-3">{meta.subtitle}</p>
        <p className="text-sm text-[#0D3D34]/60 leading-relaxed">{meta.desc}</p>
      </div>
      <div className="p-5 bg-white">{children}</div>
    </div>
  );
}

export default function ExtraFeatures() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF7F1] border border-[#D1DFD8] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#0D3D34] tracking-wide uppercase">Rozšířené funkce</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3D34] tracking-tight mb-4">
            Další nástroje týmu
          </h2>
          <p className="text-lg text-[#0D3D34]/60 max-w-2xl">
            Čtyři doplňkové moduly, které dělají rozdíl mezi nástrojem a systémem, ve kterém lidé skutečně rostou.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard meta={FEATURE_META[0]}><ObjectionHandler /></FeatureCard>
          <FeatureCard meta={FEATURE_META[1]}><CertSystem /></FeatureCard>
          <FeatureCard meta={FEATURE_META[2]}><Leaderboard /></FeatureCard>
          <FeatureCard meta={FEATURE_META[3]}><GoldenCalls /></FeatureCard>
        </div>
      </div>
    </section>
  );
}
