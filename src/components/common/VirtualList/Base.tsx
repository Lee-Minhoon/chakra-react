import { Scheme } from "@/apis";
import { Flex, ListItem, Spacer, UnorderedList } from "@chakra-ui/react";
import { Virtualizer } from "@tanstack/react-virtual";
import { ComponentType, useEffect, useMemo } from "react";

interface VirtualListBaseProps<T extends Scheme> {
  rowVirtualizer:
    | Virtualizer<HTMLElement, HTMLElement>
    | Virtualizer<Window, HTMLElement>;
  items: T[];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
  hasScroll?: boolean;
}

const margin = 0.125;

const VirtualListBase = <T extends Scheme>({
  rowVirtualizer,
  items,
  renderItem: Item,
  onLastItemVisible,
  hasScroll,
}: VirtualListBaseProps<T>) => {
  const virtualItems = rowVirtualizer.getVirtualItems();

  const lastItem = useMemo(
    () => virtualItems[virtualItems.length - 1],
    [virtualItems]
  );

  useEffect(() => {
    if (!onLastItemVisible) return;

    if (lastItem && lastItem.index >= items.length - 1) {
      onLastItemVisible();
    }
  }, [items.length, lastItem, onLastItemVisible]);

  const translateY =
    virtualItems[0]?.start - rowVirtualizer.options.scrollMargin;

  return (
    <Flex
      pos={"relative"}
      minH={rowVirtualizer.getTotalSize()}
      m={`${margin}rem`}
      mr={hasScroll ? 2 : 0.5}
    >
      <UnorderedList
        pos={"absolute"}
        w={"100%"}
        display={"flex"}
        flexDirection={"column"}
        listStyleType={"none"}
        m={0}
        transform={`translateY(${translateY}px)`}
      >
        {virtualItems.map((virtualItem) => {
          const item = items[virtualItem.index];

          return (
            <ListItem
              key={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              data-index={virtualItem.index}
            >
              <Item data={item} />
              <Spacer h={"4"} />
            </ListItem>
          );
        })}
      </UnorderedList>
    </Flex>
  );
};

export default VirtualListBase;
