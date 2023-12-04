import { useGetMe, useSignout } from "@/apis/auth";
import { Center, Icon, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { RiLogoutBoxRLine } from "react-icons/ri";

const SidebarFooter = () => {
  const { data: me } = useGetMe();
  const { mutate: signout } = useSignout();

  return (
    <Center as={"footer"} mt={"auto"} gap={4} py={4}>
      {me && (
        <>
          <Text>
            {`Welcome `}
            <Text as={"b"} color={"primary.500"}>
              {me?.name}
            </Text>
          </Text>
          <Tooltip label={"Sign Out"}>
            <IconButton
              aria-label="signout"
              size={"sm"}
              onClick={() => signout()}
            >
              <Icon as={RiLogoutBoxRLine} />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Center>
  );
};

export default SidebarFooter;
