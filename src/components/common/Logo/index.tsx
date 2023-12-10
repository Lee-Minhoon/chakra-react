import { Center, Heading } from "@chakra-ui/react";

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Center>
      <Heading
        size={"md"}
        color={"primary.500"}
        cursor={onClick ? "pointer" : "default"}
        onClick={onClick}
        _hover={{ color: onClick ? "primary.600" : "primary.500" }}
      >
        NextJS Boilerplate
      </Heading>
    </Center>
  );
};

export default Logo;
