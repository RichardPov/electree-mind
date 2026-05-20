"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const SUGGESTIONS = [
  "Jaký je rozdíl mezi FIX 12 a FIX 24?",
  "Zákazník má fotovoltaiku, chce vědět o výkupu",
  "Zákazník chce jistotu ceny, co doporučím?",
  "Zákazník si stěžuje na vysoký účet",
  "Klient chce zrušit smlouvu",
  "Vysvětli SPOT produkt zákazníkovi",
];

const FOLLOW_UPS: Record<string, string[]> = {
  fix: ["Co když zákazník váhá mezi FIX a SPOT?", "Jaký je postup při podpisu FIX 24?", "Mohu zákazníkovi nabídnout i plyn?"],
  fve: ["Jaké doklady potřebuji při výkupu?", "Co je komunitní energie?", "Jaký je rozdíl Výkup SPOT vs FIX?"],
  istota: ["Mohu kombinovat elektřinu i plyn na FIX 24?", "Co když zákazník chce i ekologický produkt?", "Jaký je postup při podpisu?"],
  ucet: ["Jak vysvětlím SPOT ceny zákazníkovi?", "Co když zákazník chce okamžitě odejít?", "Mohu mu nabídnout splátkový plán?"],
  zrusit: ["Jaký je retenční postup?", "Co zapíšu do CRM při zrušení?", "Kdy vzniká poplatek za předčasné zrušení?"],
  platba: ["Co když zákazník odmítne splátkový plán?", "Kdy eskaluji případ nadřízené?", "Jaká je minimální splátka?"],
  default: ["Co je Electree ZELENÁ?", "Porovnej produkty elektřiny a plynu", "Zákazník otálí s platbou"],
};

function getFollowUps(message: string): string[] {
  const m = message.toLowerCase();
  if (m.includes("fix")) return FOLLOW_UPS.fix;
  if (m.includes("fve") || m.includes("fotovolta") || m.includes("výkup") || m.includes("vykup")) return FOLLOW_UPS.fve;
  if (m.includes("istot")) return FOLLOW_UPS.istota;
  if (m.includes("účet") || m.includes("ucet") || m.includes("drah")) return FOLLOW_UPS.ucet;
  if (m.includes("zrušiť") || m.includes("zrusit") || m.includes("výpoveď")) return FOLLOW_UPS.zrusit;
  if (m.includes("platb") || m.includes("splátk")) return FOLLOW_UPS.platba;
  return FOLLOW_UPS.default;
}

type Message = { role: "user" | "assistant"; content: string; followUps?: string[] };

