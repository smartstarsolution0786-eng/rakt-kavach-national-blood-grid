import React, { createContext, useContext, useState, ReactNode } from 'react';

export const dictionary: Record<string, Record<string, string>> = {
  EN: {
    title: "Rakt Kavach • National Blood Grid",
    tagline: "Connecting citizens, blood banks and hospitals in real-time.",
    donorLogin: "Donor Login",
    transfer: "Unit Transfer",
    available: "Available Units"
  },
  HI: {
    title: "रक्त कवच • राष्ट्रीय रक्त ग्रिड",
    tagline: "नागरिकों, ब्लड बैंकों और अस्पतालों को वास्तविक समय में जोड़ना।",
    donorLogin: "डोनर लॉगिन",
    transfer: "यूनिट स्थानांतरण",
    available: "उपलब्ध ब्लड यूनिट्स"
  }
};

interface LanguageContextProps {
  language: 'EN' | 'HI';
  setLanguage: (lang: 'EN' | 'HI') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'EN' | 'HI'>('HI');

  const setLanguage = (lang: 'EN' | 'HI') => setLanguageState(lang);
  const t = (key: string) => dictionary[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation का उपयोग LanguageProvider के भीतर होना चाहिए");
  return context;
};
