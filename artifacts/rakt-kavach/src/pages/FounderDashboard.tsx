import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown, Shield, Globe, TriangleAlert, CheckCircle2, XCircle,
  Terminal, Bell, RefreshCw, Eye, EyeOff, Zap, Lock,
  Building2, FlaskConical, Stethoscope, Flag, ChevronDown, ChevronUp,
  Activity, Network, Database, Fingerprint, AlertOctagon, Menu
} from "lucide-react";
import { Link } from "wouter";

const GOLD = "#F4C430";
const GOLD_DIM = "rgba(244,196,48,0.7)";
const GOLD_BORDER = "rgba(244,196,48,0.25)";
const GOLD_BG = "rgba(244,196,48,0.06)";
const DARK_CARD = "rgba(18,12,2,0.85)";

const founderCard = {
  background: DARK_CARD,
  border: `1px solid ${GOLD_BORDER}`,
  boxShadow: `0 0 20px rgba(244,196,48,0.04), 0 4px 24px rgba(0,0,0,0.7)`,
  borderRadius: "12px",
};

const pendingNodes = [
  { id: "NODE-2891", name: "Sunrise Hospital", type: "Hospital", district: "Lucknow, UP", submitted: "2h ago", risk: "low" },
  { id: "NODE-2892", name: "BioLab Diagnostics", type: "Lab", district: "Patna, Bihar", submitted: "5h ago", risk: "medium" },
  { id: "NODE-2893", name: "CityMed Clinic", type: "Clinic", district: "Jaipur, Raj", submitted: "8h ago", risk: "low" },
  { id: "NODE-2894", name: "Apex Blood Center", type: "Hospital", district: "Surat, GJ", submitted: "12h ago", risk: "high" },
  { id: "NODE-2895", name: "PrimeCare Labs", type: "Lab", district: "Bhopal, MP", submitted: "1d ago", risk: "low" },
];

const whoDirectives = [
  { id: "WHO-DX-001", title: "Universal Donor Eligibility Protocol", scope: "Global", active: true },
  { id: "WHO-DX-002", title: "Blood Safety Emergency Framework (BSEF)", scope: "South Asia", active: true },
  { id: "WHO-DX-003", title: "Cross-border Blood Shipment Clearance", scope: "SAARC", active: false },
  { id: "WHO-DX-004", title: "Pathogen Reduction Technology Mandate", scope: "Global", active: false },
];

const LOG_LINES = [
  "[SYS] ✔ Blockchain node handshake: AIIMS-DELHI ↔ RKTK-GRID-001 — 4ms",
  "[AUTH] Aadhaar profile sync triggered: UID-XXXX-XXXX-7823 → DON-84920",
  "[GRID] Emergency request routed: KOL-HOSP-04 → nearest O- depot (ETA 12min)",
  "[INTEGRITY] Hash verified: Block #1,84,291 — SHA256: a3f9...c812 ✔",
  "[AUTH] Biometric challenge accepted: Lab NODE-2891 — fingerprint 99.7% match",
  "[SYS] State sync: Uttar Pradesh → 2,154 hospitals ONLINE",
  "[WHO] Directive WHO-DX-002 broadcast received — acknowledged",
  "[GRID] Blood unit UUID: RKT-O+-20250601-0082 issued to Apollo Delhi",
  "[INTEGRITY] DPDP audit log flushed — 0 violations — 11:47:03 AM",
  "[AUTH] Aadhaar profile sync triggered: UID-XXXX-XXXX-3312 → DON-91104",
  "[SYS] ✔ Node heartbeat: SRL-DIAG-NOIDA — latency 8ms",
  "[GRID] Inventory alert: B- critical at 4 nodes — auto-reroute initiated",
  "[INTEGRITY] Hash verified: Block #1,84,292 — SHA256: b7c1...f044 ✔",
  "[WHO] Directive WHO-DX-001 compliance check: PASSED — 12,847 nodes",
  "[AUTH] Super Admin session token refreshed — TTL: 8h",
  "[SYS] ✔ Blockchain node handshake: PGI-CHANDIGARH ↔ RKTK-GRID-018 — 6ms",
  "[GRID] New donor registration: RKTK-7Y2P-8G1F — O+ — Pune, MH",
  "[INTEGRITY] Real-time scan: 0 anomalies detected across 8,742 nodes",
  "[AUTH] WHO observer token validated: WHO-OBS-IN-007",
  "[SYS] Daily digest compiled — dispatching to Ministry of Health API",
];

