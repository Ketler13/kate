import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import ru from '../../locale/ru.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: ru
      }
    },
    lng: "ru",
    fallbackLng: "ua",

    interpolation: {
      escapeValue: false
    }
  });