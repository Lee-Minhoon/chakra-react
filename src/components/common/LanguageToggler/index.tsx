import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TbCircleLetterE, TbCircleLetterK } from "react-icons/tb";

const LanguageToggler = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = useCallback<(language: string) => void>(
    (language) => i18n.changeLanguage(language),
    [i18n]
  );

  const handleClick = useCallback(() => {
    changeLanguage(i18n.language === "ko" ? "en" : "ko");
  }, [changeLanguage, i18n.language]);

  return (
    <Tooltip
      hasArrow
      label={i18n.language === "ko" ? t("English") : t("Korean")}
    >
      <IconButton aria-label={"layout"} onClick={handleClick} size={"sm"}>
        <Icon
          as={i18n.language === "ko" ? TbCircleLetterE : TbCircleLetterK}
          w={"5"}
          h={"5"}
        />
      </IconButton>
    </Tooltip>
  );
};

export default LanguageToggler;
