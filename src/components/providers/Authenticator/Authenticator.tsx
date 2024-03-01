import { useGetMe } from "@/apis/auth";
import { PageRoutes, isExistPage, whiteList } from "@/constants";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Authenticator = () => {
  const { router, push } = useSafePush();
  const { data, isFetching } = useGetMe();
  const { openAlert } = useModalStore(["openAlert"]);
  const { t } = useTranslation();

  useEffect(() => {
    if (
      !isExistPage(router.pathname) ||
      whiteList.includes(router.pathname) ||
      isFetching
    )
      return;
    if (!data) {
      openAlert({
        title: t("Unauthorized"),
        content: t("You are not authorized to access this page"),
      });
      push({
        pathname: PageRoutes.Signin,
        query: { redirect: router.asPath },
      });
    }
  }, [data, isFetching, openAlert, push, router.asPath, router.pathname, t]);

  return <></>;
};

export default Authenticator;
