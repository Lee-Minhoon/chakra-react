import { Box, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <Flex direction={"column"} w={1024} margin={"auto"}>
      <Box
        as={"header"}
        display={"flex"}
        h={20}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading onClick={() => router.push("/")} cursor={"pointer"}>
          Home
        </Heading>
      </Box>
      <Box as={"main"}>{children}</Box>
      <Box as={"footer"}></Box>
    </Flex>
  );
};

export default Layout;
