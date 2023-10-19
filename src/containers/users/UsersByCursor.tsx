import { useGetUsersByCursor } from "@/apis";
import {
  Button,
  Card,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";

interface UsersByCursorProps {
  observe?: boolean;
}

const UsersByCursor = ({ observe }: UsersByCursorProps) => {
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
  } = useGetUsersByCursor({ limit: 10 });

  const target = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage]
  );

  useEffect(() => {
    if (!observe || !target.current) return;
    const observer = new IntersectionObserver(callback, { threshold: 0.5 });
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [callback, observe]);

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
      {observe ? (
        <div ref={target} />
      ) : (
        <Button onClick={() => fetchNextPage()} isDisabled={!hasNextPage}>
          Load More
        </Button>
      )}
    </Flex>
  );
};

export default UsersByCursor;
