import { Editor } from "@/components";
import { InputProps, NumberInputProps } from "@chakra-ui/react";
import { ValueOf } from "type-fest";

export const FormFieldTypes = {
  String: "string",
  Number: "number",
  Document: "document",
} as const;

export type FormFieldTypes = ValueOf<typeof FormFieldTypes>;

export type FormFieldPropsTypeMap = {
  [FormFieldTypes.String]: InputProps;
  [FormFieldTypes.Number]: NumberInputProps;
  [FormFieldTypes.Document]: React.ComponentProps<typeof Editor>;
};
