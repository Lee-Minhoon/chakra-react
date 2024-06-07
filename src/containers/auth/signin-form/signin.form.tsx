import { AuthSignin, useSignin } from "@/apis/auth";
import { Logo, WithFormLabel } from "@/components";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Box, Button, Card, Input } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SigninForm = () => {
  const { router, push } = useSafePush();
  const { register, handleSubmit } = useForm<AuthSignin>();
  const { mutate: signin, isLoading, isSuccess } = useSignin();
  const { t } = useTranslation();

  return (
    <Card direction={"column"} gap={"4"} p={"8"}>
      <Logo onClick={() => push(toUrl(PageRoutes.Home))} />
      <Box
        as={"form"}
        display={"flex"}
        flexDirection={"column"}
        gap={"4"}
        onSubmit={handleSubmit(
          useCallback(
            (data) =>
              signin(data, {
                onSuccess: () => {
                  router.push(
                    router.query.redirect?.toString() ?? toUrl(PageRoutes.Home)
                  );
                },
              }),
            [router, signin]
          )
        )}
      >
        <WithFormLabel label={t("Email")}>
          <Input {...register("email")} />
        </WithFormLabel>
        <Button
          type={"submit"}
          isLoading={isLoading || isSuccess}
          isDisabled={isLoading || isSuccess}
        >
          {t("Sign In")}
        </Button>
      </Box>
    </Card>
  );
};

export default SigninForm;
