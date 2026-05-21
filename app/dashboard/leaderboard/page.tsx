"use client";
import { useState } from "react";

const WEEK_DATA = [
  { rank: 1, name: "Eva Procházková", initials: "EP", points: 4800, streak: 21, certs: 4, lessons: 32, change: 0, badges: ["🏆", "🔥", "⚡"] },
  { rank: 2, name: "Martin Novák", initials: "MN", points: 3120, streak: 18, certs: 3, lessons: 28, change: 1, badges: ["🥈", "📚"] },
  { rank: 3, name: "Petra Vlčková", initials: "PV", points: 2190, streak: 14, certs: 2, lessons: 18, change: -1, badges: ["🥉", "🔥"], active: true },
  { rank: 4, name: "Jana Horáčková", initials: "JH", points: 1980, streak: 9, certs: 2, lessons: 16, change: 1, badges: ["⭐"] },
  { rank: 5, name: "Lukáš Dvořák", initials: "LD", points: 1450, streak: 5, certs: 1, lessons: 12, change: -1, badges: [] },
  { rank: 6, name: "Tomáš Kratochvíl", initials: "TK", points: 890, streak: 3, certs: 0, lessons: 8, change: 0, badges: [] },
  { rank: 7, name: "Monika Šimánková", initials: "MŠ", points: 640, streak: 2, certs: 0, lessons: 5, change: 2, badges: [] },
  { rank: 8, name: "Pavel Horák", initials: "PH", points: 320, streak: 1, certs: 0, lessons: 3, change: -1, badges: [] },
];

const ACHIEVEMENTS = [
  { icon: "🔥", label: "Streak master", desc: "14+ dní v řadě", earned: true },
  { icon: "⚡", label: "Rychlý učeň", desc: "5 lekcí za 1 den", earned: false },
  { icon: "🏆", label: "Top performer", desc: "#1 v týdenním žebříčku", earned: false },
  { icon: "📚", label: "Knihomol", desc: "Všechny lekce v kurzu", earned: false },
  { icon: "🛡️", label: "Retenční expert", desc: "Certifikát retenčního experta", earned: false },
  { icon: "☀️", label: "FVE guru", desc: "Certifikát FVE specialista", earned: false },
  { icon: "🥉", label: "Bronzový operátor", desc: "Top 3 v žebříčku", earned: true },
  { icon: "💎", label: "Diamant", desc: "4/4 certifikáty + #1", earned: false },
];

const HISTORY = [
  { week: "Týden 20 (12.–18. 5.)", rank: 4, points: 1640 },
  { week: "Týden 19 (5.–11. 5.)", rank: 3, points: 2310 },
  { week: "Týden 18 (28. 4.–4. 5.)", rank: 5, points: 980 },
  { week: "Týden 17 (21.–27. 4.)", rank: 2, points: 2890 },
];

