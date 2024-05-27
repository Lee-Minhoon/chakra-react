import { Nullable } from "@/types";
import { DomUtils } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const useHasScroll = (elem?: Nullable<HTMLElement>) => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    if (!elem) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const elem = entries[0].target;
      setHasScroll(DomUtils.hasScroll(elem));
    });
    resizeObserver.observe(elem);

    return () => resizeObserver.disconnect();
  }, [elem]);

  const ref = useCallback((elem: Nullable<HTMLElement>) => {
    if (elem) {
      setHasScroll(DomUtils.hasScroll(elem));
    }
  }, []);

  return { ref, hasScroll };
};

export default useHasScroll;
