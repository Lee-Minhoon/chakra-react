import { Flex, Heading, Text } from "@chakra-ui/react";

interface WithLabelProps {
  label: string;
  value: string;
}

const WithLabel = ({ label, value }: WithLabelProps) => {
  return (
    <Flex direction={"column"} gap={"2"}>
      <Heading size="xs" textTransform="uppercase">
        {label}
      </Heading>
      <Text fontSize="sm">{value}</Text>
    </Flex>
  );
};

export default WithLabel;
