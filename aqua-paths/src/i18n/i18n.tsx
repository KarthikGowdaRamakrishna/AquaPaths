import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../Assests/translations/en.json';
import knTranslation from '../Assests/translations/kn.json';
import frTranslation from '../Assests/translations/fr.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { LOOKUP } from '../Static/lookup';
 
const resources = {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
    kn: { translation: knTranslation }
};
 

 
i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    lng: LOOKUP?.LANGUAGES?.EN,
    fallbackLng: LOOKUP?.LANGUAGES?.EN,
    interpolation: {
        escapeValue: false
    }
});
 
 
export default i18n;