import { Box, Flex } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex direction={"column"} w={1024} margin={"auto"}>
      <Header />
      <Box as={"main"}>{children}</Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
