function rand(len: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: len }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function getOrCreate(key: string, prefix: string): string {
  try {
    const stored = sessionStorage.getItem(key);
    if (stored) return stored;
    const id = `${prefix}-${rand(4)}`;
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return `${prefix}-${rand(4)}`;
  }
}

// 📞 इंटरनेशनल शो फॉर्मेट के अनुसार लाइव फ़ोन नंबर, नोड नाम और लोकेशन का मास्टर डेटाबेस
export interface NodeRegistryDetails {
  id: string;
  name: string;
  level: "BLOCK" | "DISTRICT" | "STATE" | "NATIONAL" | "WHO";
  phone: string;         // 📞 लाइव इमरजेंसी फ़ोन नंबर
  coords: { lat: number; lng: number }; // 📍 नजदीकी मैपिंग के लिए लोकेशन
}

export const nodeRegistry: Record<string, NodeRegistryDetails> = {
  // ⛓️ ब्लॉक से लेकर डब्ल्यूएचओ तक की पूरी 5-लेवल चेन (हरियाणा / फतेहाबाद स्पेसिफिक)
  "HR-FAT-BLOCK-01": {
    id: "HR-FAT-BLOCK-01",
    name: "Fatehabad Block PHC/CHC Node",
    level: "BLOCK",
    phone: "+919812000001", // हरियाणा लोकल नोड फ़ोन
    coords: { lat: 29.5111, lng: 75.4549 }
  },
  "HR-FAT-DIST-01": {
    id: "HR-FAT-DIST-01",
    name: "Fatehabad District Command Hospital",
    level: "DISTRICT",
    phone: "+919812000002",
    coords: { lat: 29.5186, lng: 75.4556 }
  },
  "HR-STATE-GRID": {
    id: "HR-STATE-GRID",
    name: "Haryana Blood Grid HQ (Panchkula)",
    level: "STATE",
    phone: "+911722500001",
    coords: { lat: 30.6942, lng: 76.8606 }
  },
  "NATL-AUTH-001": {
    id: "NATL-AUTH-001",
    name: "National e-RaktKosh Command Center (Delhi)",
    level: "NATIONAL",
    phone: "+911123000001",
    coords: { lat: 28.6139, lng: 77.2090 }
  },
  "WHO-IN-007": {
    id: "WHO-IN-007",
    name: "WHO South-East Asia Blood Grid Node",
    level: "WHO",
    phone: "+911143000001",
    coords: { lat: 28.6250, lng: 77.2350 }
  }
};

export const nodeIds = {
  // रैंडम आईडी के साथ-साथ ये अब स्केलेबल रीजंस को सपोर्ट करते हैं
  hospital: () => getOrCreate("rktk_hosp_id", "HR-FAT-DIST"),
  lab: () => getOrCreate("rktk_lab_id", "HR-FAT-LAB"),
  clinic: () => getOrCreate("rktk_clin_id", "HR-FAT-BLOCK"),
  authority: () => "HR-STATE-GRID", // स्टेट ग्रिड अथॉरिटी नोड फिक्स
  who: () => "WHO-IN-007",          // डब्ल्यूएचओ नोड फिक्स
  donor: () => "RKTK-7X9P-2D4F",

  // 📍 नजदीकी नोड खोजने का इंटरनेशनल एल्गोरिदम (Haversine Formula)
  getNearbyNodes: (currentLat: number, currentLng: number, maxDistanceKm: number = 50) => {
    return Object.values(nodeRegistry).filter(node => {
      const R = 6371; // पृथ्वी की त्रिज्या (Km)
      const dLat = (node.coords.lat - currentLat) * Math.PI / 180;
      const dLng = (node.coords.lng - currentLng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(currentLat * Math.PI / 180) * Math.cos(node.coords.lat * Math.PI / 180) * 
        Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      return distance <= maxDistanceKm;
    });
  },

  // 📞 किसी भी नोड आईडी का लाइव फ़ोन नंबर निकालने का फ़ंक्शन
  getContactNumber: (id: string): string => {
    return nodeRegistry[id]?.phone || "+919812000000"; // डिफॉल्ट हरियाणा ग्रिड हेल्पलाइन
  }
};
