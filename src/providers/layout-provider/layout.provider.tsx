import { useBreakpointValue, useLayout } from "@/hooks";
import { Layout } from "@/types";
import { useCallback, useState } from "react";

interface LayoutProviderProps {
  children: React.ReactNode;
}

const getInitialLayout = () => {
  return (localStorage.getItem("layout") as Layout) || "vertical";
};

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const { Provider } = useLayout();
  const [layout, setLayout] = useState<Layout>(getInitialLayout);

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const toggleLayout = useCallback(() => {
    setLayout((prev) => {
      const nextLayout = prev === "horizontal" ? "vertical" : "horizontal";
      localStorage.setItem("layout", nextLayout);
      return nextLayout;
    });
  }, []);

  return (
    <Provider value={{ layout: isMobile ? "mobile" : layout, toggleLayout }}>
      {children}
    </Provider>
  );
};

export default LayoutProvider;
