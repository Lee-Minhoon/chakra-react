import { Scheme } from "@/apis";
import { Card, Flex, ListItem, Text } from "@chakra-ui/react";

interface InfiniteListItemProps {
  data: Scheme;
}

const InfiniteListItem = ({ data }: InfiniteListItemProps) => {
  return (
    <ListItem>
      <Card p={4}>
        <Flex direction={"column"} gap={2}>
          {Object.entries(data).map(([key, value]) => (
            <Text key={key}>{`${key}: ${value}`}</Text>
          ))}
        </Flex>
      </Card>
    </ListItem>
  );
};

export default InfiniteListItem;
