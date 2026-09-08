import { useState } from "react";
import { Activity, AlertOctagon, BarChart3, Database, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PortalHeader, EmptyState, PrivacyNote } from "@/components/ProductionState";

const LEVELS = ["WHO", "NATIONAL", "STATE", "DISTRICT", "BLOCK"] as const;

export default function AuthorityDashboard() {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("NATIONAL");

  return (
    <div className="min-h-[100dvh] bg-[#020613] text-white">
      <PortalHeader title="AUTHORITY DASHBOARD" subtitle="READ-ONLY UNTIL VERIFIED" />
      <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 pb-10 pt-4">
        <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-cyan-300" />
            <div>
              <h1 className="text-sm font-black">National coordination workspace</h1>
              <p className="mt-1 text-[10px] text-white/45">Live aggregates and audit records are intentionally blank until an authorized source is connected.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <EmptyMetric label="Grid records" icon={<Database className="h-4 w-4" />} />
          <EmptyMetric label="Open requests" icon={<Activity className="h-4 w-4" />} />
          <EmptyMetric label="Alerts" icon={<AlertOctagon className="h-4 w-4" />} />
          <EmptyMetric label="Reports" icon={<BarChart3 className="h-4 w-4" />} />
        </div>
        <div className="flex gap-2 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02] p-2">
          {LEVELS.map((item) => <button key={item} onClick={() => setLevel(item)} className={`rounded-lg px-3 py-2 text-[10px] font-black transition ${level === item ? "bg-cyan-300/15 text-cyan-200" : "text-white/40 hover:text-white"}`}>{item}</button>)}
        </div>
        <EmptyState title={`${level} data is empty`} body="No live authority records are available. Connect the approved read-only data feed to populate this scope." icon={<Database className="h-6 w-6" />} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/all-modules" className="rounded-xl border border-cyan-300/25 bg-cyan-300/[0.05] p-4 text-center text-xs font-bold text-cyan-200 transition hover:bg-cyan-300/10">Open module catalogue</Link>
          <Link href="/sos" className="rounded-xl border border-red-400/30 bg-red-400/[0.06] p-4 text-center text-xs font-bold text-red-200 transition hover:bg-red-400/10">Emergency request console</Link>
        </div>
        <PrivacyNote>Authority views show only data authorized by the connected service. This clean deployment contains no donor, patient, facility, or impact records.</PrivacyNote>
      </main>
    </div>
  );
}

function EmptyMetric({ label, icon }: { label: string; icon: React.ReactNode }) {
  return <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3"><div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-white/35">{label}{icon}</div><div className="mt-2 text-2xl font-black text-white/30">—</div></div>;
}