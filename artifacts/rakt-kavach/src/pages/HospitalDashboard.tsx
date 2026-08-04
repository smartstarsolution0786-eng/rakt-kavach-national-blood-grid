import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Building2, AlertCircle, Droplets, Activity, RadioTower,
  CheckCircle2, Clock, Bell, Shield, X, Wifi
} from "lucide-react";
import { Link } from "wouter";
import { eventBus } from "@/lib/eventBus";

const NODE_ID = "FTB-HOSP-01"; // फतेहाबाद सिविल हॉस्पिटल नोड

const bloodInventory = [
  { type: "A+", count: 12 }, { type: "A-", count: 3 },
  { type: "B+", count: 8 }, { type: "B-", count: 1 },
  { type: "O+", count: 15 }, { type: "O-", count: 4 },
  { type: "AB+", count: 7 }, { type: "AB-", count: 0 },
];

type EmergencyStep = "idle" | "requested" | "confirmed";

export default function HospitalDashboard() {
  const { t } = useLanguage();
  const [emergencyStep, setEmergencyStep] = useState<EmergencyStep>("idle");
  const [showConfirm, setShowConfirm] = useState(false);
  const [recentEvents, setRecentEvents] = useState<string[]>([]);

  useEffect(() => {
    return eventBus.subscribe("*", (evt) => {
      const label = `[${evt.type}] ${evt.nodeId} — ${new Date(evt.timestamp).toLocaleTimeString()}`;
      setRecentEvents(prev => [...prev.slice(-4), label]);
    });
  }, []);

  const handleEmergencyRequest = () => {
    setEmergencyStep("requested");
    setShowConfirm(false);
    eventBus.publish({
      type: "EMERGENCY_REQUEST",
      nodeId: NODE_ID,
      payload: { bloodType: "O-", urgency: "CRITICAL", hospital: "Civil Hospital", city: "Fatehabad, Haryana" },
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: "linear-gradient(180deg,#020613 0%,#071126 100%)", backgroundAttachment: "fixed" }}>

      {/* Header */}
      <div className="sticky top-0 z-30 w-full px-4 py-3 flex items-center justify-between"
        style={{ background: "rgba(2,6,19,0.95)", borderBottom: "1px solid rgba(0,210,255,0.1)", backdropFilter: "blur(12px)" }}>
        <Link href="/" className="cursor-pointer" style={{ color: "rgba(255,255,255,0.5)" }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" style={{ color: "#FF1E27" }} />
            <span className="text-white font-bold text-xs tracking-widest ml-1">HOSPITAL PORTAL</span>
          </div>
          <span className="text-[9px] font-mono tracking-wider" style={{ color: "#00D2FF" }}>{NODE_ID}</span>
        </div>
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5" style={{ color: "rgba(255,255,255,0.5)" }} />
          {emergencyStep === "requested" && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center animate-pulse" style={{ background: "#FF1E27" }}>!</span>
          )}
        </div>
      </div>

      {/* Emergency Confirm Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="max-w-sm w-full rounded-xl p-5 flex flex-col gap-4"
              style={{ background: "rgba(10,4,4,0.97)", border: "1px solid rgba(255,30,39,0.4)", boxShadow: "0 0 40px rgba(255,30,39,0.15)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" style={{ color: "#FF1E27" }} />
                  <span className="text-sm font-black text-white">आपातकालीन अनुरोध (SOS)</span>
                </div>
                <button onClick={() => setShowConfirm(false)} className="cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                यह एक्शन ग्रिड पर एक <strong className="text-white">मल्टी-सिग्नेचर प्रोटोकॉल</strong> शुरू करेगा।<br /><br />
                स्टेप 1: आपका अनुरोध <strong className="text-white">फतेहाबाद हेड ऑफिस</strong> को जाएगा।<br />
                Step 2: वहां से यह तुरंत <strong className="text-white">हरियाणा स्टेट ब्लड ग्रिड</strong> को ट्रांसफर होगा।<br />
                Step 3: फाइनल वेरिफिकेशन होते ही पूरे जिला नेटवर्क में SOS अलर्ट जारी हो जाएगा।
              </p>
              <div className="rounded-lg p-3 text-[10px] font-mono" style={{ background: "rgba(255,30,39,0.06)", border: "1px solid rgba(255,30,39,0.2)" }}>
                <span style={{ color: "#FF1E27" }}>अनुरोध:</span> <span className="text-white">O- ब्लड — अति गंभीर</span><br />
                <span style={{ color: "#00D2FF" }}>नोड:</span> <span className="text-white">{NODE_ID} (फतेहाबाद)</span>
              </div>
              <button onClick={handleEmergencyRequest}
                className="w-full py-3 rounded-lg text-white font-black text-xs tracking-wider uppercase cursor-pointer transition-opacity hover:opacity-90"
                style={{ background: "rgba(255,30,39,0.85)", border: "1px solid rgba(255,30,39,0.6)" }}>
                पुष्टि करें — आपातकालीन अलर्ट भेजें
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto pb-10 px-4 pt-4 flex flex-col gap-4 max-w-2xl mx-auto w-full"
      >
        {/* Node Identity Banner */}
        <div className="rounded-xl p-4 flex items-center gap-4"
          style={{ background: "rgba(0,210,255,0.04)", border: "1px solid rgba(0,210,255,0.2)", boxShadow: "0 0 20px rgba(0,210,255,0.04)" }}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(0,210,255,0.08)", border: "2px solid rgba(0,210,255,0.25)" }}>
            <Building2 className="w-5 h-5" style={{ color: "#00D2FF" }} />
          </div>
          <div className="flex-1">
            <div className="text-xs font-black text-white tracking-wider">नागरिक अस्पताल (Civil Hospital)</div>
            <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>हॉस्पिटल नोड · फतेहाबाद, हरियाणा · डिस्ट्रिक्ट ग्रिड</div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-center gap-1.5 text-[9px] font-bold" style={{ color: "#22c55e" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              लाइव ऑनलाइन
            </div>
          </div>
        </div>

        {/* e-RaktKosh Sync Banner */}
        <div className="rounded-xl px-3 py-2.5 flex flex-wrap items-center gap-2"
          style={{ background: "rgba(0,210,255,0.04)", border: "1px solid rgba(0,210,255,0.12)" }}>
          <Wifi className="w-3 h-3 shrink-0" style={{ color: "#22c55e" }} />
          <span className="text-[9px] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>राष्ट्रीय ई-रक्तकोश API</span>
          <span className="text-[8px] font-black px-1.5 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>● LIVE SYNC</span>
          <span className="text-[8px] font-bold ml-auto" style={{ color: "rgba(0,210,255,0.5)" }}>ABDM ✔ · LOINC ✔ · DPDP 2023 ✔</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: t("unitsAvailable"), val: "42", icon: <Droplets className="w-4 h-4" />, color: "#00D2FF" },
            { label: t("emergencyRequests"), val: emergencyStep === "requested" ? "3" : "2", icon: <AlertCircle className="w-4 h-4" />, color: "#FF1E27" },
            { label: t("pendingRequests"), val: "7", icon: <Activity className="w-4 h-4" />, color: "rgba(255,255,255,0.6)" },
            { label: t("gridStatus"), val: t("online"), icon: <RadioTower className="w-4 h-4" />, color: "#22c55e" },
          ].map(s => (
            <div key={s.label} className="cyber-card p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] font-bold tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                {s.label}
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Blood Inventory */}
        <div className="cyber-card p-4">
          <div className="text-[9px] font-bold tracking-widest mb-3" style={{ color: "#00D2FF" }}>उपलब्ध स्टॉक (फतेहाबाद ब्लड बैंक)</div>
          <div className="grid grid-cols-4 gap-2">
            {bloodInventory.map(b => (
              <div key={b.type} className="flex flex-col items-center justify-center p-2 rounded-lg"
                style={{ background: b.count === 0 ? "rgba(255,30,39,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${b.count === 0 ? "rgba(255,30,39,0.3)" : "rgba(255,255,255,0.08)"}` }}>
                <span className="text-xs font-bold" style={{ color: b.count === 0 ? "#FF1E27" : "#FF6B6B" }}>{b.type}</span>
                <span className="text-lg font-black text-white">{b.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Sig Emergency Protocol Status */}
        {emergencyStep === "requested" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-4" style={{ background: "rgba(255,30,39,0.06)", border: "1px solid rgba(255,30,39,0.3)", boxShadow: "0 0 20px rgba(255,30,39,0.08)" }}>
            <div className="text-[9px] font-bold tracking-widest mb-3" style={{ color: "#FF1E27" }}>मल्टी-सिग इमरजेंसी प्रोटोकॉल — एक्टिव</div>
            <div className="flex flex-col gap-2">
              {[
                { step: 1, label: "डिस्ट्रिक्ट नोड रिक्वेस्ट सबमिट", status: "done", node: NODE_ID },
                { step: 2, label: "फतेहाबाद मुख्यालय वेरिफिकेशन", status: "pending", node: "FTB-HQ-01" },
                { step: 3, label: "हरियाणा स्टेट ब्लड ग्रिड अप्रूवल", status: "waiting", node: "HR-STATE-GRID" },
              ].map(s => (
                <div key={s.step} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black"
                    style={{
                      background: s.status === "done" ? "rgba(34,197,94,0.15)" : s.status === "pending" ? "rgba(255,30,39,0.12)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${s.status === "done" ? "rgba(34,197,94,0.4)" : s.status === "pending" ? "rgba(255,30,39,0.35)" : "rgba(255,255,255,0.1)"}`,
                      color: s.status === "done" ? "#22c55e" : s.status === "pending" ? "#FF1E27" : "rgba(255,255,255,0.3)",
                    }}>
                    {s.status === "done" ? "✔" : s.step}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold" style={{ color: s.status === "done" ? "#22c55e" : s.status === "pending" ? "#FF1E27" : "rgba(255,255,255,0.3)" }}>{s.label}</div>
                    <div className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>{s.node}</div>
                  </div>
                  {s.status === "pending" && <div className="w-3 h-3 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />}
                  {s.status === "waiting" && <Clock className="w-3 h-3" style={{ color: "rgba(255,255,255,0.2)" }} />}
                  {s.status === "done" && <CheckCircle2 className="w-3 h-3" style={{ color: "#22c55e" }} />}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Event Feed */}
        {recentEvents.length > 0 && (
          <div className="rounded-xl p-3" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,210,255,0.1)" }}>
            <div className="text-[9px] font-bold tracking-widest mb-2" style={{ color: "#00D2FF" }}>लाइव इवेंट फीड</div>
            {recentEvents.map((e, i) => (
              <div key={i} className="text-[9px] font-mono py-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{e}</div>
            ))}
          </div>
        )}

        {/* Emergency Button */}
        <button
          onClick={() => setShowConfirm(true)}
          disabled={emergencyStep === "requested"}
          className="w-full py-4 rounded-xl font-black text-sm tracking-wider uppercase cursor-pointer transition-all flex items-center justify-center gap-2"
          style={{
            background: emergencyStep === "requested" ? "rgba(255,30,39,0.08)" : "rgba(255,30,39,0.12)",
            border: `1px solid ${emergencyStep === "requested" ? "rgba(255,30,39,0.2)" : "rgba(255,30,39,0.5)"}`,
            color: emergencyStep === "requested" ? "rgba(255,30,39,0.4)" : "#FF1E27",
          }}>
          <AlertCircle className="w-5 h-5" />
          {emergencyStep === "requested" ? "आपातकालीन अनुरोध पेंडिंग..." : "आपातकालीन ब्लड अनुरोध (SOS)"}
        </button>
      </motion.div>
    </div>
  );
}
