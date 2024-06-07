import { PrimaryColor } from "@/types";
import { cardAnatomy } from "@chakra-ui/anatomy";
import {
  baseTheme,
  createMultiStyleConfigHelpers,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const getTheme = (primaryColor: PrimaryColor = "teal") =>
  extendTheme(
    {
      fonts: {
        heading: "var(--font-inter)",
        body: "var(--font-rubik)",
      },
      colors: {
        primary: baseTheme.colors[primaryColor],
        bg: "var(--chakra-colors-chakra-body-bg)",
        subtleBg: "var(--chakra-colors-chakra-subtle-bg)",
        text: "var(--chakra-colors-chakra-body-text)",
        subtleText: "var(--chakra-colors-chakra-subtle-text)",
        inverseText: "var(--chakra-colors-chakra-inverse-text)",
        placeholder: "var(--chakra-colors-chakra-placeholder-color)",
        border: "var(--chakra-colors-chakra-border-color)",
      },
      components: {
        // prevent box shadow from being obscured when parent has overflow hidden
        Card: defineMultiStyleConfig({
          baseStyle: definePartsStyle({
            container: {
              margin: "0.5",
            },
          }),
        }),
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
      breakpoints,
    },
    withDefaultColorScheme({
      colorScheme: "primary",
    })
  );

export default getTheme;
