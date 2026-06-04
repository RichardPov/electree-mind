"use client";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

const LEVEL_A_IDS = ["kdo-jsme", "energetika", "produkty", "hovor", "namitky", "uzavreni", "wiki-praxe"];
const LEVEL_A_SECTIONS = [3, 3, 4, 3, 2, 3, 2]; // sections per module

const CARDS = [
  {
    href: "/dashboard/akademie",
    bg: "bg-gradient-to-br from-[#0D3D34] to-[#1A6B5A]",
    accent: "#D7FF00",
    icon: "🎓",
    label: "Akademie – Level A",
    desc: "Kdo jsme, produkty, prodejní hovor, námitky",
    stat: (pct: number) => `${pct} % dokončeno`,
    badge: null,
  },
  {
    href: "/dashboard/certifikace",
    bg: "bg-gradient-to-br from-[#1A1A2E] to-[#16213E]",
    accent: "#D7FF00",
    icon: "🏅",
    label: "Školení & testy",
    desc: "Ověř si znalosti a získej certifikát",
    stat: () => "Spustit test",
    badge: "Test",
  },
  {
    href: "/dashboard/simulace",
    bg: "bg-gradient-to-br from-[#2D1B69] to-[#1E0F4A]",
    accent: "#D7FF00",
    icon: "📞",
    label: "Simulace hovoru",
    desc: "Nácvik reálných situací s AI hodnocením",
    stat: () => "Trénovat",
    badge: "AI",
  },
];

export default function DashboardHome() {
  const { countDone } = useProgress();

  const totalSections = LEVEL_A_SECTIONS.reduce((a, b) => a + b, 0);
  const doneSections = LEVEL_A_IDS.reduce((sum, id, i) => sum + Math.min(countDone(id), LEVEL_A_SECTIONS[i]), 0);
  const akademiePct = Math.round((doneSections / totalSections) * 100);

  const stats = [akademiePct, 0, 0];

  return (
    <div className="p-8 max-w-5xl mx-auto">

      {/* Welcome */}
      <div className="mb-6">
        <p className="text-[#0D3D34]/40 text-xs uppercase tracking-widest mb-0.5">Vítejte zpět</p>
        <h1 className="text-2xl font-bold text-[#0D3D34]">Dobrý den, Petro 👋</h1>
      </div>

      {/* Top section: hero + user */}
      <div className="grid lg:grid-cols-3 gap-5 mb-8">

        {/* Hero banner 2/3 */}
        <div className="lg:col-span-2 bg-[#0D3D34] rounded-3xl p-8 relative overflow-hidden min-h-[200px] flex flex-col justify-between">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -right-4 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute top-8 right-16 w-16 h-16 rounded-full bg-[#D7FF00]/10" />

          <div className="relative z-10">
            <div className="text-[10px] font-bold text-[#D7FF00]/60 uppercase tracking-widest mb-2">Electree Mind</div>
            <h1 className="text-2xl font-bold text-white leading-snug mb-2">
              Zlepšete své znalosti<br />
              <span className="text-[#D7FF00]">v call scriptech</span>
            </h1>
            <p className="text-white/50 text-sm mb-6 max-w-xs leading-relaxed">
              Skripty, argumentace, námitky — vše na jednom místě. Připravte se na každý hovor.
            </p>
          </div>

          <div className="relative z-10">
            <Link href="/dashboard/callscripty"
              className="inline-flex items-center gap-2 bg-[#D7FF00] text-[#0D3D34] font-bold text-sm px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity"
            >
              Otevřít Call scripty
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* User card 1/3 */}
        <div className="bg-white border border-[#D1DFD8] rounded-3xl p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#D7FF00] flex items-center justify-center text-[#0D3D34] text-xl font-black mb-4">
            PV
          </div>
          <h2 className="text-lg font-bold text-[#0D3D34]">Petra Vlčková</h2>
          <div className="text-xs text-[#0D3D34]/50 mt-1 mb-4">Operátorka</div>
          <div className="w-full bg-[#EBF7F1] rounded-2xl px-4 py-3">
            <div className="text-[10px] text-[#0D3D34]/40 uppercase tracking-widest mb-1">Akademie celkem</div>
            <div className="text-2xl font-bold text-[#0D3D34] mb-1">{akademiePct} %</div>
            <div className="h-1.5 bg-[#D1DFD8] rounded-full overflow-hidden">
              <div className="h-full bg-[#D7FF00] rounded-full transition-all" style={{ width: `${akademiePct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 3 module cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {CARDS.map((card, i) => (
          <Link key={card.href} href={card.href}
            className={`${card.bg} rounded-3xl p-6 flex flex-col justify-between min-h-[200px] group hover:scale-[1.02] transition-transform`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                {card.icon}
              </div>
              {card.badge && (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: card.accent, color: "#0D3D34" }}>
                  {card.badge}
                </span>
              )}
            </div>

            {/* Content */}
            <div>
              <h3 className="font-bold text-white text-sm mb-1">{card.label}</h3>
              <p className="text-white/50 text-xs leading-snug mb-4">{card.desc}</p>

              {/* Progress bar for akademie */}
              {i === 0 && (
                <div className="mb-3">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${akademiePct}%`, backgroundColor: card.accent }} />
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: card.accent }}>
                  {card.stat(stats[i])}
                </span>
                <svg width="12" height="12" fill="none" stroke={card.accent} strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
