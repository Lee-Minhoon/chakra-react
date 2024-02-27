import { useLayout } from "@/hooks";
import { Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BsLayoutSidebar } from "react-icons/bs";
import TogglerBase from "./Toggler.base";

const LayoutToggler = () => {
  const { layout, toggleLayout } = useLayout();
  const { t } = useTranslation();

  return (
    <TogglerBase
      ariaLabel={"Toggle layout"}
      label={
        layout === "horizontal" ? t("Vertical Layout") : t("Horizontal Layout")
      }
      onToggle={toggleLayout}
    >
      <Icon
        as={BsLayoutSidebar}
        transform={layout === "horizontal" ? "none" : "rotate(90deg)"}
      />
    </TogglerBase>
  );
};

export default LayoutToggler;
