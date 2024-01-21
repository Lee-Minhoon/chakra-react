import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

type PushParams = Parameters<ReturnType<typeof useRouter>["push"]>;

const useSafePush = () => {
  const router = useRouter();
  const isChanging = useRef(false);

  const push = useCallback(
    (...params: PushParams) => {
      // 만약 라우팅중이라면 아무것도 하지 않습니다.
      // if route is already changing, do nothing
      if (isChanging.current) return;
      isChanging.current = true;
      router.push(...params);
    },
    [router]
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
