import { useColorMode } from "@chakra-ui/react";

type Intensity = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

const useAlphaColor = () => {
  const { colorMode } = useColorMode();

  return colorMode === "light"
    ? (intensity: Intensity) => `blackAlpha.${intensity}`
    : (intensity: Intensity) => `whiteAlpha.${intensity}`;
};

export default useAlphaColor;
