import { Icon, IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiMoon, FiSun } from "react-icons/fi";

const ColorToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <Tooltip
      hasArrow
      label={colorMode === "light" ? t("Dark Mode") : t("Light Mode")}
    >
      <IconButton aria-label={"color"} onClick={toggleColorMode} size={"sm"}>
        <Icon as={colorMode === "light" ? FiMoon : FiSun} />
      </IconButton>
    </Tooltip>
  );
};

export default ColorToggler;
