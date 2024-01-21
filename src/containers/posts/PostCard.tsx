import { Post, useDeletePost, useGetMe } from "@/apis";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
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
import { TbEdit } from "react-icons/tb";
import WriterInfo from "./WriterInfo";

interface PostCardProps {
  data?: Post;
}

const PostCard = ({ data: post }: PostCardProps) => {
  const { push } = useSafePush();
  const { data: me } = useGetMe();
  const { mutate: deletePost } = useDeletePost();
  const { openConfirm } = useModalStore(["openConfirm"]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!post}>
          <Flex justify={"space-between"}>
            <WriterInfo post={post} />
            {me?.id === post?.userId && (
              <Flex gap={4}>
                <Button
                  size={"sm"}
                  rightIcon={<TbEdit />}
                  onClick={() =>
                    push(toUrl(PageRoutes.EditPost, { id: post?.id }))
                  }
                >
                  Edit
                </Button>
                <Button
                  size={"sm"}
                  rightIcon={<TbEdit />}
                  onClick={() => {
                    if (!post?.id) return;
                    openConfirm({
                      title: "Delete Post",
                      content: "Are you sure you want to delete this post?",
                      onConfirm: () =>
                        deletePost(post?.id, {
                          onSuccess: () => push(toUrl(PageRoutes.Home)),
                        }),
                    });
                  }}
                >
                  Delete
                </Button>
              </Flex>
            )}
          </Flex>
        </Skeleton>
      </CardHeader>
      <CardBody>
        <Skeleton isLoaded={!!post}>
          <Heading mb={4} size={"md"}>
            {post?.title ?? "Title"}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!!post}>
          <Box
            dangerouslySetInnerHTML={{ __html: post?.content ?? "Content" }}
          />
        </Skeleton>
      </CardBody>
    </Card>
  );
};

export default PostCard;
