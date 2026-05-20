"use client";
import { useState } from "react";

const navLinks = [
  { href: "#vrstvy", label: "Vrstvy" },
  { href: "#architektura", label: "Architektura" },
  { href: "#roadmap", label: "Roadmapa" },
  { href: "#cennik", label: "Ceník" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#D1DFD8]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0D3D34]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9C3 5.686 5.686 3 9 3s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z" fill="#D7FF00" />
              <path d="M9 6v3l2 2" stroke="#0D3D34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-semibold text-[#0D3D34] text-lg tracking-tight">Electree<span className="text-[#1A6B5A]"> Mind</span></span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#0D3D34]/70 hover:text-[#0D3D34] transition-colors font-medium">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#cennik"
          className="hidden md:inline-flex items-center gap-2 bg-[#0D3D34] text-[#D7FF00] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1A6B5A] transition-colors"
        >
          Zjistit cenu
        </a>

        <button className="md:hidden p-2 text-[#0D3D34]" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l10 10M16 6L6 16" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#D1DFD8] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#0D3D34] font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#cennik" className="inline-flex items-center justify-center bg-[#0D3D34] text-[#D7FF00] text-sm font-semibold px-4 py-2 rounded-lg" onClick={() => setOpen(false)}>
            Zjistit cenu
          </a>
        </div>
      )}
    </header>
  );
}
