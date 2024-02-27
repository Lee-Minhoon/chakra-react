import { Icon, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiMoon, FiSun } from "react-icons/fi";
import TogglerBase from "./Toggler.base";

const ColorToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <TogglerBase
      ariaLabel={"Toggle color mode"}
      label={colorMode === "light" ? t("Dark Mode") : t("Light Mode")}
      onToggle={toggleColorMode}
    >
      <Icon as={colorMode === "light" ? FiMoon : FiSun} />
    </TogglerBase>
  );
};

export default ColorToggler;
