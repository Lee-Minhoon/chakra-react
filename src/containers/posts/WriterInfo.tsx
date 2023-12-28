import { PostWithUser } from "@/apis";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { formatISO, toUrl } from "@/utils";
import { Avatar, Flex, Text } from "@chakra-ui/react";

interface WriterInfoProps {
  post?: PostWithUser;
}

const WriterInfo = ({ post }: WriterInfoProps) => {
  const { push } = useRouterPush();

  return (
    <Flex gap={4} align={"center"}>
      <Avatar
        name={post?.user.name}
        src={post?.user.profile}
        w={10}
        h={10}
        cursor={"pointer"}
        _hover={{ opacity: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          push(toUrl(PageRoutes.UserDetail, { id: post?.user.id }));
        }}
      />
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
