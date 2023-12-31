import { CursorQueryData, Scheme } from "@/apis";
import useHasScroll from "@/hooks/useHasScroll";
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ComponentType, useCallback, useEffect, useRef } from "react";

interface InfiniteListProps<T extends Scheme> {
  listItem: ComponentType<{ data: T }>;
  infiniteQuery: UseInfiniteQueryResult<CursorQueryData<T[], number>>;
  usesObserver?: boolean;
}

const InfiniteList = <T extends Scheme>({
  listItem: InfiniteListItem,
  infiniteQuery,
  usesObserver,
}: InfiniteListProps<T>) => {
  const { data, isFetching, hasNextPage, fetchNextPage } = infiniteQuery;
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const hasScroll = useHasScroll(containerRef, [data]);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (hasNextPage && entry.isIntersecting) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (!usesObserver || !targetRef.current) return;
    const observer = new IntersectionObserver(callback, { threshold: 0.5 });
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [callback, usesObserver]);

  return (
    <Flex ref={containerRef} direction={"column"} gap={4} overflowY={"auto"}>
      <UnorderedList
        display={"flex"}
        flexDirection={"column"}
        listStyleType={"none"}
        gap={4}
        p={0.5}
        pr={hasScroll ? 2 : 0.5}
        m={0}
      >
        {(data?.pages ?? []).map((page) =>
          page.data.map((data) => (
            <InfiniteListItem key={data.id} data={data} />
          ))
        )}
      </UnorderedList>
      <Center display={isFetching ? "none" : "flex"}>
        {usesObserver ? (
          <Box ref={targetRef} minH={10} />
        ) : (
          <Button
            onClick={() => fetchNextPage()}
            isDisabled={!hasNextPage}
            flexShrink={0}
          >
            Load More
          </Button>
        )}
      </Center>
      {isFetching && (
        <Center minH={10}>
          <Spinner color={"primary.500"} />
        </Center>
      )}
    </Flex>
  );
};

export default InfiniteList;
