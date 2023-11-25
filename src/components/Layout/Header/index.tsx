import { Box, Center, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";

const Header = () => {
  const router = useRouter();

  return (
    <Box
      as={"header"}
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      mb={4}
      pt={10}
    >
      <Center>
        <Heading onClick={() => router.push("/")} cursor={"pointer"}>
          Home
        </Heading>
      </Center>
      <Navbar />
    </Box>
  );
};

export default Header;
