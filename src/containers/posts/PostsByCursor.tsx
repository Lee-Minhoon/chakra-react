import { Post, useGetPostsByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { useCallback, useEffect, useRef } from "react";

interface PostsByCursorProps {
  observe?: boolean;
}

const PostsByCursor = ({ observe }: PostsByCursorProps) => {
  const { limit, sort, order } = usePagination();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
  } = useGetPostsByCursor({ limit, sort, order });

  const target = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage]
  );

  useEffect(() => {
    if (!observe || !target.current) return;
    const observer = new IntersectionObserver(callback, { threshold: 0.5 });
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [callback, observe]);

  return (
    <InfiniteList<Post>
      observe={observe}
      data={posts}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default PostsByCursor;
