import { Theme } from "@chakra-ui/react";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type Layout = "horizontal" | "vertical";
export type PrimaryColor = keyof Theme["colors"];
