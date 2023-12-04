import { ColorMode, LayoutMode } from "@/components";
import { Center, Flex } from "@chakra-ui/react";
import Logo from "./Logo";

const SidebarHeader = () => {
  return (
    <Center as={"header"} flexDirection={"column"} gap={4} py={4}>
      <Logo />
      <Flex gap={4}>
        <LayoutMode />
        <ColorMode />
      </Flex>
    </Center>
  );
};

export default SidebarHeader;
