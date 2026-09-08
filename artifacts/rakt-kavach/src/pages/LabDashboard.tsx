import { FlaskConical, FileText, ShieldCheck } from "lucide-react";
import { PortalHeader, EmptyState, PrivacyNote } from "@/components/ProductionState";

export default function LabDashboard() {
  return (
    <div className="min-h-[100dvh] bg-[#020613] text-white">
      <PortalHeader title="LAB PORTAL" subtitle="VERIFIED DIAGNOSTIC ACCESS" />
      <main className="mx-auto flex max-w-2xl flex-col gap-4 px-4 pb-10 pt-4">
        <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-4">
          <div className="flex items-center gap-3">
            <FlaskConical className="h-6 w-6 text-amber-300" />
            <div>
              <h1 className="text-sm font-black">Laboratory workspace</h1>
              <p className="mt-1 text-[10px] text-white/45">Verified lab results will be visible only after a production connection is established.</p>
            </div>
          </div>
        </div>
        <EmptyState title="No laboratory records" body="There are no seeded tests, certificates, temperatures, node IDs, or verification results in this deployment." icon={<FileText className="h-6 w-6" />} />
        <PrivacyNote><span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Results require consent, identity verification, and an approved laboratory service.</span></PrivacyNote>
      </main>
    </div>
  );
}