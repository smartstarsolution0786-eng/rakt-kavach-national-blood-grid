import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Shield, Droplet, TriangleAlert, Fingerprint, Gavel, User, Building2, FlaskConical, ChevronRight, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function GatewayPage() {
  const { language, setLanguage, t } = useLanguage();
  const [showModal, setShowModal] = useState(true);
  const [langSelected, setLangSelected] = useState(false);
  const [action, setAction] = useState<"login" | "register" | null>(null);
  const [, setLocation] = useLocation();

  const handleRoleSelect = (rolePath: string) => {
    setLocation(rolePath);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <AnimatePresence>
        {showModal && (
          <motion.div
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
              <GlassCard className="border-amber-500/30">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                    <TriangleAlert className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold text-white">{t("noticeTitle")}</h2>
                  <p className="text-sm text-slate-300">{t("noticeBody")}</p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm hover:from-blue-500 hover:to-indigo-500 transition-colors"
                  >
                    {t("noticeUnderstand")}
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!action ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm flex flex-col items-center gap-8 relative z-10 py-8"
        >
          <div className="flex gap-3">
            <span className="px-2.5 py-1 text-[10px] font-bold text-blue-400 border border-blue-500/30 bg-blue-500/10 rounded tracking-widest">{t("abdmReady")}</span>
            <span className="px-2.5 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded tracking-widest">{t("abhaLinked")}</span>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-red-500/50 animate-spin-slow"></div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-rose-500 logo-glow flex items-center justify-center relative overflow-hidden">
                <Shield className="w-12 h-12 text-red-900/40 absolute" />
                <Droplet className="w-8 h-8 text-white relative z-10 fill-white" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight">
                {t("appName")}
              </h1>
              <p className="text-[10px] text-red-400 uppercase tracking-[0.3em] font-bold mt-2">
                {t("tagline")}
              </p>
            </div>
          </div>

          <GlassCard className="w-full mt-4 flex flex-col gap-4">
            <div className="text-center mb-2">
              <h3 className="text-sm font-semibold text-white">{t("chooseLanguage")}</h3>
              <p className="text-xs text-slate-400 mt-1">{t("languageSubtext")}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => { setLanguage("hi"); setLangSelected(true); }}
                className={`py-3 rounded-lg text-sm font-medium border transition-colors ${language === "hi" ? "bg-white/10 border-white/20 text-white" : "bg-white/5 border-transparent text-slate-300 hover:bg-white/10"}`}
              >
                🇮🇳 हिन्दी
              </button>
              <button 
                onClick={() => { setLanguage("en"); setLangSelected(true); }}
                className={`py-3 rounded-lg text-sm font-medium border transition-colors ${language === "en" ? "bg-white/10 border-white/20 text-white" : "bg-white/5 border-transparent text-slate-300 hover:bg-white/10"}`}
              >
                🇬🇧 English
              </button>
            </div>

            <AnimatePresence>
              {langSelected && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                  className="flex flex-col gap-3 pt-4 border-t border-white/10"
                >
                  <button onClick={() => setAction("login")} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/20">
                    {t("btnLogin")}
                  </button>
                  <button onClick={() => setAction("register")} className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/20">
                    {t("btnRegister")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          <div className="flex flex-col items-center gap-4 mt-8 opacity-60">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-medium uppercase tracking-wider">
                <Fingerprint className="w-3.5 h-3.5" />
                {t("biometricSecure")}
              </div>
              <div className="flex items-center gap-1.5 text-blue-400 text-[10px] font-medium uppercase tracking-wider">
                <Gavel className="w-3.5 h-3.5" />
                {t("dpdpCompliant")}
              </div>
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">{t("poweredBy")}</div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm flex flex-col gap-6 relative z-10 py-8"
        >
          <button onClick={() => setAction(null)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </button>
          
          <div>
            <h2 className="text-2xl font-bold text-white">
              {action === "login" ? t("loginTitle") : t("registerTitle")}
            </h2>
            <p className="text-slate-400 text-sm mt-1">{t("languageSubtext")}</p>
          </div>

          <div className="flex flex-col gap-3">
            <RoleCard 
              icon={<User className="w-5 h-5" />} 
              title={t("roleDonor")} 
              desc={t("roleDonorDesc")} 
              color="red"
              onClick={() => handleRoleSelect("/donor")}
            />
            <RoleCard 
              icon={<Building2 className="w-5 h-5" />} 
              title={t("roleHospital")} 
              desc={t("roleHospitalDesc")} 
              color="blue"
              onClick={() => handleRoleSelect("/hospital")}
            />
            <RoleCard 
              icon={<FlaskConical className="w-5 h-5" />} 
              title={t("roleLab")} 
              desc={t("roleLabDesc")} 
              color="amber"
              onClick={() => handleRoleSelect("/lab")}
            />
            <RoleCard 
              icon={<Shield className="w-5 h-5" />} 
              title={t("roleAuthority")} 
              desc={t("roleAuthorityDesc")} 
              color="purple"
              onClick={() => handleRoleSelect("/authority")}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function RoleCard({ icon, title, desc, color, onClick }: { icon: React.ReactNode, title: string, desc: string, color: 'red' | 'blue' | 'amber' | 'purple', onClick: () => void }) {
  const colorMap = {
    red: "text-red-400 group-hover:border-red-500/50 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-red-500/10",
    blue: "text-blue-400 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-blue-500/10",
    amber: "text-amber-400 group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-amber-500/10",
    purple: "text-purple-400 group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-purple-500/10"
  };

  return (
    <button onClick={onClick} className={`group text-left p-4 rounded-xl glass-card transition-all duration-300 flex items-center gap-4 ${colorMap[color].replace(/bg-[^ ]+/, '')}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorMap[color].split(' ').find(c => c.startsWith('bg-'))} ${colorMap[color].split(' ').find(c => c.startsWith('text-'))}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-white font-semibold text-sm">{title}</h4>
        <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
    </button>
  );
}
