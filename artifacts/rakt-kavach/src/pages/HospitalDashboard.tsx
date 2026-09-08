import { useState } from "react";
import { AlertCircle, Building2, CheckCircle2, Droplets, Send } from "lucide-react";
import { PortalHeader, EmptyState, PrivacyNote } from "@/components/ProductionState";

export default function HospitalDashboard() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-[#020613] text-white">
      <PortalHeader title="HOSPITAL PORTAL" subtitle="VERIFIED FACILITY ACCESS" />
      <main className="mx-auto flex max-w-2xl flex-col gap-4 px-4 pb-10 pt-4">
        <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-cyan-300" />
            <div>
              <h1 className="text-sm font-black">Facility workspace</h1>
              <p className="mt-1 text-[10px] text-white/45">Sign in with an approved facility identity to load inventory and requests.</p>
            </div>
          </div>
        </div>
        <EmptyState title="Inventory starts empty" body="No hospital, blood-bank, unit, patient, or facility records are bundled with this app." icon={<Droplets className="h-6 w-6" />} />
        <section className="rounded-xl border border-red-400/20 bg-red-400/[0.03] p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-red-300"><AlertCircle className="h-4 w-4" /> Create an emergency request</div>
          <p className="mb-4 text-xs leading-relaxed text-white/45">This form is ready for a production API. It does not claim delivery or create a local record.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-white/45">Blood group
              <input value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} placeholder="Required" className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50" />
            </label>
            <label className="text-[10px] font-bold uppercase tracking-wider text-white/45">Units needed
              <input value={units} onChange={(e) => setUnits(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Required" className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50" />
            </label>
          </div>
          <button disabled={!bloodGroup || !units} onClick={() => setSubmitted(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-red-400/40 bg-red-400/10 py-3 text-xs font-black text-red-200 transition hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-35">
            {submitted ? <><CheckCircle2 className="h-4 w-4" /> Ready for secure submission</> : <><Send className="h-4 w-4" /> Prepare request</>}
          </button>
        </section>
        <PrivacyNote>Requests remain in the browser until a verified backend endpoint is configured. No patient or facility data is stored here.</PrivacyNote>
      </main>
    </div>
  );
}