import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

type RouterPushParams = Parameters<ReturnType<typeof useRouter>["push"]>;

const useRouterPush = () => {
  const router = useRouter();
  const changing = useRef(false);

  const push = useCallback(
    (...params: RouterPushParams) => {
      // 만약 라우팅중이라면 아무것도 하지 않습니다.
      // if route is already changing, do nothing
      if (changing.current) return;
      changing.current = true;
      router.push(...params);
    },
    [router]
  );

  useEffect(() => {
    const handleRouteChange = () => {
      changing.current = false;
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return { router, push };
};

export default useRouterPush;
