import {
  baseTheme,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const theme = extendTheme(
  {
    fonts: {
      heading: "var(--font-rubik)",
      body: "var(--font-rubik)",
    },
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
