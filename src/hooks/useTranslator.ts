import { createContext, useContext } from "react";

type Language = "ko" | "en";

const TranslatorContext = createContext<{
  language: Language | string;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
}>({
  language: "ko",
  changeLanguage: () => {},
  t: (key: string) => key,
});

const useTranslator = () => {
  const { language, changeLanguage, t } = useContext(TranslatorContext);

  return { Provider: TranslatorContext.Provider, language, changeLanguage, t };
};

export default useTranslator;
