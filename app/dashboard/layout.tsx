"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const NAV_CORE = [
  { href: "/dashboard", label: "Přehled", exact: true, icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>) },
  { href: "/dashboard/wiki", label: "Wiki & SOPs", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  { href: "/dashboard/akademie", label: "Akademie", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  { href: "/dashboard/simulace", label: "Simulace hovorů", badge: "AI", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  { href: "/dashboard/copilot", label: "AI Copilot", badge: "AI", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  { href: "/dashboard/certifikace", label: "Certifikace", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" strokeLinecap="round" /><path d="M9 21l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  { href: "/dashboard/leaderboard", label: "Žebříček", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M8 21H5a2 2 0 01-2-2v-5l7-7 7 7v5a2 2 0 01-2 2h-3" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 3l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  { href: "/dashboard/hovory", label: "Zlaté hovory", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
];

const NAV_TOOLS = [
  { href: "/dashboard/kalkulator", label: "Kalkulačka", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h8M8 14h4" strokeLinecap="round" /></svg>) },
  { href: "/dashboard/porovnavac", label: "Porovnávač", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  { href: "/dashboard/flashkarty", label: "Flashkarty", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M12 9v6M9 12h6" strokeLinecap="round" /></svg>) },
  { href: "/dashboard/manager", label: "Manažer", badge: "MGR", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
];

const SEARCH_INDEX = [
  { label: "HOME FIX 24 – elektřina", category: "Wiki", href: "/dashboard/wiki" },
  { label: "HOME FIX 12 – elektřina", category: "Wiki", href: "/dashboard/wiki" },
  { label: "HOME FIX 36 – elektřina", category: "Wiki", href: "/dashboard/wiki" },
  { label: "EXPERT FIX 24 – firmy", category: "Wiki", href: "/dashboard/wiki" },
  { label: "Plyn HOME FIX 24", category: "Wiki", href: "/dashboard/wiki" },
  { label: "Home Solar FIX – FVE výkup", category: "Wiki", href: "/dashboard/wiki" },
  { label: "Home Solar FIX MAXI – FVE výkup", category: "Wiki", href: "/dashboard/wiki" },
  { label: "Přepis výrobny – SOP", category: "Wiki", href: "/dashboard/wiki" },
  { label: "Smlouva na dodávku elektřiny – SOP", category: "Wiki", href: "/dashboard/wiki" },
  { label: "Smlouva na výkup elektřiny – SOP", category: "Wiki", href: "/dashboard/wiki" },
  { label: "Založení zákazníka – SOP", category: "Wiki", href: "/dashboard/wiki" },
  { label: "Změna ceníku – SOP", category: "Wiki", href: "/dashboard/wiki" },
  { label: "Dodávka elektřiny – kurz", category: "Akademie", href: "/dashboard/akademie" },
  { label: "FVE & Výkup – kurz", category: "Akademie", href: "/dashboard/akademie" },
  { label: "Zemní plyn – kurz", category: "Akademie", href: "/dashboard/akademie" },
  { label: "Retence & komunikace – kurz", category: "Akademie", href: "/dashboard/akademie" },
  { label: "CRM & EIS – kurz", category: "Akademie", href: "/dashboard/akademie" },
  { label: "Je to drahé / levněji – námitka", category: "Hovory", href: "/dashboard/hovory" },
  { label: "Chci SPOT tarif – námitka", category: "Hovory", href: "/dashboard/hovory" },
  { label: "Přecházím ke konkurenci – námitka", category: "Hovory", href: "/dashboard/hovory" },
  { label: "Nechci podpisovat smlouvu – námitka", category: "Hovory", href: "/dashboard/hovory" },
  { label: "Retence zákazníka s FVE – zlatý hovor", category: "Hovory", href: "/dashboard/hovory" },
  { label: "Produktový specialista – certifikát", category: "Certifikace", href: "/dashboard/certifikace" },
  { label: "Retenční expert – certifikát", category: "Certifikace", href: "/dashboard/certifikace" },
  { label: "Kalkulačka roční spotřeby", category: "Nástroje", href: "/dashboard/kalkulator" },
  { label: "Porovnání produktů HOME FIX vs EXPERT FIX", category: "Nástroje", href: "/dashboard/porovnavac" },
  { label: "Flashkarty – trénink cen", category: "Nástroje", href: "/dashboard/flashkarty" },
  { label: "AI Copilot – chat asistent", category: "Copilot", href: "/dashboard/copilot" },
];

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.length > 1
    ? SEARCH_INDEX.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative px-3 pb-3">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Hledat..."
          className="w-full bg-white/8 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/12 transition-all"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-3 right-3 top-full mt-1 bg-white rounded-xl shadow-xl border border-[#D1DFD8] overflow-hidden z-50">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => { router.push(r.href); setOpen(false); setQuery(""); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#EBF7F1] text-left transition-colors border-b border-[#D1DFD8] last:border-0"
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-[#0D3D34] truncate">{r.label}</div>
              </div>
              <span className="text-[9px] font-bold bg-[#EBF7F1] text-[#0D3D34]/50 px-1.5 py-0.5 rounded-full flex-shrink-0">{r.category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const NavItem = ({ item, exact }: { item: typeof NAV_CORE[0] & { badge?: string }; exact?: boolean }) => {
    const active = exact ? pathname === item.href : pathname.startsWith(item.href);
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${active ? "bg-[#D7FF00] text-[#0D3D34] font-semibold" : "text-white/60 hover:bg-white/8 hover:text-white"}`}
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
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F7F6]">
      <aside className="w-56 bg-[#0D3D34] flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-5 pt-5 pb-3 border-b border-white/10">
          <div className="text-[#D7FF00] font-bold text-base tracking-tight">Electree Mind</div>
          <div className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">Knowledge Platform</div>
        </div>

        {/* Search */}
        <div className="pt-3">
          <GlobalSearch />
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
          {NAV_CORE.map((item) => (
            <NavItem key={item.href} item={item} exact={"exact" in item ? item.exact : false} />
          ))}

          <div className="pt-3 pb-1 px-1">
            <div className="text-[9px] font-bold text-white/25 uppercase tracking-widest">Nástroje</div>
          </div>

          {NAV_TOOLS.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
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

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
