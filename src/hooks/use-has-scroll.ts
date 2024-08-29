import { Nullable } from "@/types";
import { useCallback, useEffect, useState } from "react";

const useHasScroll = (elem?: Nullable<HTMLElement>) => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    if (!elem) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const elem = entries[0].target;
      setHasScroll(elem.scrollHeight > elem.clientHeight);
    });
    resizeObserver.observe(elem);

    return () => resizeObserver.disconnect();
  }, [elem]);

  const ref = useCallback((elem: Nullable<HTMLElement>) => {
    if (elem) {
      setHasScroll(elem.scrollHeight > elem.clientHeight);
    }
  }, []);

  return { ref, hasScroll };
};

export default useHasScroll;
