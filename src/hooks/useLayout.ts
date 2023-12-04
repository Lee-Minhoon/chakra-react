import { HorizontalLayout, VerticalLayout } from "@/components";
import { useAppStore } from "@/stores/app";
import { Fragment, useEffect, useMemo, useState } from "react";

const useLayout = () => {
  const { layout, toggleLayout } = useAppStore(["layout", "toggleLayout"]);
  const [isHydrated, setIsHydrated] = useState(false);

  const Layout = useMemo(() => {
    return isHydrated
      ? layout === "horizontal"
        ? HorizontalLayout
        : VerticalLayout
      : Fragment;
  }, [isHydrated, layout]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    Layout,
    layout,
    toggleLayout,
  };
};

export default useLayout;
