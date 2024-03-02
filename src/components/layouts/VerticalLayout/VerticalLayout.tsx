import { Box, Flex } from "@chakra-ui/react";
import VerticalLayoutFooter from "./VerticalLayoutFooter";
import { VerticalLayoutHeader } from "./VerticalLayoutHeader";

interface VerticalLayoutProps {
  children?: React.ReactNode;
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
  return (
    <Flex direction={"column"} align={"center"}>
      <VerticalLayoutHeader />
      <Box as={"main"} w={1280}>
        {children}
      </Box>
      <VerticalLayoutFooter />
    </Flex>
  );
};

export default VerticalLayout;
