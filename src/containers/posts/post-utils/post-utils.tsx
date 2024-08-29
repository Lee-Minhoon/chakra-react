import {
  useCreatePost,
  useCreateTestPosts,
  useGetMe,
  useResetTestPosts,
} from "@/apis";
import { ApiRoutes, PageRoutes } from "@/constants";
import { useQueryKeyParams, useRoute } from "@/hooks";
import { randomString, toPath } from "@/utils";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GrPowerReset } from "react-icons/gr";
import { TbPlus } from "react-icons/tb";

const count = 100;

const PostsUtils = () => {
  const { data: me } = useGetMe();
  const { route } = useRoute();
  const queryKeyParams = useQueryKeyParams(toPath(ApiRoutes.Post));
  const { mutate: createPost, isLoading: createPostIsLoading } =
    useCreatePost(queryKeyParams);
  const { mutate: createTestPosts, isLoading: createTestPostsIsLoading } =
    useCreateTestPosts(count);
  const { mutate: resetTestPosts, isLoading: resetTestPostsIsLoading } =
    useResetTestPosts();
  const { t } = useTranslation();

  const handleCreatePost = useCallback(() => {
    route({ pathname: toPath(PageRoutes.PostWrite) });
  }, [route]);

  const handleCreateRandomPost = useCallback(() => {
    if (!me) return;
    createPost({
      title: randomString(10),
      content: randomString(1000),
    });
  }, [createPost, me]);

  const handleCreateTestPosts = useCallback(() => {
    createTestPosts();
  }, [createTestPosts]);

  const handleResetTestPosts = useCallback(() => {
    resetTestPosts();
  }, [resetTestPosts]);

  return (
    <Flex gap={"4"} wrap={"wrap"}>
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
