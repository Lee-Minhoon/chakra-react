import { FormFieldPropsTypeMap, FormFieldTypes } from "@/constants";
import { Input } from "@chakra-ui/react";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { WithFormLabel } from "..";
import FormFieldEditor from "./form-field.editor";
import FormFieldNumber from "./form-field.number";

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
          <FormFieldNumber
            name={name}
            control={control}
            {...(rest as FormFieldPropsTypeMap[typeof FormFieldTypes.Number])}
          />
        );
      case FormFieldTypes.Document:
        return (
          <FormFieldEditor
            name={name}
            control={control}
            {...(rest as FormFieldPropsTypeMap[typeof FormFieldTypes.Document])}
          />
        );
      default:
        throw new Error("Invalid field type");
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
