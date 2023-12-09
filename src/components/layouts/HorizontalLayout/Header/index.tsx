import { useGetMe, useSignout } from "@/apis/auth";
import { ColorMode, LayoutMode, Logo } from "@/components";
import { Box, Button, Flex } from "@chakra-ui/react";
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
      <Logo />
      <Navbar />
    </Box>
  );
};

export default Header;
