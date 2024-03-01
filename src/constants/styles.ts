import { HTMLChakraProps } from "@chakra-ui/react";

interface Styles {
  ellipsis: HTMLChakraProps<"p">;
}

export const styles: Styles = {
  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
} as const;
