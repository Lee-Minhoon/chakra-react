import { CursorQueryResponse, Scheme } from "@/apis";
import { useLayout } from "@/hooks";
import { Nullable } from "@/types";
import { Button, Center, Flex, Spacer, Spinner } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import {
  ComponentProps,
  ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { VirtualList, WindowVirtualList } from "../VirtualList";

interface InfiniteListProps<T extends Scheme> {
  infiniteQuery: UseInfiniteQueryResult<CursorQueryResponse<T[], number>>;
  renderItem: ComponentType<{ data: T }>;
  usesObserver?: boolean;
  gap?: ComponentProps<typeof Spacer>["h"];
}

const InfiniteList = <T extends Scheme>({
  infiniteQuery,
  renderItem,
  usesObserver,
  gap,
}: InfiniteListProps<T>) => {
  const { layout } = useLayout();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    infiniteQuery;
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<Nullable<HTMLDivElement>>(null);
  const { t } = useTranslation();

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
    () => (layout === "horizontal" ? VirtualList : WindowVirtualList),
    [layout]
  );

  return (
    <Flex ref={containerRef} direction={"column"} overflowY={"auto"}>
      <List
        container={container}
        items={items}
        renderItem={renderItem}
        onLastItemVisible={handleLastItemVisible}
        gap={gap}
      />
      {!isFetchingNextPage ? (
        <Center>
          <Button onClick={() => fetchNextPage()} isDisabled={!hasNextPage}>
            {t("Load More")}
          </Button>
        </Center>
      ) : (
        <Center minH={10}>
          <Spinner color={"primary.500"} />
        </Center>
      )}
    </Flex>
  );
};

export default InfiniteList;
