import {
  baseTheme,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const theme = extendTheme(
  {
    colors: {
      primary: baseTheme.colors.teal,
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  })
);

export default theme;
