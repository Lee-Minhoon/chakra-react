import { ColorMode, LayoutMode, Logo } from "@/components";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import { Box, Center, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";

const SidebarHeader = () => {
  const { push } = useRouterPush();

  return (
    <Center as={"header"} flexDirection={"column"} gap={4} py={4}>
      <Box display={{ base: "none", xl: "block" }}>
        <Logo onClick={() => push(toUrl(PageRoutes.Home))} />
      </Box>
      <Box display={{ base: "block", xl: "none" }}>
        <Tooltip hasArrow label={"Home"}>
          <IconButton
            aria-label={"Home"}
            size={"sm"}
            icon={<AiOutlineHome />}
            onClick={() => push(toUrl(PageRoutes.Home))}
          />
        </Tooltip>
      </Box>
      <Flex gap={4} direction={{ base: "column", xl: "row" }}>
        <LayoutMode />
        <ColorMode />
      </Flex>
    </Center>
  );
};

export default SidebarHeader;
