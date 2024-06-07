import { Scheme } from "@/apis";
import { useHasScroll } from "@/hooks";
import { Nullable } from "@/types";
import { Spacer } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ComponentProps, ComponentType } from "react";
import VirtualListBase from "./virtual-list.base";

interface VirtualListDefaultProps<T extends Scheme> {
  container: Nullable<HTMLElement>;
  items: T[] | T[][];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
  rowGap?: ComponentProps<typeof Spacer>["gap"];
  columnGap?: ComponentProps<typeof Spacer>["gap"];
}

const VirtualListDefault = <T extends Scheme>({
  container,
  items,
  renderItem,
  onLastItemVisible,
  rowGap,
  columnGap,
}: VirtualListDefaultProps<T>) => {
  const { hasScroll } = useHasScroll(container);

  return (
    <VirtualListBase
      rowVirtualizer={useVirtualizer({
        count: items.length,
        estimateSize: () => 200,
        getScrollElement: () => container,
      })}
      items={items}
      renderItem={renderItem}
      onLastItemVisible={onLastItemVisible}
      rowGap={rowGap}
      columnGap={columnGap}
      hasScroll={hasScroll}
    />
  );
};

export default VirtualListDefault;
