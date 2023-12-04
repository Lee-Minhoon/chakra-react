import { useAppStore } from "@/stores/app";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { BsLayoutSidebar } from "react-icons/bs";

const LayoutMode = () => {
  const { layout, toggleLayout } = useAppStore(["layout", "toggleLayout"]);

  return (
    <Tooltip
      label={layout === "horizontal" ? "Vertical Layout" : "Horizontal Layout"}
      placement={"auto"}
    >
      <IconButton aria-label={"theme"} onClick={toggleLayout} size={"sm"}>
        <Icon
          as={BsLayoutSidebar}
          transform={layout === "horizontal" ? "none" : "rotate(90deg)"}
        />
      </IconButton>
    </Tooltip>
  );
};

export default LayoutMode;
