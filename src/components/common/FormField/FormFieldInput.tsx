import { Input, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

interface FormFieldInputProps extends InputProps {}

const FormFieldInput = forwardRef<HTMLInputElement, FormFieldInputProps>(
  (props, forwardedRef) => {
    return <Input ref={forwardedRef} {...props} />;
  }
);

FormFieldInput.displayName = "FormFieldInput";

export default FormFieldInput;
