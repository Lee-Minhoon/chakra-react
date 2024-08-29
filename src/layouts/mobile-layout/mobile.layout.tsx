import { Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Footer, SubHeader } from "../common";
import MobileLayoutHeader from "./mobile-layout.header";
import MobileLayoutNav from "./mobile-layout.nav";

interface MobileLayoutProps {
  children?: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <Flex direction={{ base: "column", lg: "row" }} minH={"100vh"}>
      <MobileLayoutHeader onClick={handleSidebarOpen} />
      <MobileLayoutNav isOpen={isSidebarOpen} onClose={handleSidebarOpen} />
      <Flex
        flex={1}
        direction={"column"}
        p={"4"}
        gap={"4"}
        maxH={{ base: "initial", lg: "100vh" }}
        overflow={"hidden"}
      >
        <SubHeader />
        <Flex as={"main"} flex={1} direction={"column"} overflow={"hidden"}>
          {children}
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MobileLayout;
