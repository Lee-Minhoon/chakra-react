import { InputPropTypes, InputTypes } from "@/constants";
import { toTitle } from "@/utils";
import { Input } from "@chakra-ui/react";
import { forwardRef, useMemo } from "react";
import { WithFormLabel } from "..";

type FormFieldProps<T extends InputTypes> = {
  inputType: T;
} & InputPropTypes[T];

interface GenericForwarded extends React.FC<FormFieldProps<InputTypes>> {
  <T extends InputTypes>(
    props: FormFieldProps<T>
  ): ReturnType<React.FC<FormFieldProps<T>>>;
}

const FormField: GenericForwarded = forwardRef(
  ({ inputType, ...rest }, ref) => {
    const field = useMemo(() => {
      switch (inputType) {
        case InputTypes.String:
          return (
            <Input ref={ref} {...(rest as InputPropTypes[InputTypes.String])} />
          );
      }
    }, [inputType, ref, rest]);

    return (
      <WithFormLabel key={rest.name} label={toTitle(rest.name)}>
        {field}
      </WithFormLabel>
    );
  }
);

export default FormField;

FormField.displayName = "FormField";
