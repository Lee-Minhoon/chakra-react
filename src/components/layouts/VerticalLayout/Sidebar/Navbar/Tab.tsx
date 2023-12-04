import { NavbarTab } from "@/constants";
import useBgColor from "@/hooks/useBgColor";
import { Center, Flex, Icon, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";

interface TabProps {
  tab: NavbarTab;
  isSelected: boolean;
}

const Tab = ({ tab, isSelected }: TabProps) => {
  const bgColor = useBgColor();

  return (
    <ListItem key={tab.label}>
      <Link key={tab.label} href={{ pathname: tab.pathname, query: tab.query }}>
        <Flex
          bgColor={isSelected ? bgColor : "transparent"}
          h={12}
          align={"center"}
          p={4}
          gap={4}
          borderRadius={"md"}
        >
          <Center
            w={8}
            h={8}
            bgColor={isSelected ? "primary.500" : "transparent"}
            border={"1px solid"}
            borderColor={isSelected ? "transparent" : "primary.500"}
            borderRadius={"md"}
          >
            <Icon as={tab.icon} color={isSelected ? "white" : "primary.500"} />
          </Center>
          <Text>{tab.label}</Text>
        </Flex>
      </Link>
    </ListItem>
  );
};

export default Tab;
