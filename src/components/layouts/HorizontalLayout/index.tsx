import { Box, Flex } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex direction={"column"} align={"center"}>
      <Header />
      <Box as={"main"} w={1280}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
