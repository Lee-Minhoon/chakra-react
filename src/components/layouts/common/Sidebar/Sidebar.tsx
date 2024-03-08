import { useAlphaColor } from "@/hooks";
import { Box, Divider } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  const alphaColor = useAlphaColor();

  return (
    <Box
      as={"aside"}
      display={"flex"}
      flexDirection={"column"}
      bgColor={alphaColor(50)}
      w={{ base: "64", lg: "24", xl: "64" }}
      p={"4"}
      h={"100vh"}
    >
      <SidebarHeader />
      <Divider />
      <Navbar />
      <SidebarFooter />
    </Box>
  );
};

export default Sidebar;
