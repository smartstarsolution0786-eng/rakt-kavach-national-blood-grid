import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Wifi, Shield, Globe, Database, Activity, Radio,
  Zap, Network, MapPin, Bell, Mic, Camera, Users, Layers,
  AlertTriangle, CheckCircle2, ChevronRight, Server, GitBranch, 
  Cpu, Volume2
} from "lucide-react";
import { Link } from "wouter";

type ModuleStatus = "live" | "standby" | "prototype";

interface ModuleCardProps {
  num: number;
  title: string;
  tech: string;
  status: ModuleStatus;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}

function ModuleCard({ num, title, tech, status, icon, color, children }: ModuleCardProps) {
  const statusStyle = {
    live: { color: "#22c55e", label: "● LIVE", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)" },
    standby: { color: "#f59e0b", label: "◎ STANDBY", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
    prototype: { color: "#00D2FF", label: "◈ PROTOTYPE", bg: "rgba(0,210,255,0.1)", border: "rgba(0,210,255,0.25)" },
  }[status];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${color}20`, background: "rgba(2,6,19,0.85)" }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: `${color}08`, borderBottom: `1px solid ${color}15` }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>{icon}</div>
          <div>
            <div className="text-[8px] font-black tracking-widest" style={{ color: `${color}80` }}>MODULE {num}</div>
            <div className="text-xs font-black text-white">{title}</div>
          </div>
        </div>
        <span className="text-[8px] font-black px-2 py-1 rounded" style={{ background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}` }}>{statusStyle.label}</span>
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        <div className="text-[8px] font-mono" style={{ color: `${color}60` }}>{tech}</div>
        {children}
      </div>
    </div>
  );
}

// ... यहाँ से अपने बाकी के फंक्शंस (LiveRow, WebhookFeed, etc.) पहले जैसे ही रहने दें ...

const GROUPS = [
  {
    title: "GROUP A — GOVERNMENT API INTEGRATION",
    color: "#00D2FF",
    modules: [
      { num: 86, title: "e-RaktKosh Live Sync Hub", tech: "Govt e-RaktKosh REST API", icon: <Database className="w-4 h-4" />, color: "#22c55e", status: "prototype" as ModuleStatus, content: <div /> },
      { num: 87, title: "ABHA Health ID Digital Gateway", tech: "ABDM M1/M2/M3 National API Bridges", icon: <Shield className="w-4 h-4" />, color: "#00D2FF", status: "prototype" as ModuleStatus, content: <div /> },
      // ... आप अपने बाकी के 88-100 मॉड्यूल इसी फॉर्मेट में यहाँ डाल सकते हैं
    ]
  },
  // यहाँ अपने अन्य ग्रुप्स डालें
];

export default function AdvancedModulesPage() {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "linear-gradient(180deg,#020613 0%,#030812 100%)" }}>
      {/* Header code */}
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between" style={{ background: "rgba(2,6,19,0.97)", borderBottom: "1px solid rgba(0,210,255,0.12)" }}>
        <Link href="/authority" style={{ color: "rgba(255,255,255,0.5)" }}><ArrowLeft className="w-5 h-5" /></Link>
        <div className="text-center">
          <div className="text-xs font-black tracking-widest text-white">ADVANCED MODULES</div>
          <div className="text-[8px] tracking-wider" style={{ color: "rgba(0,210,255,0.5)" }}>1–100 · LIFESAVING TOOLKIT</div>
        </div>
        <div className="flex items-center gap-1 text-[8px] font-bold" style={{ color: "#22c55e" }}><Activity className="w-3 h-3" /> 100 MODULES</div>
      </div>

      {/* Group Tabs */}
      <div className="flex overflow-x-auto px-4 py-2 gap-2 border-b border-white/5">
        {GROUPS.map((g, i) => (
          <button key={i} onClick={() => setActiveGroup(i)} className="shrink-0 text-[8px] font-black px-3 py-1.5 rounded-full"
            style={{ background: activeGroup === i ? `${g.color}18` : "rgba(255,255,255,0.04)", border: `1px solid ${activeGroup === i ? g.color + "40" : "rgba(255,255,255,0.08)"}`, color: activeGroup === i ? g.color : "rgba(255,255,255,0.4)" }}>
            {g.title.split("—")[0].trim()}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-10 flex flex-col gap-4 pt-4">
        <AnimatePresence mode="wait">
          <motion.div key={activeGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
            {GROUPS[activeGroup].modules.map(mod => (
              <ModuleCard key={mod.num} {...mod} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
