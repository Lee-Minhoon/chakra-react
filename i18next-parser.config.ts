import { UserConfig } from "i18next-parser";

const config: UserConfig = {
  locales: ["ko", "en"],
  defaultValue: (locale, namespace, key) => {
    if (locale === "ko" || !key) return "";
    return key;
  },
  input: ["src/**/*.{ts,tsx}"],
  output: "locales/$LOCALE/$NAMESPACE.json",
  sort: true,
};

export default config;
