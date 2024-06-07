import { Layout } from "@/types";
import { createContext, useContext } from "react";

const LayoutContext = createContext<{
  layout: Layout;
  toggleLayout: () => void;
}>({
  layout: "vertical",
  toggleLayout: () => {},
});

const useLayout = () => {
  const { layout, toggleLayout } = useContext(LayoutContext);

  return { Provider: LayoutContext.Provider, layout, toggleLayout };
};

export default useLayout;
