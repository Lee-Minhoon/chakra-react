import {
  useCreatePost,
  useCreateTestPosts,
  useGetMe,
  useResetTestPosts,
} from "@/apis";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { getRandomString } from "@/utils";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GrPowerReset } from "react-icons/gr";
import { TbPlus } from "react-icons/tb";

const count = 1000;

const PostsUtils = () => {
  const { data: me } = useGetMe();
  const { push } = useSafePush();
  const { mutate: createPost, isLoading: createPostIsLoading } =
    useCreatePost();
  const { mutate: createTestPosts, isLoading: createTestPostsIsLoading } =
    useCreateTestPosts(count);
  const { mutate: resetTestPosts, isLoading: resetTestPostsIsLoading } =
    useResetTestPosts();
  const { t } = useTranslation();

  const handleCreatePost = useCallback(() => {
    push(PageRoutes.WritePost);
  }, [push]);

  const handleCreateRandomPost = useCallback(() => {
    if (!me) return;
    createPost({
      title: getRandomString(10),
      content: getRandomString(100),
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
    <Flex gap={"4"}>
      <Tooltip hasArrow label={t("Create Post")}>
        <Button leftIcon={<TbPlus />} onClick={handleCreatePost}>
          {t("Post")}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t("Create Random Post")}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleCreateRandomPost}
          isLoading={createPostIsLoading}
          isDisabled={createPostIsLoading}
        >
          {t("Random Post")}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t("Create Posts for Test", { count })}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleCreateTestPosts}
          isLoading={createTestPostsIsLoading}
          isDisabled={createTestPostsIsLoading}
        >
          {`${count} ${t("Posts")}`}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t("Reset All Posts")}>
        <Button
          variant={"outline"}
          leftIcon={<GrPowerReset />}
          onClick={handleResetTestPosts}
          isLoading={resetTestPostsIsLoading}
          isDisabled={resetTestPostsIsLoading}
        >
          {t("Posts")}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default PostsUtils;
