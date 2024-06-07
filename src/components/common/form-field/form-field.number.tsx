import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import { Control, Controller, FieldPath } from "react-hook-form";

interface FormFieldNumberProps extends Omit<NumberInputProps, "name"> {
  name: FieldPath<any>;
  control?: Control<any, any>;
}

const FormFieldNumber = ({ name, control, ...rest }: FormFieldNumberProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <NumberInput value={value} onChange={onChange} {...rest}>
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
};

FormFieldNumber.displayName = "FormFieldInput";

export default FormFieldNumber;
