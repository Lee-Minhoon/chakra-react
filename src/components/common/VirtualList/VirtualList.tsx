import { Scheme } from "@/apis";
import { useHasScroll } from "@/hooks";
import { Nullable } from "@/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ComponentType } from "react";
import VirtualListBase from "./Base";

interface VirtualListProps<T extends Scheme> {
  container: Nullable<HTMLElement>;
  items: T[];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
}

const VirtualList = <T extends Scheme>({
  container,
  items,
  renderItem,
  onLastItemVisible,
}: VirtualListProps<T>) => {
  const hasScroll = useHasScroll(container);

  return (
    <VirtualListBase
      rowVirtualizer={useVirtualizer({
        count: items.length,
        getScrollElement: () => container,
        estimateSize: () => 200,
      })}
      items={items}
      renderItem={renderItem}
      onLastItemVisible={onLastItemVisible}
      hasScroll={hasScroll}
    />
  );
};

export default VirtualList;
