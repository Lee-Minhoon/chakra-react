import { UnorderedList } from "@chakra-ui/react";

interface VirtualListListProps {
  children: React.ReactNode;
  height: React.CSSProperties["height"];
  hasScroll?: boolean;
}

const margin = 0.125;

const VirtualListList = ({
  children,
  height,
  hasScroll,
}: VirtualListListProps) => {
  return (
    <UnorderedList
      pos={"relative"}
      display={"flex"}
      flexDirection={"column"}
      listStyleType={"none"}
      minH={height}
      m={`${margin}rem`}
      mr={hasScroll ? 2 : 0.5}
      gap={"1rem"}
    >
      {children}
    </UnorderedList>
  );
};

export default VirtualListList;
