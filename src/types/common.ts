import { Theme } from "@chakra-ui/react";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Assignable<T, S> = T extends S ? S : undefined;

export type Layout = "horizontal" | "vertical" | "mobile";
export type PrimaryColor = keyof Theme["colors"];
