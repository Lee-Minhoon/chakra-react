import { CursorQueryResponse, Scheme } from "@/apis";
import { useLayout } from "@/hooks";
import { Nullable } from "@/types";
import { Button, Center, Flex, Spinner } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import {
  ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { VirtualList, WindowVirtualList } from "../VirtualList";

interface InfiniteListProps<T extends Scheme> {
  renderItem: ComponentType<{ data: T }>;
  infiniteQuery: UseInfiniteQueryResult<CursorQueryResponse<T[], number>>;
  usesObserver?: boolean;
}

const InfiniteList = <T extends Scheme>({
  renderItem,
  infiniteQuery,
  usesObserver,
}: InfiniteListProps<T>) => {
  const { layout } = useLayout();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    infiniteQuery;
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<Nullable<HTMLDivElement>>(null);

  const items = useMemo(() => {
    return (data?.pages ?? []).map((page) => page.data).flat();
  }, [data?.pages]);

  useEffect(() => {
    setContainer(containerRef.current);
  }, []);

  const handleLastItemVisible = useCallback(() => {
    if (usesObserver && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, usesObserver]);

  const List = useMemo(
    () => (layout === "horizontal" ? WindowVirtualList : VirtualList),
    [layout]
  );

  return (
    <Flex ref={containerRef} direction={"column"} overflowY={"auto"}>
      <List
        container={container ?? null}
        items={items}
        renderItem={renderItem}
        onLastItemVisible={handleLastItemVisible}
      />
      {!usesObserver && !isFetchingNextPage && (
        <Center>
          <Button onClick={() => fetchNextPage()} isDisabled={!hasNextPage}>
            Load More
          </Button>
        </Center>
      )}
      {isFetchingNextPage && (
        <Center minH={10}>
          <Spinner color={"primary.500"} />
        </Center>
      )}
    </Flex>
  );
};

export default InfiniteList;
