import { UnorderedList } from "@chakra-ui/react";

interface VirtualListListProps {
  children: React.ReactNode;
  translateY: number;
}

const VirtualListList = ({ children, translateY }: VirtualListListProps) => {
  return (
    <UnorderedList
      pos={"absolute"}
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      listStyleType={"none"}
      m={0}
      transform={`translateY(${translateY}px)`}
    >
      {children}
    </UnorderedList>
  );
};

export default VirtualListList;
