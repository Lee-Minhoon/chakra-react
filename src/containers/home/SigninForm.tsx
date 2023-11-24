import { AuthSignin, useSignin } from "@/apis/auth";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const SigninForm = () => {
  const { register, handleSubmit } = useForm<AuthSignin>();
  const { mutate: signin } = useSignin();

  return (
    <Flex
      as={"form"}
      direction={"column"}
      gap={4}
      onSubmit={handleSubmit(useCallback((data) => signin(data), [signin]))}
    >
      <Input {...register("email")} />
      <Button type={"submit"}>Sign In</Button>
    </Flex>
  );
};

export default SigninForm;
