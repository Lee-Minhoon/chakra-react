import { Post, useDeletePost, useGetMe } from "@/apis";
import { PageRoutes, defaultQuery } from "@/constants";
import { useRoute } from "@/hooks";
import { useModalStore } from "@/stores";
import { toPath } from "@/utils";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { TbEdit } from "react-icons/tb";
import { PostWriter } from "../post-writer";

interface PostCardProps {
  data?: Post;
}

const PostCard = ({ data: post }: PostCardProps) => {
  const { route } = useRoute();
  const { data: me } = useGetMe();
  const { mutate: deletePost } = useDeletePost();
  const { openConfirm } = useModalStore(["openConfirm"]);
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!post}>
          <Flex justify={"space-between"}>
            <PostWriter post={post} />
            {me?.id === post?.user?.id && (
              <Flex gap={"4"}>
                <Button
                  rightIcon={<TbEdit />}
                  onClick={() =>
                    route({
                      pathname: toPath(PageRoutes.PostEdit, { id: post?.id }),
                    })
                  }
                >
                  {t("Edit")}
                </Button>
                <Button
                  rightIcon={<TbEdit />}
                  onClick={() => {
                    if (!post?.id) return;
                    openConfirm({
                      title: t("Delete Post"),
                      content: t("Are you sure you want to delete this post?"),
                      onConfirm: () =>
                        deletePost(post?.id, {
                          onSuccess: () => {
                            route({
                              pathname: toPath(PageRoutes.Posts),
                              search: defaultQuery,
                            });
                          },
                        }),
                    });
                  }}
                >
                  {t("Delete")}
                </Button>
              </Flex>
            )}
          </Flex>
        </Skeleton>
      </CardHeader>
      <CardBody>
        <Skeleton isLoaded={!!post}>
          <Heading mb={"4"} size={"md"}>
            {post?.title ?? t("Title")}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!!post}>
          <Box
            dangerouslySetInnerHTML={{ __html: post?.content ?? t("Content") }}
          />
        </Skeleton>
      </CardBody>
    </Card>
  );
};

export default PostCard;
