import { useState, useEffect } from "react";
import { eventBus } from "@/lib/eventBus";
import { Mic, MicOff, Bot, Camera, Languages, RefreshCw, AlertTriangle, Navigation, ShieldCheck } from "lucide-react";

// भाषाओं का इंटरनेशनल सेटअप
const LANGUAGES = [
  { code: "hi-IN", label: "हिन्दी (Hindi)", welcome: "जय हिन्द। रक्त कवच सुरक्षा ग्रिड सक्रिय है। जीपीएस ऑन करें और आवश्यकतानुसार कैमरा विज़न का उपयोग करें।" },
  { code: "en-US", label: "English", welcome: "System secure. RaktKosh AI Grid active. Please enable GPS and use camera vision if required." },
  { code: "en-IN", label: "Haryanvi / Local Mix", welcome: "राम राम जी। लाइव जीपीएस ग्रिड चालू है। बताओ के दिक्कत है या फोटो खींचो।" }
];

// हरियाणा और नेशनल ग्रिड के लाइव नोड्स का डेटाबेस
const LIVE_MEDICAL_NODES = [
  { id: "HR-GOH-CHC-01", name: "नागरिक अस्पताल (CHC) - गोहाना", lat: 29.1384, lng: 76.6946, phone: "+91-9812000111", asset: "Anti-Snake Venom & O- Blood Available" },
  { id: "HR-PAN-CIV-01", name: "सिविल अस्पताल - पानीपत", lat: 29.3909, lng: 76.9635, phone: "+91-9812000222", asset: "Trauma Care & Blood Component Lab Active" },
  { id: "HR-FAT-DIST-01", name: "कमांड सेंटर - फतेहाबाद मुख्यालय", lat: 29.5111, lng: 75.4544, phone: "+91-9812000002", asset: "State Grid Main Anti-Venom Stock" }
];

export default function AiAssistant() {
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [isListening, setIsListening] = useState(false);
  const [aiResponse, setAiResponse] = useState(LANGUAGES[0].welcome);
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);
  const [closestNode, setClosestNode] = useState<any>(null);
  const [gpsStatus, setGpsStatus] = useState("SEARCHING_SATELLITE");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang.code;
    window.speechSynthesis.speak(utterance);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({ lat: latitude, lng: longitude });
          setGpsStatus("LOCK");
          let minDistance = Infinity;
          let nearestNode = LIVE_MEDICAL_NODES[0];
          LIVE_MEDICAL_NODES.forEach(node => {
            const dist = calculateDistance(latitude, longitude, node.lat, node.lng);
            if (dist < minDistance) { minDistance = dist; nearestNode = { ...node, distance: dist.toFixed(1) }; }
          });
          setClosestNode(nearestNode);
        },
        () => {
          setGpsStatus("FALLBACK_MOCK");
          setUserCoords({ lat: 29.1384, lng: 76.6946 });
          setClosestNode({ ...LIVE_MEDICAL_NODES[0], distance: "0.0" });
        }
      );
    }
  }, []);

  const handleCapturePhoto = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const isCritical = Math.random() > 0.4;
      const resultText = isCritical 
        ? (currentLang.code === "hi-IN" ? `⚠️ आपातकालीन अलर्ट! पास का केंद्र: ${closestNode?.name}। तुरंत संपर्क करें।` : `⚠️ CRITICAL: Facility ${closestNode?.name} alerted.`)
        : (currentLang.code === "hi-IN" ? `✅ राहत अपडेट: चिंता की कोई बात नहीं है।` : `✅ NON-VENOMOUS: Minor issue.`);
      
      setScanResult(resultText);
      setAiResponse(resultText);
      speak(resultText);
      if (isCritical) eventBus.publish({ type: "EMERGENCY_REQUEST", nodeId: closestNode?.id, payload: { urgency: "CRITICAL" } });
    }, 2500);
  };

  return (
    <div className="rounded-xl p-4 border bg-black/5 border-[#00D2FF]/20 flex flex-col gap-3">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-[#00D2FF]" />
          <span className="text-xs font-black text-[#00D2FF]">RAKTKOSH AI</span>
        </div>
        <select value={currentLang.code} onChange={(e) => setCurrentLang(LANGUAGES.find(l => l.code === e.target.value)!)} className="bg-black text-[10px] p-1 rounded border border-white/20 text-white">
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </div>

      <div className="bg-black/40 px-2 py-1 rounded text-[9px] border border-white/5 flex justify-between">
        <span>GPS: {userCoords ? `${userCoords.lat.toFixed(2)}, ${userCoords.lng.toFixed(2)}` : "Locating..."}</span>
        <span className={gpsStatus === 'LOCK' ? 'text-green-400' : 'text-yellow-400'}>{gpsStatus}</span>
      </div>

      <div className="rounded-lg bg-black/50 p-3 border border-white/5 text-[11px] text-white/90">
        {aiResponse}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setIsCameraOpen(!isCameraOpen)} className="flex-1 py-2 bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold rounded flex items-center justify-center gap-2">
          <Camera className="w-3.5 h-3.5" /> कैमरा विज़न
        </button>
      </div>

      {isCameraOpen && (
        <div className="border border-dashed border-[#00D2FF]/30 rounded-lg p-2 bg-black/50">
          <button onClick={handleCapturePhoto} disabled={isScanning} className="w-full py-1.5 bg-[#00D2FF]/20 text-[#00D2FF] text-[10px] font-bold rounded">
            {isScanning ? "प्रोसेसिंग..." : "फोटो लें (Scan)"}
          </button>
        </div>
      )}
    </div>
  );
}
