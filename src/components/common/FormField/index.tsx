import { FormFieldTypes, InputPropTypes } from "@/constants";
import { Input } from "@chakra-ui/react";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { WithFormLabel } from "..";

type FormFieldProps<T extends FormFieldTypes> = {
  fieldType: T;
  label?: string;
} & InputPropTypes[T];

const FormFieldBase = <T extends FormFieldTypes>(
  { fieldType, label, ...rest }: FormFieldProps<T>,
  ref: ForwardedRef<unknown>
) => {
  const field = useMemo(() => {
    switch (fieldType) {
      case FormFieldTypes.String:
        return <Input ref={ref} {...(rest as InputPropTypes["string"])} />;
    }
  }, [fieldType, ref, rest]);

  return (
    <>
      {label ? (
        <WithFormLabel key={rest.name} label={label}>
          {field}
        </WithFormLabel>
      ) : (
        field
      )}
    </>
  );
};

const FormField = forwardRef(FormFieldBase);

FormField.displayName = "FormField";

export default FormField as <T extends FormFieldTypes>(
  props: FormFieldProps<T> & { ref?: ForwardedRef<unknown> }
) => ReturnType<typeof FormFieldBase>;
