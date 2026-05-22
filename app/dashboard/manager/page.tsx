"use client";
import { useState } from "react";

const TEAM = [
  { name: "Eva Procházková", initials: "EP", role: "Senior operátorka", streak: 21, points: 4800, certs: 4, lessons: 32, lastLogin: "dnes", risk: "none" as const },
  { name: "Martin Novák", initials: "MN", role: "Operátor", streak: 18, points: 3120, certs: 3, lessons: 28, lastLogin: "dnes", risk: "none" as const },
  { name: "Petra Vlčková", initials: "PV", role: "Operátorka", streak: 14, points: 2190, certs: 2, lessons: 18, lastLogin: "dnes", risk: "none" as const, isMe: true },
  { name: "Jana Horáčková", initials: "JH", role: "Operátorka", streak: 9, points: 1980, certs: 2, lessons: 16, lastLogin: "včera", risk: "watch" as const },
  { name: "Lukáš Dvořák", initials: "LD", role: "Junior operátor", streak: 5, points: 1450, certs: 1, lessons: 12, lastLogin: "2 dny", risk: "watch" as const },
  { name: "Tomáš Kratochvíl", initials: "TK", role: "Junior operátor", streak: 0, points: 890, certs: 0, lessons: 8, lastLogin: "4 dny", risk: "high" as const },
  { name: "Monika Šimánková", initials: "MŠ", role: "Nová operátorka", streak: 2, points: 640, certs: 0, lessons: 5, lastLogin: "3 dny", risk: "high" as const },
  { name: "Pavel Horák", initials: "PH", role: "Junior operátor", streak: 1, points: 320, certs: 0, lessons: 3, lastLogin: "5 dní", risk: "high" as const },
];

const COURSES_OVERVIEW = [
  { id: "elektrina", name: "Dodávka elektřiny", total: 8, completions: [8, 8, 8, 7, 5, 4, 2, 1] },
  { id: "fve", name: "FVE & Výkup", total: 6, completions: [6, 5, 3, 2, 1, 0, 0, 0] },
  { id: "plyn", name: "Zemní plyn", total: 5, completions: [5, 4, 2, 1, 1, 0, 0, 0] },
  { id: "retence", name: "Retence & komunikace", total: 7, completions: [7, 6, 5, 4, 2, 1, 0, 0] },
  { id: "systemy", name: "CRM & EIS", total: 6, completions: [6, 4, 0, 0, 0, 0, 0, 0] },
];

const ALERTS = [
  { type: "high", icon: "🚨", text: "Tomáš Kratochvíl – 4 dny bez přihlášení, streak 0, 0 certifikátů", action: "Kontaktovat" },
  { type: "high", icon: "🚨", text: "Pavel Horák – 5 dní bez přihlášení, pouze 3 lekce celkem", action: "Kontaktovat" },
  { type: "watch", icon: "⚠️", text: "Monika Šimánková – nová operátorka, potřebuje mentoring", action: "Přiřadit mentora" },
  { type: "watch", icon: "⚠️", text: "Lukáš Dvořák – streak pod 7 dní, jen 1 certifikát", action: "Motivovat" },
  { type: "ok", icon: "✅", text: "Eva Procházková – 4/4 certifikáty, nejlepší ve streaku (21d)", action: "Pochválit" },
];

type Tab = "prehled" | "team" | "kurzy" | "alerty";

