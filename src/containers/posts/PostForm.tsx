import { Post, usePostPost } from "@/apis";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const PostForm = () => {
  const { register, handleSubmit } = useForm<Post>();
  const { mutate: postUser } = usePostPost();

  return (
    <form
      onSubmit={handleSubmit(useCallback((data) => postUser(data), [postUser]))}
    >
      <input {...register("title")} />
      <button>Create Post</button>
    </form>
  );
};

export default PostForm;
