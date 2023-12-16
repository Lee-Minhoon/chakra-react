import { PageRoutes } from "@/constants";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TbPlus } from "react-icons/tb";

const PostsUtils = () => {
  const router = useRouter();

  return (
    <Flex gap={4}>
      <Tooltip hasArrow label={"Create User"}>
        <Button
          leftIcon={<TbPlus />}
          onClick={() => router.push(PageRoutes.WritePost)}
        >
          Post
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default PostsUtils;
