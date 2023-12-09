import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface VerticalLayoutProps {
  children: React.ReactNode;
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
  return (
    <Flex>
      <Sidebar />
      <Box as={"main"} flex={1} p={4} maxH={"100vh"}>
        <Header />
        {children}
      </Box>
    </Flex>
  );
};

export default VerticalLayout;
