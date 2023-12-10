import { FormControl, FormLabel } from "@chakra-ui/react";

interface WithLabelProps {
  label?: string;
  children?: React.ReactNode;
}

const WithLabel = ({ label, children }: WithLabelProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      {children}
    </FormControl>
  );
};

export default WithLabel;
