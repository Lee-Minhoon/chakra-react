import { useGetMe, useSignout } from "@/apis/auth";
import { ColorMode, LayoutMode, Logo } from "@/components";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import Navbar from "./Navbar";

const Header = () => {
  const { push } = useRouterPush();
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
      w={1280}
    >
      <Flex justify={"flex-end"} gap={4}>
        <LayoutMode />
        <ColorMode />
        {me ? (
          <Button
            rightIcon={<RiLogoutBoxRLine />}
            onClick={() => signout()}
            size={"sm"}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            rightIcon={<RiLoginBoxLine />}
            onClick={() => push(PageRoutes.Signin)}
            size={"sm"}
          >
            Sign In
          </Button>
        )}
      </Flex>
      {me && (
        <Flex justify={"flex-end"}>
          <Text>
            {`Welcome `}
            <Text as={"b"} color={"primary.500"}>
              {me?.name}
            </Text>
          </Text>
        </Flex>
      )}
      <Box p={12}>
        <Logo onClick={() => push(PageRoutes.Home)} />
      </Box>
      <Navbar />
    </Box>
  );
};

export default Header;
