export type EventType =
  | "EMERGENCY_REQUEST"
  | "NATIONAL_VALIDATE"
  | "WHO_APPROVE"
  | "EMERGENCY_BROADCAST"
  | "NODE_REGISTERED"
  | "BLOOD_TRANSFERRED"
  | "INTEGRITY_LOG"
  | "BIOMETRIC_VERIFIED"
  | "AI_VOICE_SUGGESTION"    // 🤖 एआई वॉइस असिस्टेंट के लिए नया इवेंट हूक
  | "CHAIN_ALERT_TRIGGER";   // ⛓️ ब्लॉक से WHO तक की मॉनिटरिंग चेन के लिए

// सख्त पेलोड इंटरफेस ताकि फ़ोन नंबर और नजदीकी मैपिंग मिस न हो
export interface EventPayload {
  sourceNode?: string;
  targetNode?: string;
  bloodType?: string;
  urgency?: "LOW" | "MODERATE" | "CRITICAL";
  validated?: boolean;
  approved?: boolean;
  phoneContacts?: string[];   // 📞 लाइव फ़ोन नंबरों का एरे जो ग्रिड सिंक रखेगा
  locationCoords?: { lat: number; lng: number }; // 📍 नजदीकी अस्पताल ढूंढने के लिए
  chainTrace?: string[];      // ⛓️ [BLOCK_PHC, DIST_CHC, STATE_GRID, NATL, WHO]
  aiTextOutput?: string;     // 🗣️ एआई द्वारा बोला जाने वाला सुझाव टेक्स्ट
  [key: string]: unknown;
}

export interface RaktEvent {
  type: EventType;
  payload: EventPayload;
  timestamp: string;
  nodeId: string;
}

type Listener = (event: RaktEvent) => void;

class EventBus {
  private listeners: Map<string, Listener[]> = new Map();
  private eventLog: RaktEvent[] = [];

  publish(event: Omit<RaktEvent, "timestamp">): void {
    // इंटरनेशनल लोड के लिए ऑटोमैटिक चेन ट्रेसिंग इंजेक्ट करना
    const currentChain = event.payload.chainTrace ?? [];
    if (event.nodeId && !currentChain.includes(event.nodeId)) {
      currentChain.push(event.nodeId);
    }

    const full: RaktEvent = { 
      ...event, 
      payload: { ...event.payload, chainTrace: currentChain },
      timestamp: new Date().toISOString() 
    };

    // इन-मेमोरी लॉग साइज को 100 फ़ॉर्मेट के लिए 199 से बढ़ाकर 999 किया गया ताकि डेटा लॉस न हो
    this.eventLog = [...this.eventLog.slice(-999), full];
    
    (this.listeners.get(event.type) ?? []).forEach(fn => fn(full));
    (this.listeners.get("*") ?? []).forEach(fn => fn(full));
  }

  subscribe(type: EventType | "*", fn: Listener): () => void {
    const prev = this.listeners.get(type) ?? [];
    this.listeners.set(type, [...prev, fn]);
    return () => {
      const cur = this.listeners.get(type) ?? [];
      this.listeners.set(type, cur.filter(l => l !== fn));
    };
  }

  getLog(): RaktEvent[] {
    return [...this.eventLog];
  }

  // विशिष्ट स्तर (जैसे केवल WHO या केवल ब्लॉक) की चेन को मॉनिटर करने का नया स्केलेबल फ़ंक्शन
  filterChainByLevel(levelId: string): RaktEvent[] {
    return this.eventLog.filter(e => e.payload.chainTrace?.includes(levelId));
  }
}

export const eventBus = new EventBus();
