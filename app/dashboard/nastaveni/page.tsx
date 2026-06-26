"use client";
import { useState, useEffect } from "react";

type Role = "user" | "admin";
const ROLE_KEY = "electree-role";

const MOCK_USERS = [
  { id: "1", name: "Petra Vlčková", initials: "PV", email: "p.vlckova@electree.cz", role: "user" as Role },
  { id: "2", name: "Jan Novák", initials: "JN", email: "j.novak@electree.cz", role: "user" as Role },
  { id: "3", name: "Marie Horáková", initials: "MH", email: "m.horakova@electree.cz", role: "user" as Role },
  { id: "4", name: "Tomáš Dvořák", initials: "TD", email: "t.dvorak@electree.cz", role: "admin" as Role },
  { id: "5", name: "Lucie Procházková", initials: "LP", email: "l.prochazkova@electree.cz", role: "user" as Role },
  { id: "6", name: "Pavel Krejčí", initials: "PK", email: "p.krejci@electree.cz", role: "admin" as Role },
];

export default function NastaveniPage() {
  const [currentRole, setCurrentRole] = useState<Role>("user");
  const [users, setUsers] = useState(MOCK_USERS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const r = localStorage.getItem(ROLE_KEY) as Role | null;
    if (r) setCurrentRole(r);
  }, []);

  const switchMyRole = (r: Role) => {
    setCurrentRole(r);
    localStorage.setItem(ROLE_KEY, r);
    window.dispatchEvent(new Event("storage"));
  };

  const toggleUserRole = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D3D34]">Nastavení uživatelů</h1>
        <p className="text-[#0D3D34]/50 text-sm mt-1">Správa rolí a přístupu v demo prostředí</p>
      </div>

      {/* What each role sees */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#EBF7F1] border border-[#B8E8D0] rounded-2xl p-4">
          <div className="text-xs font-bold text-[#1A6B5A] uppercase tracking-widest mb-3">👤 Operátor vidí</div>
          <ul className="space-y-1.5 text-xs text-[#0D3D34]/70">
            {["Wiki & SOPs", "Akademie", "Simulace hovorů", "Testy", "Zlaté hovory", "Kalkulačka", "Konkurence", "Flashkarty"].map(item => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A6B5A] flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#0D3D34] rounded-2xl p-4">
          <div className="text-xs font-bold text-[#D7FF00] uppercase tracking-widest mb-3">🔧 Manažer vidí navíc</div>
          <ul className="space-y-1.5 text-xs text-white/70">
            {["Přehled (dashboard)", "AI Copilot", "Žebříček", "Call scripty", "Manažer", "Nastavení uživatelů"].map(item => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF00] flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User list */}
      <div className="bg-white border border-[#D1DFD8] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#D1DFD8] flex items-center justify-between">
          <div className="text-xs font-bold text-[#0D3D34]/40 uppercase tracking-widest">Uživatelé týmu</div>
          <button onClick={handleSave}
            className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all ${saved ? "bg-[#D7FF00] text-[#0D3D34]" : "bg-[#0D3D34] text-[#D7FF00] hover:opacity-90"}`}
          >
            {saved ? "✓ Uloženo" : "Uložit změny"}
          </button>
        </div>
        <div className="divide-y divide-[#D1DFD8]">
          {users.map(user => (
            <div key={user.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className="w-9 h-9 rounded-full bg-[#EBF7F1] flex items-center justify-center text-xs font-bold text-[#1A6B5A] flex-shrink-0">
                {user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#0D3D34]">{user.name}</div>
                <div className="text-xs text-[#0D3D34]/40">{user.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${user.role === "admin" ? "bg-[#0D3D34] text-[#D7FF00]" : "bg-[#EBF7F1] text-[#1A6B5A]"}`}>
                  {user.role === "admin" ? "Manažer" : "Operátor"}
                </span>
                <button onClick={() => toggleUserRole(user.id)}
                  className="text-xs text-[#0D3D34]/40 hover:text-[#0D3D34] px-2 py-1 rounded-lg hover:bg-[#EBF7F1] transition-all"
                >
                  Změnit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#0D3D34]/30 mt-4 text-center">
        Demo prostředí – změny rolí se ukládají lokálně v prohlížeči.
      </p>
    </div>
  );
}
