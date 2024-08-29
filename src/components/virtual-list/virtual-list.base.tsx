import { Scheme } from "@/apis";
import { styles } from "@/constants";
import { Flex, Grid, ListItem, Spacer, UnorderedList } from "@chakra-ui/react";
import { Virtualizer } from "@tanstack/react-virtual";
import { ComponentProps, ComponentType, useEffect, useMemo } from "react";

type UnknownVirtualizer =
  | Virtualizer<HTMLElement, HTMLElement>
  | Virtualizer<Window, HTMLElement>;

interface VirtualListBaseProps<T extends Scheme> {
  rowVirtualizer: UnknownVirtualizer;
  items: T[] | T[][];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
  rowGap?: ComponentProps<typeof Spacer>["gap"];
  columnGap?: ComponentProps<typeof Spacer>["gap"];
  hasScroll?: boolean;
}

const margin = 0.125;

const VirtualListBase = <T extends Scheme>({
  rowVirtualizer,
  items,
  renderItem: Item,
  onLastItemVisible,
  rowGap,
  columnGap,
  hasScroll,
}: VirtualListBaseProps<T>) => {
  const rowVirtualItems = rowVirtualizer.getVirtualItems();

  const lastItem = useMemo(
    () => rowVirtualItems[rowVirtualItems.length - 1],
    [rowVirtualItems]
  );

  useEffect(() => {
    if (!onLastItemVisible) return;

    if (lastItem && lastItem.index >= items.length - 1) {
      onLastItemVisible();
    }
  }, [items.length, lastItem, onLastItemVisible]);

  const countPerRow = useMemo(() => {
    if (!Array.isArray(items[0])) return 1;
    return items[0].length;
  }, [items]);

  const translateY = useMemo(
    () => rowVirtualItems[0]?.start - rowVirtualizer.options.scrollMargin,
    [rowVirtualItems, rowVirtualizer.options.scrollMargin]
  );

  return (
    <Flex
      pos={"relative"}
      minH={rowVirtualizer.getTotalSize()}
      m={`${margin}rem`}
      mr={hasScroll ? "2" : "0.5"}
    >
      <UnorderedList
        pos={"absolute"}
        w={"100%"}
        display={"flex"}
        flexDirection={"column"}
        transform={`translateY(${translateY}px)`}
        {...styles.unstyledList}
      >
        {rowVirtualItems.map((virtualRow) => {
          const row = items[virtualRow.index];

          // If the row is not an array, it is a single column.
          if (!Array.isArray(row)) {
            return (
              <ListItem
                key={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
              >
                <Item data={row} />
                <Spacer minH={rowGap ?? "4"} />
              </ListItem>
            );
          } else {
            return (
              <UnorderedList
                key={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                display={"flex"}
                flexDirection={"column"}
                {...styles.unstyledList}
              >
                <Grid
                  gap={columnGap ?? "4"}
                  templateColumns={`repeat(${countPerRow}, 1fr)`}
                  alignItems={""}
                >
                  {row.map((item, index) => (
                    <ListItem key={index} overflow={"hidden"}>
                      <Item data={item} />
                    </ListItem>
                  ))}
                </Grid>
                <Spacer minH={rowGap ?? "4"} />
              </UnorderedList>
            );
          }
        })}
      </UnorderedList>
    </Flex>
  );
};

export default VirtualListBase;
