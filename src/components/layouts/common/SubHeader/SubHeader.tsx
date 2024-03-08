import { PageRoutes, findNavInHierarchy } from "@/constants";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Link } from "@chakra-ui/next-js";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";

const SubHeader = () => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();

  const hierarchy = useMemo(
    () => findNavInHierarchy(router.pathname),
    [router.pathname]
  );

  return (
    <>
      {hierarchy.length > 0 && (
        <Flex gap={"2"}>
          <Flex gap={"2"} align={"center"}>
            <Icon
              as={MdHome}
              onClick={() => push(toUrl(PageRoutes.Home))}
              cursor={"pointer"}
            />
            <Icon as={MdKeyboardArrowRight} />
          </Flex>
          {hierarchy.map((nav, idx) => (
            <Flex key={nav.label} gap={"2"} align={"center"}>
              {idx !== hierarchy.length - 1 ? (
                <>
                  <Link
                    href={{ pathname: nav.pathname, query: nav.query }}
                    fontSize={"sm"}
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
