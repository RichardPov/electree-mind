"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

// ─── SVG Icon system ──────────────────────────────────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
  bolt: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  flame: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" /></svg>,
  sun: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>,
  factory: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 20h20M4 20V10l6-4v4l6-4v4l4-2v8" /><path d="M9 20v-4h6v4" /></svg>,
  plug: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22v-5M9 8V2M15 8V2M9 15H5a2 2 0 01-2-2v-3a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2h-4" /></svg>,
  store: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l1-4h16l1 4" /><path d="M3 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0" /><path d="M5 9v11h14V9" /><path d="M9 21v-6h6v6" /></svg>,
  lock: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
  trending: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  home: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  info: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
  check: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>,
  warning: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  star: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  message: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  target: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  clipboard: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>,
  search: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  box: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
  shield: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  book: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>,
  calculator: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" /></svg>,
  coins: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1110.34 18" /><path d="M7 6h1v4" /><path d="M16.71 13.88L17 14l.29-.12" /></svg>,
  car: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2M9 21a2 2 0 100-4 2 2 0 000 4zM20 21a2 2 0 100-4 2 2 0 000 4z" /></svg>,
  globe: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  presentation: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 3h20M21 3v11a2 2 0 01-2 2H5a2 2 0 01-2-2V3" /><path d="M8 21l4-4 4 4M12 17v4" /></svg>,
  pin: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  cross: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
};

function Icon({ name, size = 16 }: { name: string; size?: number }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <span style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {icon}
    </span>
  );
}

// ─── Block types ──────────────────────────────────────────────────────────────

type CardVariant = "highlight" | "info" | "warning" | "quote" | "neutral";

type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "card"; variant: CardVariant; icon: string; title: string; body: string }
  | { t: "list"; items: string[] }
  | { t: "grid"; cols: 2 | 3; items: { icon: string; title: string; desc: string }[] }
  | { t: "table"; headers: string[]; rows: string[][] }
  | { t: "gamma"; title: string; url?: string };

type Section = { id: string; title: string; blocks: Block[] };
type Module = { id: string; icon: string; title: string; subtitle: string; sections: Section[] };

// ─── Card styles ──────────────────────────────────────────────────────────────

const CARD: Record<CardVariant, { wrap: string; iconWrap: string; iconColor: string; titleColor: string; bodyColor: string }> = {
  highlight: {
    wrap: "bg-[#F4FFD6] border border-[#C8E84A]/60",
    iconWrap: "bg-[#D7FF00]/30",
    iconColor: "text-[#3D5A00]",
    titleColor: "text-[#2A4000] font-semibold",
    bodyColor: "text-[#2A4000]/75",
  },
  info: {
    wrap: "bg-[#EBF7F1] border border-[#B8E8D0]",
    iconWrap: "bg-[#1A6B5A]/10",
    iconColor: "text-[#1A6B5A]",
    titleColor: "text-[#0D3D34] font-semibold",
    bodyColor: "text-[#0D3D34]/65",
  },
  warning: {
    wrap: "bg-[#FFFBEB] border border-[#FCD34D]/50",
    iconWrap: "bg-amber-100",
    iconColor: "text-amber-600",
    titleColor: "text-amber-900 font-semibold",
    bodyColor: "text-amber-800/70",
  },
  quote: {
    wrap: "bg-[#0D3D34] border border-[#0D3D34]",
    iconWrap: "bg-white/10",
    iconColor: "text-[#D7FF00]",
    titleColor: "text-white font-semibold",
    bodyColor: "text-white/70",
  },
  neutral: {
    wrap: "bg-white border border-[#D1DFD8]",
    iconWrap: "bg-[#EBF7F1]",
    iconColor: "text-[#0D3D34]/60",
    titleColor: "text-[#0D3D34] font-semibold",
    bodyColor: "text-[#0D3D34]/60",
  },
};

// ─── Block renderer ───────────────────────────────────────────────────────────

