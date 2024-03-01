import { Nav } from "@/constants";
import { useSafePush } from "@/hooks";
import useBgColor from "@/hooks/useBgColor";
import { Center, Flex, Icon, ListItem, Text, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface HorizontalLayoutNavbarTabProps {
  nav: Nav;
  isActivated: boolean;
}

const HorizontalLayoutNavbarTab = ({
  nav,
  isActivated,
}: HorizontalLayoutNavbarTabProps) => {
  const { t } = useTranslation();
  const bgColor = useBgColor();
  const { push } = useSafePush();

  return (
    <ListItem key={nav.label}>
      <Flex
        bgColor={isActivated ? bgColor(50) : "transparent"}
        align={"center"}
        p={4}
        gap={4}
        borderRadius={"md"}
        onClick={() => push({ pathname: nav.pathname, query: nav.query })}
      >
        <Tooltip
          hasArrow
          label={t(nav.label)}
          display={{ base: "block", xl: "none" }}
        >
          <Center
            w={8}
            h={8}
            bgColor={isActivated ? "primary.500" : "transparent"}
            border={"1px solid"}
            borderColor={isActivated ? "transparent" : "primary.500"}
            borderRadius={"md"}
          >
            <Icon as={nav.icon} color={isActivated ? "white" : "primary.500"} />
          </Center>
        </Tooltip>
        <Text display={{ base: "none", xl: "initial" }}>{t(nav.label)}</Text>
      </Flex>
    </ListItem>
  );
};

export default HorizontalLayoutNavbarTab;
