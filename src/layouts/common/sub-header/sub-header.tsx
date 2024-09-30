import { PageRoutes, getNavHierarchy } from "@/constants";
import { useRoute } from "@/hooks";
import { toPath } from "@/utils";
import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import { useLocation } from "react-router-dom";

const SubHeader = () => {
  const { route } = useRoute();
  const location = useLocation();
  const { t } = useTranslation();

  const hierarchy = useMemo(
    () => getNavHierarchy(location.pathname),
    [location.pathname]
  );

  const handleClickHome = useCallback(() => {
    route({ pathname: toPath(PageRoutes.Home) });
  }, [route]);

  return (
    <>
      {hierarchy.length > 0 && (
        <Flex gap={"2"}>
          <Flex gap={"2"} align={"center"}>
            <Icon as={MdHome} onClick={handleClickHome} cursor={"pointer"} />
            <Icon as={MdKeyboardArrowRight} />
          </Flex>
          {hierarchy.map((nav, idx) => (
            <Flex key={nav.label} gap={"2"} align={"center"}>
              {idx !== hierarchy.length - 1 ? (
                <>
                  <Link
                    fontSize={"sm"}
                    onClick={() => {
                      route(nav);
                    }}
                  >
                    <Text>{t(nav.label)}</Text>
                  </Link>
                  {idx !== hierarchy.length - 1 && (
                    <Icon as={MdKeyboardArrowRight} />
                  )}
                </>
              ) : (
                <Text color={"primary.500"} fontSize={"sm"} fontWeight={"bold"}>
                  {t(nav.label)}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};

export default SubHeader;
