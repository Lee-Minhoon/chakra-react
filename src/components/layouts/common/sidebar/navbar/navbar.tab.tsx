import { Nav } from "@/constants";
import { useAlphaColor, useSafePush } from "@/hooks";
import { Center, Flex, Icon, ListItem, Text, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface NavbarTabProps {
  nav: Nav;
  isActivated: boolean;
}

const NavbarTab = ({ nav, isActivated }: NavbarTabProps) => {
  const { t } = useTranslation();
  const alphaColor = useAlphaColor();
  const { push } = useSafePush();

  return (
    <ListItem key={nav.label}>
      <Flex
        bgColor={isActivated ? alphaColor(100) : "transparent"}
        align={"center"}
        p={"4"}
        gap={"4"}
        borderRadius={"md"}
        cursor={"pointer"}
        _hover={{ bgColor: alphaColor(50) }}
        onClick={() => push({ pathname: nav.pathname, query: nav.query })}
      >
        <Tooltip
          hasArrow
          label={t(nav.label)}
          display={{ base: "none", lg: "block", xl: "none" }}
        >
          <Center
            w={"8"}
            h={"8"}
            bgColor={isActivated ? "primary.500" : "transparent"}
            border={"1px solid"}
            borderColor={isActivated ? "transparent" : "primary.500"}
            borderRadius={"md"}
          >
            <Icon as={nav.icon} color={isActivated ? "white" : "primary.500"} />
          </Center>
        </Tooltip>
        <Text display={{ base: "initial", lg: "none", xl: "initial" }}>
          {t(nav.label)}
        </Text>
      </Flex>
    </ListItem>
  );
};

export default NavbarTab;
