import { Scheme } from "@/apis";
import { useHasScroll } from "@/hooks";
import { Nullable } from "@/types";
import { Spacer } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ComponentType, useEffect } from "react";
import VirtualListItem from "./Item";
import VirtualListList from "./List";

interface VirtualListProps<T extends Scheme> {
  container: Nullable<HTMLElement>;
  items: T[];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
}

const VirtualList = <T extends Scheme>({
  container,
  items,
  renderItem: Item,
  onLastItemVisible,
}: VirtualListProps<T>) => {
  const hasScroll = useHasScroll(container);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => container,
    estimateSize: () => 200,
  });

  useEffect(() => {
    if (!onLastItemVisible) return;

    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (lastItem && lastItem.index >= items.length - 1) {
      onLastItemVisible();
    }
  }, [items.length, onLastItemVisible, rowVirtualizer]);

  return (
    <VirtualListList
      height={rowVirtualizer.getTotalSize()}
      hasScroll={hasScroll}
    >
      {rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const item = items[virtualItem.index];

        return (
          <VirtualListItem
            key={virtualItem.index}
            index={virtualItem.index}
            ref={rowVirtualizer.measureElement}
            translateY={virtualItem.start}
          >
            <Item data={item} />
            <Spacer h={"4"} />
          </VirtualListItem>
        );
      })}
    </VirtualListList>
  );
};

export default VirtualList;
