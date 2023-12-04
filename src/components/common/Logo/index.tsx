import { Center, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Logo = () => {
  return (
    <Center>
      <Link href={"/"}>
        <Heading size={"md"} color={"primary.500"}>
          NextJS Boilerplate
        </Heading>
      </Link>
    </Center>
  );
};

export default Logo;
