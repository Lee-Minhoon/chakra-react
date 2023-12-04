import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

const useRouterPush = () => {
  const router = useRouter();
  const changing = useRef(false);

  const push = useCallback(
    (path: string) => {
      // 만약 라우팅중이라면 아무것도 하지 않습니다.
      // if route is already changing, do nothing
      if (changing.current) return;
      changing.current = true;
      router.push(path);
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
