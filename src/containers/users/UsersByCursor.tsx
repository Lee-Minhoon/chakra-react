import { useGetUsersByCursor } from "@/apis";
import {
  Button,
  Card,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

const UserList = () => {
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
  } = useGetUsersByCursor({ limit: 10 });

  return (
    <Flex direction={"column"} gap={4}>
      <UnorderedList
        display={"flex"}
        flexDirection={"column"}
        listStyleType={"none"}
        gap={4}
        m={0}
      >
        {(users?.pages ?? []).map((page) =>
          page.data.map((user) => (
            <ListItem key={user.id}>
              <Card p={4}>
                <Flex direction={"column"} gap={2}>
                  <Text>{`id: ${user.id}`}</Text>
                  <Text>{`name: ${user.name}`}</Text>
                  <Text>{`email: ${user.email}`}</Text>
                  <Text>{`phone: ${user.phone}`}</Text>
                </Flex>
              </Card>
            </ListItem>
          ))
        )}
      </UnorderedList>
      <Button onClick={() => fetchNextPage()} isDisabled={!hasNextPage}>
        Load More
      </Button>
    </Flex>
  );
};

export default UserList;
