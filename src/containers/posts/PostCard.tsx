import { PostWithUser, useGetMe } from "@/apis";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";

interface PostCardProps {
  post?: PostWithUser;
}

const PostCard = ({ post }: PostCardProps) => {
  const { push } = useRouterPush();
  const { data: me } = useGetMe();

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!post?.user}>
          <Flex justify={"space-between"}>
            <Flex gap={4} align={"center"}>
              <Avatar src={post?.user.profile} w={10} h={10} />
              <Flex direction={"column"} gap={2}>
                <Text>{post?.user.name ?? "User Name"}</Text>
                <Text>{post?.user.email ?? "User Email"}</Text>
              </Flex>
            </Flex>
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
