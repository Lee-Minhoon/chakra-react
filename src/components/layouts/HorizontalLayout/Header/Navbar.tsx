import { findNavInHierarchy, navs } from "@/constants";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Navbar = () => {
  const router = useRouter();

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
