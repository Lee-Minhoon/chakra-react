import { Post } from "@/apis";
import { PageRoutes } from "@/constants";
import { useBgColor, useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useCallback } from "react";

interface PostListItemProps {
  data: Post;
}

const PostListItem = ({ data: post }: PostListItemProps) => {
  const bgColor = useBgColor();
  const { push } = useRouterPush();

  const handleClick = useCallback(() => {
    push(toUrl(PageRoutes.PostDetail, { id: post.id }));
  }, [push, post]);

  return (
    <Card
      direction={"row"}
      onClick={handleClick}
      cursor={"pointer"}
      _hover={{ backgroundColor: bgColor }}
    >
      <Flex flex={1} direction={"column"}>
        <CardHeader>
          <Flex gap={4}>
            <Avatar src={post.title} w={10} h={10} />
            <Heading size={"lg"}>{post.title ?? "Name"}</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box
              dangerouslySetInnerHTML={{ __html: post?.content ?? "Content" }}
              __css={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            />
          </Stack>
        </CardBody>
      </Flex>
    </Card>
  );
};

export default PostListItem;
