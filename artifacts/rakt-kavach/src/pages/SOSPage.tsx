import { useState } from "react";
import { AlertTriangle, CheckCircle2, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PortalHeader, EmptyState, PrivacyNote } from "@/components/ProductionState";

export default function SOSPage() {
  const [locationState, setLocationState] = useState<"idle" | "requesting" | "ready" | "denied">("idle");
  const [consent, setConsent] = useState(false);
  const [prepared, setPrepared] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationState("denied");
      return;
    }
    setLocationState("requesting");
    navigator.geolocation.getCurrentPosition(
      () => setLocationState("ready"),
      () => setLocationState("denied"),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
    );
  };

  return (
    <div className="min-h-[100dvh] bg-[#0a0101] text-white">
      <PortalHeader title="EMERGENCY CONSOLE" subtitle="CONSENT-DRIVEN · NO SEEDED CONTACTS" backHref="/donor" />
      <main className="mx-auto flex max-w-2xl flex-col gap-4 px-4 pb-10 pt-4">
        <div className="rounded-xl border border-red-400/25 bg-red-400/[0.04] p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-300" />
            <div>
              <h1 className="text-sm font-black">Request emergency assistance</h1>
              <p className="mt-1 text-[10px] text-white/50">This clean deployment does not invent nearby units, stock, distance, ETA, or delivery results.</p>
            </div>
          </div>
        </div>
        <EmptyState title="No response network connected" body="Connect an approved emergency routing service before broadcasting a request. No request is sent by this screen." icon={<Phone className="h-6 w-6" />} />
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-red-200">Location permission</h2>
          <p className="mt-2 text-xs leading-relaxed text-white/45">Location is requested only after you press the button. Coordinates are never displayed or stored by this UI.</p>
          <button onClick={requestLocation} disabled={locationState === "requesting" || locationState === "ready"} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 py-3 text-xs font-bold text-cyan-200 disabled:opacity-50">
            {locationState === "requesting" ? "Requesting permission…" : locationState === "ready" ? <><CheckCircle2 className="h-4 w-4" /> Location permission granted</> : <><MapPin className="h-4 w-4" /> Allow location for request</>}
          </button>
          {locationState === "denied" && <p className="mt-2 text-[10px] text-amber-300">Location permission was not granted. No fallback location is used.</p>}
        </section>
        <label className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4 text-xs text-white/65">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-emerald-500" />
          <span>I consent to sharing my location with an authorized emergency service for this request only. I understand this screen does not dispatch without a configured backend.</span>
        </label>
        <button disabled={!consent || locationState !== "ready"} onClick={() => setPrepared(true)} className="rounded-xl border border-red-400/40 bg-red-400/10 py-4 text-sm font-black text-red-200 disabled:cursor-not-allowed disabled:opacity-35">
          {prepared ? "Awaiting emergency service connection" : "Prepare emergency request"}
        </button>
        <div className="flex gap-3">
          <a href="tel:112" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-400/25 bg-red-400/10 py-3 text-xs font-bold text-red-200"><Phone className="h-4 w-4" /> Call 112</a>
          <Link href="/donor" className="flex flex-1 items-center justify-center rounded-lg border border-white/10 py-3 text-xs font-bold text-white/60">Return</Link>
        </div>
        <PrivacyNote><span className="inline-flex items-start gap-2"><ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" /> No geographic fallback, mock emergency contacts, or fabricated response status is used.</span></PrivacyNote>
      </main>
    </div>
  );
}