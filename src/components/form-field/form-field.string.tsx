import { Input, InputProps } from "@chakra-ui/react";

const FormFieldString = ({ value, ...rest }: InputProps) => {
  return <Input value={value ?? ""} {...rest} />;
};

export default FormFieldString;
