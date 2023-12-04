import { useGetMe, useSignout } from "@/apis/auth";
import { ColorMode, LayoutMode } from "@/components";
import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Navbar from "./Navbar";

const Header = () => {
  const { data: me } = useGetMe();
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
      <Flex justify={"flex-end"} gap={4}>
        <LayoutMode />
        <ColorMode />
        {me && (
          <Button
            rightIcon={<RiLogoutBoxRLine />}
            onClick={() => signout()}
            size={"sm"}
          >
            Sign Out
          </Button>
        )}
      </Flex>
      <Center>
        <Link href={"/"}>
          <Heading>Home</Heading>
        </Link>
      </Center>
      <Navbar />
    </Box>
  );
};

export default Header;
