import { useState } from "react";
import { ChevronDown, Database, Link2, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PortalHeader, EmptyState, PrivacyNote } from "@/components/ProductionState";

const modules = [
  ["86", "e-RaktKosh Live Sync Hub", "Government REST API"],
  ["87", "ABHA Health ID Digital Gateway", "ABDM API"],
  ["88", "OAuth2 Government Identity Bridge", "OAuth2 PKCE"],
  ["89", "Udyam Enterprise Verification", "Government verification API"],
  ["90", "Webhook Consent Manager", "Signed webhook receiver"],
  ["91", "Village Health Worker Console", "Role-based intake"],
  ["92", "District Aggregation Layer", "Privacy-preserving aggregation"],
  ["93", "State Resource Grid", "State coordination service"],
  ["94", "National Blood Grid", "gRPC service"],
  ["95", "WHO FHIR Exchange", "FHIR / GraphQL"],
  ["96", "Location Privacy Filter", "Consent-based geospatial service"],
  ["97", "Custom Text Alert Input", "Sanitized realtime channel"],
  ["98", "Event-Driven Broadcaster", "Partitioned messaging service"],
  ["99", "Visual Camera Scanner", "WebRTC + approved model"],
  ["100", "Voice-Guided Doctor", "Bhashini / TTS service"],
] as const;

export default function AdvancedModulesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="min-h-[100dvh] bg-[#020613] text-white">
      <PortalHeader title="ADVANCED MODULES" subtitle="86–100 · CONNECTIONS REQUIRED" backHref="/authority" />
      <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 pb-10 pt-4">
        <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4"><div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-cyan-300" /><div><h1 className="text-sm font-black">Production integration catalogue</h1><p className="mt-1 text-[10px] text-white/45">Every module is unconnected by default. No live status, fake payload, or sample record is shown.</p></div></div></div>
        <EmptyState title="No integrations connected" body="Authorize each government, health, messaging, or AI provider before displaying its data." icon={<Link2 className="h-6 w-6" />} />
        <div className="flex flex-col gap-2">
          {modules.map(([num, title, tech]) => <button key={num} onClick={() => setExpanded(expanded === num ? null : num)} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition hover:border-cyan-300/30">
            <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300/10 text-xs font-black text-cyan-200">{num}</div><div className="flex-1"><div className="text-xs font-bold text-white">{title}</div><div className="mt-1 text-[9px] font-mono text-white/35">{tech}</div></div><ChevronDown className={`h-4 w-4 text-white/35 transition ${expanded === num ? "rotate-180" : ""}`} /></div>
            {expanded === num && <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-[10px] text-white/45"><Database className="h-3.5 w-3.5 text-cyan-300" /> Awaiting a verified production connector and consent policy.</div>}
          </button>)}
        </div>
        <PrivacyNote>These labels describe integration boundaries only. No government, health, or AI service is represented as active until it returns verified data.</PrivacyNote>
        <Link href="/all-modules" className="text-center text-[10px] font-bold text-cyan-300/60 hover:text-cyan-200">View all module positions →</Link>
      </main>
    </div>
  );
}