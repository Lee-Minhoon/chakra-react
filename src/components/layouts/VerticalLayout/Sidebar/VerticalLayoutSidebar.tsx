import useBgColor from "@/hooks/useBgColor";
import { Box, Divider } from "@chakra-ui/react";
import { VerticalLayoutNavbar } from "./Navbar";
import VerticalLayoutSidebarFooter from "./VerticalLayoutSidebarFooter";
import VerticalLayoutSidebarHeader from "./VerticalLayoutSidebarHeader";

const VerticalLayoutSidebar = () => {
  const bgColor = useBgColor();

  return (
    <Box
      as={"aside"}
      display={"flex"}
      flexDirection={"column"}
      bgColor={bgColor(50)}
      w={{ base: 24, xl: 64 }}
      p={4}
      h={"100vh"}
      ml={{ base: -24, lg: 0 }}
      transition={"margin-left 0.3s ease-in-out"}
    >
      <VerticalLayoutSidebarHeader />
      <Divider />
      <VerticalLayoutNavbar />
      <VerticalLayoutSidebarFooter />
    </Box>
  );
};

export default VerticalLayoutSidebar;
