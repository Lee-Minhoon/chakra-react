import { findNavInHierarchy, navs } from "@/constants";
import { useSafePush } from "@/hooks";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const VerticalLayoutNavbar = () => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();

  const hierarchy = useMemo(
    () => findNavInHierarchy(router.pathname),
    [router.pathname]
  );

  const selectedIndex = useMemo(() => {
    return navs.findIndex((nav) => hierarchy.includes(nav));
  }, [hierarchy]);

  return (
    <Tabs variant="enclosed" index={selectedIndex}>
      <TabList>
        {navs.map((nav) => (
          <Tab
            key={nav.label}
            onClick={() => push({ pathname: nav.pathname, query: nav.query })}
          >
            {t(nav.label)}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default VerticalLayoutNavbar;
