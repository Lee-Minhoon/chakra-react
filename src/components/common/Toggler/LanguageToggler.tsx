import { Icon } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TbCircleLetterE, TbCircleLetterK } from "react-icons/tb";
import TogglerBase from "./Toggler.base";

const LanguageToggler = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = useCallback<(language: string) => void>(
    (language) => i18n.changeLanguage(language),
    [i18n]
  );

  const handleToggle = useCallback(() => {
    changeLanguage(i18n.language === "ko" ? "en" : "ko");
  }, [changeLanguage, i18n.language]);

  return (
    <TogglerBase
      ariaLabel={"Toggle language"}
      label={i18n.language === "ko" ? t("English") : t("Korean")}
      onToggle={handleToggle}
    >
      <Icon
        as={i18n.language === "ko" ? TbCircleLetterE : TbCircleLetterK}
        w={"5"}
        h={"5"}
      />
    </TogglerBase>
  );
};

export default LanguageToggler;
