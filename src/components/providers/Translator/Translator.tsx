import { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import config from "./config";

interface TranslatorProps {
  children: React.ReactNode;
}

const Translator = ({ children }: TranslatorProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) i18n.changeLanguage(language);
  }, [i18n]);

  return <I18nextProvider i18n={config}>{children}</I18nextProvider>;
};

export default Translator;
