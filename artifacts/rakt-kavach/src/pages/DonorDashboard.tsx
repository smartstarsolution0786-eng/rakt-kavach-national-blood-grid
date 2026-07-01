import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { ArrowLeft, User, Calendar, Activity, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";

export default function DonorDashboard() {
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
          <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{t("donorPortal")}</h1>
            <p className="text-xs text-slate-400">ID: RK-DNR-84920</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard label={t("donationsMade")} value="3" icon={<Activity className="w-4 h-4" />} />
          <StatCard label={t("bloodCredits")} value="15" icon={<User className="w-4 h-4" />} valueClassName="text-emerald-400" />
          <StatCard label={t("lastDonated")} value="3m ago" icon={<Calendar className="w-4 h-4" />} />
          <StatCard label={t("abhaStatus")} value={t("active")} icon={<CheckCircle2 className="w-4 h-4" />} valueClassName="text-blue-400" />
        </div>

        <GlassCard>
          <h3 className="text-sm font-semibold text-white mb-2">{t("upcomingEligibility")}</h3>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-emerald-400">14 <span className="text-sm font-normal text-slate-400">{t("daysLeft")}</span></div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 flex items-center justify-center relative">
              <span className="text-xs font-bold text-white">85%</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm font-semibold text-white mb-4">{t("donationHistory")}</h3>
          <div className="flex flex-col gap-3">
            {[
              { date: "12 Oct 2023", loc: "AIIMS Delhi", type: "O+" },
              { date: "05 Jun 2023", loc: "Red Cross Camp", type: "O+" },
              { date: "18 Jan 2023", loc: "Apollo Hospital", type: "O+" },
            ].map((hist, i) => (
              <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium text-white">{hist.loc}</div>
                  <div className="text-xs text-slate-400">{hist.date}</div>
                </div>
                <div className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold">{hist.type}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
