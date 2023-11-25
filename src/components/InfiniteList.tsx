import { CursorQueryData, Scheme } from "@/apis";
import { Optional } from "@/types";
import {
  Button,
  Card,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { InfiniteData } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

interface InfiniteListProps<T extends Scheme> {
  observe?: boolean;
  data: InfiniteData<CursorQueryData<T[], number>> | undefined;
  hasNextPage: Optional<boolean>;
  fetchNextPage: () => void;
}

const InfiniteList = <T extends Scheme>({
  observe,
  data,
  hasNextPage,
  fetchNextPage,
}: InfiniteListProps<T>) => {
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
        {(data?.pages ?? []).map((page) =>
          page.data.map((data) => (
            <ListItem key={data.id}>
              <Card p={4}>
                <Flex direction={"column"} gap={2}>
                  {Object.entries(data).map(([key, value]) => (
                    <Text key={key}>{`${key}: ${value}`}</Text>
                  ))}
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

export default InfiniteList;
