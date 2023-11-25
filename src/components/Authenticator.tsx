import { useGetMe } from "@/apis/auth";
import { PageRoutes } from "@/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

const whiteList: string[] = [PageRoutes.Home, PageRoutes.Users];

const Authenticator = () => {
  const router = useRouter();
  const { isError } = useGetMe(!whiteList.includes(router.pathname));

  useEffect(() => {
    if (whiteList.includes(router.pathname)) return;
    if (isError) {
      router.push(PageRoutes.Home);
    }
  }, [isError, router]);

  return <></>;
};

export default Authenticator;
