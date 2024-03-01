import { useGetMe } from "@/apis/auth";
import { PageRoutes, whiteList } from "@/constants";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { useEffect } from "react";

const Authenticator = () => {
  const { router, push } = useSafePush();
  const { data, isFetching } = useGetMe();
  const { openAlert } = useModalStore(["openAlert"]);

  useEffect(() => {
    if (whiteList.includes(router.pathname) || isFetching) return;
    if (!data) {
      openAlert({
        title: "Unauthorized",
        content: "You are not authorized to access this page",
      });
      push({
        pathname: PageRoutes.Signin,
        query: { redirect: router.asPath },
      });
    }
  }, [data, isFetching, openAlert, push, router.asPath, router.pathname]);

  return <></>;
};

export default Authenticator;
