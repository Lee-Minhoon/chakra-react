import { Box, Flex } from "@chakra-ui/react";
import { Footer } from "../common";
import { VerticalLayoutHeader } from "./VerticalLayoutHeader";

interface VerticalLayoutProps {
  children?: React.ReactNode;
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
  return (
    <Flex direction={"column"} align={"center"}>
      <VerticalLayoutHeader />
      <Box as={"main"} w={{ base: "100%", xl: "container.xl" }}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default VerticalLayout;