function RenderBlock({ b }: { b: Block }) {
  if (b.t === "p") return <p className="text-sm text-[#0D3D34]/70 leading-relaxed">{b.text}</p>;

  if (b.t === "h") return <h3 className="text-sm font-bold text-[#0D3D34] uppercase tracking-wide mt-1">{b.text}</h3>;

  if (b.t === "card") {
    const s = CARD[b.variant];
    return (
      <div className={`rounded-xl p-4 ${s.wrap}`}>
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${s.iconWrap} ${s.iconColor}`}>
            <Icon name={b.icon} size={16} />
          </div>
          <div>
            <div className={`text-sm mb-1 ${s.titleColor}`}>{b.title}</div>
            <div className={`text-xs leading-relaxed whitespace-pre-line ${s.bodyColor}`}>{b.body}</div>
          </div>
        </div>
      </div>
    );
  }

  if (b.t === "list") return (
    <ul className="space-y-2">
      {b.items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-[#0D3D34]/70">
          <span className="w-5 h-5 rounded-full bg-[#EBF7F1] border border-[#B8E8D0] flex items-center justify-center text-[9px] font-bold text-[#1A6B5A] flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );

  if (b.t === "grid") return (
    <div className={`grid gap-3 ${b.cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
      {b.items.map((item, i) => (
        <div key={i} className="bg-white border border-[#D1DFD8] rounded-xl p-4">
          <div className="w-8 h-8 rounded-lg bg-[#EBF7F1] flex items-center justify-center text-[#1A6B5A] mb-3">
            <Icon name={item.icon} size={16} />
          </div>
          <div className="text-xs font-bold text-[#0D3D34] mb-1">{item.title}</div>
          <div className="text-[11px] text-[#0D3D34]/50 leading-snug">{item.desc}</div>
        </div>
      ))}
    </div>
  );

  if (b.t === "table") return (
    <div className="overflow-x-auto rounded-xl border border-[#D1DFD8]">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[#F4F7F6] border-b border-[#D1DFD8]">
            {b.headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold text-[#0D3D34]/60 uppercase tracking-wide text-[10px]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#D1DFD8]">
          {b.rows.map((row, ri) => (
            <tr key={ri} className="bg-white hover:bg-[#F7FAF9] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 text-[#0D3D34]/80 ${ci === 0 ? "font-medium text-[#0D3D34]" : ""}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (b.t === "gamma") return (
    <div className="rounded-xl border border-[#D1DFD8] overflow-hidden">
      <div className="bg-[#F4F7F6] border-b border-[#D1DFD8] px-4 py-2.5 flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-[#0D3D34] flex items-center justify-center">
          <Icon name="presentation" size={12} />
        </div>
        <span className="text-xs font-semibold text-[#0D3D34]">{b.title}</span>
        <span className="text-[9px] bg-[#EBF7F1] text-[#1A6B5A] font-bold px-2 py-0.5 rounded-full ml-auto">Gamma</span>
      </div>
      {b.url ? (
        <iframe src={b.url} className="w-full" style={{ height: 420, border: "none" }} allowFullScreen />
      ) : (
        <div className="bg-white p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#EBF7F1] flex items-center justify-center mx-auto mb-4 text-[#1A6B5A]">
            <Icon name="presentation" size={24} />
          </div>
          <p className="text-sm font-semibold text-[#0D3D34] mb-1">Prezentace ze systému Gamma</p>
          <p className="text-xs text-[#0D3D34]/45 max-w-xs mx-auto leading-relaxed">
            Pro vložení prezentace přidejte Gamma embed URL do bloku.<br />
            Formát: <span className="font-mono bg-[#F4F7F6] px-1 rounded">gamma.app/embed/[ID]</span>
          </p>
        </div>
      )}
    </div>
  );

  return null;
}

// ─── Level A content ─────────────────────────────────────────────────────────

const LEVEL_A: Module[] = [
  {
    id: "kdo-jsme", icon: "building", title: "Kdo jsme", subtitle: "Identita Electree, naše silné stránky",
    sections: [
      {
        id: "firma", title: "Co je Electree",
        blocks: [
          { t: "grid", cols: 3, items: [
            { icon: "bolt", title: "Dodávka elektřiny", desc: "Pro domácnosti i firmy, fix i spot" },
            { icon: "flame", title: "Dodávka plynu", desc: "Kompletní energetické řešení" },
            { icon: "sun", title: "Výkup elektřiny", desc: "FVE přetoky – naše silná stránka" },
          ]},
          { t: "card", variant: "highlight", icon: "pin", title: "Odkud jsme", body: "Electree je moderní energetická firma z Brna. Za firmou stojí Lubomír Káňa a Ruben Marada." },
          { t: "p", text: "Electree nevznikla jako obyčejný dodavatel energií. Od začátku byla postavena na výkupu elektřiny z obnovitelných zdrojů a moderní práci s fotovoltaikou." },
        ],
      },
      {
        id: "trh", title: "Kde jsme na trhu",
        blocks: [
          { t: "grid", cols: 3, items: [
            { icon: "sun", title: "~17 000", desc: "výrobních míst (výkup FVE)" },
            { icon: "bolt", title: "~24 000", desc: "odběrných míst elektřiny" },
            { icon: "flame", title: "~3 500", desc: "odběrných míst plynu" },
          ]},
          { t: "card", variant: "neutral", icon: "info", title: "Kontext trhu", body: "Největší hráči v elektřině jsou ČEZ, E.ON a PRE. Electree je menší až střední hráč – ale výkup FVE je naše skutečná síla." },
        ],
      },
      {
        id: "sila", title: "Naše výhody",
        blocks: [
          { t: "list", items: [
            "Specialisté na výkup FVE – rozumíme fotovoltaice lépe než většina konkurence",
            "Jsme menší → rychlejší, osobnější a servisnější přístup",
            "Transparentní komunikace – zákazník vždy ví, co platí a za co",
            "Technologické zázemí – aplikace Electree Connect",
          ]},
          { t: "card", variant: "info", icon: "message", title: "Jak o sobě mluvit se zákazníkem", body: "Nesrovnávejte se s ČEZ nebo E.ON. Mluvte o tom, co Electree umí lépe: férovost, jednoduchost, FVE expertise, osobní přístup." },
        ],
      },
    ],
  },
  {
    id: "energetika", icon: "bolt", title: "Základy energetiky", subtitle: "Dodavatel, distributor, fix, spot",
    sections: [
      {
        id: "role", title: "Dodavatel vs. distributor",
        blocks: [
          { t: "grid", cols: 2, items: [
            { icon: "plug", title: "Distributor", desc: "Vlastní síť. Fyzicky dopraví elektřinu k zákazníkovi. Zákazník si ho NEVYBÍRÁ – je daný lokalitou." },
            { icon: "store", title: "Dodavatel", desc: "Prodává elektřinu. Zákazník s ním uzavírá smlouvu, platí zálohy, dostává faktury. Zákazník si ho VYBÍRÁ." },
          ]},
          { t: "card", variant: "highlight", icon: "info", title: "Klíčové pochopení", body: "Distributor elektřinu doveze, dodavatel ji prodá. Zákazník mění dodavatele, ne distributora." },
          { t: "p", text: "Totéž platí pro plyn: GasNet, Gas Distribution a Pražská plynárenská jsou distributoři. Electree je dodavatel." },
        ],
      },
      {
        id: "fix-spot", title: "Fix a Spot",
        blocks: [
          { t: "grid", cols: 2, items: [
            { icon: "lock", title: "FIX tarif", desc: "Cena sjednaná dopředu na celou dobu smlouvy. Jistota, žádná překvapení." },
            { icon: "trending", title: "SPOT tarif", desc: "Cena kopíruje burzovní trh OTE. Mění se každou hodinu. Může být levný i drahý." },
          ]},
          { t: "card", variant: "info", icon: "check", title: "Kdy nabídnout FIX", body: "Zákazník chce jistotu, předvídatelný účet, nechce sledovat trh. Většina domácností." },
          { t: "card", variant: "neutral", icon: "bolt", title: "Kdy zvážit SPOT", body: "Zákazník má FVE nebo elektromobil, flexibilní spotřebu, sleduje ceny a rozumí trhu. Nutný smart metr AMM." },
          { t: "card", variant: "warning", icon: "warning", title: "Záporné ceny", body: "Při přebytku výroby OZE a nízké spotřebě může cena klesnout pod nulu. U spotového výkupu FVE zákazník v tu chvíli nedostane nic nebo musí doplatit." },
        ],
      },
      {
        id: "fve-vykup", title: "Výkup přebytků z FVE",
        blocks: [
          { t: "p", text: "Zákazník s fotovoltaikou část elektřiny spotřebuje doma a přebytky (přetoky) pošle do sítě. Electree je může vykoupit." },
          { t: "grid", cols: 2, items: [
            { icon: "home", title: "Dodávka", desc: "Zákazník elektřinu nakupuje (odběrné místo)" },
            { icon: "sun", title: "Výkup", desc: "Zákazník elektřinu prodává (výrobní místo)" },
          ]},
          { t: "card", variant: "highlight", icon: "star", title: "Proč Electree ve výkupu exceluje", body: "Máme ~17 000 výrobních míst. Výkup FVE je naše historická silná stránka a oblast, kde překonáváme velké hráče." },
        ],
      },
    ],
  },
  {
    id: "produkty", icon: "box", title: "Naše produkty", subtitle: "HOME FIX, SPOT, Solar výkup, Plyn",
    sections: [
      {
        id: "fix-elektrina", title: "Fixní tarify elektřiny",
        blocks: [
          { t: "table", headers: ["Produkt", "Cena bez DPH", "Vázanost", "Pro koho"], rows: [
            ["HOME FIX 12", "2 549 Kč/MWh", "12 měsíců", "Chce kratší závazek"],
            ["HOME FIX 24 — doporučený", "2 349 Kč/MWh", "24 měsíců", "Nejoblíbenější"],
            ["HOME FIX 36", "2 299 Kč/MWh", "36 měsíců", "Chce max jistotu"],
            ["EXPERT FIX 24", "2 449 Kč/MWh", "24 měsíců", "Firmy s C-sazbou (IČO)"],
          ]},
          { t: "card", variant: "highlight", icon: "star", title: "Doporučuj HOME FIX 24", body: "Nejlepší poměr cena vs. závazek. Nejoblíbenější produkt. Zákazník ví přesně co platí 2 roky." },
        ],
      },
      {
        id: "spot-elektrina", title: "Spotové tarify elektřiny",
        blocks: [
          { t: "grid", cols: 2, items: [
            { icon: "globe", title: "HOME SPOT", desc: "Spot + 349 Kč/MWh přirážka · 99 Kč/měs paušál · potřeba AMM metr" },
            { icon: "car", title: "HOME ELECTREE DRIVE", desc: "Spot + 319 Kč/MWh · Pro majitele EV · auto nabíjení přes Electree Connect · 130 Kč/měs" },
          ]},
          { t: "card", variant: "warning", icon: "warning", title: "Podmínka SPOT tarifu", body: "Zákazník musí mít smart metr AMM. Bez AMM metr nelze SPOT aktivovat." },
        ],
      },
      {
        id: "solar-vykup", title: "Výkupní produkty FVE",
        blocks: [
          { t: "table", headers: ["Produkt", "Výkupní cena", "Limit přetoků", "Paušál/měs"], rows: [
            ["Solar FIX MINI", "1 000 Kč/MWh", "do 1 MWh/rok", "39 Kč"],
            ["Solar FIX — doporučený", "500 Kč/MWh", "1–10 MWh/rok", "59 Kč"],
            ["Solar FIX MAXI", "400 Kč/MWh", "nad 10 MWh/rok", "99 Kč"],
          ]},
          { t: "card", variant: "info", icon: "info", title: "Podmínka Solar FIX MINI", body: "Zákazník musí mít zároveň odběrovou smlouvu na elektřinu u Electree. Nelze uzavřít samostatně." },
        ],
      },
      {
        id: "plyn", title: "Dodávka plynu",
        blocks: [
          { t: "table", headers: ["Produkt", "Cena bez DPH", "Vázanost"], rows: [
            ["HOME FIX PLYN 12", "1 349 Kč/MWh", "12 měsíců"],
            ["HOME FIX PLYN 24 — doporučený", "1 299 Kč/MWh", "24 měsíců"],
            ["HOME FIX PLYN 36", "1 299 Kč/MWh", "36 měsíců (stejná cena jako 24M!)"],
          ]},
          { t: "card", variant: "highlight", icon: "message", title: "Cross-sell tip", body: 'Zákazník řeší elektřinu → nabídni i plyn. "Máme výhodné podmínky i na plyn – jedna smlouva, jedna faktura."' },
        ],
      },
    ],
  },
  {
    id: "hovor", icon: "message", title: "Základní prodejní hovor", subtitle: "Struktura, výpočet úspory, argumentace",
    sections: [
      {
        id: "struktura", title: "Struktura hovoru",
        blocks: [
          { t: "list", items: [
            "Otevření – představení, propojení s žádostí, délka hovoru",
            "Souhlas s nahráváním – stručné, formální",
            "Potvrzení dat z leadu – dodavatel, cena MWh, zálohy, spotřeba",
            "Výpočet úspory a emocionální argumentace",
            "Zvládnutí námitky (pokud přijde)",
            "CTA – výzva k akci, odeslání nabídky",
            "Uzavření a zápis",
          ]},
          { t: "card", variant: "highlight", icon: "info", title: "Co zákazník opravdu kupuje", body: "Ne MWh elektřiny. Kupuje úsporu v Kč, jistotu fixní ceny, klid (nemusí sledovat trh) a jednoduché řešení." },
        ],
      },
      {
        id: "otevreni", title: "Otevření hovoru",
        blocks: [
          { t: "card", variant: "quote", icon: "check", title: "Správné otevření", body: "Dobrý den, paní Nováková? Tady Petra z Electree. Volám vám, protože jste si u nás žádala o cenovou nabídku na elektřinu. Hodí se vám teď chvilka? Zabere to maximálně 10 minut." },
          { t: "card", variant: "warning", icon: "cross", title: "Chyba – nepřeskakuj", body: "Nikdy nezačínej rovnou nabídkou bez představení. Zákazník neví kdo volá a proč." },
        ],
      },
      {
        id: "uspora", title: "Výpočet a prezentace úspory",
        blocks: [
          { t: "card", variant: "neutral", icon: "calculator", title: "Vzorec orientační úspory", body: "(Zákazníkova cena/MWh – Naše cena/MWh) × Roční spotřeba v MWh = Roční úspora v Kč" },
          { t: "p", text: "Příklad: Zákazník platí 3 200 Kč/MWh, spotřeba 12 MWh/rok. My nabídneme HOME FIX 24 za 2 349 Kč/MWh." },
          { t: "card", variant: "highlight", icon: "coins", title: "Výsledek příkladu", body: "(3 200 – 2 349) × 12 = 10 212 Kč/rok = zálohy nižší o ~850 Kč/měs. Plus jistota fixní ceny na 2 roky." },
          { t: "card", variant: "warning", icon: "warning", title: "Co nesmíš slíbit", body: "Konkrétní úsporu bez všech 4 dat. Slevy mimo ceník. Že fix bude vždy nejlevnější. Cokoliv mimo obchodní podmínky." },
        ],
      },
    ],
  },
  {
    id: "namitky", icon: "shield", title: "Základní námitky", subtitle: "Klidná reakce, argumentace, návrat k řešení",
    sections: [
      {
        id: "namitky-1-5", title: "Námitky 1–5",
        blocks: [
          { t: "card", variant: "quote", icon: "message", title: "Musím si to rozmyslet", body: "Rozumím. A co konkrétně si nejste jistá? Úsporu jsme spočítali, ceny vám pošlu e-mailem a výpověď u dodavatele zařídíme my. Co vám ještě chybí k rozhodnutí?" },
          { t: "card", variant: "quote", icon: "message", title: "Mám smlouvu u jiného dodavatele", body: "To není problém. Výpověď za vás zajistíme my na základě plné moci. Stačí jen podepsat." },
          { t: "card", variant: "quote", icon: "message", title: "Nemám teď čas", body: "Chápu. Kdy se vám hodí, abych zavolala zpátky? Zabere to jen pár minut." },
          { t: "card", variant: "quote", icon: "message", title: "Nejste příliš drazí?", body: "Naopak – z výpočtu vyšlo, že ušetříte přibližně X Kč ročně. Zálohy vám klesnou o Y Kč měsíčně." },
          { t: "card", variant: "quote", icon: "message", title: "Slyšela jsem o vás něco špatného", body: "Děkuji za upřímnost. Část podobných reakcí bývá od zákazníků u nichž byl přechod složitější. U vás by vše probíhalo přesně podle nabídky, kterou vám pošlu." },
        ],
      },
      {
        id: "namitky-6-10", title: "Námitky 6–10",
        blocks: [
          { t: "card", variant: "quote", icon: "message", title: "Fix bude drahý, když ceny klesnou", body: "Fix není o absolutním minimu. Je o jistotě – víte přesně za kolik budete platit, bez překvapení při nárůstu cen." },
          { t: "card", variant: "quote", icon: "message", title: "Chci porovnat více nabídek", body: "To je rozumné. Pošlu vám nabídku s konkrétními čísly pro vaši situaci – budete mít nejlepší podklad pro srovnání." },
          { t: "card", variant: "quote", icon: "message", title: "Mám to na partnerovi", body: "Rozumím. Pošlu vám vše přehledně e-mailem a domluvíme se kdy se ozvu znovu, až to proberete." },
          { t: "card", variant: "quote", icon: "message", title: "Jednou jsem měnila a bylo to hrozné", body: "Chápu, po špatné zkušenosti je opatrnost na místě. Tentokrát vám popíšu přesně co se kdy stane a co za vás zařídíme." },
          { t: "card", variant: "quote", icon: "message", title: "Bojím se přerušení dodávky", body: "Toho se bát nemusíte. Přechod probíhá administrativně, po celou dobu jste připojená. Mění se jen firma na faktuře." },
        ],
      },
    ],
  },
  {
    id: "uzavreni", icon: "check", title: "Uzavření hovoru a zápis", subtitle: "CTA, plná moc, cross-sell, co zapsat",
    sections: [
      {
        id: "cta", title: "Call to action",
        blocks: [
          { t: "card", variant: "highlight", icon: "target", title: "Pravidlo uzavření", body: "Operátorka vede další krok – ne zákazník. Po zpracování námitky přijde jasná výzva k akci." },
          { t: "card", variant: "quote", icon: "check", title: "Správné CTA", body: "Co říkáte, pojďme to zafixovat? Pošlu vám nabídku na e-mail, vy se podíváte a podepíšete online. Spolu s ní přijde plná moc pro výpověď. Zabere to pár minut." },
          { t: "card", variant: "info", icon: "clipboard", title: "Plná moc", body: "Electree za zákazníka podá výpověď u stávajícího dodavatele. Zákazník jen podepíše – o nic dalšího se nestará." },
        ],
      },
      {
        id: "zapis", title: "Zápis po hovoru",
        blocks: [
          { t: "list", items: [
            "Zda byl zákazník zastižen a hovor proběhl",
            "Potvrzení vstupních dat (dodavatel, cena, zálohy, spotřeba)",
            "Komunikovaná orientační úspora v Kč",
            "Jaká námitka zazněla a jak jsi reagovala",
            "Zda zákazník souhlasil se zasláním nabídky",
            "Zda byla odeslána nabídka a plná moc",
            "Další krok nebo domluvený termín zpětného volání",
          ]},
          { t: "card", variant: "warning", icon: "warning", title: "Proč je zápis důležitý", body: "Když se ke zákazníkovi vrátí kolegyně nebo zákazník zavolá sám zpět, musí mít všechny informace bez ptaní." },
        ],
      },
      {
        id: "crosssell", title: "Cross-sell",
        blocks: [
          { t: "card", variant: "highlight", icon: "info", title: "Pravidlo cross-sellu", body: "Nejprve uzavři hlavní věc (elektřinu), teprve pak nabídni další produkt. Nikdy nedělej obojí najednou." },
          { t: "grid", cols: 2, items: [
            { icon: "flame", title: "Plyn", desc: "Topíte plynem? Můžeme spočítat úsporu i tam." },
            { icon: "sun", title: "Výkup FVE", desc: "Máte fotovoltaiku? Electree patří mezi přední výkupce přetoků." },
          ]},
        ],
      },
    ],
  },
  {
    id: "wiki-praxe", icon: "search", title: "Práce s Electree Wiki", subtitle: "Jak rychle najít správnou odpověď",
    sections: [
      {
        id: "jak-hledat", title: "Jak vyhledávat",
        blocks: [
          { t: "card", variant: "highlight", icon: "search", title: "Hledej bez diakritiky", body: '"distribucni sazby" najde "Distribuční sazby". "EAN vyrobce" najde "EAN výrobce vs EAN odběratele". Vyhledávání je chytré.' },
          { t: "grid", cols: 2, items: [
            { icon: "box", title: "Produkt", desc: "Ceny, podmínky, pro koho" },
            { icon: "clipboard", title: "SOP", desc: "Krok za krokem v EIS" },
            { icon: "bolt", title: "Distribuce", desc: "Sazby, jistič, VT/NT" },
            { icon: "shield", title: "Retence", desc: "Námitky, zákazník odchází" },
          ]},
        ],
      },
      {
        id: "wiki-vs-sop", title: "Wiki vs. SOP",
        blocks: [
          { t: "grid", cols: 2, items: [
            { icon: "book", title: "Wiki", desc: "Vysvětluje co to je a jak to funguje. Pro pochopení pojmů." },
            { icon: "clipboard", title: "SOP", desc: "Říká jak přesně postupovat v EIS krok za krokem. Pro konkrétní akci." },
          ]},
          { t: "card", variant: "neutral", icon: "info", title: "Příklad použití", body: '"Co je výrobní EAN?" → Wiki, kategorie Pojmy.\n"Jak uzavřít smlouvu výkup v EIS?" → Wiki, kategorie SOP.' },
        ],
      },
    ],
  },
];

// ─── Level B/C stubs ──────────────────────────────────────────────────────────

const LEVEL_B_STUBS = [
  "Rozšířená energetika", "Pokročilé produkty", "Pokročilé vedení hovoru",
  "Diagnostika potřeb", "Pokročilé sales", "Námitky a odpor", "Uzavírání obchodu",
  "Komunikace a přesvědčivost", "Wiki v praxi",
];
const LEVEL_C_STUBS = [
  "Role teamleadra", "Vedení lidí", "Coaching operátorek", "QA a hodnocení",
  "Výkon a KPI", "Problémový výkon", "Eskalace", "Rozvoj týmu",
];

type Level = "A" | "B" | "C";
const LEVEL_META: Record<Level, { label: string; desc: string }> = {
  A: { label: "Level A", desc: "Základní provoz" },
  B: { label: "Level B", desc: "Pokročilý prodej" },
  C: { label: "Level C", desc: "Vedení lidí" },
};

// ─── Module viewer ────────────────────────────────────────────────────────────

function ModuleViewer({ mod, onBack }: { mod: Module; onBack: () => void }) {
  const { isDone, markLesson } = useProgress();
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTo = (i: number) => {
    setActiveSection(i);
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex h-full">
      {/* Left TOC */}
      <aside className="w-52 flex-shrink-0 border-r border-[#D1DFD8] bg-white overflow-y-auto sticky top-0 h-screen">
        <div className="p-4 border-b border-[#D1DFD8]">
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-[#0D3D34]/40 hover:text-[#0D3D34] transition-colors mb-4">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Moduly
          </button>
          <div className="w-8 h-8 rounded-lg bg-[#EBF7F1] flex items-center justify-center text-[#1A6B5A] mb-2">
            <Icon name={mod.icon} size={16} />
          </div>
          <div className="font-bold text-[#0D3D34] text-sm">{mod.title}</div>
          <div className="text-[10px] text-[#0D3D34]/40 mt-0.5">{mod.subtitle}</div>
        </div>
        <nav className="p-2 flex-1">
          {mod.sections.map((sec, i) => (
            <button key={sec.id} onClick={() => scrollTo(i)}
              className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${activeSection === i ? "bg-[#D7FF00] text-[#0D3D34] font-semibold" : "text-[#0D3D34]/55 hover:bg-[#EBF7F1]"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDone(mod.id, i) ? "bg-[#1A6B5A]" : "bg-[#D1DFD8]"}`} />
              {sec.title}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-[#D1DFD8]">
          <Link href="/dashboard/certifikace"
            className="block text-center bg-[#0D3D34] text-[#D7FF00] text-xs font-bold px-3 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Přejít ke Školení →
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#F4F7F6]">
        <div className="max-w-2xl mx-auto p-8 space-y-14">
          {mod.sections.map((sec, i) => (
            <div key={sec.id} ref={el => { sectionRefs.current[i] = el; }} className="scroll-mt-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0D3D34]">{sec.title}</h2>
                <button
                  onClick={() => { if (!isDone(mod.id, i)) markLesson(mod.id, i); }}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${isDone(mod.id, i) ? "bg-[#EBF7F1] border-[#B8E8D0] text-[#1A6B5A]" : "border-[#D1DFD8] bg-white text-[#0D3D34]/40 hover:border-[#0D3D34]/30 hover:text-[#0D3D34]"}`}
                >
                  {isDone(mod.id, i) ? (
                    <><svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg> Přečteno</>
                  ) : "Označit jako přečteno"}
                </button>
              </div>
              <div className="space-y-4">
                {sec.blocks.map((b, bi) => <RenderBlock key={bi} b={b} />)}
              </div>
            </div>
          ))}

          <div className="bg-[#0D3D34] rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 text-white">
              <Icon name="check" size={20} />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Modul dokončen</h3>
            <p className="text-white/55 text-sm mb-5">Otestuj si znalosti ve Školení nebo se vrať na přehled modulů.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/certifikace" className="bg-[#D7FF00] text-[#0D3D34] text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                Přejít ke Školení →
              </Link>
              <button onClick={onBack} className="border border-white/20 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
                Zpět na moduly
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AkademieePage() {
  const [activeLevel, setActiveLevel] = useState<Level>("A");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const { countDone } = useProgress();

  const mod = LEVEL_A.find(m => m.id === selectedModule);
  if (selectedModule && mod) return <ModuleViewer mod={mod} onBack={() => setSelectedModule(null)} />;

  const totalSections = LEVEL_A.reduce((s, m) => s + m.sections.length, 0);
  const doneSections = LEVEL_A.reduce((s, m) => s + Math.min(countDone(m.id), m.sections.length), 0);
  const pct = Math.round((doneSections / totalSections) * 100);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Akademie</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Vzdělávací program ve třech úrovních</p>
      </div>

      {/* Level tabs */}
      <div className="flex gap-2 mb-6">
        {(["A", "B", "C"] as Level[]).map((lvl) => {
          const locked = lvl !== "A";
          const active = activeLevel === lvl;
          return (
            <button key={lvl} onClick={() => setActiveLevel(lvl)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${active ? "bg-[#0D3D34] text-[#D7FF00] border-[#0D3D34]" : "bg-white border-[#D1DFD8] text-[#0D3D34]/60 hover:border-[#0D3D34]/30"}`}
            >
              {locked && <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" /></svg>}
              <span>{LEVEL_META[lvl].label}</span>
              <span className={`hidden sm:block text-[9px] font-normal ${active ? "text-[#D7FF00]/70" : "text-[#0D3D34]/35"}`}>{LEVEL_META[lvl].desc}</span>
            </button>
          );
        })}
      </div>

      {activeLevel === "A" && (
        <>
          <div className="bg-[#0D3D34] rounded-2xl p-5 mb-6 flex items-center gap-6">
            <div className="flex-1">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Level A – celkový pokrok</div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#D7FF00] transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#D7FF00] text-2xl font-bold">{pct} %</div>
              <div className="text-white/40 text-xs">{doneSections}/{totalSections} sekcí</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEVEL_A.map((m) => {
              const done = Math.min(countDone(m.id), m.sections.length);
              const total = m.sections.length;
              const mpct = Math.round((done / total) * 100);
              return (
                <button key={m.id} onClick={() => setSelectedModule(m.id)}
                  className="bg-white border border-[#D1DFD8] rounded-2xl p-5 text-left hover:shadow-md hover:border-[#0D3D34]/20 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#EBF7F1] flex items-center justify-center text-[#1A6B5A] mb-4 group-hover:bg-[#D7FF00] group-hover:text-[#0D3D34] transition-colors">
                    <Icon name={m.icon} size={18} />
                  </div>
                  <div className="font-bold text-[#0D3D34] text-sm group-hover:text-[#1A6B5A] transition-colors mb-0.5">{m.title}</div>
                  <div className="text-xs text-[#0D3D34]/45 mb-4">{m.subtitle}</div>
                  <div className="h-1 bg-[#EBF7F1] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${mpct}%`, backgroundColor: mpct === 100 ? "#D7FF00" : "#B8E8D0" }} />
                  </div>
                  <div className="text-[10px] text-[#0D3D34]/35 mt-1.5">{done}/{total} sekcí</div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {activeLevel !== "A" && (
        <div>
          <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-8 text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D1DFD8] flex items-center justify-center mx-auto mb-3 text-[#0D3D34]/30">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" /></svg>
            </div>
            <h3 className="font-bold text-[#0D3D34] mb-1">{LEVEL_META[activeLevel].label} – brzy k dispozici</h3>
            <p className="text-[#0D3D34]/50 text-sm">Obsah se připravuje. Nejprve dokončete Level A.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(activeLevel === "B" ? LEVEL_B_STUBS : LEVEL_C_STUBS).map((title) => (
              <div key={title} className="bg-white border border-[#D1DFD8] rounded-xl p-4 opacity-40 flex items-center gap-3">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" /></svg>
                <span className="text-sm text-[#0D3D34]/60">{title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
