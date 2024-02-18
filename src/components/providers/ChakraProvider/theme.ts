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
    components: {
      Input: {
        defaultProps: {
          size: "sm",
        },
      },
      Button: {
        defaultProps: {
          size: "sm",
        },
      },
      Select: {
        defaultProps: {
          size: "sm",
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  })
);

export default theme;
