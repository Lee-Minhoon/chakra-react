import { Post } from "@/apis";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { formatISO, toUrl } from "@/utils";
import { Avatar, Flex, Text } from "@chakra-ui/react";

interface WriterInfoProps {
  post?: Post;
}

const WriterInfo = ({ post }: WriterInfoProps) => {
  const { push } = useRouterPush();

  const user = post?.user;

  return (
    <Flex gap={4} align={"center"}>
      <Avatar
        name={user?.name}
        src={user?.profile}
        w={10}
        h={10}
        cursor={"pointer"}
        _hover={{ opacity: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          if (!user) return;
          push(toUrl(PageRoutes.UserDetail, { id: user.id }));
        }}
      />
      <Flex direction={"column"} gap={2}>
        {user ? (
          <Text>{`${user.name ?? "User Name"} (${
            user.email ?? "User Email"
          })`}</Text>
        ) : (
          <Text>Deleted User</Text>
        )}
        <Text>
          {post?.createdAt ? formatISO(post?.createdAt) : "Created At"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default WriterInfo;
