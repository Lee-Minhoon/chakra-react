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

export const breakpoints = {
  base: "0rem",
  sm: "30rem",
  md: "48rem",
  lg: "62rem",
  xl: "80rem",
  "2xl": "96rem",
};

const getTheme = (primaryColor: PrimaryColor = "teal") =>
  extendTheme(
    {
      fonts: {
        heading: `'Roboto', sans-serif`,
        body: `'Roboto', sans-serif`,
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
