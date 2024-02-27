import { Scheme } from "@/apis";
import { Nullable } from "@/types";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { ComponentType } from "react";
import VirtualListBase from "./VirtualListBase";

interface WindowVirtualListProps<T extends Scheme> {
  container: Nullable<HTMLElement>;
  items: T[];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
  gap?: React.CSSProperties["gap"];
}

const WindowVirtualList = <T extends Scheme>({
  container,
  items,
  renderItem,
  onLastItemVisible,
  gap,
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
      gap={gap}
    />
  );
};

export default WindowVirtualList;
