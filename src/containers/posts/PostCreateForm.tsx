import { PostCreate, useCreatePost } from "@/apis";
import { useGetMe } from "@/apis/auth";
import { Editor, FormField } from "@/components";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import { Button, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

const PostCreateForm = () => {
  const { push } = useRouterPush();
  const { data: me } = useGetMe();
  const { register, handleSubmit, control } = useForm<PostCreate>({
    defaultValues: {
      userId: me?.id,
    },
  });
  const { mutate: createPost, isLoading } = useCreatePost();

  return (
    <Flex
      as={"form"}
      direction="column"
      gap={4}
      onSubmit={handleSubmit(
        useCallback(
          (data) =>
            createPost(data, {
              onSuccess: (res) =>
                push(toUrl(PageRoutes.PostDetail, { id: res.data })),
            }),
          [createPost, push]
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
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange } }) => {
          return (
            <Editor
              defaultValue={value ?? "Hello, World!"}
              onChange={onChange}
            />
          );
        }}
      />
      <Button type={"submit"} isDisabled={isLoading} alignSelf={"flex-end"}>
        Submit
      </Button>
    </Flex>
  );
};

export default PostCreateForm;