const MINI_CHART = [980, 2310, 1640, 2190];

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"zeb" | "ach" | "hist">("zeb");
  const maxPoints = Math.max(...WEEK_DATA.map((r) => r.points));

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#0D3D34]">Žebříček</h1>
          <p className="text-[#0D3D34]/50 text-sm mt-1">Týden 21 (19.–25. 5. 2026) · Reset v pondělí 00:00</p>
        </div>
        <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-xl px-5 py-3 text-center">
          <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">Resetuje se za</div>
          <div className="text-lg font-black text-[#0D3D34] mt-0.5">4 d 07 h 23 m</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#EBF7F1] p-1 rounded-xl w-fit mb-6">
        {[
          { key: "zeb", label: "🏆 Žebříček" },
          { key: "ach", label: "🎖️ Odznaky" },
          { key: "hist", label: "📈 Historie" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${tab === t.key ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/50"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "zeb" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leaderboard table */}
          <div className="lg:col-span-2">
            {/* Top 3 podium */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[WEEK_DATA[1], WEEK_DATA[0], WEEK_DATA[2]].map((p, i) => {
                const podiumRank = i === 0 ? 2 : i === 1 ? 1 : 3;
                const heights = ["h-24", "h-32", "h-20"];
                const colors = ["#B8E8D0", "#D7FF00", "#EBF7F1"];
                return (
                  <div key={p.name} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black mb-2 ${p.active ? "ring-2 ring-[#0D3D34]" : ""}`} style={{ backgroundColor: "#0D3D34", color: "#D7FF00" }}>
                      {p.initials}
                    </div>
                    <div className="text-xs font-semibold text-[#0D3D34] text-center mb-1 truncate max-w-full">{p.name.split(" ")[0]}</div>
                    <div className={`w-full rounded-t-lg flex flex-col items-center justify-center ${heights[i]}`} style={{ backgroundColor: colors[i] }}>
                      <div className="text-xl">{["🥈", "🏆", "🥉"][i]}</div>
                      <div className="text-xs font-bold text-[#0D3D34]">#{podiumRank}</div>
                      <div className="text-[10px] text-[#0D3D34]/60">{p.points.toLocaleString("cs")} b</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full list */}
            <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
              {WEEK_DATA.map((row) => (
                <div key={row.rank} className={`flex items-center gap-3 px-4 py-3 border-b border-[#D1DFD8] last:border-0 ${row.active ? "bg-[#EBF7F1]" : ""}`}>
                  <div className="w-6 text-center text-xs font-bold text-[#0D3D34]/50 flex-shrink-0">#{row.rank}</div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{ backgroundColor: row.active ? "#D7FF00" : "#EBF7F1", color: "#0D3D34" }}>
                    {row.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-semibold text-[#0D3D34]">{row.name}{row.active ? " (vy)" : ""}</span>
                      {row.badges.map((b) => <span key={b} className="text-sm">{b}</span>)}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <div className="flex-1 h-1 bg-[#EBF7F1] rounded-full overflow-hidden max-w-32">
                        <div className="h-full bg-[#0D3D34] rounded-full" style={{ width: `${(row.points / maxPoints) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-[#0D3D34]/40">🔥 {row.streak}d</span>
                      <span className="text-[10px] text-[#0D3D34]/40">📖 {row.lessons} lekcí</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-[#0D3D34]">{row.points.toLocaleString("cs")}</div>
                    <div className="text-[10px] text-[#0D3D34]/40">bodů</div>
                  </div>
                  <div className="w-4 flex-shrink-0">
                    {row.change > 0 && <span className="text-[10px] text-[#1A6B5A]">▲</span>}
                    {row.change < 0 && <span className="text-[10px] text-red-400">▼</span>}
                    {row.change === 0 && <span className="text-[10px] text-[#0D3D34]/20">–</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your stats */}
          <div className="space-y-4">
            <div className="bg-[#0D3D34] rounded-2xl p-5 text-white">
              <div className="text-[10px] font-bold text-[#D7FF00] uppercase tracking-widest mb-3">Vaše statistiky</div>
              <div className="text-center mb-4">
                <div className="w-14 h-14 rounded-full bg-[#D7FF00] flex items-center justify-center text-[#0D3D34] text-lg font-black mx-auto mb-2">PV</div>
                <div className="font-bold">Petra Vlčková</div>
                <div className="text-white/50 text-xs">Operátorka</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Pořadí", value: "#3", sub: "↑ od min. týdne" },
                  { label: "Body", value: "2 190", sub: "tento týden" },
                  { label: "Streak", value: "🔥 14d", sub: "osobní rekord" },
                  { label: "Certifikáty", value: "2/4", sub: "68 % dalšího" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/8 rounded-xl p-3">
                    <div className="text-[9px] text-white/40 uppercase tracking-widest">{s.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{s.value}</div>
                    <div className="text-[9px] text-white/40">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#D1DFD8] rounded-2xl p-4">
              <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-3">Jak získávat body?</div>
              <div className="space-y-2">
                {[
                  { action: "Dokončení lekce", pts: "+50 b" },
                  { action: "Splnění kvízu 100 %", pts: "+100 b" },
                  { action: "Denní přihlášení", pts: "+10 b" },
                  { action: "Streak bonus (7d)", pts: "+200 b" },
                  { action: "Získání certifikátu", pts: "+500 b" },
                ].map((x) => (
                  <div key={x.action} className="flex justify-between text-xs">
                    <span className="text-[#0D3D34]/60">{x.action}</span>
                    <span className="font-bold text-[#1A6B5A]">{x.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "ach" && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.label} className={`rounded-2xl p-5 border text-center transition-all ${a.earned ? "bg-[#D7FF00] border-[#D7FF00]" : "bg-white border-[#D1DFD8] opacity-60"}`}>
                <div className="text-3xl mb-2">{a.icon}</div>
                <div className="font-bold text-[#0D3D34] text-sm">{a.label}</div>
                <div className="text-xs text-[#0D3D34]/60 mt-1">{a.desc}</div>
                {a.earned && <div className="mt-2 text-[10px] font-bold text-[#0D3D34] uppercase tracking-widest">Získáno ✓</div>}
                {!a.earned && <div className="mt-2 text-[10px] text-[#0D3D34]/40">Nezískaný odznak</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "hist" && (
        <div className="max-w-2xl">
          {/* Mini chart */}
          <div className="bg-white border border-[#D1DFD8] rounded-2xl p-5 mb-4">
            <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-4">Body za poslední 4 týdny</div>
            <div className="flex items-end gap-3 h-24">
              {MINI_CHART.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-[10px] text-[#0D3D34]/50 font-bold">{v.toLocaleString("cs")}</div>
                  <div className="w-full rounded-t-lg" style={{ height: `${(v / Math.max(...MINI_CHART)) * 80}px`, backgroundColor: i === MINI_CHART.length - 1 ? "#D7FF00" : "#0D3D34" }} />
                  <div className="text-[9px] text-[#0D3D34]/40">T{i + 17}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            {HISTORY.map((h) => (
              <div key={h.week} className="flex items-center gap-4 px-5 py-3.5 border-b border-[#D1DFD8] last:border-0">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[#0D3D34]">{h.week}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#0D3D34]/40">Pořadí</div>
                  <div className="text-sm font-bold text-[#0D3D34]">#{h.rank}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#0D3D34]/40">Body</div>
                  <div className="text-sm font-bold text-[#1A6B5A]">{h.points.toLocaleString("cs")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
