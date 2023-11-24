import { PageRoutes } from "@/constants";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

const tabs = [
  { label: "Users", pathname: PageRoutes.UsersAll },
  {
    label: "Users (Offset)",
    pathname: PageRoutes.UsersByOffset,
    query: { page: 1 },
  },
  {
    label: "Users (Cursor + Button)",
    pathname: PageRoutes.UsersByCursor,
    query: { type: "button" },
  },
  {
    label: "Users (Cursor + Observer)",
    pathname: PageRoutes.UsersByCursor,
    query: { type: "observer" },
  },
];

const UsersTab = () => {
  const router = useRouter();

  const selectedIndex = useMemo(() => {
    return tabs.findIndex(
      (tab) =>
        tab.pathname === router.pathname &&
        tab.query?.type === router.query?.type
    );
  }, [router.pathname, router.query?.type]);

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

export default UsersTab;
