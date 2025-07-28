import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import { commonTranslations, commonRuTranslations, commonDeTranslations } from './i18n/common';
import { navigationEn, navigationRu, navigationDe } from './i18n/navigation';
import { homeEn, homeRu, homeDe } from './i18n/home';
import { diagnosisEn, diagnosisRu, diagnosisDe } from './i18n/diagnosis';
import { profileEn, profileRu, profileDe } from './i18n/profile';

// Combine all translations
const resources = {
  en: {
    translation: {
      ...commonTranslations,
      ...navigationEn,
      ...homeEn,
      ...diagnosisEn,
      ...profileEn
    }
  },
  ru: {
    translation: {
      ...commonRuTranslations,
      ...navigationRu,
      ...homeRu,
      ...diagnosisRu,
      ...profileRu
    }
  },
  de: {
    translation: {
      ...commonDeTranslations,
      ...navigationDe,
      ...homeDe,
      ...diagnosisDe,
      ...profileDe
    }
  }
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
