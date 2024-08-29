import { useLayout } from "@/hooks";
import { useMemo } from "react";
import { HorizontalLayout } from "../horizontal-layout";
import { MobileLayout } from "../mobile-layout";
import { VerticalLayout } from "../vertical-layout";

interface ResponsiveLayoutProps {
  children?: React.ReactNode;
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {
  const { layout } = useLayout();

  const Layout = useMemo(() => {
    switch (layout) {
      case "horizontal":
        return HorizontalLayout;
      case "vertical":
        return VerticalLayout;
      case "mobile":
        return MobileLayout;
      default:
        throw new Error(`Invalid layout: ${layout}`);
    }
  }, [layout]);

  return <Layout>{children}</Layout>;
};

export default ResponsiveLayout;
