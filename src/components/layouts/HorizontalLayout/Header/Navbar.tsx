import { navs } from "@/constants";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Navbar = () => {
  const router = useRouter();

  const selectedIndex = useMemo(() => {
    return navs.findIndex((nav) => nav.matcher(router.pathname));
  }, [router.pathname]);

  return (
    <Tabs variant="enclosed" index={selectedIndex}>
      <TabList>
        {navs.map((nav) => (
          <Link
            key={nav.label}
            href={{ pathname: nav.pathname, query: nav.query }}
          >
            <Tab>{nav.label}</Tab>
          </Link>
        ))}
      </TabList>
    </Tabs>
  );
};

export default Navbar;
