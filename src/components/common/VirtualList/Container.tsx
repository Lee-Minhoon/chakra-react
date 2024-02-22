import { Flex } from "@chakra-ui/react";

interface ContainerProps {
  children: React.ReactNode;
  height: React.CSSProperties["height"];
  hasScroll?: boolean;
}

const margin = 0.125;

const VirtualListContainer = ({
  children,
  height,
  hasScroll,
}: ContainerProps) => {
  return (
    <Flex
      pos={"relative"}
      minH={height}
      m={`${margin}rem`}
      mr={hasScroll ? 2 : 0.5}
    >
      {children}
    </Flex>
  );
};

export default VirtualListContainer;
