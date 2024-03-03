import { useGetMe } from "@/apis/auth";
import { Unauthorized } from "@/components";
import { PageRoutes, isExistPage, whiteList } from "@/constants";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
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
          content: <Unauthorized />,
        });
      });
    }
  }, [closeAlert, data, isFetching, openAlert, push, router, t]);

  return <></>;
};

export default Authenticator;
