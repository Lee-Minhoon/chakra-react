import { libraries, links } from "@/constants";
import { useAlphaColor } from "@/hooks";
import { Divider, Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import { Fragment } from "react";

const VerticalLayoutFooter = () => {
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
      <Flex direction={"column"} w={1280} gap={"4"}>
        <Flex gap={"4"}>
          {links.map((link, idx) => (
            <Fragment key={idx}>
              <Link href={link.url} target={"_blank"}>
                {link.title}
              </Link>
              {idx !== links.length - 1 && <Divider orientation={"vertical"} />}
            </Fragment>
          ))}
        </Flex>
        <Flex gap={"4"}>
          {libraries.map((link, idx) => (
            <Fragment key={idx}>
              <Link href={link.url} target={"_blank"} fontSize={"sm"}>
                {link.title}
              </Link>
              <Divider orientation={"vertical"} />
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

export default VerticalLayoutFooter;
