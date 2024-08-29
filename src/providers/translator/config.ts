import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../../locales/en/translation.json";
import ko from "../../../locales/ko/translation.json";

const resources = {
  ko: { translation: ko },
  en: { translation: en },
};

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  debug: false,
  resources,
});

export default i18next;
