import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Globe, Mic, ShieldAlert, X } from "lucide-react";

interface AIGuardianProps { onClose: () => void; }

export default function AIGuardian({ onClose }: AIGuardianProps) {
  const [cameraState, setCameraState] = useState<"idle" | "starting" | "ready" | "denied">("idle");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraState("idle");
  }, []);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraState("denied");
      return;
    }
    setCameraState("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState("ready");
    } catch {
      setCameraState("denied");
    }
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#020613] text-white">
      <header className="flex items-center justify-between border-b border-cyan-300/15 bg-black/50 px-4 py-3">
        <button onClick={onClose} className="text-white/50 hover:text-white"><X className="h-5 w-5" /></button>
        <div className="text-center"><div className="flex items-center justify-center gap-2 text-sm font-black tracking-widest text-cyan-300"><ShieldAlert className="h-4 w-4" /> AI GUARDIAN</div><div className="text-[9px] text-white/35">CAMERA ASSISTANCE · MODEL NOT CONNECTED</div></div>
        <button onClick={() => setVoiceEnabled((value) => !value)} className={`rounded-lg border px-2 py-1 text-[10px] font-bold ${voiceEnabled ? "border-amber-300/40 text-amber-200" : "border-white/10 text-white/40"}`}><Mic className="mr-1 inline h-3 w-3" />{voiceEnabled ? "ON" : "VOICE"}</button>
      </header>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        <div className="relative h-64 overflow-hidden rounded-2xl border border-cyan-300/20 bg-black">
          {cameraState === "ready" ? <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" /> : <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-white/40"><CameraOff className="h-10 w-10" /><p className="max-w-xs text-xs">{cameraState === "denied" ? "Camera permission is unavailable." : "Start the camera only when you are ready."}</p></div>}
          <div className="pointer-events-none absolute inset-3 rounded-xl border border-cyan-300/30" />
        </div>
        <button onClick={cameraState === "ready" ? stopCamera : startCamera} disabled={cameraState === "starting"} className="flex items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/10 py-3 text-sm font-black text-cyan-200 disabled:opacity-50">
          <Camera className="h-4 w-4" />{cameraState === "starting" ? "Starting camera…" : cameraState === "ready" ? "Stop camera" : "Start camera"}
        </button>
        <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.04] p-4">
          <div className="flex items-center gap-2 text-xs font-black text-amber-200"><Globe className="h-4 w-4" /> Analysis unavailable</div>
          <p className="mt-2 text-xs leading-relaxed text-white/50">No medical model is bundled with this deployment. The camera preview is local only; this screen never invents a diagnosis, confidence score, injury type, or treatment result.</p>
        </div>
        <p className="text-center text-[10px] leading-relaxed text-white/30">For an emergency, contact local emergency services and a qualified clinician. Camera and microphone permissions can be revoked at any time.</p>
      </main>
    </div>
  );
}