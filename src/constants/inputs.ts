import { InputProps, NumberInputProps } from "@chakra-ui/react";

export const FormFieldTypes = {
  String: "string",
  Number: "number",
} as const;

export type FormFieldTypes =
  (typeof FormFieldTypes)[keyof typeof FormFieldTypes];

export type InputPropTypes = {
  [FormFieldTypes.String]: InputProps;
  [FormFieldTypes.Number]: NumberInputProps;
};
