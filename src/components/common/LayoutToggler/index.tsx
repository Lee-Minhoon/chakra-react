import { useLayout } from "@/hooks";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BsLayoutSidebar } from "react-icons/bs";

const LayoutToggler = () => {
  const { layout, toggleLayout } = useLayout();
  const { t } = useTranslation();

  return (
    <Tooltip
      hasArrow
      label={
        layout === "horizontal" ? t("Vertical Layout") : t("Horizontal Layout")
      }
    >
      <IconButton aria-label={"layout"} onClick={toggleLayout} size={"sm"}>
        <Icon
          as={BsLayoutSidebar}
          transform={layout === "horizontal" ? "none" : "rotate(90deg)"}
        />
      </IconButton>
    </Tooltip>
  );
};

export default LayoutToggler;
