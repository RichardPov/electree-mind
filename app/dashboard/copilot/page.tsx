"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK = [
  "Jaký je rozdíl HOME FIX 12 vs FIX 24?",
  "Zákazník má FVE – který výkupní produkt doporučit?",
  "Zákazník chce zrušit smlouvu – co dělám?",
  "Kolik stojí plyn HOME FIX 24?",
  "Zákazník se sťažuje na vysoký účet",
  "Zákazník chce SPOT elektřinu – kdy doporučit?",
];

const HINTS = [
  { keyword: ["fve", "výkup", "fotovolt", "solar"], text: "💡 FVE výkup – ptejte se na výkon (kWp) a zda má baterii. Do 10 MWh → FIX (500 Kč/MWh), nad 10 MWh → FIX MAXI (400 Kč/MWh)." },
  { keyword: ["drahé", "účet", "vysoký", "platím moc"], text: "💡 Vysoký účet – ověřte, zda je zákazník na SPOTu. Při zimních špičkách může být burza 2–3× dražší než FIX." },
  { keyword: ["konkurenc", "odchod", "zrušit", "výpověď"], text: "💡 Retence – nejprve nechte zákazníka mluvit. Do 14 dnů od podpisu u jiné firmy může zákazník od nové smlouvy odstoupit." },
  { keyword: ["spot", "burz", "hodinov"], text: "💡 SPOT – vhodný pro zákazníky s flexibilní spotřebou (nabíjení v noci, pračka přes den). Vyžaduje smart meter AMM." },
  { keyword: ["plyn", "gas"], text: "💡 Plyn – HOME FIX 24: 1 571,79 Kč/MWh s DPH. Zálohy vždy nastavit na zimní spotřebu!" },
  { keyword: ["fix 24", "fix24", "doporučit", "jaký tarif"], text: "💡 Pro většinu zákazníků – HOME FIX 24: 2 842,29 Kč/MWh, paušál 180,29 Kč/měs. Nejlepší poměr cena/jistota." },
];

