import { PageRoutes, ViewOptionQueries } from "@/constants";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

const tabs = [
  {
    label: "Users",
    pathname: PageRoutes.Users,
    query: { view: ViewOptionQueries.All },
  },
  {
    label: "Posts",
    pathname: PageRoutes.Posts,
    query: { view: ViewOptionQueries.All },
  },
];

const Navbar = () => {
  const router = useRouter();

  const selectedIndex = useMemo(() => {
    return tabs.findIndex(
      (tab) => tab.pathname.split("/")[1] === router.pathname.split("/")[1]
    );
  }, [router.pathname]);

  return (
    <Tabs
      variant="enclosed"
      index={selectedIndex}
      onChange={(index) => {
        const tab = tabs[index];
        router.push({ pathname: tab.pathname, query: tab.query });
      }}
    >
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.label}>{tab.label}</Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default Navbar;
