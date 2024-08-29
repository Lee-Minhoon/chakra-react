import { libraries, links } from "@/constants";
import { useAlphaColor } from "@/hooks";
import { Divider, Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import { Fragment } from "react";

const Footer = () => {
  const alphaColor = useAlphaColor();

  return (
    <Flex
      as={"footer"}
      w={"100%"}
      justify={"center"}
      mt={"10"}
      pt={"10"}
      pb={"20"}
      bgColor={alphaColor(50)}
    >
      <Flex
        direction={"column"}
        w={{ base: "100%", xl: "container.xl" }}
        gap={"4"}
        px={{ base: "4", xl: "0" }}
      >
        <Flex gap={"4"}>
          {links.map((link, idx) => (
            <Fragment key={idx}>
              <Link href={link.url} target={"_blank"}>
                {link.title}
              </Link>
              {idx !== links.length - 1 && (
                <Divider orientation={"vertical"} h={"4"} />
              )}
            </Fragment>
          ))}
        </Flex>
        <Flex gap={"4"} wrap={"wrap"} align={"center"}>
          {libraries.map((link, idx) => (
            <Fragment key={idx}>
              <Link href={link.url} target={"_blank"} fontSize={"sm"}>
                {link.title}
              </Link>
              <Divider orientation={"vertical"} h={"4"} />
            </Fragment>
          ))}
          <Tooltip
            hasArrow
            label={"NextJS, React, Typescript, ESLint, Prettier, ETC..."}
          >
            <Text fontSize={"sm"}>and more...</Text>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
