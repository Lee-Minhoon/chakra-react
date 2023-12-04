import { HorizontalLayout, LayoutContext, VerticalLayout } from "@/components";
import { useContext, useMemo } from "react";

const useLayout = () => {
  const { layout, toggleLayout } = useContext(LayoutContext);

  const Layout = useMemo(() => {
    return layout === "horizontal" ? HorizontalLayout : VerticalLayout;
  }, [layout]);

  return { layout, toggleLayout, Layout };
};

export default useLayout;
