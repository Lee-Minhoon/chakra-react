import {
  ColorToggler,
  LanguageToggler,
  LayoutToggler,
  Logo,
  PrimaryColorChanger,
} from "@/components";
import { PageRoutes } from "@/constants";
import { useRoute } from "@/hooks";
import { toPath } from "@/utils";
import { Box, Center, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { AiOutlineHome } from "react-icons/ai";

const SidebarHeader = () => {
  const { route } = useRoute();

  const handleClickHome = useCallback(() => {
    route({ pathname: toPath(PageRoutes.Home) });
  }, [route]);

  return (
    <Center as={"header"} flexDirection={"column"} gap={"4"} py={"4"}>
      <Box display={{ base: "block", lg: "none", xl: "block" }}>
        <Logo onClick={handleClickHome} />
      </Box>
      <Box display={{ base: "none", lg: "block", xl: "none" }}>
        <Tooltip hasArrow label={"Home"}>
          <IconButton
            aria-label={"home"}
            icon={<AiOutlineHome />}
            onClick={handleClickHome}
          />
        </Tooltip>
      </Box>
      <Flex gap={"4"} direction={{ base: "row", lg: "column", xl: "row" }}>
        <LayoutToggler />
        <ColorToggler />
        <PrimaryColorChanger placement={"right"} />
        <LanguageToggler />
      </Flex>
    </Center>
  );
};

export default SidebarHeader;
