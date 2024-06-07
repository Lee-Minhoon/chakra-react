import { FormControl, FormLabel } from "@chakra-ui/react";

interface WithLabelProps {
  label?: string;
  children?: React.ReactNode;
}

const WithFormLabel = ({ label, children }: WithLabelProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      {children}
    </FormControl>
  );
};

export default WithFormLabel;
