"use client";
import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";

type Cert = {
  id: string;
  title: string;
  desc: string;
  progress: number;
  total: number;
  done: number;
  badge: string;
  color: string;
  status: "done" | "active" | "locked";
  skills: string[];
  exam?: { questions: { q: string; options: string[]; correct: number }[] };
};

const CERTS: Cert[] = [
  {
    id: "produktovy-specialista",
    title: "Produktový specialista",
    desc: "Zvládnutí celého portfolia Tramaco Energy – elektřina, plyn, FVE výkup.",
    progress: 100,
    total: 3,
    done: 3,
    badge: "🏅",
    color: "#D7FF00",
    status: "done",
    skills: ["HOME FIX ceníky", "EXPERT FIX portfolio", "Plyn HOME FIX", "FVE výkupní produkty"],
    exam: {
      questions: [
        {
          q: "Jaká je cena HOME FIX 24 s DPH za MWh?",
          options: ["2 549,00 Kč", "2 842,29 Kč", "3 084,29 Kč", "2 963,29 Kč"],
          correct: 1,
        },
        {
          q: "Který produkt má nejdelší fixaci v elektřině?",
          options: ["HOME FIX 12", "HOME FIX 24", "HOME FIX 36", "EXPERT FIX 24"],
          correct: 2,
        },
        {
          q: "Minimální výkon FVE pro Home Solar FIX MAXI?",
          options: ["Do 5 MWh", "Do 10 MWh", "Nad 10 MWh", "Nad 50 MWh"],
          correct: 2,
        },
      ],
    },
  },
  {
    id: "retencni-expert",
    title: "Retenční expert",
    desc: "Zákaznická retence, řešení námitek a zvládání stížností.",
    progress: 68,
    total: 5,
    done: 3,
    badge: "🛡️",
    color: "#EBF7F1",
    status: "active",
    skills: ["Aktivní naslouchání", "Námitka na cenu", "Námitka na konkurenci", "Zákon o zákaznících"],
    exam: {
      questions: [
        {
          q: "Zákazník říká, že dostal lepší nabídku od konkurence. Co uděláte jako první?",
          options: ["Okamžitě nabídnete slevu", "Nechte ho mluvit a zjistěte detaily nabídky", "Vysvětlíte výhody Tramaco", "Eskalujete na vedoucího"],
          correct: 1,
        },
        {
          q: "Do kolika dnů od podpisu u jiné firmy může zákazník odstoupit?",
          options: ["7 dní", "14 dní", "30 dní", "Nelze odstoupit"],
          correct: 1,
        },
        {
          q: "Zákazník se stěžuje na vysoký účet – první krok?",
          options: ["Nabídnout kompenzaci", "Ověřit, zda je na SPOT tarifu", "Přepojit na techniku", "Zpochybnit stížnost"],
          correct: 1,
        },
      ],
    },
  },
  {
    id: "fve-specialista",
    title: "FVE & Výkup specialista",
    desc: "Fotovoltaika, výkupní smlouvy, správa výrobny v EIS.",
    progress: 40,
    total: 4,
    done: 2,
    badge: "☀️",
    color: "#EBF7F1",
    status: "active",
    skills: ["Výkupní produkty", "Přepis výrobny EIS", "Smlouva na výkup", "Výpočet výnosů"],
    exam: {
      questions: [
        {
          q: "Jaký je výkupní tarif Home Solar FIX (standard)?",
          options: ["1 000 Kč/MWh", "500 Kč/MWh", "400 Kč/MWh", "300 Kč/MWh"],
          correct: 1,
        },
        {
          q: "Co je potřeba pro uzavření výkupní smlouvy?",
          options: ["Jen EAN kód", "EAN + EIC + výkon FVE + doklad vlastnictví", "Jen rodné číslo", "Kopie faktury od předchozího dodavatele"],
          correct: 1,
        },
      ],
    },
  },
  {
    id: "crm-expert",
    title: "CRM & EIS expert",
    desc: "Plná znalost systému EIS – zakládání zákazníků, změny, přepisy.",
    progress: 0,
    total: 4,
    done: 0,
    badge: "💻",
    color: "#EBF7F1",
    status: "locked",
    skills: ["Založení zákazníka", "Přepis výrobny", "Změna ceníku", "Smlouvy v EIS"],
    exam: { questions: [] },
  },
];

