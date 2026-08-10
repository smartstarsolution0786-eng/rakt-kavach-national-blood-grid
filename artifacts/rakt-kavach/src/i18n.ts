import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Rakt Kavach",
      "donor_wallet": "Donor Wallet",
      "emergency_request": "Emergency Blood Request",
      "select_language": "Select Language"
    }
  },
  hi: {
    translation: {
      "welcome": "रक्त कवच में आपका स्वागत है",
      "donor_wallet": "डोनर वॉलेट",
      "emergency_request": "इमरजेंसी ब्लड रिक्वेस्ट",
      "select_language": "भाषा चुनें"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
