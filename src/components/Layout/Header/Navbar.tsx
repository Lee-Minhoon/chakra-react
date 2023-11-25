import { PageRoutes } from "@/constants";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

const tabs = [
  { label: "Users", pathname: PageRoutes.UsersAll },
  {
    label: "Posts",
    pathname: PageRoutes.PostsAll,
  },
];

const Navbar = () => {
  const router = useRouter();

  const selectedIndex = useMemo(() => {
    return tabs.findIndex((tab) => tab.pathname === router.pathname);
  }, [router.pathname]);

  return (
    <Tabs
      variant="enclosed"
      index={selectedIndex}
      onChange={(index) => router.push({ ...tabs[index] })}
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
