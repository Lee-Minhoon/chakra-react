import { ListItem } from "@chakra-ui/react";
import { ForwardedRef, forwardRef } from "react";

interface VirtualListListProps {
  children: React.ReactNode;
  index: number;
  translateY: number;
}

const VirtualListItem = forwardRef(
  (props: VirtualListListProps, forwardedRef: ForwardedRef<HTMLLIElement>) => {
    const { children, index, translateY } = props;

    return (
      <ListItem
        ref={forwardedRef}
        data-index={index}
        pos={"absolute"}
        top={0}
        left={0}
        w={"100%"}
        transform={`translateY(${translateY}px)`}
      >
        {children}
      </ListItem>
    );
  }
);

export default VirtualListItem;

VirtualListItem.displayName = "VirtualListItem";
