import { Post } from "@/apis";
import { PageRoutes } from "@/constants";
import { useAlphaColor, useRoute } from "@/hooks";
import { toPath } from "@/utils";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { PostWriter } from "../post-writer";

interface PostListItemProps {
  data: Post;
}

const PostListItem = ({ data: post }: PostListItemProps) => {
  const alphaColor = useAlphaColor();
  const { route } = useRoute();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    route({ pathname: toPath(PageRoutes.PostDetail, { id: post.id }) });
  }, [route, post]);

  return (
    <Card
      direction={"row"}
      onClick={handleClick}
      cursor={"pointer"}
      _hover={{ backgroundColor: alphaColor(50) }}
    >
      <Flex flex={1} direction={"column"}>
        <CardHeader>
          <PostWriter post={post} />
        </CardHeader>
        <CardBody>
          <Heading mb={"4"} size={"md"}>
            {post.title ?? t("Title")}
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
