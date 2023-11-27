import { useGetMe, useSignout } from "@/apis/auth";
import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Navbar from "./Navbar";

const Header = () => {
  const router = useRouter();
  const { data } = useGetMe();
  const { mutate: signout } = useSignout();

  return (
    <Box
      as={"header"}
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      mb={4}
      pt={10}
      w={1024}
    >
      <Flex justify={"flex-end"}>
        {data && (
          <Button rightIcon={<RiLogoutBoxRLine />} onClick={() => signout()}>
            Sign Out
          </Button>
        )}
      </Flex>
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
