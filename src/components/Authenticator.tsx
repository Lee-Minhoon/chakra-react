import { useGetMe } from "@/apis/auth";
import { PageRoutes } from "@/constants";
import { useModalStore } from "@/stores";
import { useRouter } from "next/router";
import { useEffect } from "react";

const whiteList: string[] = [PageRoutes.Home, PageRoutes.Users];

const Authenticator = () => {
  const router = useRouter();
  const { data } = useGetMe(!whiteList.includes(router.pathname));
  const { openAlert } = useModalStore(["openAlert"]);

  useEffect(() => {
    if (whiteList.includes(router.pathname)) return;
    if (!data) {
      openAlert({
        title: "Unauthorized",
        content: "You are not authorized to access this page",
      });
      router.push(PageRoutes.Home);
    }
  }, [router, data, openAlert]);

  return <></>;
};

export default Authenticator;
