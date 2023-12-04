import { navbarTabs } from "@/constants";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Navbar = () => {
  const router = useRouter();

  const selectedIndex = useMemo(() => {
    return navbarTabs.findIndex(
      (tab) => tab.pathname.split("/")[1] === router.pathname.split("/")[1]
    );
  }, [router.pathname]);

  return (
    <Tabs variant="enclosed" index={selectedIndex}>
      <TabList>
        {navbarTabs.map((tab) => (
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
