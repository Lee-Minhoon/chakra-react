import { Post, PostUpdate, useUpdatePost } from "@/apis";
import { FormField } from "@/components";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Button, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

interface PostUpdateFormProps {
  post: Post;
}

const PostUpdateForm = ({ post }: PostUpdateFormProps) => {
  const { push } = useSafePush();
  const { register, handleSubmit, control } = useForm<PostUpdate>({
    defaultValues: {
      ...post,
    },
  });
  const { mutate: updatePost, isLoading } = useUpdatePost(post.id);

  return (
    <Flex
      as={"form"}
      direction="column"
      gap={4}
      onSubmit={handleSubmit(
        useCallback(
          (data) =>
            updatePost(data, {
              onSuccess: (res) =>
                push(toUrl(PageRoutes.PostDetail, { id: res.data })),
            }),
          [updatePost, push]
        )
      )}
    >
      <FormField
        fieldType={"string"}
        isRequired
        label={"Title"}
        placeholder="Title"
        {...register("title")}
      />
      <FormField fieldType={"document"} name={"content"} control={control} />
      <Button type={"submit"} isDisabled={isLoading} alignSelf={"flex-end"}>
        Submit
      </Button>
    </Flex>
  );
};

export default PostUpdateForm;
