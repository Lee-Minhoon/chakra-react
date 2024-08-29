import { Scheme } from "@/apis";
import { Nullable } from "@/types";
import { Spacer } from "@chakra-ui/react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { ComponentProps, ComponentType } from "react";
import VirtualListBase from "./virtual-list.base";

interface VirtualListWindowProps<T extends Scheme> {
  container: Nullable<HTMLElement>;
  items: T[] | T[][];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
  rowGap?: ComponentProps<typeof Spacer>["gap"];
  columnGap?: ComponentProps<typeof Spacer>["gap"];
}

const VirtualListWindow = <T extends Scheme>({
  container,
  items,
  renderItem,
  onLastItemVisible,
  rowGap,
  columnGap,
}: VirtualListWindowProps<T>) => {
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
      rowGap={rowGap}
      columnGap={columnGap}
    />
  );
};

export default VirtualListWindow;
