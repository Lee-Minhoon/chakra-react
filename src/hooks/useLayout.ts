import { HorizontalLayout, VerticalLayout } from "@/components";
import { createContext, useContext, useMemo } from "react";

const LayoutContext = createContext<{
  layout: "horizontal" | "vertical";
  toggleLayout: () => void;
}>({
  layout: "vertical",
  toggleLayout: () => {},
});

const useLayout = () => {
  const { layout, toggleLayout } = useContext(LayoutContext);

  const Layout = useMemo(() => {
    return layout === "horizontal" ? HorizontalLayout : VerticalLayout;
  }, [layout]);

  return { Provider: LayoutContext.Provider, layout, toggleLayout, Layout };
};

export default useLayout;
