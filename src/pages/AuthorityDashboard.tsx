import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, UserCheck, AlertOctagon, Radio } from "lucide-react";

// 1. डोनर डेटाबेस
const DONOR_DATABASE = [
  { id: "DN-9942", name: "नवदीप", status: "CHECKUP_REQUIRED", location: "भुना ब्लॉक" },
  { id: "DN-1105", name: "अमित", status: "STABLE", location: "फतेहाबाद" },
  { id: "DN-2281", name: "सुरेश", status: "CHECKUP_REQUIRED", location: "भुना ब्लॉक" },
];

const IMPACT_LOGS = [
  { donorId: "DN-9942", receiverId: "PAT-7721", message: "आपकी यूनिट से एक जीवन बचा! रिसीवर ने आभार भेजा है।" },
];

export default function AuthorityDashboard() {
  const { t } = useLanguage();
  const [currentLevel, setCurrentLevel] = useState<"WHO" | "NATIONAL" | "STATE" | "DISTRICT" | "BLOCK">("WHO");

  // नया: SOS मॉड्यूल (इसे भी डैशबोर्ड में जोड़ दिया है)
  const EmergencySOSModule = () => (
    <div className="bg-red-950/20 border border-red-900/50 p-6 rounded-xl mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-red-500 font-black text-xs uppercase flex items-center gap-2">
          <AlertOctagon size={14} /> इमरजेंसी रिस्पांस (SOS)
        </h2>
        <button className="bg-red-600 text-white text-[10px] px-4 py-1.5 rounded-full font-black animate-pulse">
          SOS सक्रिय करें
        </button>
      </div>
      <p className="text-zinc-400 text-[10px]">सिस्टम स्टैंडबाय मोड में है। किसी भी ब्लॉक से अलर्ट आने पर यहाँ दिखाई देगा।</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020613] p-6 text-white">
      <h1 className="text-2xl font-black mb-2">Authority Dashboard</h1>
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-6">सुपर एडमिन ऑडिट पैनल | मानवता और पारदर्शिता</p>

      {/* SOS मॉड्यूल यहाँ आ गया */}
      <EmergencySOSModule />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 bg-zinc-950 p-4 border border-zinc-800 rounded-xl">
        {[
          { label: "नेटवर्क स्टेबिलिटी", value: "99.9%", color: "text-emerald-400" },
          { label: "जीवन रक्षक इकाइयाँ", value: "1,240", color: "text-pink-500" },
          { label: "सक्रिय वेलनेस", value: "88", color: "text-cyan-400" },
          { label: "सुपर डोनर इंगेजमेंट", value: "94%", color: "text-white" },
        ].map((stat, i) => (
          <div key={i} className="p-3 border border-zinc-900 rounded-lg bg-black/40">
            <p className="text-[9px] text-zinc-500 uppercase">{stat.label}</p>
            <p className={`text-lg font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* इम्पैक्ट कनेक्शन */}
      <div className="mb-8 p-4 border border-pink-900/30 bg-pink-900/5 rounded-xl">
        <h2 className="text-[10px] font-black text-pink-500 uppercase mb-2 flex items-center gap-2">
          <Heart size={12} /> रीयल-टाइम इम्पैक्ट (जीवन का आभार)
        </h2>
        {IMPACT_LOGS.map((log, i) => (
          <div key={i} className="text-[11px] text-zinc-300 italic">
            ✅ डोनर <span className="text-white font-bold">{log.donorId}</span> ➔ रिसीवर {log.receiverId}: <span className="text-pink-300">{log.message}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-zinc-800">
        {(["WHO", "NATIONAL", "STATE", "DISTRICT", "BLOCK"] as const).map((lvl) => (
          <button key={lvl} onClick={() => setCurrentLevel(lvl)} className={`text-[10px] font-black px-4 py-2 rounded border ${currentLevel === lvl ? "bg-white/10 border-white/20" : "border-transparent text-zinc-600"}`}>
            {lvl}
          </button>
        ))}
      </div>

      <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/20">
        <h2 className="text-sm font-black text-zinc-300 uppercase mb-4">{currentLevel} स्तर की रिपोर्टिंग</h2>
        {currentLevel === "BLOCK" && (
          <div className="space-y-4">
            {DONOR_DATABASE.filter(d => d.status === "CHECKUP_REQUIRED").map((donor) => (
              <div key={donor.id} className="p-4 border border-red-900/30 bg-red-900/5 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-white">{donor.name} ({donor.id})</p>
                  <p className="text-[9px] text-red-400">स्वास्थ्य चेकअप लंबित: {donor.location}</p>
                </div>
                <button className="text-[10px] bg-red-600/20 text-red-500 px-3 py-1 rounded border border-red-500/20">
                  हॉस्पिटल स्लॉट भेजें
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
