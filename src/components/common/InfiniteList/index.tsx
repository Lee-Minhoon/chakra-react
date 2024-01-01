import { CursorQueryData, Scheme } from "@/apis";
import { useLayout, useVirtualize } from "@/hooks";
import { convertRemToPixels, hasScroll } from "@/utils";
import {
  Button,
  Center,
  Flex,
  ListItem,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ComponentType, useEffect, useMemo, useRef, useState } from "react";

interface InfiniteListProps<T extends Scheme> {
  renderItem: ComponentType<{ data: T }>;
  infiniteQuery: UseInfiniteQueryResult<CursorQueryData<T[], number>>;
  usesObserver?: boolean;
}

const margin = 0.125;
const gap = 1;

const InfiniteList = <T extends Scheme>({
  renderItem: Item,
  infiniteQuery,
  usesObserver,
}: InfiniteListProps<T>) => {
  const { layout } = useLayout();
  const { data, isFetching, hasNextPage, fetchNextPage } = infiniteQuery;
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemHeight, setItemHeight] = useState(0);

  const isMeasured = itemHeight !== 0;

  const listItems = useMemo(() => {
    return (data?.pages ?? []).map((page) => page.data).flat();
  }, [data?.pages]);

  const { containerHeight, startIndex, endIndex } = useVirtualize({
    container: layout === "vertical" ? containerRef.current : window,
    numItems: listItems.length,
    itemHeight,
    gap: convertRemToPixels(gap),
    marginTop:
      convertRemToPixels(margin) +
      (layout === "vertical" ? 0 : containerRef.current?.offsetTop ?? 0),
  });

  // 가상화된 리스트를 만듭니다.
  // make virtualized list
  const items = useMemo(() => {
    if (listItems.length === 0) return;
    return listItems.slice(startIndex, endIndex).map((item, idx) => (
      <ListItem
        key={item.id}
        pos={"absolute"}
        top={0}
        left={0}
        right={0}
        transform={`translateY(${
          (startIndex + idx) * itemHeight +
          (startIndex + idx) * convertRemToPixels(gap)
        }px)`}
      >
        <Item data={item} />
      </ListItem>
    ));
  }, [Item, endIndex, itemHeight, listItems, startIndex]);

  // 아이템 높이를 측정합니다.
  // measure item height
  useEffect(() => {
    if (isMeasured || (items && items.length === 0)) return;
    const firstItem = containerRef.current?.firstChild?.firstChild;
    if (!(firstItem instanceof HTMLElement)) return;
    setItemHeight(firstItem.clientHeight);
  }, [isMeasured, items]);

  // 옵저버를 사용하는 경우, 마지막 아이템이 보여질 때 다음 페이지를 불러옵니다.
  // if uses observer, fetch next page when last item is visible
  useEffect(() => {
    if (!usesObserver) return;
    if (hasNextPage && endIndex >= listItems.length) {
      fetchNextPage();
    }
  }, [endIndex, fetchNextPage, hasNextPage, listItems.length, usesObserver]);

  return (
    <>
      <Flex ref={containerRef} direction={"column"} gap={4} overflowY={"auto"}>
        <UnorderedList
          pos={"relative"}
          display={"flex"}
          flexDirection={"column"}
          listStyleType={"none"}
          minH={containerHeight}
          m={`${margin}rem`}
          mr={hasScroll(containerRef.current) ? 2 : 0.5}
        >
          {items}
        </UnorderedList>
        {!usesObserver && isMeasured && !isFetching && (
          <Center>
            <Button
              onClick={() => fetchNextPage()}
              isDisabled={!hasNextPage}
              flexShrink={0}
            >
              Load More
            </Button>
          </Center>
        )}
        {isFetching && (
          <Center minH={10}>
            <Spinner color={"primary.500"} />
          </Center>
        )}
      </Flex>
    </>
  );
};

export default InfiniteList;
