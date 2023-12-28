import { PostWithUser, useGetMe } from "@/apis";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";
import WriterInfo from "./WriterInfo";

interface PostCardProps {
  data?: PostWithUser;
}

const PostCard = ({ data: post }: PostCardProps) => {
  const { push } = useRouterPush();
  const { data: me } = useGetMe();

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!post}>
          <Flex justify={"space-between"}>
            <WriterInfo post={post} />
            {me?.id === post?.userId && (
              <Button
                size={"sm"}
                rightIcon={<TbEdit />}
                onClick={() =>
                  push(toUrl(PageRoutes.EditPost, { id: post?.id }))
                }
              >
                Edit
              </Button>
            )}
          </Flex>
        </Skeleton>
      </CardHeader>
      <CardBody>
        <Skeleton isLoaded={!!post}>
          <Heading mb={4} size={"md"}>
            {post?.title ?? "Title"}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!!post}>
          <Box
            dangerouslySetInnerHTML={{ __html: post?.content ?? "Content" }}
          />
        </Skeleton>
      </CardBody>
    </Card>
  );
};

export default PostCard;
