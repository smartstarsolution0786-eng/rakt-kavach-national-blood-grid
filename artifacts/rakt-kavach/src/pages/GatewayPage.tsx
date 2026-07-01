import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Shield, Droplet, TriangleAlert, Fingerprint, Gavel, User, Building2, FlaskConical, ChevronRight, ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { useLocation } from "wouter";

type Step = "gateway" | "roles" | "abha-verify";

export default function GatewayPage() {
  const { language, setLanguage, t } = useLanguage();
  const [showModal, setShowModal] = useState(true);
  const [langSelected, setLangSelected] = useState(false);
  const [action, setAction] = useState<"login" | "register" | null>(null);
  const [step, setStep] = useState<Step>("gateway");
  const [abhaId, setAbhaId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [, setLocation] = useLocation();

  const handleRoleSelect = (rolePath: string) => {
    if (rolePath === "/donor") {
      setStep("abha-verify");
    } else {
      setLocation(rolePath);
    }
  };

  const handleSendOtp = () => {
    if (abhaId.replace(/-/g, "").length >= 14) {
      setOtpSent(true);
    }
  };

  const handleVerify = () => {
    if (otp.length >= 4) {
      setVerifying(true);
      setTimeout(() => {
        setLocation("/donor");
      }, 1800);
    }
  };

  const formatAbhaId = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 14);
    const parts = [digits.slice(0, 2), digits.slice(2, 6), digits.slice(6, 10), digits.slice(10, 14)];
    return parts.filter(Boolean).join("-");
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
                  <p className="text-sm text-slate-300 text-left leading-relaxed">{t("noticeBody")}</p>
                  <button
                    data-testid="button-notice-understand"
                    onClick={() => setShowModal(false)}
                    className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs tracking-wider uppercase hover:from-blue-500 hover:to-indigo-500 transition-colors cursor-pointer"
                  >
                    {t("noticeUnderstand")}
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === "abha-verify" ? (
          <motion.div
            key="abha-verify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-sm flex flex-col gap-5 relative z-10 py-8"
          >
            <button
              data-testid="button-back-from-abha"
              onClick={() => { setStep("roles"); setOtpSent(false); setOtp(""); setAbhaId(""); setVerifying(false); }}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors w-fit cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("back")}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{t("abhaVerifyTitle")}</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">{t("abhaVerifySubtext")}</p>
              </div>
            </div>

            <GlassCard className="flex flex-col gap-4 p-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t("abhaIdLabel")}</label>
                <input
                  data-testid="input-abha-id"
                  type="text"
                  value={abhaId}
                  onChange={(e) => setAbhaId(formatAbhaId(e.target.value))}
                  placeholder={t("abhaIdPlaceholder")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-mono tracking-widest"
                  maxLength={19}
                  disabled={otpSent}
                />
              </div>

              {!otpSent ? (
                <button
                  data-testid="button-send-otp"
                  onClick={handleSendOtp}
                  disabled={abhaId.replace(/-/g, "").length < 14}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs tracking-wider uppercase hover:from-blue-500 hover:to-indigo-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {t("sendOtp")}
                </button>
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {t("otpSentTo")} ···· 7823
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t("otpLabel")}</label>
                      <input
                        data-testid="input-otp"
                        type="text"
                        inputMode="numeric"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder={t("otpPlaceholder")}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all font-mono tracking-[0.5em] text-center"
                        maxLength={6}
                      />
                    </div>

                    <button
                      data-testid="button-verify-otp"
                      onClick={handleVerify}
                      disabled={otp.length < 4 || verifying}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs tracking-wider uppercase hover:from-emerald-500 hover:to-teal-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                    >
                      {verifying ? (
                        <>
                          <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {t("verifying")}
                        </>
                      ) : t("verifyBtn")}
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </GlassCard>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-medium">
              <Lock className="w-3 h-3" />
              {t("abhaSecureNote")}
            </div>
          </motion.div>
        ) : step === "roles" ? (
          <motion.div
            key="roles"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-sm flex flex-col gap-6 relative z-10 py-8"
          >
            <button
              data-testid="button-back-from-roles"
              onClick={() => setStep("gateway")}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors w-fit cursor-pointer"
            >
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
        ) : (
          <motion.div
            key="gateway"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
                  data-testid="button-lang-hindi"
                  onClick={() => { setLanguage("hi"); setLangSelected(true); }}
                  className={`py-3 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${language === "hi" ? "bg-white/10 border-white/20 text-white" : "bg-white/5 border-transparent text-slate-300 hover:bg-white/10"}`}
                >
                  🇮🇳 हिन्दी
                </button>
                <button
                  data-testid="button-lang-english"
                  onClick={() => { setLanguage("en"); setLangSelected(true); }}
                  className={`py-3 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${language === "en" ? "bg-white/10 border-white/20 text-white" : "bg-white/5 border-transparent text-slate-300 hover:bg-white/10"}`}
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
                    <button
                      data-testid="button-login"
                      onClick={() => { setAction("login"); setStep("roles"); }}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/20 cursor-pointer"
                    >
                      {t("btnLogin")}
                    </button>
                    <button
                      data-testid="button-register"
                      onClick={() => { setAction("register"); setStep("roles"); }}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/20 cursor-pointer"
                    >
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
        )}
      </AnimatePresence>
    </div>
  );
}

function RoleCard({ icon, title, desc, color, onClick }: { icon: React.ReactNode, title: string, desc: string, color: 'red' | 'blue' | 'amber' | 'purple', onClick: () => void }) {
  const colorMap = {
    red:    { text: "text-red-400",    hover: "group-hover:border-red-500/50",    bg: "bg-red-500/10"    },
    blue:   { text: "text-blue-400",   hover: "group-hover:border-blue-500/50",   bg: "bg-blue-500/10"   },
    amber:  { text: "text-amber-400",  hover: "group-hover:border-amber-500/50",  bg: "bg-amber-500/10"  },
    purple: { text: "text-purple-400", hover: "group-hover:border-purple-500/50", bg: "bg-purple-500/10" },
  };

  const c = colorMap[color];

  return (
    <button
      data-testid={`button-role-${color}`}
      onClick={onClick}
      className={`group text-left p-4 rounded-xl glass-card transition-all duration-300 flex items-center gap-4 ${c.hover} cursor-pointer`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${c.bg} ${c.text}`}>
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
