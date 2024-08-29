import { CursorQueryResponse, Scheme } from "@/apis";
import { useHasScroll } from "@/hooks";
import { Nullable } from "@/types";
import { Button, Center, Flex, Spacer, Spinner } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import {
  ComponentProps,
  ComponentType,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { VirtualListDefault, VirtualListWindow } from "../virtual-list";

interface InfiniteListProps<T extends Scheme> {
  infiniteQuery: UseInfiniteQueryResult<CursorQueryResponse<T>>;
  renderItem: ComponentType<{ data: T }>;
  countPerRow?: number;
  useObserver?: boolean;
  rowGap?: ComponentProps<typeof Spacer>["gap"];
  columnGap?: ComponentProps<typeof Spacer>["gap"];
}

const InfiniteList = <T extends Scheme>({
  infiniteQuery,
  renderItem,
  countPerRow,
  useObserver,
  rowGap,
  columnGap,
}: InfiniteListProps<T>) => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    infiniteQuery;
  const containerRef = useRef<Nullable<HTMLDivElement>>(null);
  const { t } = useTranslation();

  const { hasScroll } = useHasScroll(containerRef.current);

  const List = useMemo(() => {
    return hasScroll ? VirtualListDefault : VirtualListWindow;
  }, [hasScroll]);

  const items = useMemo(() => {
    const flatten = (data?.pages ?? []).flatMap((page) => page.data);
    if (!countPerRow) return flatten;
    const result: T[][] = [];
    for (let i = 0; i < flatten.length; i += countPerRow) {
      result.push(flatten.slice(i, i + countPerRow));
    }
    return result;
  }, [countPerRow, data?.pages]);

  const handleLastItemVisible = useCallback(() => {
    if (useObserver && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, useObserver]);

  return (
    <Flex ref={containerRef} direction={"column"} overflowY={"auto"}>
      {List && (
        <List
          container={containerRef.current}
          items={items}
          renderItem={renderItem}
          onLastItemVisible={handleLastItemVisible}
          rowGap={rowGap}
          columnGap={columnGap}
        />
      )}
      {!isFetchingNextPage ? (
        <Center>
          <Button onClick={() => fetchNextPage()} isDisabled={!hasNextPage}>
            {t("Load More")}
          </Button>
        </Center>
      ) : (
        <Center minH={"10"}>
          <Spinner color={"primary.500"} />
        </Center>
      )}
    </Flex>
  );
};

export default InfiniteList;