function LiveHint({ text }: { text: string }) {
  const [callText, setCallText] = useState("");
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const handleInput = (val: string) => {
    setCallText(val);
    const lower = val.toLowerCase();
    const matched = HINTS.find((h) => h.keyword.some((k) => lower.includes(k)));
    setActiveHint(matched?.text ?? null);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${isListening ? "bg-red-500 animate-pulse" : "bg-[#D1DFD8]"}`} />
        <span className="text-xs text-[#0D3D34]/50">{isListening ? "Naslouchám hovoru..." : "Odposlech neaktivní"}</span>
        <button
          onClick={() => setIsListening(!isListening)}
          className={`ml-auto text-xs px-3 py-1 rounded-full font-semibold transition-all ${isListening ? "bg-red-100 text-red-700" : "bg-[#EBF7F1] text-[#0D3D34]"}`}
        >
          {isListening ? "Zastavit" : "Spustit odposlech"}
        </button>
      </div>

      <textarea
        value={callText}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="Sem opisujte nebo diktujte, co zákazník říká..."
        className="w-full h-28 px-4 py-3 bg-white border border-[#D1DFD8] rounded-xl text-sm text-[#0D3D34] resize-none focus:outline-none focus:border-[#0D3D34]/30 placeholder:text-[#0D3D34]/30"
      />

      {activeHint ? (
        <div className="bg-[#D7FF00] rounded-xl p-4">
          <p className="text-sm text-[#0D3D34] font-medium leading-relaxed">{activeHint}</p>
        </div>
      ) : (
        <div className="bg-[#EBF7F1] rounded-xl p-4 text-center">
          <p className="text-xs text-[#0D3D34]/40">Hint se zobrazí automaticky podle klíčových slov z hovoru</p>
        </div>
      )}

      <div className="text-[10px] text-[#0D3D34]/30 text-center">
        Klíčová slova: FVE, výkup, drahé, spot, plyn, konkurence, zrušit…
      </div>
    </div>
  );
}

export default function CopilotPage() {
  const [tab, setTab] = useState<"chat" | "hovor">("chat");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Dobrý den! Jsem váš AI copilot pro hovor. Zeptejte se mě na produkty, ceníky nebo postupy – odpovím rychle a stručně." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const history = messages.slice(-8).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Chyba připojení. Zkuste to znovu." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-8 pt-6 pb-4 border-b border-[#D1DFD8] bg-white flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0D3D34]">AI Copilot</h1>
          <p className="text-[#0D3D34]/50 text-xs mt-0.5">Produkty Tramaco Energy · reálná data z ceníků</p>
        </div>
        <div className="flex gap-1 bg-[#EBF7F1] p-1 rounded-xl">
          <button onClick={() => setTab("chat")} className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${tab === "chat" ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/50"}`}>
            💬 Chat asistent
          </button>
          <button onClick={() => setTab("hovor")} className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${tab === "hovor" ? "bg-white text-[#0D3D34] shadow-sm" : "text-[#0D3D34]/50"}`}>
            🎧 Odposlech hovoru
          </button>
        </div>
      </div>

      {tab === "chat" && (
        <div className="flex flex-1 overflow-hidden">
          {/* Chat */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div ref={containerRef} className="flex-1 overflow-y-auto px-8 py-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-[#0D3D34] flex items-center justify-center text-xs text-[#D7FF00] font-bold mr-2 flex-shrink-0 mt-1">AI</div>
                  )}
                  <div className={`max-w-lg rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#0D3D34] text-white rounded-tr-sm"
                      : "bg-white border border-[#D1DFD8] text-[#0D3D34] rounded-tl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-[#0D3D34] flex items-center justify-center text-xs text-[#D7FF00] font-bold mr-2 flex-shrink-0">AI</div>
                  <div className="bg-white border border-[#D1DFD8] rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => <div key={i} className="w-2 h-2 bg-[#0D3D34]/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-8 py-4 border-t border-[#D1DFD8] bg-white">
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Napište dotaz (produkty, ceník, postup...)"
                  className="flex-1 px-4 py-2.5 bg-[#EBF7F1] border border-[#D1DFD8] rounded-xl text-sm text-[#0D3D34] focus:outline-none focus:border-[#0D3D34]/30"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-[#0D3D34] text-[#D7FF00] px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity"
                >
                  Odeslat
                </button>
              </form>
            </div>
          </div>

          {/* Quick questions sidebar */}
          <div className="w-52 border-l border-[#D1DFD8] bg-[#F7FAF9] p-4 overflow-y-auto flex-shrink-0">
            <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-3">Rychlé dotazy</div>
            <div className="space-y-1.5">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="w-full text-left text-xs text-[#0D3D34]/70 bg-white border border-[#D1DFD8] rounded-lg px-3 py-2.5 hover:border-[#0D3D34]/30 hover:text-[#0D3D34] transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "hovor" && (
        <div className="flex-1 p-8 max-w-2xl mx-auto w-full">
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
              <h2 className="font-bold text-[#0D3D34]">Odposlech živého hovoru</h2>
              <p className="text-xs text-[#0D3D34]/50 mt-0.5">Opisujte, co zákazník říká – hint se zobrazí automaticky</p>
            </div>
            <div className="p-6">
              <LiveHint text="" />
            </div>
          </div>

          <div className="mt-4 bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-4">
            <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-2">Jak to funguje?</div>
            <div className="space-y-2 text-xs text-[#0D3D34]/65">
              <p>1. Opisujte nebo diktujte klíčová slova z hovoru do textového pole</p>
              <p>2. Systém automaticky detekuje téma a zobrazí relevantní hint</p>
              <p>3. S Claude API se hint generuje v reálném čase ze znalostní báze</p>
              <p>4. V plné verzi: přímý odposlech přes WebRTC + hlasová transkripce</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
