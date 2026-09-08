import { useMemo, useState } from "react";
import { CheckCircle2, Search, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { EmptyState, PortalHeader, PrivacyNote } from "@/components/ProductionState";

const groupNames = ["Donor management", "Hospital & blood bank", "Patient management", "National analytics", "Compliance & security", "Government integrations", "AI & communication"];
const moduleNames: Record<number, string> = {
  1: "Donor registration", 2: "Blood group verification", 3: "Donation history", 4: "Health screening", 5: "Digital donor card",
  6: "Eligibility checker", 7: "Donation scheduler", 8: "Donor location", 9: "Rewards", 10: "Emergency donor alerts",
  11: "Hospital blood bank", 12: "Inventory monitor", 13: "Cross-match requests", 14: "Expiry alerts", 15: "Lab results",
  16: "NABH compliance", 17: "Hospital network", 18: "Inter-hospital transfer", 19: "Component separation", 20: "Cold chain monitor",
  21: "Component requester", 22: "Emergency dispatch", 23: "Lab quality control", 24: "Hospital capacity", 25: "Wastage reports",
  26: "Patient blood request", 27: "Emergency escalation", 28: "Patient case manager", 29: "Impact ledger", 30: "Thalassemia registry",
  31: "Sickle cell care", 32: "Dialysis schedule", 33: "Cancer care reserve", 34: "Pregnancy emergency protocol", 35: "Paediatric registry",
  36: "Request priority queue", 37: "Surgical reserve", 38: "ICU availability", 39: "Patient consent", 40: "Medical report integration",
  41: "National inventory grid", 42: "State shortage monitor", 43: "District demand map", 44: "Demand engine", 45: "Seasonal alerts",
  46: "National donor data", 47: "Geographic blood flow", 48: "Supply chain analytics", 49: "Wastage reduction", 50: "Blood type distribution",
  51: "Regional bank network", 52: "Emergency reserve", 53: "Mobile blood camps", 54: "Blood drive scheduler", 55: "National statistics",
  56: "DPDP compliance", 57: "Encryption audit", 58: "Access control", 59: "Audit trail", 60: "NABH certification",
  61: "IT security panel", 62: "Privacy policy", 63: "Data retention", 64: "Data principal requests", 65: "Breach response",
  66: "Consent ledger", 67: "Purpose limitation", 68: "Data minimisation", 69: "Security monitoring", 70: "Compliance reports",
  71: "Training records", 72: "Policy approvals", 73: "Risk register", 74: "Vendor review", 75: "Incident register",
  76: "Service health", 77: "Backup policy", 78: "Key management", 79: "Session security", 80: "Release audit",
  81: "API access review", 82: "Webhook verification", 83: "Data export", 84: "Data deletion", 85: "System settings",
  86: "e-RaktKosh live sync", 87: "ABHA health gateway", 88: "Government identity bridge", 89: "Udyam verification", 90: "Webhook consent manager",
  91: "Village health worker", 92: "District aggregation", 93: "State resource grid", 94: "National blood grid", 95: "WHO FHIR exchange",
  96: "Location privacy filter", 97: "Custom text alerts", 98: "Event-driven broadcaster", 99: "Visual camera scanner", 100: "Voice-guided doctor",
};

export default function AllModulesPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const modules = useMemo(() => Array.from({ length: 100 }, (_, index) => {
    const num = index + 1;
    return { num, title: moduleNames[num] ?? `Module ${num}`, group: groupNames[Math.min(Math.floor(index / 15), groupNames.length - 1)] };
  }).filter((item) => `${item.num} ${item.title} ${item.group}`.toLowerCase().includes(query.toLowerCase()) && (group === "All" || item.group === group)), [query, group]);

  return (
    <div className="min-h-[100dvh] bg-[#020613] text-white">
      <PortalHeader title="ALL MODULES" subtitle="1–100 · CLEAN PRODUCTION CATALOGUE" backHref="/authority" />
      <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 pb-10 pt-4">
        <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4"><div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-cyan-300" /><div><h1 className="text-sm font-black">All 100 module positions</h1><p className="mt-1 text-[10px] text-white/45">Catalogued for integration. Each module is empty until its real service is authorized.</p></div></div></div>
        <EmptyState title="No module data loaded" body="This catalogue contains no demo counts, sample alerts, fake statuses, random charts, or placeholder records." icon={<CheckCircle2 className="h-6 w-6" />} />
        <div className="flex gap-2">
          <label className="relative flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-white/30" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search modules" className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-cyan-300/40" /></label>
          <select value={group} onChange={(e) => setGroup(e.target.value)} className="max-w-[45%] rounded-lg border border-white/10 bg-[#071126] px-2 text-[10px] text-white/65 outline-none"><option>All</option>{groupNames.map((name) => <option key={name}>{name}</option>)}</select>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {modules.map((module) => <div key={module.num} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-[10px] font-black text-cyan-200">{String(module.num).padStart(2, "0")}</span><div className="min-w-0"><div className="truncate text-xs font-bold text-white">{module.title}</div><div className="mt-1 text-[9px] text-white/35">{module.group} · Awaiting connection</div></div></div>)}
        </div>
        {modules.length === 0 && <EmptyState title="No modules match" body="Try another search or scope." />}
        <PrivacyNote>Module positions are configuration metadata only. No personal, health, location, or government data is bundled here.</PrivacyNote>
        <Link href="/modules" className="text-center text-[10px] font-bold text-cyan-300/60 hover:text-cyan-200">Open modules 86–100 detail view →</Link>
      </main>
    </div>
  );
}