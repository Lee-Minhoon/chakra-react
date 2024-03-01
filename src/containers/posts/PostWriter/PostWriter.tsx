import { Post } from "@/apis";
import { PageRoutes } from "@/constants";
import { useFormatDate, useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface PostWriterProps {
  post?: Post;
}

const PostWriter = ({ post }: PostWriterProps) => {
  const { push } = useSafePush();
  const formatDate = useFormatDate();
  const { t } = useTranslation();

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
          <Text>{`${user.name ?? t("User Name")} (${
            user.email ?? t("User Email")
          })`}</Text>
        ) : (
          <Text>{t("Deleted User")}</Text>
        )}
        <Text>
          {post?.createdAt ? formatDate(post?.createdAt) : t("Created At")}
        </Text>
      </Flex>
    </Flex>
  );
};

export default PostWriter;
