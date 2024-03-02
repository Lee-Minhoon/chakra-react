import { Flex } from "@chakra-ui/react";
import HorizontalLayoutHeader from "./HorizontalLayoutHeader";
import { HorizontalLayoutSidebar } from "./HorizontalLayoutSidebar";

interface HorizontalLayoutProps {
  children?: React.ReactNode;
}

const HorizontalLayout = ({ children }: HorizontalLayoutProps) => {
  return (
    <Flex>
      <HorizontalLayoutSidebar />
      <Flex
        flex={1}
        direction={"column"}
        p={"8"}
        gap={"4"}
        maxH={"100vh"}
        overflow={"hidden"}
      >
        <HorizontalLayoutHeader />
        <Flex as={"main"} flex={1} direction={"column"} overflow={"hidden"}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HorizontalLayout;
