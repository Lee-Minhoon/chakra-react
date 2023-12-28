import { AuthSignin, useSignin } from "@/apis/auth";
import { Logo, WithFormLabel } from "@/components";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { Box, Button, Card, Input } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const SigninForm = () => {
  const { router, push } = useRouterPush();
  const { register, handleSubmit } = useForm<AuthSignin>();
  const { mutate: signin } = useSignin();

  return (
    <Card direction={"column"} gap={4} p={8}>
      <Logo />
      <Box
        as={"form"}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
        onSubmit={handleSubmit(
          useCallback(
            (data) =>
              signin(data, {
                onSuccess: () =>
                  push(router.query.redirect?.toString() ?? PageRoutes.Home),
              }),
            [push, router.query.redirect, signin]
          )
        )}
      >
        <WithFormLabel label={"Email"}>
          <Input {...register("email")} />
        </WithFormLabel>
        <Button type={"submit"}>Sign In</Button>
      </Box>
    </Card>
  );
};

export default SigninForm;
