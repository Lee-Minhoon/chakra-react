import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { ComponentProps, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { ValueOf } from "type-fest";
import FormFieldController, {
  FormFieldControllerProps,
} from "./form-field.controller";
import FormFieldEditor from "./form-field.editor";
import FormFieldNumber from "./form-field.number";
import FormFieldString from "./form-field.string";

const fieldTypes = {
  String: "string",
  Number: "number",
  Document: "document",
} as const;

type FieldType = ValueOf<typeof fieldTypes>;

const fieldComponentMap = {
  [fieldTypes.String]: FormFieldString,
  [fieldTypes.Number]: FormFieldNumber,
  [fieldTypes.Document]: FormFieldEditor,
} as const;

type FormFieldProps<T extends FieldType, S extends FieldValues> = {
  fieldType: T;
  label?: string;
  error?: string;
} & Omit<FormFieldControllerProps<S>, "render"> &
  Omit<ComponentProps<(typeof fieldComponentMap)[T]>, "name">;

const FormField = <T extends FieldType, S extends FieldValues>({
  fieldType,
  label,
  control,
  name,
  error,
  ...rest
}: FormFieldProps<T, S>) => {
  const field = useMemo(() => {
    const FieldComponent = fieldComponentMap?.[fieldType];

    if (!FieldComponent) {
      throw new Error("Invalid field type");
    }

    return (
      <FormFieldController
        control={control}
        name={name}
        render={FieldComponent}
        {...rest}
      />
    );
  }, [control, fieldType, name, rest]);

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel>{label}</FormLabel>}
      {field}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormField;
