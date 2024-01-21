import { useGetMe, useSignout } from "@/apis/auth";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import {
  Center,
  Flex,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";

const SidebarFooter = () => {
  const { push } = useSafePush();
  const { data: me } = useGetMe();
  const { mutate: signout } = useSignout();

  return (
    <Center as={"footer"} mt={"auto"} gap={4} py={4}>
      {me ? (
        <Flex gap={4} align={"center"} overflow={"hidden"}>
          <Text
            display={{ base: "none", xl: "block" }}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {`Welcome `}
            <Text as={"b"} color={"primary.500"}>
              {me?.name}
            </Text>
          </Text>
          <Tooltip hasArrow label={"Sign Out"}>
            <IconButton
              aria-label="signout"
              size={"sm"}
              onClick={() => signout()}
            >
              <Icon as={RiLogoutBoxRLine} />
            </IconButton>
          </Tooltip>
        </Flex>
      ) : (
        <>
          <Text display={{ base: "none", xl: "block" }}>Not Signed In</Text>
          <Tooltip hasArrow label={"Sign In"}>
            <IconButton
              aria-label="signin"
              size={"sm"}
              onClick={() => push(toUrl(PageRoutes.Signin))}
            >
              <Icon as={RiLoginBoxLine} />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Center>
  );
};

export default SidebarFooter;
