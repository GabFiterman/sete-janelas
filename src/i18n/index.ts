import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptBR from './locales/pt-BR.yaml';
import enUS from './locales/en-US.yaml';

const currentLanguage = sessionStorage.getItem('i18nextLng') || 'pt-BR';

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': {
      translation: ptBR,
    },
    'en-US': {
      translation: enUS,
    },
  },
  lng: currentLanguage,
  fallbackLng: 'pt-BR',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

i18n.on('languageChanged', (lng) => {
  sessionStorage.setItem('i18nextLng', lng);
});

export default i18n;
