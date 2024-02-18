import { Scheme } from "@/apis";
import { Nullable } from "@/types";
import { Spacer } from "@chakra-ui/react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { ComponentType, useEffect } from "react";
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

  useEffect(() => {
    if (!onLastItemVisible) return;

    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (lastItem && lastItem.index >= items.length - 1) {
      onLastItemVisible();
    }
  }, [items.length, onLastItemVisible, rowVirtualizer]);

  return (
    <VirtualListList height={rowVirtualizer.getTotalSize()}>
      {rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const item = items[virtualItem.index];

        return (
          <VirtualListItem
            key={virtualItem.index}
            index={virtualItem.index}
            ref={rowVirtualizer.measureElement}
            translateY={virtualItem.start - rowVirtualizer.options.scrollMargin}
          >
            <Item data={item} />
            <Spacer h={"4"} />
          </VirtualListItem>
        );
      })}
    </VirtualListList>
  );
};

export default WindowVirtualList;
