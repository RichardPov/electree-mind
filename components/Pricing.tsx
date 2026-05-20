const infrastructureRows = [
  { service: "Vercel Pro", desc: "Hosting, CI/CD, Edge Functions", low: 20, high: 20 },
  { service: "Databáze – Neon", desc: "PostgreSQL, serverless, autoscaling", low: 19, high: 69 },
  { service: "Redis – Upstash", desc: "Cache, session, rate limiting", low: 10, high: 25 },
  { service: "Autentizace – Clerk", desc: "Auth, RBAC, SSO připravenost", low: 25, high: 25 },
  { service: "Úložiště – Cloudflare R2", desc: "Soubory, videa, přílohy", low: 5, high: 20 },
  { service: "Vyhledávání – Typesense", desc: "Fulltextové vyhledávání", low: 29, high: 29 },
  { service: "E-mail – Resend", desc: "Notifikace, pozvánky", low: 20, high: 20 },
];

const aiRows = [
  { agents: "20 operátorek", desc: "~500 AI dotazů/měsíc", low: 30, high: 80 },
  { agents: "50 operátorek", desc: "~1 500 AI dotazů/měsíc", low: 80, high: 200 },
  { agents: "100 operátorek", desc: "~3 500 AI dotazů/měsíc", low: 160, high: 400 },
  { agents: "200 operátorek", desc: "~7 000 AI dotazů/měsíc", low: 300, high: 750 },
];

const infraTotal = { low: 128, high: 208 };

export default function Pricing() {
  return (
    <section id="cennik" className="py-24 px-6 bg-[#EBF7F1]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#D1DFD8] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#0D3D34] tracking-wide uppercase">Měsíční náklady</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3D34] tracking-tight mb-4">
            Kolik to stojí?
          </h2>
          <p className="text-lg text-[#0D3D34]/60 max-w-2xl">
            Náklady jsou rozděleny na fixní infrastrukturu a variabilní AI náklady podle počtu operátorek. Všechny ceny v USD.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-7 py-5 border-b border-[#D1DFD8] bg-[#EBF7F1]">
              <h3 className="font-bold text-[#0D3D34] text-lg">Fixní infrastruktura</h3>
              <p className="text-sm text-[#0D3D34]/55 mt-0.5">Platíte stejně bez ohledu na počet operátorek</p>
            </div>
            <div className="divide-y divide-[#D1DFD8]">
              {infrastructureRows.map((row) => (
                <div key={row.service} className="px-7 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#0D3D34]">{row.service}</div>
                    <div className="text-xs text-[#0D3D34]/50 mt-0.5">{row.desc}</div>
                  </div>
                  <div className="text-sm font-mono font-bold text-[#0D3D34] whitespace-nowrap flex-shrink-0">
                    {row.low === row.high ? `$${row.low}` : `$${row.low}–$${row.high}`}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-7 py-5 bg-[#0D3D34] flex items-center justify-between">
              <span className="text-sm font-bold text-white">Infrastruktura celkem</span>
              <span className="font-mono font-bold text-[#D7FF00]">${infraTotal.low}–${infraTotal.high}/měsíc</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
              <div className="px-7 py-5 border-b border-[#D1DFD8] bg-[#EBF7F1]">
                <h3 className="font-bold text-[#0D3D34] text-lg">AI Lektor – variabilní náklady</h3>
                <p className="text-sm text-[#0D3D34]/55 mt-0.5">Claude Sonnet – podle počtu operátorek</p>
              </div>
              <div className="divide-y divide-[#D1DFD8]">
                {aiRows.map((row) => (
                  <div key={row.agents} className="px-7 py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#0D3D34]">{row.agents}</div>
                      <div className="text-xs text-[#0D3D34]/50 mt-0.5">{row.desc}</div>
                    </div>
                    <div className="text-sm font-mono font-bold text-[#1A6B5A]">${row.low}–${row.high}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0D3D34] rounded-2xl p-7 text-white">
              <div className="text-sm font-semibold text-[#D7FF00] mb-4">Příklad: 50 operátorek / měsíc</div>
              <div className="space-y-2.5 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Fixní infrastruktura</span>
                  <span className="font-mono">$128–$208</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">AI Lektor (50 operátorek)</span>
                  <span className="font-mono">$80–$200</span>
                </div>
                <div className="border-t border-white/15 pt-3 flex justify-between">
                  <span className="font-bold">Celkem / měsíc</span>
                  <span className="font-mono font-bold text-[#D7FF00] text-lg">$208–$408</span>
                </div>
                <div className="flex justify-between text-xs text-white/50">
                  <span>Přepočet na €</span>
                  <span className="font-mono">≈ €190–€375</span>
                </div>
              </div>
              <div className="text-xs text-white/50 leading-relaxed">
                * Cena AI závisí na intenzitě využívání. Základní moduly (Wiki, SOPs, Akademie, Testování) AI náklady neobsahují — vznikají pouze při aktivním využívání AI lektora.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white border border-[#D1DFD8] rounded-2xl p-7 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#EBF7F1] border border-[#D1DFD8] flex items-center justify-center">
            <svg width="20" height="20" fill="none" stroke="#0D3D34" strokeWidth="1.8" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-[#0D3D34] mb-1.5">Výše jsou pouze provozní náklady</div>
            <div className="text-sm text-[#0D3D34]/60 leading-relaxed max-w-2xl">
              Jde o měsíční náklady na infrastrukturu a AI API. Jednorázové náklady na vývoj, design a implementaci se liší podle rozsahu a zvoleného týmu.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
