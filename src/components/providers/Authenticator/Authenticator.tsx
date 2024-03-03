import { useGetMe } from "@/apis/auth";
import { PageRoutes, isExistPage, whiteList } from "@/constants";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Authenticator = () => {
  const { router, push } = useSafePush();
  const { data, isFetching } = useGetMe();
  const { openAlert, closeAlert } = useModalStore(["openAlert", "closeAlert"]);
  const { t } = useTranslation();

  useEffect(() => {
    if (
      !isExistPage(router.pathname) ||
      whiteList.includes(router.pathname) ||
      isFetching
    )
      return;
    if (!data) {
      push({
        pathname: PageRoutes.Signin,
        query: { redirect: router.asPath },
      })?.then(() => {
        openAlert({
          title: t("Unauthorized"),
          content: (
            <Flex direction={"column"} align={"center"} gap={"4"}>
              <Text>{t("You are not authorized to access this page")}</Text>
              <Flex gap={"4"}>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    router.push(toUrl(PageRoutes.Home));
                    closeAlert();
                  }}
                >
                  {t("Go Home")}
                </Button>
                <Button
                  onClick={() => {
                    router.back();
                    closeAlert();
                  }}
                >
                  {t("Go Back")}
                </Button>
              </Flex>
            </Flex>
          ),
        });
      });
    }
  }, [closeAlert, data, isFetching, openAlert, push, router, t]);

  return <></>;
};

export default Authenticator;
