import { getNavHierarchy, navs } from "@/constants";
import { useRoute } from "@/hooks";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const VerticalLayoutNav = () => {
  const { route } = useRoute();
  const location = useLocation();
  const { t } = useTranslation();

  const hierarchy = useMemo(
    () => getNavHierarchy(location.pathname),
    [location.pathname]
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
            onClick={() => {
              route(nav);
            }}
          >
            {t(nav.label)}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default VerticalLayoutNav;
