import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, AlertCircle, Droplets, Activity, RadioTower } from "lucide-react";
import { Link } from "wouter";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";

export default function HospitalDashboard() {
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
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{t("hospitalPortal")}</h1>
            <p className="text-xs text-slate-400">Node ID: HN-DEL-401</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard label={t("unitsAvailable")} value="42" icon={<Droplets className="w-4 h-4" />} valueClassName="text-blue-400" />
          <StatCard label={t("emergencyRequests")} value="2" icon={<AlertCircle className="w-4 h-4" />} valueClassName="text-red-400" />
          <StatCard label={t("pendingRequests")} value="7" icon={<Activity className="w-4 h-4" />} />
          <StatCard label={t("gridStatus")} value={t("online")} icon={<RadioTower className="w-4 h-4" />} valueClassName="text-emerald-400" />
        </div>

        <GlassCard>
          <h3 className="text-sm font-semibold text-white mb-4">{t("bloodInventory")}</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { type: "A+", count: 12 }, { type: "A-", count: 3 },
              { type: "B+", count: 8 }, { type: "B-", count: 1 },
              { type: "O+", count: 15 }, { type: "O-", count: 4 },
              { type: "AB+", count: 7 }, { type: "AB-", count: 0 },
            ].map(blood => (
              <div key={blood.type} className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-xs font-bold text-red-400">{blood.type}</span>
                <span className="text-lg font-bold text-white">{blood.count}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <button className="w-full py-3 rounded-lg bg-red-600/20 border border-red-500/50 text-red-400 font-bold text-sm hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {t("requestEmergency")}
        </button>
      </motion.div>
    </div>
  );
}
