import { HTMLChakraProps } from "@chakra-ui/react";

interface Styles {
  ellipsis: HTMLChakraProps<"p">;
  pseudo: HTMLChakraProps<"div">;
}

export const styles: Styles = {
  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  pseudo: {
    content: '""',
    pos: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
  },
} as const;
