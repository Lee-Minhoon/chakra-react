import { Post } from "@/apis";
import { Editor } from "@/components";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

const PostForm = () => {
  const { register, handleSubmit, control } = useForm<Post>();

  return (
    <Flex
      as={"form"}
      direction="column"
      gap={4}
      onSubmit={handleSubmit(
        useCallback((data) => {
          console.log(data);
        }, [])
      )}
    >
      <Input {...register("title")} placeholder="Title" />
      <Controller
        control={control}
        name="content"
        render={({ field: { onChange } }) => {
          return <Editor defaultValue={"Hello, World!"} onChange={onChange} />;
        }}
      />
      <Button type={"submit"} alignSelf={"flex-end"}>
        Submit
      </Button>
    </Flex>
  );
};

export default PostForm;