export default function AIDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "live">("chat");
  const [historyStack, setHistoryStack] = useState<Message[][]>([[]]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll only the chat container, never the page
  const scrollChatToBottom = useCallback(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages, loading, scrollChatToBottom]);

  function pushHistory(newMessages: Message[]) {
    const newStack = historyStack.slice(0, historyIdx + 1).concat([newMessages]);
    setHistoryStack(newStack);
    setHistoryIdx(newStack.length - 1);
    setMessages(newMessages);
  }

  function goBack() {
    if (historyIdx <= 0) return;
    const idx = historyIdx - 1;
    setHistoryIdx(idx);
    setMessages(historyStack[idx]);
  }

  function goForward() {
    if (historyIdx >= historyStack.length - 1) return;
    const idx = historyIdx + 1;
    setHistoryIdx(idx);
    setMessages(historyStack[idx]);
  }

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const interim = [...messages, userMsg];
    setMessages(interim);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const aiMsg: Message = {
        role: "assistant",
        content: data.reply,
        followUps: getFollowUps(text),
      };
      const next = [...interim, aiMsg];
      pushHistory(next);
    } catch {
      pushHistory([...interim, { role: "assistant", content: "Chyba spojenia." }]);
    } finally {
      setLoading(false);
    }
  }

  const canGoBack = historyIdx > 0;
  const canGoForward = historyIdx < historyStack.length - 1;
  const lastAiMsg = [...messages].reverse().find((m) => m.role === "assistant");

  return (
    <section id="ai-demo" className="py-24 px-6 bg-[#EBF7F1]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-[#D1DFD8] rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D7FF00] animate-pulse" />
            <span className="text-xs font-semibold text-[#0D3D34] tracking-wide uppercase">Live demo · Claude AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3D34] tracking-tight mb-4">
            AI asistent přímo<br />během hovoru
          </h2>
          <p className="text-lg text-[#0D3D34]/60 max-w-2xl">
            Operátorka napíše otázku během živého hovoru. Claude dostane kontext ceníků, produktů a pravidel — a okamžitě navrhne co říct.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* LEFT: chat demo */}
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden shadow-sm flex flex-col" style={{ height: 560 }}>

            {/* Tab bar */}
            <div className="flex border-b border-[#D1DFD8] flex-shrink-0">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "chat" ? "bg-[#0D3D34] text-[#D7FF00]" : "text-[#0D3D34]/50 hover:text-[#0D3D34]"}`}
              >
                Chat asistent
              </button>
              <button
                onClick={() => setActiveTab("live")}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "live" ? "bg-[#0D3D34] text-[#D7FF00]" : "text-[#0D3D34]/50 hover:text-[#0D3D34]"}`}
              >
                Odposlech hovoru
              </button>
            </div>

            {activeTab === "chat" ? (
              <div className="flex flex-col flex-1 min-h-0">

                {/* Nav bar */}
                {messages.length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-[#D1DFD8] bg-[#EBF7F1]/60 flex-shrink-0">
                    <button
                      onClick={goBack}
                      disabled={!canGoBack}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#0D3D34] disabled:opacity-30 hover:text-[#1A6B5A] transition-colors disabled:cursor-not-allowed"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Zpět
                    </button>
                    <span className="text-[#D1DFD8]">|</span>
                    <button
                      onClick={goForward}
                      disabled={!canGoForward}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#0D3D34] disabled:opacity-30 hover:text-[#1A6B5A] transition-colors disabled:cursor-not-allowed"
                    >
                      Dopředu
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <span className="ml-auto text-xs text-[#0D3D34]/30 tabular-nums">
                      {Math.ceil(messages.length / 2)}/{Math.ceil(historyStack[historyStack.length - 1].length / 2)}
                    </span>
                    <button
                      onClick={() => { setMessages([]); setHistoryStack([[]]); setHistoryIdx(0); }}
                      className="text-xs text-[#0D3D34]/40 hover:text-[#0D3D34] transition-colors ml-1"
                    >
                      Nový chat
                    </button>

                  </div>
                )}

                {/* Messages — fixed height scroll, never scrolls page */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0"
                >
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#EBF7F1] flex items-center justify-center mb-3">
                        <svg width="22" height="22" fill="none" stroke="#0D3D34" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-sm text-[#0D3D34]/50 max-w-xs mb-5">Napiš otázku nebo vyber situaci:</p>
                      <div className="flex flex-col gap-2 w-full max-w-xs">
                        {SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => send(s)}
                            className="text-xs bg-[#EBF7F1] border border-[#D1DFD8] text-[#0D3D34] px-3 py-2 rounded-xl hover:border-[#0D3D34]/30 hover:bg-[#D1DFD8] transition-colors text-left"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((m, i) => (
                    <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${m.role === "user" ? "bg-[#0D3D34] text-[#D7FF00]" : "bg-[#D7FF00] text-[#0D3D34]"}`}>
                        {m.role === "user" ? "OP" : "AI"}
                      </div>
                      <div className="flex flex-col gap-2 max-w-[82%]">
                        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-[#0D3D34] text-white rounded-tr-sm" : "bg-[#EBF7F1] text-[#0D3D34] rounded-tl-sm"}`}>
                          {m.content}
                        </div>
                        {/* Follow-up suggestions after AI response */}
                        {m.role === "assistant" && m.followUps && i === messages.length - 1 && (
                          <div className="flex flex-col gap-1.5 pl-1">
                            <span className="text-[10px] text-[#0D3D34]/35 uppercase tracking-wider font-semibold">Další otázky</span>
                            {m.followUps.map((f) => (
                              <button
                                key={f}
                                onClick={() => send(f)}
                                className="text-xs bg-white border border-[#D1DFD8] text-[#0D3D34] px-3 py-1.5 rounded-lg hover:border-[#1A6B5A] hover:bg-[#EBF7F1] transition-colors text-left"
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#D7FF00] flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-[#0D3D34]">AI</div>
                      <div className="bg-[#EBF7F1] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0D3D34]/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0D3D34]/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0D3D34]/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-[#D1DFD8] flex gap-3 items-end flex-shrink-0">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                    placeholder="Napiš otázku... (Enter = odeslat)"
                    rows={2}
                    className="flex-1 resize-none border border-[#D1DFD8] rounded-xl px-4 py-2.5 text-sm text-[#0D3D34] placeholder-[#0D3D34]/35 focus:outline-none focus:border-[#0D3D34]/40 bg-[#EBF7F1]/50"
                  />
                  <button
                    onClick={() => send(input)}
                    disabled={loading || !input.trim()}
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0D3D34] text-[#D7FF00] flex items-center justify-center hover:bg-[#1A6B5A] disabled:opacity-40 transition-colors"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              /* Live call tab */
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#0D3D34] uppercase tracking-wide">Probíhající hovor · 02:34</span>
                  </div>
                  <p className="text-sm text-[#0D3D34]/70 italic leading-relaxed">
                    „...takže vlastně my máme tu fotovoltaiku od června, mám výkon čtyři kilowatty, a chtěl bych vědět jak funguje ten výkup, protože soused říkal něco o spotové ceně..."
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest">AI tipy pro operátorku</div>
                  {[
                    { type: "hint", text: "Zákazník má FVE 4 kW → vhodný pro výkup. Zeptej se, jestli má smart meter (AMM) – bez něj výkup nejde." },
                    { type: "product", text: "Nabídni Výkup FIX 12 – garantovaná cena 2,10 Kč/kWh. Stabilnější než SPOT pro malé zdroje." },
                    { type: "warning", text: "Ověřit: má zákazník licenci ERÚ a smlouvu o připojení? Povinné podmínky výkupu." },
                  ].map((hint, i) => (
                    <div key={i} className={`flex gap-3 rounded-xl p-3.5 border ${hint.type === "hint" ? "bg-white border-[#D1DFD8]" : hint.type === "product" ? "bg-[#D7FF00]/10 border-[#D7FF00]/40" : "bg-orange-50 border-orange-200"}`}>
                      <span className="flex-shrink-0 mt-0.5">
                        {hint.type === "hint" && <svg width="14" height="14" fill="none" stroke="#1A6B5A" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" strokeLinecap="round" /></svg>}
                        {hint.type === "product" && <svg width="14" height="14" fill="none" stroke="#0D3D34" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>}
                        {hint.type === "warning" && <svg width="14" height="14" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" /></svg>}
                      </span>
                      <p className="text-sm text-[#0D3D34] leading-relaxed">{hint.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: how it works */}
          <div className="space-y-5">
            <div className="bg-white border border-[#D1DFD8] rounded-2xl p-7">
              <h3 className="text-lg font-bold text-[#0D3D34] mb-5">Jak to funguje</h3>
              <div className="space-y-5">
                {[
                  { icon: "💬", title: "Mód 1 — Chat asistent", desc: "Operátorka napíše otázku během hovoru. Claude okamžitě odpoví na základě nahraných ceníků, produktů a pravidel firmy. Latence ~1s." },
                  { icon: "🎧", title: "Mód 2 — Odposlech hovoru", desc: "Audio stream ze softwaru call centra jde do speech-to-text (např. AssemblyAI). Přepis jde v reálném čase do Claude, který generuje tipy automaticky — bez toho aby operátorka musela cokoli psát." },
                  { icon: "📊", title: "Kontext = vaše data", desc: "Do Claude se nalijí aktuální ceníky, produktový katalog, interní pravidla, SOPs. Claude je má vždy k dispozici. Aktualizace dat = jedna změna v CMS." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF7F1] flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-[#0D3D34] mb-1">{item.title}</div>
                      <div className="text-sm text-[#0D3D34]/60 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0D3D34] rounded-2xl p-7 text-white">
              <div className="text-xs font-bold text-[#D7FF00] uppercase tracking-widest mb-4">Tech stack · AI Copilot</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Claude Sonnet", desc: "AI mozek" },
                  { name: "AssemblyAI", desc: "Speech-to-text" },
                  { name: "Next.js Stream", desc: "Real-time odpovědi" },
                  { name: "WebSocket", desc: "Live audio pipeline" },
                ].map((t) => (
                  <div key={t.name} className="bg-white/8 rounded-xl p-3">
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/50 mt-0.5">{t.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/40 leading-relaxed">
                Odpočúvanie hovoru nevyžaduje zmenu telefónnej infraštruktúry — funguje cez SIP trunk tap alebo screen-sharing audio capture.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
