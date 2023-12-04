import { useColorMode } from "@chakra-ui/react";

const useBgColor = () => {
  const { colorMode } = useColorMode();

  return colorMode === "light" ? "blackAlpha.50" : "whiteAlpha.50";
};

export default useBgColor;
