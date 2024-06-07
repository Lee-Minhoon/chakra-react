import { useLayout } from "@/hooks";
import { Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BsLayoutSidebar } from "react-icons/bs";
import ChangerBase from "./changer.base";

const LayoutToggler = () => {
  const { layout, toggleLayout } = useLayout();
  const { t } = useTranslation();

  return (
    <ChangerBase
      ariaLabel={"Toggle layout"}
      label={
        layout === "horizontal" ? t("Vertical Layout") : t("Horizontal Layout")
      }
      onToggle={toggleLayout}
    >
      <Icon
        as={BsLayoutSidebar}
        transform={layout === "horizontal" ? "rotate(90deg)" : "none"}
      />
    </ChangerBase>
  );
};

export default LayoutToggler;
