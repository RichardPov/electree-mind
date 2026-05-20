const stack = [
  {
    category: "Frontend",
    color: "#D7FF00",
    items: [
      { name: "Next.js 14+", desc: "App Router, SSR/SSG, Server Actions" },
      { name: "TypeScript", desc: "Typová bezpečnost, lepší DX" },
      { name: "Tailwind CSS", desc: "Utility-first styling" },
      { name: "shadcn/ui", desc: "Přístupné UI komponenty" },
    ],
  },
  {
    category: "Backend & Data",
    color: "#B8E8D0",
    items: [
      { name: "Next.js API Routes", desc: "Server-side logika, webhooks" },
      { name: "PostgreSQL (Neon)", desc: "Relační DB, bezserverová" },
      { name: "Prisma ORM", desc: "Typově bezpečný přístup k DB" },
      { name: "Redis (Upstash)", desc: "Caching, session store" },
    ],
  },
  {
    category: "AI & Search",
    color: "#EBF7F1",
    items: [
      { name: "Claude API (Anthropic)", desc: "AI lektor, hodnocení odpovědí" },
      { name: "Typesense", desc: "Rychlé fulltextové vyhledávání" },
      { name: "Vercel AI SDK", desc: "Streaming, tool use" },
      { name: "LangChain (volitelné)", desc: "Komplexní AI workflow" },
    ],
  },
  {
    category: "Infrastruktura",
    color: "#D1DFD8",
    items: [
      { name: "Vercel", desc: "Hosting, CI/CD, edge functions" },
      { name: "Cloudflare R2", desc: "Úložiště souborů, videí" },
      { name: "NextAuth.js", desc: "Autentizace, RBAC" },
      { name: "Resend", desc: "Transakční e-maily" },
    ],
  },
];

export default function Architecture() {
  return (
    <section id="architektura" className="py-24 px-6 bg-[#EBF7F1]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#D1DFD8] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#0D3D34] tracking-wide uppercase">Tech Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3D34] tracking-tight mb-4">
            Architektura systému
          </h2>
          <p className="text-lg text-[#0D3D34]/60 max-w-2xl">
            Moderní, škálovatelný stack postavený na prověřených technologiích. Serverless přístup minimalizuje provozní náklady a zjednodušuje nasazení.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stack.map((group) => (
            <div key={group.category} className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#D1DFD8]" style={{ backgroundColor: group.color }}>
                <span className="text-xs font-bold text-[#0D3D34] uppercase tracking-wider">{group.category}</span>
              </div>
              <div className="p-5 space-y-4">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <div className="text-sm font-semibold text-[#0D3D34]">{item.name}</div>
                    <div className="text-xs text-[#0D3D34]/55 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#D1DFD8] rounded-2xl p-8">
          <h3 className="text-lg font-bold text-[#0D3D34] mb-8 text-center">Datový tok systému</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
            {[
              { label: "Uživatel (Operátorka)", icon: "👤" },
              { label: "Next.js Frontend", icon: "⚛️" },
              { label: "API Routes / Server Actions", icon: "⚡" },
              { label: "PostgreSQL + Redis", icon: "🗄️" },
              { label: "Claude AI API", icon: "🤖" },
              { label: "R2 Storage", icon: "📦" },
            ].map((node, i, arr) => (
              <div key={node.label} className="flex items-center gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#EBF7F1] border border-[#D1DFD8] flex items-center justify-center text-2xl mb-2">
                    {node.icon}
                  </div>
                  <span className="text-xs font-medium text-[#0D3D34]/70 max-w-[90px] leading-tight">{node.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <svg width="20" height="20" fill="none" stroke="#D1DFD8" strokeWidth="2" className="flex-shrink-0 hidden md:block">
                    <path d="M4 10h12M12 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
