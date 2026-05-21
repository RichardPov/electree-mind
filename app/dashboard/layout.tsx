"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    href: "/dashboard",
    label: "Přehled",
    exact: true,
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/dashboard/wiki",
    label: "Wiki & SOPs",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/akademie",
    label: "Akademie",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/copilot",
    label: "AI Copilot",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: "AI",
  },
  {
    href: "/dashboard/certifikace",
    label: "Certifikace",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" strokeLinecap="round" />
        <path d="M9 21l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/leaderboard",
    label: "Žebříček",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M8 21H5a2 2 0 01-2-2v-5l7-7 7 7v5a2 2 0 01-2 2h-3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/hovory",
    label: "Zlaté hovory",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F7F6]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0D3D34] flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-5 pt-5 pb-4 border-b border-white/10">
          <div className="text-[#D7FF00] font-bold text-base tracking-tight">Electree Mind</div>
          <div className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">Knowledge Platform</div>
        </div>

        {/* User */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D7FF00] flex items-center justify-center text-[#0D3D34] text-xs font-black flex-shrink-0">PV</div>
            <div className="min-w-0">
              <div className="text-white text-sm font-semibold truncate">Petra Vlčková</div>
              <div className="text-white/40 text-[10px] truncate">Operátorka · #3 žebříček</div>
            </div>
          </div>
          <div className="flex gap-2 mt-2.5">
            <div className="flex-1 bg-white/5 rounded-lg px-2 py-1.5 text-center">
              <div className="text-[#D7FF00] text-xs font-bold">🔥 14</div>
              <div className="text-white/30 text-[9px]">streak</div>
            </div>
            <div className="flex-1 bg-white/5 rounded-lg px-2 py-1.5 text-center">
              <div className="text-white text-xs font-bold">2 190</div>
              <div className="text-white/30 text-[9px]">bodů</div>
            </div>
            <div className="flex-1 bg-white/5 rounded-lg px-2 py-1.5 text-center">
              <div className="text-white text-xs font-bold">2/4</div>
              <div className="text-white/30 text-[9px]">cert.</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                  active
                    ? "bg-[#D7FF00] text-[#0D3D34] font-semibold"
                    : "text-white/60 hover:bg-white/8 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-[#0D3D34] text-[#D7FF00]" : "bg-[#D7FF00]/20 text-[#D7FF00]"}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Back */}
        <div className="px-2.5 py-3 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 text-white/30 text-xs hover:text-white/60 px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Zpět na web
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
