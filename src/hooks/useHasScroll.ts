import { useEffect, useState } from "react";

const useHasScroll = (ref: React.RefObject<HTMLElement>, deps: any[]) => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const { scrollHeight, clientHeight } = ref.current;
    if (scrollHeight > clientHeight) {
      setHasScroll(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);

  return hasScroll;
};

export default useHasScroll;
