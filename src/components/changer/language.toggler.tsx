import { Icon } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TbCircleLetterE, TbCircleLetterK } from "react-icons/tb";
import ChangerBase from "./changer.base";

const LanguageToggler = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = useCallback<(language: string) => void>(
    (language) => {
      i18n.changeLanguage(language);
      localStorage.setItem("language", language);
    },
    [i18n]
  );

  const handleToggle = useCallback(() => {
    changeLanguage(i18n.language === "ko" ? "en" : "ko");
  }, [changeLanguage, i18n.language]);

  return (
    <ChangerBase
      ariaLabel={"Toggle language"}
      label={i18n.language === "ko" ? t("English") : t("Korean")}
      onToggle={handleToggle}
    >
      <Icon
        as={i18n.language === "ko" ? TbCircleLetterE : TbCircleLetterK}
        w={"5"}
        h={"5"}
      />
    </ChangerBase>
  );
};

export default LanguageToggler;
