import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface VerticalLayoutProps {
  children?: React.ReactNode;
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
  return (
    <Flex>
      <Sidebar />
      <Flex flex={1} direction={"column"} p={4} gap={4} maxH={"100vh"}>
        <Header />
        <Box as={"main"} flex={1} overflow={"hidden"}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default VerticalLayout;
