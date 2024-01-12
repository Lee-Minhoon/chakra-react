import { InputProps, NumberInputProps } from "@chakra-ui/react";

export enum InputTypes {
  String = "string",
  Number = "number",
}

export type InputPropTypes = {
  [InputTypes.String]: InputProps;
  [InputTypes.Number]: NumberInputProps;
};
