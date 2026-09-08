import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Database, Droplet, Gift, History, ShieldAlert, User, Users } from "lucide-react";
import { Link } from "wouter";
import AIGuardian from "@/components/AIGuardian";
import { EmptyState, PortalHeader, PrivacyNote } from "@/components/ProductionState";

type Tab = "home" | "network" | "donate" | "alerts" | "profile";

export default function DonorDashboard() {
  const [tab, setTab] = useState<Tab>("home");
  const [showGuardian, setShowGuardian] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-[#020613] text-white">
      <PortalHeader title="DONOR PORTAL" subtitle="RAKT KAVACH · PRIVACY-FIRST ACCESS" />
      {showGuardian && <AIGuardian onClose={() => setShowGuardian(false)} />}

      <main className="mx-auto flex max-w-2xl flex-col gap-4 px-4 pb-28 pt-4">
        <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
          <div className="flex items-center gap-3">
            <Droplet className="h-5 w-5 text-red-400" />
            <div>
              <h1 className="text-sm font-black tracking-wide">Your donor workspace</h1>
              <p className="mt-1 text-[10px] text-white/45">Secure records appear here after verified sign-in and consent.</p>
            </div>
          </div>
        </div>

        {tab === "home" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
            <EmptyState title="Donor profile is empty" body="No donor identity, blood group, wallet, history, or impact records are seeded in this deployment." icon={<User className="h-6 w-6" />} />
            <PrivacyNote />
            <div className="grid grid-cols-2 gap-3">
              <ActionButton label="Donation history" icon={<History className="h-5 w-5" />} onClick={() => setTab("profile")} />
              <ActionButton label="Network" icon={<Users className="h-5 w-5" />} onClick={() => setTab("network")} />
              <ActionButton label="AI Guardian" icon={<ShieldAlert className="h-5 w-5" />} onClick={() => setShowGuardian(true)} />
              <Link href="/sos" className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-center text-xs font-bold text-red-300 transition-colors hover:bg-red-400/20">Emergency help</Link>
            </div>
          </motion.div>
        )}

        {tab === "network" && <EmptyState title="No network records" body="Nearby donors, requests, and facilities will be shown only from a connected, consented service." icon={<Users className="h-6 w-6" />} />}
        {tab === "donate" && <EmptyState title="Donation intake is not connected" body="Connect the approved donation service before accepting or storing a donation request." icon={<Droplet className="h-6 w-6" />} />}
        {tab === "alerts" && <EmptyState title="No alerts" body="Verified alerts from the production notification service will appear here." icon={<Bell className="h-6 w-6" />} />}
        {tab === "profile" && <EmptyState title="Profile unavailable" body="Sign in through the approved identity provider to view your profile. No placeholder identity is used." icon={<User className="h-6 w-6" />} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-cyan-300/10 bg-[#020613]/95 px-2 pb-safe pt-2 backdrop-blur-xl" aria-label="Donor navigation">
        <div className="mx-auto flex max-w-2xl items-end justify-around">
          <NavButton active={tab === "home"} label="Home" icon={<Database className="h-5 w-5" />} onClick={() => setTab("home")} />
          <NavButton active={tab === "network"} label="Network" icon={<Users className="h-5 w-5" />} onClick={() => setTab("network")} />
          <NavButton active={tab === "donate"} label="Donate" icon={<Gift className="h-5 w-5" />} onClick={() => setTab("donate")} />
          <NavButton active={tab === "alerts"} label="Alerts" icon={<Bell className="h-5 w-5" />} onClick={() => setTab("alerts")} />
          <NavButton active={tab === "profile"} label="Profile" icon={<User className="h-5 w-5" />} onClick={() => setTab("profile")} />
        </div>
      </nav>
    </div>
  );
}

function ActionButton({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className="flex flex-col items-center gap-2 rounded-xl border border-cyan-300/15 bg-white/[0.03] p-4 text-[10px] font-bold text-white/70 transition hover:border-cyan-300/40 hover:text-cyan-200">{icon}{label}</button>;
}

function NavButton({ active, label, icon, onClick }: { active: boolean; label: string; icon: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className={`flex flex-col items-center gap-1 px-3 py-2 text-[9px] font-bold transition-colors ${active ? "text-red-400" : "text-white/35"}`}>{icon}{label}</button>;
}