import { useGetMe } from "@/apis";
import { PageRoutes, whiteList } from "@/constants";
import { useModalStore } from "@/stores";
import { NextURL, toUrl } from "@/utils";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type PushParams = Parameters<ReturnType<typeof useRouter>["push"]>;

const useSafePush = () => {
  const router = useRouter();
  const { data, isFetching } = useGetMe();
  const isChanging = useRef(false);
  const { openAlert, closeAlert } = useModalStore(["openAlert", "closeAlert"]);
  const { t } = useTranslation();

  const push = useCallback(
    (...params: PushParams) => {
      if (isFetching) return;

      // 만약 라우팅중이라면 아무것도 하지 않습니다.
      // if route is already changing, do nothing
      if (isChanging.current) return;
      isChanging.current = true;

      const nextURL = new NextURL(params[0]);

      // 만약 라우팅이 허용되지 않은 페이지로 이동하려고 한다면
      // If the user tries to navigate to a page that is not allowed
      if (!whiteList.includes(nextURL?.pathname ?? router.pathname) && !data) {
        return router
          .push({
            pathname: PageRoutes.Signin,
            query: { redirect: router.asPath },
          })
          .then(() => {
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
      return router.push(...params);
    },
    [closeAlert, data, isFetching, openAlert, router, t]
  );

  const handleRouteChange = useCallback(() => {
    isChanging.current = false;
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [handleRouteChange, router]);

  return { router, push };
};

export default useSafePush;
