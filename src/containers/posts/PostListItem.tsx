import { PostWithUser } from "@/apis";
import { PageRoutes } from "@/constants";
import { useBgColor, useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useCallback } from "react";
import WriterInfo from "./WriterInfo";

interface PostListItemProps {
  data: PostWithUser;
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
          <WriterInfo post={post} />
        </CardHeader>
        <CardBody>
          <Heading mb={4} size={"md"}>
            {post.title ?? "Name"}
          </Heading>
          <Box
            dangerouslySetInnerHTML={{ __html: post?.content ?? "Content" }}
            __css={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          />
        </CardBody>
      </Flex>
    </Card>
  );
};

export default PostListItem;
