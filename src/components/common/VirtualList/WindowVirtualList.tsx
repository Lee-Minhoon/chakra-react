import { Scheme } from "@/apis";
import { Nullable } from "@/types";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { ComponentType } from "react";
import VirtualListBase from "./Base";

interface WindowVirtualListProps<T extends Scheme> {
  container: Nullable<HTMLElement>;
  items: T[];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
}

const WindowVirtualList = <T extends Scheme>({
  container,
  items,
  renderItem,
  onLastItemVisible,
}: WindowVirtualListProps<T>) => {
  return (
    <VirtualListBase
      rowVirtualizer={useWindowVirtualizer({
        count: items.length,
        estimateSize: () => 200,
        scrollMargin: container?.offsetTop,
      })}
      items={items}
      renderItem={renderItem}
      onLastItemVisible={onLastItemVisible}
    />
  );
};

export default WindowVirtualList;
