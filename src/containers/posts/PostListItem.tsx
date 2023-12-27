import { Post } from "@/apis";
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

interface PostListItemProps {
  data: Post;
}

const PostListItem = ({ data: post }: PostListItemProps) => {
  return (
    <Card direction={"row"}>
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
