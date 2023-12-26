import { PostWithUser } from "@/apis";
import { Profile } from "@/components";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";

interface PostCardProps {
  post?: PostWithUser;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!post?.user}>
          <Flex gap={4} align={"center"}>
            <Profile profile={post?.user.profile} w={10} h={10} />
            <Flex direction={"column"} gap={2}>
              <Text>{post?.user.name ?? "User Name"}</Text>
              <Text>{post?.user.email ?? "User Email"}</Text>
            </Flex>
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
