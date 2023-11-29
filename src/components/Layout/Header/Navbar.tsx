import { PageRoutes, ViewOptionQueries } from "@/constants";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import Link from "next/link";
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
    <Tabs variant="enclosed" index={selectedIndex}>
      <TabList>
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={{ pathname: tab.pathname, query: tab.query }}
          >
            <Tab>{tab.label}</Tab>
          </Link>
        ))}
      </TabList>
    </Tabs>
  );
};

export default Navbar;
