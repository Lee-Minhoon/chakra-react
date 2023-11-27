import { useGetPostsByOffset } from "@/apis";
import Pagination from "@/components/Pagination";
import PostsTable from "@/containers/posts/PostsTable";
import { useRouter } from "next/router";

const PostsAllPage = () => {
  const router = useRouter();
  const page = router.query?.page ? Number(router.query?.page) : 1;
  const limit = router.query?.limit ? Number(router.query?.limit) : 10;
  const { data: postsByOffset } = useGetPostsByOffset({
    offset: (page - 1) * limit,
    limit,
  });

  return (
    <>
      <PostsTable posts={postsByOffset?.data ?? []} />
      <Pagination
        currentPage={page}
        limit={limit}
        total={postsByOffset?.total ?? 0}
        onChange={(page) => router.push({ query: { ...router.query, page } })}
      />
    </>
  );
};

export default PostsAllPage;
