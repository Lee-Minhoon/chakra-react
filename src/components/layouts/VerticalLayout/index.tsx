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
      <Flex
        flex={1}
        direction={"column"}
        p={8}
        gap={4}
        maxH={"100vh"}
        overflow={"hidden"}
      >
        <Header />
        <Flex as={"main"} flex={1} direction={"column"} overflow={"hidden"}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerticalLayout;
