import { FormFieldPropsTypeMap, FormFieldTypes } from "@/constants";
import {
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Editor, WithFormLabel } from "..";

type FormFieldProps<T extends FieldValues, S extends FormFieldTypes> = {
  fieldType: S;
  name: FieldPath<T>;
  control?: Control<T, any>;
  label?: string;
} & Omit<FormFieldPropsTypeMap[S], "name">;

const FormFieldBase = <T extends FieldValues, S extends FormFieldTypes>(
  { fieldType, name, label, control, ...rest }: FormFieldProps<T, S>,
  ref: ForwardedRef<unknown>
) => {
  const field = useMemo(() => {
    switch (fieldType) {
      case FormFieldTypes.String:
        return (
          <Input
            ref={ref}
            name={name}
            {...(rest as FormFieldPropsTypeMap[typeof FormFieldTypes.String])}
          />
        );
      case FormFieldTypes.Number:
        return (
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <NumberInput
                  value={value}
                  onChange={onChange}
                  {...(rest as FormFieldPropsTypeMap[typeof FormFieldTypes.Number])}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              );
            }}
          />
        );
      case FormFieldTypes.Document:
        return (
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <Editor
                  defaultValue={value ?? "Hello, World!"}
                  onChange={onChange}
                  {...(rest as FormFieldPropsTypeMap[typeof FormFieldTypes.Document])}
                />
              );
            }}
          />
        );
    }
  }, [control, fieldType, name, ref, rest]);

  return (
    <>{label ? <WithFormLabel label={label}>{field}</WithFormLabel> : field}</>
  );
};

const FormField = forwardRef(FormFieldBase);

FormField.displayName = "FormField";

export default FormField as <T extends FieldValues, S extends FormFieldTypes>(
  props: FormFieldProps<T, S> & { ref?: ForwardedRef<unknown> }
) => ReturnType<typeof FormFieldBase>;
