import { Box, Flex } from "@chakra-ui/react";
import HorizontalLayoutFooter from "./HorizontalLayoutFooter";
import HorizontalLayoutHeader from "./Header/HorizontalLayoutHeader";

interface HorizontalLayoutProps {
  children?: React.ReactNode;
}

const HorizontalLayout = ({ children }: HorizontalLayoutProps) => {
  return (
    <Flex direction={"column"} align={"center"}>
      <HorizontalLayoutHeader />
      <Box as={"main"} w={1280}>
        {children}
      </Box>
      <HorizontalLayoutFooter />
    </Flex>
  );
};

export default HorizontalLayout;