const TEAM = [
  { name: "Petra Vlčková", certs: 2, score: 2190, initials: "PV", active: true },
  { name: "Martin Novák", certs: 3, score: 3120, initials: "MN" },
  { name: "Jana Horáčková", certs: 2, score: 1980, initials: "JH" },
  { name: "Lukáš Dvořák", certs: 1, score: 1450, initials: "LD" },
  { name: "Eva Procházková", certs: 4, score: 4800, initials: "EP" },
];

type ExamState = { certId: string; idx: number; selected: number | null; results: (boolean | null)[] };

export default function CertifikacePage() {
  const [selected, setSelected] = useState<Cert | null>(null);
  const [exam, setExam] = useState<ExamState | null>(null);
  const [examDone, setExamDone] = useState(false);
  const { progress, saveCert } = useProgress();

  const startExam = (cert: Cert) => {
    if (!cert.exam || cert.exam.questions.length === 0) return;
    setExam({ certId: cert.id, idx: 0, selected: null, results: new Array(cert.exam.questions.length).fill(null) });
    setExamDone(false);
  };

  const answerQuestion = (optIdx: number) => {
    if (!exam || exam.selected !== null) return;
    const cert = CERTS.find((c) => c.id === exam.certId)!;
    const correct = cert.exam!.questions[exam.idx].correct === optIdx;
    const newResults = [...exam.results];
    newResults[exam.idx] = correct;
    setExam({ ...exam, selected: optIdx, results: newResults });
  };

  const nextQuestion = () => {
    if (!exam) return;
    const cert = CERTS.find((c) => c.id === exam.certId)!;
    if (exam.idx + 1 >= cert.exam!.questions.length) {
      const sc = exam.results.filter(Boolean).length;
      const tot = cert.exam!.questions.length;
      saveCert(exam.certId, sc / tot >= 0.67, sc);
      setExamDone(true);
    } else {
      setExam({ ...exam, idx: exam.idx + 1, selected: null });
    }
  };

  const score = exam ? exam.results.filter(Boolean).length : 0;
  const total = exam && selected ? selected.exam!.questions.length : 0;
  const passed = total > 0 && score / total >= 0.67;

  const getCertStatus = (cert: Cert): "done" | "active" | "locked" => {
    const result = progress.certResults[cert.id];
    if (result?.passed) return "done";
    return cert.status === "locked" ? "locked" : "active";
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Certifikace</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Získejte odborné certifikáty a prokažte svoji expertízu</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cert cards */}
        <div className="lg:col-span-2 space-y-4">
          {CERTS.map((cert) => (
            <div
              key={cert.id}
              onClick={() => { setSelected(cert); setExam(null); setExamDone(false); }}
              className={`bg-white border rounded-2xl p-5 cursor-pointer transition-all ${selected?.id === cert.id ? "border-[#0D3D34] shadow-md" : "border-[#D1DFD8] hover:border-[#0D3D34]/30"}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: cert.color }}>
                  {cert.badge}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-[#0D3D34]">{cert.title}</h3>
                    {getCertStatus(cert) === "done" && <span className="text-[10px] font-bold bg-[#D7FF00] text-[#0D3D34] px-2 py-0.5 rounded-full">ZÍSKÁNO ✓</span>}
                    {getCertStatus(cert) === "locked" && <span className="text-[10px] font-bold bg-[#D1DFD8] text-[#0D3D34]/50 px-2 py-0.5 rounded-full">UZAMČENO 🔒</span>}
                    {getCertStatus(cert) === "active" && <span className="text-[10px] font-bold bg-[#EBF7F1] text-[#1A6B5A] px-2 py-0.5 rounded-full">V PŘÍPRAVĚ</span>}
                  </div>
                  <p className="text-xs text-[#0D3D34]/50 mt-1">{cert.desc}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-[#0D3D34]/40 mb-1">
                      <span>Postup</span>
                      <span>{cert.done} / {cert.total} modulů</span>
                    </div>
                    <div className="h-1.5 bg-[#EBF7F1] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${cert.progress}%`, backgroundColor: cert.status === "done" ? "#D7FF00" : "#0D3D34" }} />
                    </div>
                  </div>
                </div>
                <div className="text-lg font-bold text-[#0D3D34] flex-shrink-0">{cert.progress}%</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Detail / exam panel */}
          {selected && !exam && !examDone && (
            <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 bg-[#EBF7F1] border-b border-[#D1DFD8]">
                <div className="text-lg">{selected.badge}</div>
                <h3 className="font-bold text-[#0D3D34] mt-1">{selected.title}</h3>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest mb-2">Co certifikát ověřuje</div>
                  <div className="space-y-1.5">
                    {selected.skills.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-xs text-[#0D3D34]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D7FF00] flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                {selected.status !== "locked" && selected.exam && selected.exam.questions.length > 0 && (
                  <button
                    onClick={() => startExam(selected)}
                    className="w-full bg-[#0D3D34] text-[#D7FF00] py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    {selected.status === "done" ? "Spustit znovu" : "Zahájit zkoušku"}
                  </button>
                )}
                {selected.status === "locked" && (
                  <div className="bg-[#EBF7F1] rounded-xl p-3 text-xs text-[#0D3D34]/60 text-center">
                    Dokončte předchozí certifikace pro odemčení
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Exam in progress */}
          {exam && !examDone && selected?.exam && (
            <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
              <div className="px-5 py-3 bg-[#0D3D34] flex items-center justify-between">
                <span className="text-xs font-bold text-[#D7FF00]">Zkouška – otázka {exam.idx + 1} / {selected.exam.questions.length}</span>
                <button onClick={() => { setExam(null); }} className="text-white/50 text-xs hover:text-white">Zrušit</button>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-[#0D3D34] leading-relaxed mb-4">{selected.exam.questions[exam.idx].q}</p>
                <div className="space-y-2">
                  {selected.exam.questions[exam.idx].options.map((opt, i) => {
                    let cls = "border border-[#D1DFD8] text-[#0D3D34] hover:border-[#0D3D34]/40";
                    if (exam.selected !== null) {
                      if (i === selected.exam!.questions[exam.idx].correct) cls = "border-2 border-[#1A6B5A] bg-[#EBF7F1] text-[#1A6B5A] font-semibold";
                      else if (i === exam.selected) cls = "border-2 border-red-400 bg-red-50 text-red-700";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => answerQuestion(i)}
                        disabled={exam.selected !== null}
                        className={`w-full text-left text-xs px-4 py-3 rounded-xl transition-all ${cls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {exam.selected !== null && (
                  <button
                    onClick={nextQuestion}
                    className="mt-4 w-full bg-[#0D3D34] text-[#D7FF00] py-2.5 rounded-xl text-sm font-bold hover:opacity-90"
                  >
                    {exam.idx + 1 < selected.exam.questions.length ? "Další otázka →" : "Zobrazit výsledek"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Exam result */}
          {examDone && (
            <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
              <div className={`px-5 py-4 ${passed ? "bg-[#D7FF00]" : "bg-red-50"}`}>
                <div className="text-2xl mb-1">{passed ? "🎉" : "😕"}</div>
                <h3 className="font-bold text-[#0D3D34]">{passed ? "Zkouška splněna!" : "Zkouška nesplněna"}</h3>
              </div>
              <div className="p-5 text-center">
                <div className="text-3xl font-black text-[#0D3D34] mb-1">{score} / {total}</div>
                <div className="text-xs text-[#0D3D34]/50 mb-4">{Math.round((score / total) * 100)}% správně (min. 67 %)</div>
                <button
                  onClick={() => { setExam(null); setExamDone(false); if (selected) startExam(selected); }}
                  className="w-full bg-[#0D3D34] text-[#D7FF00] py-2.5 rounded-xl text-sm font-bold hover:opacity-90"
                >
                  Zkusit znovu
                </button>
              </div>
            </div>
          )}

          {!selected && (
            <div className="bg-[#EBF7F1] border border-[#D1DFD8] rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🏅</div>
              <p className="text-xs text-[#0D3D34]/60">Vyberte certifikaci vlevo pro zobrazení detailů nebo zahájení zkoušky</p>
            </div>
          )}

          {/* Team overview */}
          <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D1DFD8]">
              <div className="text-[10px] font-bold text-[#0D3D34]/40 uppercase tracking-widest">Tým – certifikáty</div>
            </div>
            <div className="divide-y divide-[#D1DFD8]">
              {TEAM.sort((a, b) => b.certs - a.certs).map((m, i) => (
                <div key={m.name} className={`flex items-center gap-3 px-4 py-2.5 ${m.active ? "bg-[#EBF7F1]" : ""}`}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{ backgroundColor: m.active ? "#D7FF00" : "#EBF7F1", color: "#0D3D34" }}>
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#0D3D34] truncate">{m.name}{m.active ? " (vy)" : ""}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="w-4 h-4 rounded-sm flex items-center justify-center text-[9px]" style={{ backgroundColor: j < m.certs ? "#D7FF00" : "#EBF7F1" }}>
                        {j < m.certs ? "✓" : ""}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-[#0D3D34] flex-shrink-0">{m.certs}/4</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
