import { navs } from "@/constants";
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
      {navs.map((nav) => (
        <Tab
          key={nav.label}
          nav={nav}
          isActivated={!!nav.matcher(router.pathname)}
        />
      ))}
    </UnorderedList>
  );
};

export default Navbar;
