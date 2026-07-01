import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, FileText, Clock, Percent, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";

export default function LabDashboard() {
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
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{t("labPortal")}</h1>
            <p className="text-xs text-slate-400">Node ID: LB-DEL-SRL</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard label={t("testsPerformed")} value="28" icon={<FlaskConical className="w-4 h-4" />} />
          <StatCard label={t("certificatesIssued")} value="24" icon={<FileText className="w-4 h-4" />} valueClassName="text-blue-400" />
          <StatCard label={t("pendingVerification")} value="4" icon={<Clock className="w-4 h-4" />} valueClassName="text-amber-400" />
          <StatCard label={t("accuracyRate")} value="99.2%" icon={<Percent className="w-4 h-4" />} valueClassName="text-emerald-400" />
        </div>

        <GlassCard>
          <h3 className="text-sm font-semibold text-white mb-4">{t("recentVerifications")}</h3>
          <div className="flex flex-col gap-3">
            {[
              { id: "VER-8921", status: "Verified", type: "AB+", time: "10 mins ago" },
              { id: "VER-8920", status: "Verified", type: "O-", time: "1 hour ago" },
              { id: "VER-8919", status: "Pending", type: "B+", time: "2 hours ago" },
            ].map((ver, i) => (
              <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <ShieldCheck className={`w-5 h-5 ${ver.status === 'Verified' ? 'text-emerald-400' : 'text-amber-400'}`} />
                  <div>
                    <div className="text-sm font-medium text-white">{ver.id}</div>
                    <div className="text-xs text-slate-400">{ver.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${ver.status === 'Verified' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {ver.status}
                  </span>
                  <div className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold">{ver.type}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