export default function ManagerPage() {
  const [tab, setTab] = useState<Tab>("prehled");
  const [selectedMember, setSelectedMember] = useState<typeof TEAM[0] | null>(null);

  const avgStreak = Math.round(TEAM.reduce((s, m) => s + m.streak, 0) / TEAM.length);
  const avgCerts = (TEAM.reduce((s, m) => s + m.certs, 0) / TEAM.length).toFixed(1);
  const atRisk = TEAM.filter((m) => m.risk === "high").length;
  const teamPoints = TEAM.reduce((s, m) => s + m.points, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#D7FF00] flex items-center justify-center text-xl">👔</div>
        <div>
          <h1 className="text-2xl font-bold text-[#0D3D34]">Manažerský pohled</h1>
          <p className="text-[#0D3D34]/50 text-sm">Přehled celého týmu – pokrok, rizika, aktivita</p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Členů týmu", value: TEAM.length, sub: `${TEAM.filter(m => m.risk === "none").length} bez rizika`, color: "#EBF7F1" },
          { label: "Průměrný streak", value: `${avgStreak} dní`, sub: "tento týden", color: "#D7FF00" },
          { label: "Průměr certifikátů", value: `${avgCerts}/4`, sub: `${TEAM.filter(m => m.certs === 4).length} x kompletní`, color: "#EBF7F1" },
          { label: "V riziku", value: atRisk, sub: "vyžaduje pozornost", color: atRisk > 2 ? "#FEE2E2" : "#EBF7F1" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5 border border-[#D1DFD8]" style={{ backgroundColor: s.color }}>
            <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-1">{s.label}</div>
            <div className="text-xl font-bold text-[#0D3D34]">{s.value}</div>
            <div className="text-xs text-[#0D3D34]/50 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#EBF7F1] p-1 rounded-xl w-fit mb-6 flex-wrap">
        {[
          { key: "prehled", label: "📊 Přehled" },
          { key: "team", label: "👥 Tým" },
          { key: "kurzy", label: "📚 Kurzy" },
          { key: "alerty", label: `🚨 Alerty (${ALERTS.filter(a => a.type === "high").length})` },
        ].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key as Tab)} className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${tab === t.key ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/50"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "prehled" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Team streak chart */}
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#D1DFD8]">
              <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest">Streak – celý tým</div>
            </div>
            <div className="p-5 space-y-3">
              {TEAM.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0" style={{ backgroundColor: m.isMe ? "#D7FF00" : "#EBF7F1", color: "#0D3D34" }}>{m.initials}</div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold text-[#0D3D34]">{m.name}</span>
                      <span className="text-xs text-[#0D3D34]/50">🔥 {m.streak}d</span>
                    </div>
                    <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min((m.streak / 21) * 100, 100)}%`, backgroundColor: m.risk === "high" ? "#EF4444" : m.risk === "watch" ? "#F59E0B" : "#0D3D34" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certs overview */}
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#D1DFD8]">
              <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest">Certifikáty – distribuce</div>
            </div>
            <div className="p-5 space-y-3">
              {[4, 3, 2, 1, 0].map((n) => {
                const count = TEAM.filter((m) => m.certs === n).length;
                return (
                  <div key={n} className="flex items-center gap-3">
                    <div className="text-xs font-bold text-[#0D3D34]/50 w-16">{n}/4 cert.</div>
                    <div className="flex-1 h-6 bg-[#EBF7F1] rounded-lg overflow-hidden">
                      <div className="h-full flex items-center px-2 rounded-lg" style={{ width: `${(count / TEAM.length) * 100}%`, minWidth: count > 0 ? "24px" : "0", backgroundColor: n >= 3 ? "#D7FF00" : n >= 1 ? "#B8E8D0" : "#EBF7F1" }}>
                        {count > 0 && <span className="text-[10px] font-bold text-[#0D3D34]">{count}×</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly points */}
          <div className="bg-[#0D3D34] rounded-2xl p-5 lg:col-span-2">
            <div className="text-[10px] font-bold text-[#D7FF00] uppercase tracking-widest mb-4">Body týmu tento týden</div>
            <div className="flex items-end gap-3">
              {TEAM.map((m) => (
                <div key={m.name} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-[10px] text-white/60">{m.points.toLocaleString("cs")}</div>
                  <div className="w-full rounded-t-lg" style={{ height: `${(m.points / 4800) * 80}px`, backgroundColor: m.isMe ? "#D7FF00" : m.risk === "high" ? "#EF4444" : "rgba(255,255,255,0.2)" }} />
                  <div className="text-[9px] text-white/50 text-center">{m.initials}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "team" && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="divide-y divide-[#D1DFD8]">
              {TEAM.map((m) => (
                <div key={m.name} onClick={() => setSelectedMember(selectedMember?.name === m.name ? null : m)} className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-all ${selectedMember?.name === m.name ? "bg-[#EBF7F1]" : "hover:bg-[#F7FAF9]"} ${m.isMe ? "border-l-2 border-[#D7FF00]" : ""}`}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{ backgroundColor: m.isMe ? "#D7FF00" : "#EBF7F1", color: "#0D3D34" }}>{m.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#0D3D34]">{m.name}{m.isMe ? " (vy)" : ""}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${m.risk === "high" ? "bg-red-100 text-red-700" : m.risk === "watch" ? "bg-amber-100 text-amber-700" : "bg-[#EBF7F1] text-[#1A6B5A]"}`}>
                        {m.risk === "high" ? "Riziko" : m.risk === "watch" ? "Sledovat" : "V pořádku"}
                      </span>
                    </div>
                    <div className="text-xs text-[#0D3D34]/40">{m.role} · Naposledy: {m.lastLogin}</div>
                  </div>
                  <div className="flex gap-4 flex-shrink-0">
                    <div className="text-center">
                      <div className="text-sm font-bold text-[#0D3D34]">{m.certs}/4</div>
                      <div className="text-[9px] text-[#0D3D34]/40">cert.</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-[#0D3D34]">🔥{m.streak}</div>
                      <div className="text-[9px] text-[#0D3D34]/40">streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-[#0D3D34]">{m.lessons}</div>
                      <div className="text-[9px] text-[#0D3D34]/40">lekcí</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {selectedMember ? (
              <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
                <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black mb-2" style={{ backgroundColor: selectedMember.isMe ? "#D7FF00" : "#0D3D34", color: selectedMember.isMe ? "#0D3D34" : "#D7FF00" }}>{selectedMember.initials}</div>
                  <div className="font-bold text-[#0D3D34]">{selectedMember.name}</div>
                  <div className="text-xs text-[#0D3D34]/50">{selectedMember.role}</div>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { label: "Body celkem", value: selectedMember.points.toLocaleString("cs") + " b" },
                    { label: "Streak", value: `🔥 ${selectedMember.streak} dní` },
                    { label: "Certifikáty", value: `${selectedMember.certs} / 4` },
                    { label: "Dokončené lekce", value: `${selectedMember.lessons} / 32` },
                    { label: "Naposledy aktivní", value: selectedMember.lastLogin },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between text-sm">
                      <span className="text-[#0D3D34]/50">{s.label}</span>
                      <span className="font-semibold text-[#0D3D34]">{s.value}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-[#D1DFD8] space-y-2">
                    <button className="w-full bg-[#0D3D34] text-[#D7FF00] py-2 rounded-lg text-xs font-bold hover:opacity-90">Poslat připomínku</button>
                    <button className="w-full bg-[#EBF7F1] text-[#0D3D34] py-2 rounded-lg text-xs font-bold hover:bg-[#D1DFD8]">Přiřadit lekci</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-6 text-center">
                <p className="text-xs text-[#0D3D34]/50">Klikněte na člena týmu pro detail</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "kurzy" && (
        <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D1DFD8] bg-[#F7FAF9]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">Kurz</th>
                  {TEAM.map((m) => (
                    <th key={m.name} className="px-3 py-3 text-center text-[10px] font-bold text-[#0D3D34]/40 uppercase">{m.initials}</th>
                  ))}
                  <th className="px-3 py-3 text-center text-[10px] font-bold text-[#0D3D34]/40 uppercase">Průměr</th>
                </tr>
              </thead>
              <tbody>
                {COURSES_OVERVIEW.map((course) => (
                  <tr key={course.id} className="border-b border-[#D1DFD8] last:border-0">
                    <td className="px-5 py-3">
                      <div className="text-sm font-semibold text-[#0D3D34]">{course.name}</div>
                      <div className="text-[10px] text-[#0D3D34]/40">{course.total} lekcí</div>
                    </td>
                    {course.completions.map((c, i) => {
                      const pct = Math.round((c / course.total) * 100);
                      return (
                        <td key={i} className="px-3 py-3 text-center">
                          <div className={`text-xs font-bold ${pct === 100 ? "text-[#1A6B5A]" : pct === 0 ? "text-[#0D3D34]/20" : "text-[#0D3D34]"}`}>{pct}%</div>
                        </td>
                      );
                    })}
                    <td className="px-3 py-3 text-center">
                      <div className="text-xs font-bold text-[#0D3D34]">
                        {Math.round(course.completions.reduce((a, b) => a + b, 0) / course.completions.length / course.total * 100)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "alerty" && (
        <div className="space-y-3 max-w-2xl">
          {ALERTS.map((a, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border ${a.type === "high" ? "bg-red-50 border-red-200" : a.type === "watch" ? "bg-amber-50 border-amber-200" : "bg-[#EBF7F1] border-[#D1DFD8]"}`}>
              <span className="text-xl flex-shrink-0">{a.icon}</span>
              <div className="flex-1">
                <p className={`text-sm font-medium ${a.type === "high" ? "text-red-800" : a.type === "watch" ? "text-amber-800" : "text-[#0D3D34]"}`}>{a.text}</p>
              </div>
              <button className={`text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0 ${a.type === "high" ? "bg-red-600 text-white hover:bg-red-700" : a.type === "watch" ? "bg-amber-500 text-white hover:bg-amber-600" : "bg-[#0D3D34] text-[#D7FF00] hover:opacity-90"}`}>
                {a.action}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
