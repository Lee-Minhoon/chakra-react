import { PostWithUser } from "@/apis";
import { formatISO } from "@/utils";
import { Avatar, Flex, Text } from "@chakra-ui/react";

interface WriterInfoProps {
  post?: PostWithUser;
}

const WriterInfo = ({ post }: WriterInfoProps) => {
  return (
    <Flex gap={4} align={"center"}>
      <Avatar name={post?.user.name} src={post?.user.profile} w={10} h={10} />
      <Flex direction={"column"} gap={2}>
        <Text>{`${post?.user.name ?? "User Name"} (${
          post?.user.email ?? "User Email"
        })`}</Text>
        <Text>
          {post?.createdAt ? formatISO(post?.createdAt) : "Created At"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default WriterInfo;
