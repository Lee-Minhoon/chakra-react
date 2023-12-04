import { Center, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Logo = () => {
  return (
    <Center>
      <Link href={"/"}>
        <Heading>Home</Heading>
      </Link>
    </Center>
  );
};

export default Logo;
