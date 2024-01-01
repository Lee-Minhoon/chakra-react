import { Nullable } from "@/types";
import { useEffect, useState } from "react";

const useHasScroll = (elem: Nullable<HTMLElement>) => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    if (!elem) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { scrollHeight, clientHeight } = entries[0].target;
      setHasScroll(scrollHeight > clientHeight);
    });
    resizeObserver.observe(elem);

    return () => resizeObserver.disconnect();
  }, [elem]);

  return hasScroll;
};

export default useHasScroll;
