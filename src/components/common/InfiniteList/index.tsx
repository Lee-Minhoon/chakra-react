import { CursorQueryData, Scheme } from "@/apis";
import { Optional } from "@/types";
import { Button, Flex, UnorderedList } from "@chakra-ui/react";
import { InfiniteData } from "@tanstack/react-query";
import { ComponentType, useCallback, useEffect, useRef, useState } from "react";

interface InfiniteListProps<T extends Scheme> {
  listItem: ComponentType<{ data: T }>;
  data: InfiniteData<CursorQueryData<T[], number>> | undefined;
  hasNextPage: Optional<boolean>;
  fetchNextPage: () => void;
  usesObserver?: boolean;
}

const InfiniteList = <T extends Scheme>({
  listItem: InfiniteListItem,
  data,
  hasNextPage,
  fetchNextPage,
  usesObserver,
}: InfiniteListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
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

  useEffect(() => {
    if (!containerRef.current) return;
    const { scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight > clientHeight) {
      setHasScroll(true);
    }
  }, [data]);

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
      {usesObserver ? (
        <div ref={targetRef} />
      ) : (
        <Button
          onClick={() => fetchNextPage()}
          isDisabled={!hasNextPage}
          flexShrink={0}
        >
          Load More
        </Button>
      )}
    </Flex>
  );
};

export default InfiniteList;
