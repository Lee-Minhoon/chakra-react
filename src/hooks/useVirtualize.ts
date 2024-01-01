import { Nullable } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseVirtualizeProps {
  container?: Nullable<HTMLElement> | Window;
  numItems: number;
  itemHeight: number;
  gap?: number;
  marginTop?: number;
}

const useVirtualize = ({
  container,
  numItems,
  itemHeight,
  gap = 0,
  marginTop = 0,
}: UseVirtualizeProps) => {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const effectiveHeight = useMemo(() => {
    return itemHeight === 0 ? 0 : itemHeight + gap;
  }, [gap, itemHeight]);

  const handleResize = useCallback(() => {
    if (!container) return;

    if (container instanceof HTMLElement) {
      setViewportHeight(container.clientHeight);
    } else {
      setViewportHeight(container.innerHeight);
    }
  }, [container]);

  const handleScroll = useCallback(() => {
    if (container instanceof HTMLElement) {
      setScrollTop(container.scrollTop - marginTop);
    } else {
      setScrollTop(window.scrollY - marginTop);
    }
  }, [container, marginTop]);

  useEffect(() => {
    handleResize();
    handleScroll();
  }, [handleResize, handleScroll]);

  useEffect(() => {
    if (!container) return;

    let resizeObserver: ResizeObserver;
    if (container instanceof HTMLElement) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }
    container.addEventListener("scroll", handleScroll);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [container, handleResize, handleScroll]);

  const { startIndex, endIndex } = useMemo(() => {
    if (effectiveHeight === 0) return { startIndex: 0, endIndex: 1 };

    const startIndex = Math.max(0, Math.floor(scrollTop / effectiveHeight));
    const endIndex = Math.min(
      numItems,
      Math.ceil((scrollTop + viewportHeight) / effectiveHeight)
    );

    return { startIndex, endIndex };
  }, [effectiveHeight, numItems, scrollTop, viewportHeight]);

  return {
    containerHeight: numItems * effectiveHeight - gap,
    startIndex,
    endIndex,
  };
};

export default useVirtualize;
