import useBgColor from "@/hooks/useBgColor";
import { Divider, Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import { Fragment } from "react";

const links = [
  {
    title: "Github",
    url: "https://github.com/Lee-Minhoon",
  },
  {
    title: "Blog",
    url: "https://hackids.tistory.com/",
  },
];

const libraries = [
  {
    title: "Chakra UI",
    url: "https://npmjs.com/package/@chakra-ui/react",
  },
  {
    title: "Zustand",
    url: "https://npmjs.com/package/zustand",
  },
  {
    title: "React Query",
    url: "https://npmjs.com/package/@tanstack/react-query",
  },
  {
    title: "React Hook Form",
    url: "https://npmjs.com/package/react-hook-form",
  },
  {
    title: "React Table",
    url: "https://npmjs.com/package/react-table",
  },
  {
    title: "React Icons",
    url: "https://npmjs.com/package/react-icons",
  },
];

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
