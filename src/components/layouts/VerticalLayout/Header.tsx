import { PageRoutes, findNavInHierarchy } from "@/constants";
import { useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import { Link } from "@chakra-ui/next-js";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";

const Header = () => {
  const { router, push } = useRouterPush();

  const hierarchy = useMemo(
    () => findNavInHierarchy(router.pathname),
    [router.pathname]
  );

  return (
    <>
      {hierarchy.length > 0 && (
        <Flex gap={2}>
          <Flex gap={2} align={"center"}>
            <Icon
              as={MdHome}
              onClick={() => push(toUrl(PageRoutes.Home))}
              cursor={"pointer"}
            />
            <Icon as={MdKeyboardArrowRight} />
          </Flex>
          {hierarchy.map((nav, idx) => (
            <Flex key={nav.label} gap={2} align={"center"}>
              {idx !== hierarchy.length - 1 ? (
                <>
                  <Link
                    href={{ pathname: nav.pathname, query: nav.query }}
                    fontSize={"sm"}
                  >
                    <Text>{nav.label}</Text>
                  </Link>
                  {idx !== hierarchy.length - 1 && (
                    <Icon as={MdKeyboardArrowRight} />
                  )}
                </>
              ) : (
                <Text color={"primary.500"} fontSize={"sm"} fontWeight={"bold"}>
                  {nav.label}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};

export default Header;
