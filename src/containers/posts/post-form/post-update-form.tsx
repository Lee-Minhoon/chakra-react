import { Post, PostUpdate, useUpdatePost } from "@/apis";
import { FormField } from "@/components";
import { PageRoutes } from "@/constants";
import { useRoute } from "@/hooks";
import { toPath } from "@/utils";
import { Button, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface PostUpdateFormProps {
  post: Post;
}

const PostUpdateForm = ({ post }: PostUpdateFormProps) => {
  const { route } = useRoute();
  const { control, handleSubmit } = useForm<PostUpdate>({
    defaultValues: {
      ...post,
    },
  });
  const { mutate: updatePost, isLoading, isSuccess } = useUpdatePost(post.id);
  const { t } = useTranslation();

  return (
    <Flex
      as={"form"}
      direction="column"
      gap={"4"}
      onSubmit={handleSubmit(
        useCallback(
          (data) =>
            updatePost(data, {
              onSuccess: (res) => {
                route({
                  pathname: toPath(PageRoutes.PostDetail, { id: res.data }),
                });
              },
            }),
          [updatePost, route]
        )
      )}
    >
      <FormField
        label={t("Title")}
        fieldType={"string"}
        control={control}
        name={"title"}
        isRequired
        placeholder={t("Title")}
      />
      <FormField fieldType={"document"} control={control} name={"content"} />
      <Button
        type={"submit"}
        isLoading={isLoading || isSuccess}
        isDisabled={isLoading || isSuccess}
        alignSelf={"flex-end"}
      >
        {t("Submit")}
      </Button>
    </Flex>
  );
};

export default PostUpdateForm;
