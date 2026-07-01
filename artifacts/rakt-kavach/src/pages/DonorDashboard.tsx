import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Calendar, Activity, CheckCircle2, Info, X, Droplet } from "lucide-react";
import { Link } from "wouter";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";

export default function DonorDashboard() {
  const { t } = useLanguage();
  const [showCreditModal, setShowCreditModal] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center p-4">
      <AnimatePresence>
        {showCreditModal && (
          <motion.div
            key="credit-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-sm w-full"
            >
              <GlassCard className="border-emerald-500/20 flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                      <Droplet className="w-4 h-4 fill-emerald-400/30" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{t("shareCreditTitle")}</h3>
                  </div>
                  <button
                    data-testid="button-close-credit-modal"
                    onClick={() => setShowCreditModal(false)}
                    className="text-slate-500 hover:text-white transition-colors cursor-pointer ml-2 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{t("shareCreditBody")}</p>

                <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/15 rounded-lg px-3 py-2.5">
                  <div className="text-2xl font-black text-emerald-400">1</div>
                  <div>
                    <div className="text-xs font-semibold text-white">{t("bloodCredits")}</div>
                    <div className="text-[10px] text-slate-500">RK-DNR-84920 · ABHA Verified</div>
                  </div>
                </div>

                <button
                  data-testid="button-credit-modal-close"
                  onClick={() => setShowCreditModal(false)}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs tracking-wider uppercase hover:from-emerald-500 hover:to-teal-500 transition-colors cursor-pointer"
                >
                  {t("shareCreditClose")}
                </button>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl flex flex-col gap-5 relative z-10 py-4"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            data-testid="link-back-home"
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </Link>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{t("donorPortal")}</h1>
              <p className="text-xs text-slate-400">ID: RK-DNR-84920</p>
            </div>
          </div>
          <span className="px-2 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded tracking-widest">
            ABHA ✓
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            data-testid="stat-donations-made"
            label={t("donationsMade")}
            value="1"
            icon={<Activity className="w-4 h-4" />}
          />
          <div className="relative">
            <StatCard
              data-testid="stat-blood-credits"
              label={t("bloodCredits")}
              value="1"
              icon={<Droplet className="w-4 h-4" />}
              valueClassName="text-emerald-400"
            />
            <button
              data-testid="button-credit-info"
              onClick={() => setShowCreditModal(true)}
              className="absolute top-3 right-3 text-slate-600 hover:text-emerald-400 transition-colors cursor-pointer"
              title={t("shareCredit")}
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <StatCard
            data-testid="stat-last-donated"
            label={t("lastDonated")}
            value={t("recentlyDonated")}
            icon={<Calendar className="w-4 h-4" />}
            valueClassName="text-sm font-semibold"
          />
          <StatCard
            data-testid="stat-abha-status"
            label={t("abhaStatus")}
            value={t("active")}
            icon={<CheckCircle2 className="w-4 h-4" />}
            valueClassName="text-blue-400"
          />
        </div>

        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-white mb-3">{t("upcomingEligibility")}</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-amber-400">
                84 <span className="text-sm font-normal text-slate-400">{t("daysLeft")}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 max-w-[180px] leading-relaxed">
                {t("eligibilityNote")}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-full border-4 border-amber-500/20 flex items-center justify-center relative">
                <div
                  className="absolute inset-0 rounded-full border-4 border-transparent"
                  style={{ borderTopColor: "rgb(251 191 36 / 0.6)", transform: "rotate(-270deg)" }}
                />
                <span className="text-xs font-bold text-white">7%</span>
              </div>
              <span className="text-[9px] text-slate-600 uppercase tracking-wider">eligible</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-white mb-4">{t("donationHistory")}</h3>
          <div className="flex flex-col gap-0">
            <div
              data-testid="history-entry-0"
              className="flex justify-between items-center py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Droplet className="w-3.5 h-3.5 text-red-400 fill-red-400/30" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">एम्स दिल्ली / AIIMS Delhi</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">आज · Camp #RK-2026-001</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/15">O+</div>
                <div className="text-[9px] text-emerald-500 font-medium">+1 क्रेडिट</div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-3 flex items-center gap-2 text-[10px] text-slate-600">
              <Activity className="w-3 h-3" />
              <span>1 donation recorded on National Grid · RK-DNR-84920</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