function TerminalLine({ line, delay }: { line: string; delay: number }) {
  const color = line.startsWith("[SYS]") ? "#00D2FF"
    : line.startsWith("[AUTH]") ? GOLD
    : line.startsWith("[INTEGRITY]") ? "#22c55e"
    : line.startsWith("[WHO]") ? "#c084fc"
    : "rgba(255,255,255,0.55)";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="text-[10px] font-mono leading-relaxed whitespace-nowrap"
      style={{ color }}
    >
      {line}
    </motion.div>
  );
}

export default function FounderDashboard() {
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, "pending" | "approved" | "revoked">>(
    Object.fromEntries(pendingNodes.map(n => [n.id, "pending"]))
  );
  const [whoToggles, setWhoToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(whoDirectives.map(d => [d.id, d.active]))
  );
  const [terminalLines, setTerminalLines] = useState<string[]>(LOG_LINES.slice(0, 6));
  const [logPaused, setLogPaused] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("nodes");
  const termRef = useRef<HTMLDivElement>(null);
  const lineIdx = useRef(6);

  useEffect(() => {
    if (logPaused) return;
    const interval = setInterval(() => {
      const next = LOG_LINES[lineIdx.current % LOG_LINES.length];
      lineIdx.current++;
      setTerminalLines(prev => [...prev.slice(-18), next]);
      setTimeout(() => {
        termRef.current?.scrollTo({ top: termRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
    }, 1800);
    return () => clearInterval(interval);
  }, [logPaused]);

  const handleNode = (id: string, action: "approved" | "revoked") => {
    setNodeStatuses(prev => ({ ...prev, [id]: action }));
  };

  const toggleWho = (id: string) => {
    setWhoToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const pendingCount = Object.values(nodeStatuses).filter(s => s === "pending").length;
  const approvedCount = Object.values(nodeStatuses).filter(s => s === "approved").length;

  const Section = ({ id, title, icon, children }: { id: string; title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div style={founderCard}>
      <button
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        className="w-full flex items-center justify-between p-4 cursor-pointer"
        data-testid={`section-toggle-${id}`}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: GOLD }}>{icon}</span>
          <span className="text-sm font-black text-white tracking-wide uppercase">{title}</span>
        </div>
        <span style={{ color: GOLD_DIM }}>
          {expandedSection === id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {expandedSection === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "linear-gradient(180deg, #020613 0%, #0a0800 60%, #071126 100%)", backgroundAttachment: "fixed" }}>

      {/* Supreme Header */}
      <div className="sticky top-0 z-30 w-full" style={{ background: "rgba(10,8,0,0.97)", borderBottom: `1px solid ${GOLD_BORDER}`, backdropFilter: "blur(16px)" }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button className="cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4" style={{ color: GOLD, filter: `drop-shadow(0 0 6px ${GOLD})` }} />
              <span className="font-black text-sm tracking-widest" style={{ color: GOLD }}>SUPER ADMIN</span>
              <Crown className="w-4 h-4" style={{ color: GOLD, filter: `drop-shadow(0 0 6px ${GOLD})` }} />
            </div>
            <span className="text-[9px] tracking-widest font-bold" style={{ color: "rgba(244,196,48,0.5)" }}>RAKT KAVACH — FOUNDER CONTROL PANEL</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5" style={{ color: "rgba(255,255,255,0.5)" }} />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center" style={{ background: GOLD, color: "#000" }}>{pendingCount}</span>
              )}
            </div>
          </div>
        </div>

        {/* Gold bar */}
        <div className="h-[1px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto pb-10 px-4 pt-4 flex flex-col gap-4 max-w-3xl mx-auto w-full"
      >
        {/* Authority Banner */}
        <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: `linear-gradient(135deg, rgba(244,196,48,0.12) 0%, rgba(10,8,0,0.95) 100%)`, border: `1px solid ${GOLD_BORDER}`, boxShadow: `0 0 30px rgba(244,196,48,0.08)` }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: GOLD_BG, border: `2px solid ${GOLD_BORDER}`, boxShadow: `0 0 20px rgba(244,196,48,0.2)` }}>
            <Crown className="w-6 h-6" style={{ color: GOLD }} />
          </div>
          <div className="flex-1">
            <div className="text-xs font-black text-white tracking-wider">SUPREME AUTHORITY NODE</div>
            <div className="text-[10px] mt-0.5" style={{ color: GOLD_DIM }}>Operates above National, State, District, Village, Lab, Clinic &amp; WHO nodes</div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-center gap-1.5 text-[9px] font-bold" style={{ color: "#22c55e" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              SECURE SESSION
            </div>
            <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>ID: FNDX-0001</div>
          </div>
        </div>

        {/* Top-level Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Grid Nodes", val: "12,847", icon: <Network className="w-4 h-4" />, color: "#00D2FF" },
            { label: "Pending Verifications", val: String(pendingCount), icon: <AlertOctagon className="w-4 h-4" />, color: GOLD },
            { label: "Approved Today", val: String(approvedCount), icon: <CheckCircle2 className="w-4 h-4" />, color: "#22c55e" },
            { label: "WHO Directives Active", val: String(Object.values(whoToggles).filter(Boolean).length), icon: <Globe className="w-4 h-4" />, color: "#c084fc" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 flex flex-col gap-2" style={founderCard}>
              <div className="flex items-center justify-between text-[9px] font-bold tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                {s.label}
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* SECTION 1: Pending Node Verifications */}
        <Section id="nodes" title="Pending Node Verifications" icon={<Shield className="w-4 h-4" />}>
          <div className="flex flex-col gap-2">
            {pendingNodes.map(node => {
              const status = nodeStatuses[node.id];
              const TypeIcon = node.type === "Hospital" ? Building2 : node.type === "Lab" ? FlaskConical : Stethoscope;
              return (
                <div key={node.id} className="rounded-lg p-3 flex items-center gap-3" style={{ background: "rgba(244,196,48,0.03)", border: `1px solid ${status === "pending" ? GOLD_BORDER : status === "approved" ? "rgba(34,197,94,0.25)" : "rgba(255,30,39,0.25)"}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
                    <TypeIcon className="w-4 h-4" style={{ color: GOLD }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-white">{node.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: GOLD_BG, color: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}>{node.type}</span>
                      {node.risk === "high" && <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(255,30,39,0.1)", color: "#FF1E27", border: "1px solid rgba(255,30,39,0.25)" }}>⚠ HIGH RISK</span>}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{node.id} · {node.district} · {node.submitted}</div>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    {status === "pending" ? (
                      <>
                        <button data-testid={`approve-${node.id}`} onClick={() => handleNode(node.id, "approved")}
                          className="text-[9px] font-black px-3 py-1.5 rounded cursor-pointer transition-all hover:opacity-90"
                          style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)", color: "#22c55e" }}>
                          ✔ APPROVE
                        </button>
                        <button data-testid={`revoke-${node.id}`} onClick={() => handleNode(node.id, "revoked")}
                          className="text-[9px] font-black px-3 py-1.5 rounded cursor-pointer transition-all hover:opacity-90"
                          style={{ background: "rgba(255,30,39,0.1)", border: "1px solid rgba(255,30,39,0.35)", color: "#FF1E27" }}>
                          ✕ REVOKE
                        </button>
                      </>
                    ) : (
                      <div className="text-[10px] font-black px-3 py-1.5 rounded text-center" style={{
                        background: status === "approved" ? "rgba(34,197,94,0.12)" : "rgba(255,30,39,0.1)",
                        border: `1px solid ${status === "approved" ? "rgba(34,197,94,0.3)" : "rgba(255,30,39,0.3)"}`,
                        color: status === "approved" ? "#22c55e" : "#FF1E27"
                      }}>
                        {status === "approved" ? "✔ APPROVED" : "✕ REVOKED"}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* SECTION 2: Live Network Terminal */}
        <Section id="terminal" title="Network Audit Terminal" icon={<Terminal className="w-4 h-4" />}>
          <div className="rounded-lg overflow-hidden" style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(244,196,48,0.15)" }}>
            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: "rgba(244,196,48,0.1)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: "#FF1E27" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
                <span className="text-[10px] font-mono ml-2" style={{ color: GOLD_DIM }}>rktk-audit-log — LIVE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[9px] font-bold" style={{ color: "#22c55e" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  STREAMING
                </div>
                <button data-testid="button-toggle-log" onClick={() => setLogPaused(p => !p)}
                  className="flex items-center gap-1 text-[9px] font-bold cursor-pointer transition-opacity hover:opacity-70"
                  style={{ color: GOLD_DIM }}>
                  {logPaused ? <><RefreshCw className="w-3 h-3" /> RESUME</> : <><Eye className="w-3 h-3" /> PAUSE</>}
                </button>
              </div>
            </div>

            {/* Terminal output */}
            <div ref={termRef} className="h-48 overflow-y-auto px-3 py-2 flex flex-col gap-0.5" style={{ scrollbarWidth: "none" }}>
              <div className="text-[10px] font-mono mb-1" style={{ color: GOLD_DIM }}>
                RAKT KAVACH GRID v1.0.0 — Founder Session Active — {new Date().toLocaleTimeString()}
              </div>
              {terminalLines.map((line, i) => (
                <TerminalLine key={`${i}-${line.slice(0, 20)}`} line={line} delay={0} />
              ))}
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] font-mono" style={{ color: GOLD }}>root@rktk-grid:~$</span>
                <span className="w-2 h-3 bg-white/60 animate-pulse inline-block" />
              </div>
            </div>
          </div>

          {/* Integrity summary */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: "Blocks Verified", val: "1,84,292", color: "#22c55e" },
              { label: "Aadhaar Syncs", val: "2,847", color: GOLD },
              { label: "Anomalies", val: "0", color: "#22c55e" },
            ].map(s => (
              <div key={s.label} className="text-center py-2 rounded-lg" style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${GOLD_BORDER}` }}>
                <div className="text-base font-black" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[8px] font-bold tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* SECTION 3: WHO Node Supervision */}
        <Section id="who" title="WHO Node Supervision" icon={<Globe className="w-4 h-4" />}>
          <div className="flex flex-col gap-2 mb-4">
            {whoDirectives.map(d => (
              <div key={d.id} className="rounded-lg p-3 flex items-center gap-3" style={{ background: "rgba(192,132,252,0.04)", border: `1px solid ${whoToggles[d.id] ? "rgba(192,132,252,0.3)" : "rgba(255,255,255,0.08)"}` }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Flag className="w-3 h-3 shrink-0" style={{ color: "#c084fc" }} />
                    <span className="text-xs font-black text-white">{d.title}</span>
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{d.id} · Scope: {d.scope}</div>
                </div>
                {/* Toggle */}
                <button data-testid={`who-toggle-${d.id}`} onClick={() => toggleWho(d.id)}
                  className="relative w-10 h-5 rounded-full transition-all duration-300 shrink-0 cursor-pointer"
                  style={{ background: whoToggles[d.id] ? "rgba(192,132,252,0.4)" : "rgba(255,255,255,0.1)", border: `1px solid ${whoToggles[d.id] ? "rgba(192,132,252,0.6)" : "rgba(255,255,255,0.15)"}` }}>
                  <div className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300"
                    style={{ left: whoToggles[d.id] ? "calc(100% - 18px)" : "2px", background: whoToggles[d.id] ? "#c084fc" : "rgba(255,255,255,0.3)", boxShadow: whoToggles[d.id] ? "0 0 8px rgba(192,132,252,0.6)" : "none" }} />
                </button>
              </div>
            ))}
          </div>

          {/* WHO broadcast box */}
          <div className="rounded-lg p-3" style={{ background: "rgba(192,132,252,0.05)", border: "1px solid rgba(192,132,252,0.2)" }}>
            <div className="text-[9px] font-bold tracking-widest mb-2" style={{ color: "#c084fc" }}>BROADCAST WHO DIRECTIVE</div>
            <textarea
              data-testid="input-who-broadcast"
              placeholder="Enter global health directive message..."
              rows={2}
              className="w-full bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none resize-none font-mono"
            />
            <div className="flex justify-end mt-2">
              <button data-testid="button-who-broadcast"
                className="text-[10px] font-black px-4 py-1.5 rounded cursor-pointer transition-opacity hover:opacity-90"
                style={{ background: "rgba(192,132,252,0.2)", border: "1px solid rgba(192,132,252,0.4)", color: "#c084fc" }}>
                <Zap className="w-3 h-3 inline mr-1" /> BROADCAST →
              </button>
            </div>
          </div>
        </Section>

        {/* SECTION 4: Hierarchy Map */}
        <Section id="hierarchy" title="Authority Hierarchy" icon={<Activity className="w-4 h-4" />}>
          <div className="flex flex-col items-center gap-0">
            {[
              { level: "FOUNDER / SUPER ADMIN", color: GOLD, glow: GOLD, note: "FNDX-0001 · You" },
              { level: "NATIONAL AUTHORITY", color: "#c084fc", glow: "#c084fc", note: "Ministry of Health" },
              { level: "WHO NODE SUPERVISORS", color: "#00D2FF", glow: "#00D2FF", note: "4 Active Directives" },
              { level: "STATE COMMAND CENTERS", color: "#00D2FF", glow: "#00D2FF", note: "28 States + 8 UTs" },
              { level: "DISTRICT NODES", color: "rgba(0,210,255,0.7)", glow: "#00D2FF", note: "742 Districts" },
              { level: "HOSPITALS / LABS / CLINICS", color: "rgba(255,255,255,0.7)", glow: "transparent", note: "12,847 Active Nodes" },
              { level: "VILLAGE / PHC NODES", color: "rgba(255,255,255,0.4)", glow: "transparent", note: "Coming Soon" },
            ].map((row, i) => (
              <div key={row.level} className="flex flex-col items-center w-full">
                <div className="rounded-lg px-4 py-2 w-full text-center" style={{ background: i === 0 ? GOLD_BG : "rgba(5,15,35,0.6)", border: `1px solid ${i === 0 ? GOLD_BORDER : "rgba(255,255,255,0.06)"}`, boxShadow: i === 0 ? `0 0 12px rgba(244,196,48,0.1)` : "none" }}>
                  <div className="text-[11px] font-black tracking-wide" style={{ color: row.color }}>{row.level}</div>
                  <div className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{row.note}</div>
                </div>
                {i < 6 && <div className="w-0.5 h-3" style={{ background: `linear-gradient(${i === 0 ? GOLD : "#00D2FF"}, rgba(255,255,255,0.1))` }} />}
              </div>
            ))}
          </div>
        </Section>

        {/* Back link */}
        <div className="flex justify-center pt-2 pb-4">
          <Link href="/" className="text-[10px] tracking-wider cursor-pointer transition-colors hover:text-white flex items-center gap-1.5" style={{ color: "rgba(244,196,48,0.4)" }}>
            <Lock className="w-3 h-3" />
            EXIT FOUNDER SESSION → Gateway
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
