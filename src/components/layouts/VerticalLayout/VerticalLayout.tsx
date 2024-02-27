import { Box, Flex } from "@chakra-ui/react";
import VerticalLayoutHeader from "./Header/VerticalLayoutHeader";
import VerticalLayoutFooter from "./VerticalLayoutFooter";

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
