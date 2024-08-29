import { PageOptions, Search, ViewOptions } from "@/components";
import { ViewQueries } from "@/constants";
import {
  UserGridView,
  UserListView,
  UserTableView,
  UserUtils,
} from "@/containers";
import { ResponsiveLayout } from "@/layouts";
import { Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewOption = searchParams.get("view") as ViewQueries;

  const display = useMemo(() => {
    switch (viewOption) {
      case ViewQueries.Table:
        return <UserTableView />;
      case ViewQueries.List:
        return <UserListView />;
      case ViewQueries.Grid:
        return <UserGridView />;
      default:
        return null;
    }
  }, [viewOption]);

  return (
    <ResponsiveLayout>
      <Flex direction={"column"} gap={"4"} h={"100%"}>
        <UserUtils />
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

export default UsersPage;
