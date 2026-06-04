"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  { icon: "⚡", label: "Doporuč tarif", prompt: "Zákazník je domácnost, 10 MWh/rok, chce jistotu. Který tarif doporučit?" },
  { icon: "☀️", label: "FVE výkup", prompt: "Zákazník má FVE 6 kWp na rodinném domě. Jaký výkupní produkt doporučit?" },
  { icon: "🛡️", label: "Retence", prompt: "Zákazník chce odejít ke konkurenci kvůli ceně. Jak mám reagovat?" },
  { icon: "🧮", label: "Výpočet úspory", prompt: "Zákazník platí 3 200 Kč/MWh u ČEZ, spotřeba 12 MWh/rok. Kolik ušetří na HOME FIX 24?" },
  { icon: "📋", label: "Přechod dodavatele", prompt: "Jak probíhá přechod dodavatele a jak zákazníkovi vysvětlit plnou moc?" },
  { icon: "🔥", label: "Plyn cross-sell", prompt: "Zákazník uzavřel elektřinu. Jak nabídnout plyn jako cross-sell?" },
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const history = messages.slice(-8).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Chyba připojení. Zkuste to znovu." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          /* Empty state – centered */
          <div className="flex flex-col items-center justify-center h-full px-8 pb-32">
            <div className="w-14 h-14 rounded-2xl bg-[#0D3D34] flex items-center justify-center mb-5">
              <span className="text-2xl">🤖</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0D3D34] mb-2">AI Copilot</h2>
            <p className="text-[#0D3D34]/50 text-sm text-center max-w-xs mb-8">
              Asistent pro živý hovor. Ptejte se na produkty, ceníky, retenci nebo postupy.
            </p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
              {STARTERS.map((s) => (
                <button key={s.label} onClick={() => send(s.prompt)}
                  className="flex items-start gap-3 text-left bg-white border border-[#D1DFD8] rounded-xl px-4 py-3.5 hover:border-[#0D3D34]/30 hover:bg-[#F7FAF9] transition-all"
                >
                  <span className="text-lg flex-shrink-0">{s.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-[#0D3D34]">{s.label}</div>
                    <div className="text-[10px] text-[#0D3D34]/40 mt-0.5 leading-snug line-clamp-2">{s.prompt}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Conversation */
          <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-[#0D3D34] flex items-center justify-center text-[10px] text-[#D7FF00] font-bold flex-shrink-0 mt-1">AI</div>
                )}
                <div className={`max-w-lg rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[#0D3D34] text-white rounded-tr-sm"
                    : "bg-[#F4F7F6] border border-[#D1DFD8] text-[#0D3D34] rounded-tl-sm"
                }`}>
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-[#D7FF00] flex items-center justify-center text-[10px] text-[#0D3D34] font-bold flex-shrink-0 mt-1">PV</div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-xl bg-[#0D3D34] flex items-center justify-center text-[10px] text-[#D7FF00] font-bold flex-shrink-0">AI</div>
                <div className="bg-[#F4F7F6] border border-[#D1DFD8] rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 bg-[#0D3D34]/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-[#D1DFD8] bg-white px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={e => { e.preventDefault(); send(input); }} className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Napište dotaz nebo situaci z hovoru..."
              className="w-full px-5 py-3.5 pr-14 bg-[#F4F7F6] border border-[#D1DFD8] rounded-2xl text-sm text-[#0D3D34] focus:outline-none focus:border-[#0D3D34]/40 focus:bg-white transition-all placeholder:text-[#0D3D34]/30"
            />
            <button type="submit" disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0D3D34] text-[#D7FF00] rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-opacity"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
          {!isEmpty && (
            <button onClick={() => setMessages([])} className="text-[10px] text-[#0D3D34]/30 mt-2 hover:text-[#0D3D34]/60 transition-colors mx-auto block">
              Nový chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
