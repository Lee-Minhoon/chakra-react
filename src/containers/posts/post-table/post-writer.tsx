import { Post } from "@/apis";
import { PageRoutes } from "@/constants";
import { useRoute } from "@/hooks";
import { toPath } from "@/utils";
import { Avatar, Box, Flex } from "@chakra-ui/react";
import React, { useCallback } from "react";

interface PostWriterProps {
  writer: Post["user"];
}

const PostWriter = ({ writer }: PostWriterProps) => {
  const { route } = useRoute();

  const handleClick = useCallback<React.MouseEventHandler>(
    (e) => {
      e.stopPropagation();
      if (!writer) return;
      route({ pathname: toPath(PageRoutes.UserDetail, { id: writer.id }) });
    },
    [route, writer]
  );

  return (
    <Flex gap={"4"} align={"center"}>
      <Box cursor={"pointer"} _hover={{ opacity: 0.5 }} onClick={handleClick}>
        <Avatar name={writer?.name} src={writer?.profile} w={"10"} h={"10"} />
      </Box>
      {writer?.name}
    </Flex>
  );
};

export default PostWriter;
