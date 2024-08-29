import { PageOptions, Search, ViewOptions } from "@/components";
import { ViewQueries } from "@/constants";
import {
  PostGridView,
  PostListView,
  PostTableView,
  PostUtils,
} from "@/containers";
import { ResponsiveLayout } from "@/layouts";
import { Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const PostsAllPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewOption = searchParams.get("view") as ViewQueries;

  const display = useMemo(() => {
    switch (viewOption) {
      case ViewQueries.Table:
        return <PostTableView />;
      case ViewQueries.List:
        return <PostListView />;
      case ViewQueries.Grid:
        return <PostGridView />;
      default:
        return null;
    }
  }, [viewOption]);

  return (
    <ResponsiveLayout>
      <Flex direction={"column"} gap={"4"} h={"100%"}>
        <PostUtils />
        <Flex justifyContent={"space-between"} gap={"4"} wrap={"wrap"}>
          <Search
            onSubmit={(search) => {
              setSearchParams((prev) => {
                prev.set("search", search);
                return prev;
              });
            }}
          />
          <Flex gap={"4"}>
            <ViewOptions />
            <PageOptions />
          </Flex>
        </Flex>
        {display}
      </Flex>
    </ResponsiveLayout>
  );
};

export default PostsAllPage;
