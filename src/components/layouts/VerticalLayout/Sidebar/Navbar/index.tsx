import { navbarTabs } from "@/constants";
import { UnorderedList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Tab from "./Tab";

const Navbar = () => {
  const router = useRouter();

  return (
    <UnorderedList
      display={"flex"}
      flexDirection={"column"}
      listStyleType={"none"}
      m={0}
      py={4}
      gap={4}
    >
      {navbarTabs.map((tab) => (
        <Tab
          key={tab.label}
          tab={tab}
          isSelected={
            tab.pathname.split("/")[1] === router.pathname.split("/")[1]
          }
        />
      ))}
    </UnorderedList>
  );
};

export default Navbar;
