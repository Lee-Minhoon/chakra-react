import { libraries, links } from "@/constants";
import useBgColor from "@/hooks/useBgColor";
import { Divider, Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import { Fragment } from "react";

const Footer = () => {
  const bgColor = useBgColor();

  return (
    <Flex
      as={"footer"}
      w={"100%"}
      justify={"center"}
      mt={10}
      pt={10}
      pb={20}
      bgColor={bgColor}
    >
      <Flex direction={"column"} w={1024} gap={4}>
        <Flex gap={4}>
          {links.map((link, idx) => (
            <Fragment key={idx}>
              <Link href={link.url} target={"_blank"}>
                {link.title}
              </Link>
              {idx !== links.length - 1 && <Divider orientation={"vertical"} />}
            </Fragment>
          ))}
        </Flex>
        <Flex gap={4}>
          {libraries.map((link, idx) => (
            <Fragment key={idx}>
              <Link href={link.url} target={"_blank"} fontSize={"sm"}>
                {link.title}
              </Link>
              <Divider orientation={"vertical"} />
            </Fragment>
          ))}
          <Tooltip hasArrow label={"react, nextjs, typescript, etc..."}>
            <Text fontSize={"sm"}>and more...</Text>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
