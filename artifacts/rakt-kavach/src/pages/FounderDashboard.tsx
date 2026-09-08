import { useState } from "react";
import { Activity, ChevronDown, ChevronUp, Eye, Globe, Lock, Shield } from "lucide-react";
import { PortalHeader, EmptyState, PrivacyNote } from "@/components/ProductionState";

export default function FounderDashboard() {
  const [open, setOpen] = useState<string | null>("integrity");
  const sections = [
    { id: "integrity", title: "Integrity event stream", icon: <Activity className="h-4 w-4" />, body: "No events have been received from a connected production stream." },
    { id: "nodes", title: "Node registry audit", icon: <Shield className="h-4 w-4" />, body: "No facility or node records are seeded in this deployment." },
    { id: "directives", title: "Global directives", icon: <Globe className="h-4 w-4" />, body: "No external directives have been synchronized." },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#020613] text-white">
      <PortalHeader title="INTEGRITY MONITOR" subtitle="READ-ONLY OBSERVER" />
      <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 pb-10 pt-4">
        <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.04] p-4">
          <div className="flex items-center gap-3">
            <Eye className="h-6 w-6 text-amber-300" />
            <div>
              <h1 className="text-sm font-black">Founder oversight</h1>
              <p className="mt-1 text-[10px] text-white/45">Observation only. No synthetic audit logs, node counts, directives, or control claims are shown.</p>
            </div>
          </div>
        </div>
        <EmptyState title="No audit data available" body="Connect an authenticated, append-only event source to populate this view." icon={<Lock className="h-6 w-6" />} />
        {sections.map((section) => (
          <section key={section.id} className="rounded-xl border border-amber-300/15 bg-amber-300/[0.03]">
            <button onClick={() => setOpen(open === section.id ? null : section.id)} className="flex w-full items-center justify-between p-4 text-left">
              <span className="flex items-center gap-3 text-xs font-black uppercase tracking-wider text-amber-200/80">{section.icon}{section.title}</span>
              {open === section.id ? <ChevronUp className="h-4 w-4 text-amber-200/50" /> : <ChevronDown className="h-4 w-4 text-amber-200/50" />}
            </button>
            {open === section.id && <div className="border-t border-amber-300/10 px-4 pb-4 pt-3 text-xs text-white/45">{section.body}</div>}
          </section>
        ))}
        <PrivacyNote>Read-only access does not grant authority to view personal data. Data minimization and consent controls apply to every connected source.</PrivacyNote>
      </main>
    </div>
  );
}