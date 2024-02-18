import useLayout from "@/hooks/useLayout";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { BsLayoutSidebar } from "react-icons/bs";

const LayoutMode = () => {
  const { layout, toggleLayout } = useLayout();

  return (
    <Tooltip
      hasArrow
      label={layout === "horizontal" ? "Vertical Layout" : "Horizontal Layout"}
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

export default LayoutMode;
