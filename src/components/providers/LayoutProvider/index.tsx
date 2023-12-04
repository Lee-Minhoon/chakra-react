import { createContext, useCallback, useEffect, useState } from "react";

interface LayoutProviderProps {
  children: React.ReactNode;
}

type Layout = "horizontal" | "vertical";

export const LayoutContext = createContext<{
  layout: Layout;
  toggleLayout: () => void;
}>({
  layout: "vertical",
  toggleLayout: () => {},
});

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [layout, setLayout] = useState<Layout>("vertical");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const layout = localStorage.getItem("layout") as Layout;
    if (layout) setLayout(layout);
    setIsHydrated(true);
  }, []);

  const toggleLayout = useCallback(() => {
    setLayout((prev) => {
      const nextLayout = prev === "horizontal" ? "vertical" : "horizontal";
      localStorage.setItem("layout", nextLayout);
      return nextLayout;
    });
  }, []);

  return (
    <LayoutContext.Provider value={{ layout, toggleLayout }}>
      {isHydrated && children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
