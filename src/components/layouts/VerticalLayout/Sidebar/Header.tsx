import { ColorMode, LayoutMode, Logo } from "@/components";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { Center, Flex } from "@chakra-ui/react";

const SidebarHeader = () => {
  const { push } = useRouterPush();

  return (
    <Center as={"header"} flexDirection={"column"} gap={4} py={4}>
      <Logo onClick={() => push(PageRoutes.Home)} />
      <Flex gap={4}>
        <LayoutMode />
        <ColorMode />
      </Flex>
    </Center>
  );
};

export default SidebarHeader;
