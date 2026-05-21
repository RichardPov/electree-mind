import Link from "next/link";

const STATS = [
  { label: "Denní streak", value: "🔥 14 dní", sub: "+3 dny tento týden", color: "#D7FF00", textColor: "#0D3D34" },
  { label: "Bodů celkem", value: "2 190 b", sub: "#3 v týdenním žebříčku", color: "#0D3D34", textColor: "#D7FF00" },
  { label: "Certifikáty", value: "2 / 4", sub: "Retenční expert: 68 %", color: "#EBF7F1", textColor: "#0D3D34" },
  { label: "Dokončené lekce", value: "18 / 32", sub: "FVE výkup: 4 lekce čekají", color: "#EBF7F1", textColor: "#0D3D34" },
];

const MODULES = [
  { href: "/dashboard/wiki", icon: "📖", label: "Wiki & SOPs", desc: "Produkty, ceníky, postupy v EIS", color: "#EBF7F1" },
  { href: "/dashboard/akademie", icon: "🎓", label: "Akademie", desc: "5 kurzů, 32 lekcí", color: "#EBF7F1" },
  { href: "/dashboard/copilot", icon: "🤖", label: "AI Copilot", desc: "Asistent živého hovoru", color: "#D7FF00" },
  { href: "/dashboard/certifikace", icon: "🏅", label: "Certifikace", desc: "Ověř a získej diplom", color: "#EBF7F1" },
  { href: "/dashboard/leaderboard", icon: "🏆", label: "Žebříček", desc: "Týdenní soutěž týmu", color: "#EBF7F1" },
  { href: "/dashboard/hovory", icon: "⭐", label: "Zlaté hovory", desc: "Ukázky + Objection handler", color: "#EBF7F1" },
];

const ACTIVITY = [
  { time: "dnes 09:41", text: "Dokončena lekce: Distribuční sazby D/C", type: "lesson" },
  { time: "dnes 09:18", text: "AI Copilot – dotaz na FVE výkup FIX MAXI", type: "ai" },
  { time: "včera 16:05", text: "Test: Základy elektřiny – skóre 92 %", type: "quiz" },
  { time: "včera 11:30", text: "Certifikát Produktový specialista – ZÍSKÁN ✓", type: "cert" },
  { time: "po 14:12", text: "Dokončena lekce: HOME FIX vs EXPERT FIX", type: "lesson" },
];

const TASKS = [
  { label: "Lekce: Výkupní produkty FVE", module: "Akademie", due: "dnes" },
  { label: "Quiz: Plyn – HOME FIX pásma", module: "Akademie", due: "zítra" },
  { label: "Certifikace: Retenční expert (68 %)", module: "Certifikace", due: "tento týden" },
];

const activityIcon: Record<string, string> = {
  lesson: "📖", ai: "🤖", quiz: "📝", cert: "🏅",
};

export default function DashboardHome() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-1">středa 21. 5. 2026</div>
        <h1 className="text-2xl font-bold text-[#0D3D34]">Dobrý den, Petro 👋</h1>
        <p className="text-[#0D3D34]/55 text-sm mt-1">Máte 3 lekce ke splnění a žebříček se resetuje v pondělí.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5 border border-[#D1DFD8]"
            style={{ backgroundColor: s.color }}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: s.textColor, opacity: 0.5 }}>{s.label}</div>
            <div className="text-xl font-bold mb-1" style={{ color: s.textColor }}>{s.value}</div>
            <div className="text-xs" style={{ color: s.textColor, opacity: 0.55 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Modules */}
        <div className="lg:col-span-2">
          <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-3">Moduly</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {MODULES.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="flex items-start gap-3 bg-white border border-[#D1DFD8] rounded-xl p-4 hover:shadow-md hover:border-[#0D3D34]/20 transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: m.color }}
                >
                  {m.icon}
                </div>
                <div>
                  <div className="font-semibold text-[#0D3D34] text-sm group-hover:text-[#1A6B5A] transition-colors">{m.label}</div>
                  <div className="text-xs text-[#0D3D34]/50 mt-0.5">{m.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tasks */}
          <div className="mt-6">
            <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-3">Čeká na vás</div>
            <div className="bg-white border border-[#D1DFD8] rounded-xl divide-y divide-[#D1DFD8]">
              {TASKS.map((t) => (
                <div key={t.label} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D7FF00] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#0D3D34] truncate">{t.label}</div>
                    <div className="text-xs text-[#0D3D34]/40">{t.module}</div>
                  </div>
                  <span className="text-[10px] font-semibold bg-[#EBF7F1] text-[#1A6B5A] px-2 py-0.5 rounded-full flex-shrink-0">{t.due}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity + Quick access */}
        <div>
          {/* Quick copilot */}
          <div className="bg-[#0D3D34] rounded-2xl p-5 mb-4 text-white">
            <div className="text-[10px] font-bold text-[#D7FF00] uppercase tracking-widest mb-2">AI Copilot</div>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">Potřebujete pomoc během hovoru? Copilot odpoví za pár sekund.</p>
            <Link
              href="/dashboard/copilot"
              className="block text-center bg-[#D7FF00] text-[#0D3D34] text-sm font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Otevřít Copilota →
            </Link>
          </div>

          {/* Activity */}
          <div className="bg-white border border-[#D1DFD8] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D1DFD8]">
              <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest">Posledních 5 aktivit</div>
            </div>
            <div className="divide-y divide-[#D1DFD8]">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <span className="text-base flex-shrink-0 mt-0.5">{activityIcon[a.type]}</span>
                  <div className="min-w-0">
                    <div className="text-xs text-[#0D3D34] leading-snug">{a.text}</div>
                    <div className="text-[10px] text-[#0D3D34]/35 mt-0.5">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
