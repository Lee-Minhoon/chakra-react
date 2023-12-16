import { User, useGetUsersByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { useCallback, useEffect, useRef } from "react";

interface UsersByCursorProps {
  observe?: boolean;
}

const UsersByCursor = ({ observe }: UsersByCursorProps) => {
  const { limit, sort, order } = usePagination();

  const {
    data: users,
    fetchNextPage,
    hasNextPage,
  } = useGetUsersByCursor({ limit, sort, order });

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
    <InfiniteList<User>
      observe={observe}
      data={users}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default UsersByCursor;
