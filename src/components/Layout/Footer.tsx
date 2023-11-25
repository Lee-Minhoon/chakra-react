import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return <Box as={"footer"}></Box>;
};

export default Footer;
