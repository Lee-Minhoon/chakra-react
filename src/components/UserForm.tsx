import { User, usePostUser } from "@/apis";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const { register, handleSubmit } = useForm<User>();
  const { mutate: postUser } = usePostUser();

  return (
    <form
      onSubmit={handleSubmit(useCallback((data) => postUser(data), [postUser]))}
    >
      <input {...register("name")} />
      <button>Create User</button>
    </form>
  );
};

export default UserForm;
