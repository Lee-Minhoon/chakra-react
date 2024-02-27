import { Flex } from "@chakra-ui/react";
import { VerticalLayoutSidebar } from "./Sidebar";
import VerticalLayoutHeader from "./VerticalLayoutHeader";

interface VerticalLayoutProps {
  children?: React.ReactNode;
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
  return (
    <Flex>
      <VerticalLayoutSidebar />
      <Flex
        flex={1}
        direction={"column"}
        p={8}
        gap={4}
        maxH={"100vh"}
        overflow={"hidden"}
      >
        <VerticalLayoutHeader />
        <Flex as={"main"} flex={1} direction={"column"} overflow={"hidden"}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerticalLayout;
