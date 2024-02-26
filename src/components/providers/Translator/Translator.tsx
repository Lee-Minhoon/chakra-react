import { I18nextProvider } from "react-i18next";
import config from "./config";

interface TranslatorProps {
  children: React.ReactNode;
}

const Translator = ({ children }: TranslatorProps) => {
  return <I18nextProvider i18n={config}>{children}</I18nextProvider>;
};

export default Translator;
