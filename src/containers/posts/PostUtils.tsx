import {
  useCreatePost,
  useCreateTestPosts,
  useGetMe,
  useResetTestPosts,
} from "@/apis";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { getRandomString } from "@/utils";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { GrPowerReset } from "react-icons/gr";
import { TbPlus } from "react-icons/tb";

const count = 50;

const PostsUtils = () => {
  const { data: me } = useGetMe();
  const { push } = useRouterPush();
  const { mutate: createPost } = useCreatePost();
  const { mutate: createTestPosts, isLoading: createTestPostsIsLoading } =
    useCreateTestPosts(count);
  const { mutate: resetTestPosts, isLoading: restTestPostsIsLoading } =
    useResetTestPosts();

  const handleCreatePost = useCallback(() => {
    push(PageRoutes.WritePost);
  }, [push]);

  const handleCreateRandomPost = useCallback(() => {
    if (!me) return;
    createPost({
      title: getRandomString(10),
      content: `${getRandomString(20)}@gmail.com`,
      userId: me.id,
    });
  }, [createPost, me]);

  const handleCreateTestPosts = useCallback(() => {
    createTestPosts();
  }, [createTestPosts]);

  const handleResetTestPosts = useCallback(() => {
    resetTestPosts();
  }, [resetTestPosts]);

  return (
    <Flex gap={4}>
      <Tooltip hasArrow label={"Create Post"}>
        <Button leftIcon={<TbPlus />} onClick={handleCreatePost}>
          Post
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={"Create Random Post"}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleCreateRandomPost}
        >
          Random Post
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={"Create 50 Posts for Test"}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleCreateTestPosts}
          isDisabled={createTestPostsIsLoading}
        >
          {`${count} Posts`}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={"Reset All Posts"}>
        <Button
          variant={"outline"}
          leftIcon={<GrPowerReset />}
          onClick={handleResetTestPosts}
          isDisabled={restTestPostsIsLoading}
        >
          Posts
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default PostsUtils;
