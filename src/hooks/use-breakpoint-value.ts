import { breakpoints } from "@/providers/chakra-provider/theme";
import { remToPx } from "@/utils";
import { useBreakpointValue as _useBreakpointValue } from "@chakra-ui/react";
import { useCallback } from "react";

// https://github.com/chakra-ui/chakra-ui/issues/6401
const useBreakpointValue = <T = any>(
  values: Parameters<typeof _useBreakpointValue<T>>[0]
) => {
  const fallback = useCallback(() => {
    const width = window.innerWidth;
    if (width < remToPx(breakpoints.sm)) return "base";
    else if (width < remToPx(breakpoints.md)) return "sm";
    else if (width < remToPx(breakpoints.lg)) return "md";
    else if (width < remToPx(breakpoints.xl)) return "lg";
    else if (width < remToPx(breakpoints["2xl"])) return "xl";
    else return "2xl";
  }, []);

  return _useBreakpointValue(values, {
    fallback: fallback(),
  });
};

export default useBreakpointValue;
