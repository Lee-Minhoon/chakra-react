import { HorizontalLayout, VerticalLayout } from "@/components";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

const useLayout = () => {
  const router = useRouter();

  const layout = useMemo(() => {
    return router.query.layout === "horizontal" ? "horizontal" : "vertical";
  }, [router.query.layout]);

  const toggleLayout = useCallback(() => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        layout:
          router.query.layout === "horizontal" ? "vertical" : "horizontal",
      },
    });
  }, [router]);

  const Layout = useMemo(() => {
    return layout === "horizontal" ? HorizontalLayout : VerticalLayout;
  }, [layout]);

  return {
    layout,
    toggleLayout,
    Layout,
  };
};

export default useLayout;
