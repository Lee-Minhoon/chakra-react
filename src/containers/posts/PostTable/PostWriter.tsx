import { PostWithUser } from "@/apis";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import { Avatar, Box, Flex } from "@chakra-ui/react";

interface PostWriterProps {
  writer: PostWithUser["user"];
}

const PostWriter = ({ writer }: PostWriterProps) => {
  const { push } = useRouterPush();

  return (
    <Flex gap={4} align={"center"}>
      <Box
        cursor={"pointer"}
        _hover={{ opacity: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          push(toUrl(PageRoutes.UserDetail, { id: writer.id }));
        }}
      >
        <Avatar name={writer.name} src={writer.profile} w={10} h={10} />
      </Box>
      {writer.name}
    </Flex>
  );
};

export default PostWriter;
