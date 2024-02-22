import { Scheme } from "@/apis";
import { Nullable } from "@/types";
import { Spacer } from "@chakra-ui/react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { ComponentType, useEffect } from "react";
import VirtualListContainer from "./Container";
import VirtualListItem from "./Item";
import VirtualListList from "./List";

interface WindowVirtualListProps<T extends Scheme> {
  container: Nullable<HTMLElement>;
  items: T[];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
}

const WindowVirtualList = <T extends Scheme>({
  container,
  items,
  renderItem: Item,
  onLastItemVisible,
}: WindowVirtualListProps<T>) => {
  const rowVirtualizer = useWindowVirtualizer({
    count: items.length,
    estimateSize: () => 200,
    scrollMargin: container?.offsetTop,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    if (!onLastItemVisible) return;

    const [lastItem] = virtualItems.reverse();

    if (lastItem && lastItem.index >= items.length - 1) {
      onLastItemVisible();
    }
  }, [items.length, onLastItemVisible, virtualItems]);

  return (
    <VirtualListContainer height={rowVirtualizer.getTotalSize()}>
      <VirtualListList
        translateY={
          virtualItems[0]?.start - rowVirtualizer.options.scrollMargin
        }
      >
        {virtualItems.map((virtualItem) => {
          const item = items[virtualItem.index];

          return (
            <VirtualListItem
              key={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              index={virtualItem.index}
            >
              <Item data={item} />
              <Spacer h={"4"} />
            </VirtualListItem>
          );
        })}
      </VirtualListList>
    </VirtualListContainer>
  );
};

export default WindowVirtualList;
