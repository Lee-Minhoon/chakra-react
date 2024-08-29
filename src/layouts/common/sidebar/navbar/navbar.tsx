import { findNavInHierarchy, navs } from "@/constants";
import { UnorderedList } from "@chakra-ui/react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import NavbarTab from "./navbar.tab";

const Navbar = () => {
  const location = useLocation();

  const hierarchy = useMemo(
    () => findNavInHierarchy(location.pathname),
    [location.pathname]
  );

  return (
    <UnorderedList
      display={"flex"}
      flexDirection={"column"}
      listStyleType={"none"}
      m={"0"}
      py={"4"}
      gap={"4"}
    >
      {navs.map((nav) => (
        <NavbarTab
          key={nav.label}
          nav={nav}
          isActivated={hierarchy.includes(nav)}
        />
      ))}
    </UnorderedList>
  );
};

export default Navbar;
