import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Users, Network, Droplet, TriangleAlert, BellRing } from "lucide-react";
import { Link } from "wouter";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";

export default function AuthorityDashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[100dvh] flex flex-col items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl flex flex-col gap-6 relative z-10 py-4"
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </Link>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{t("authorityPortal")}</h1>
            <p className="text-xs text-slate-400">HQ Level Access</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard label={t("totalDonors")} value="4.2M" icon={<Users className="w-4 h-4" />} valueClassName="text-blue-400" />
          <StatCard label={t("activeNodes")} value="12,847" icon={<Network className="w-4 h-4" />} />
          <StatCard label={t("totalUnits")} value="89,234" icon={<Droplet className="w-4 h-4" />} valueClassName="text-emerald-400" />
          <StatCard label={t("emergencyAlerts")} value="3" icon={<TriangleAlert className="w-4 h-4" />} valueClassName="text-red-400" />
        </div>

        <GlassCard>
          <h3 className="text-sm font-semibold text-white mb-4">{t("stateDistribution")}</h3>
          <div className="flex flex-col gap-4">
            {[
              { state: "Maharashtra", val: 85 },
              { state: "Karnataka", val: 72 },
              { state: "Tamil Nadu", val: 64 },
              { state: "Gujarat", val: 58 },
              { state: "Uttar Pradesh", val: 50 },
            ].map(st => (
              <div key={st.state} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{st.state}</span>
                  <span className="text-purple-400 font-bold">{st.val}k Units</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${st.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm font-semibold text-white mb-4">{t("recentAlerts")}</h3>
          <div className="flex flex-col gap-3">
            {[
              { title: "Critical Shortage O-", desc: "Apollo Delhi reporting O- depletion. Routing from nearby nodes.", time: "10m ago", level: "critical" },
              { title: "Node Sync Issue", desc: "Kolkata Regional Node 4 delayed sync.", time: "45m ago", level: "warning" },
            ].map((alert, i) => (
              <div key={i} className="flex gap-3 items-start border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${alert.level === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  <BellRing className="w-3 h-3" />
                </div>
                <div>
                  <div className={`text-sm font-bold ${alert.level === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>{alert.title}</div>
                  <div className="text-xs text-slate-300 mt-0.5">{alert.desc}</div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
