import { Icon, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiMoon, FiSun } from "react-icons/fi";
import ChangerBase from "./changer.base";

const ColorToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <ChangerBase
      ariaLabel={"Toggle color mode"}
      label={colorMode === "light" ? t("Dark Mode") : t("Light Mode")}
      onToggle={toggleColorMode}
    >
      <Icon as={colorMode === "light" ? FiMoon : FiSun} />
    </ChangerBase>
  );
};

export default ColorToggler;
