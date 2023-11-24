import { PageRoutes } from "@/constants";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
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
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={4}
        bgColor={"gray.100"}
        mb={4}
        py={10}
      >
        <Heading onClick={() => router.push("/")} cursor={"pointer"}>
          Home
        </Heading>
        <Flex gap={4}>
          <Button
            onClick={() => router.push({ pathname: PageRoutes.UsersAll })}
          >
            Users
          </Button>
          <Button onClick={() => router.push({ pathname: "/posts" })}>
            Posts
          </Button>
        </Flex>
      </Box>
      <Box as={"main"}>{children}</Box>
      <Box as={"footer"}></Box>
    </Flex>
  );
};

export default Layout;
