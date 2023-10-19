import { User, usePostUser } from "@/apis";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const { register, handleSubmit } = useForm<User>();
  const { mutate: postUser } = usePostUser();

  return (
    <Flex
      as={"form"}
      direction={"column"}
      gap={4}
      w={80}
      onSubmit={handleSubmit(useCallback((data) => postUser(data), [postUser]))}
    >
      <Input {...register("name")} placeholder="name" />
      <Input {...register("email")} placeholder="email" />
      <Input {...register("phone")} placeholder="phone" />
      <Button type={"submit"}>Create User</Button>
    </Flex>
  );
};

export default UserForm;
