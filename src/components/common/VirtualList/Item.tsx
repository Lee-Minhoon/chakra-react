import { ListItem } from "@chakra-ui/react";
import { ForwardedRef, forwardRef } from "react";

interface VirtualListListProps {
  children: React.ReactNode;
  index: number;
}

const VirtualListItem = forwardRef(
  (props: VirtualListListProps, forwardedRef: ForwardedRef<HTMLLIElement>) => {
    const { children, index } = props;

    return (
      <ListItem ref={forwardedRef} data-index={index}>
        {children}
      </ListItem>
    );
  }
);

export default VirtualListItem;

VirtualListItem.displayName = "VirtualListItem";
