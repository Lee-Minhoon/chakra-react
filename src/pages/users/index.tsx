import { PageOptions, Search, ViewOptions } from "@/components";
import { ViewQueries } from "@/constants";
import { UserUtils, UsersByCursor, UsersByPage } from "@/containers";
import { useLayout, useRouterPush } from "@/hooks";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useMemo } from "react";

const UsersPage = () => {
  const { Layout } = useLayout();

  const { router, push } = useRouterPush();
  const viewOption = router.query?.view as ViewQueries;

  const display = useMemo(() => {
    switch (viewOption) {
      case ViewQueries.Page:
        return <UsersByPage />;
      case ViewQueries.CursorButton:
      case ViewQueries.CursorObserver:
        return (
          <UsersByCursor
            usesObserver={viewOption === ViewQueries.CursorObserver}
          />
        );
      default:
        return null;
    }
  }, [viewOption]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex direction={"column"} gap={4} h={"100%"}>
          <UserUtils />
          <Flex justifyContent={"space-between"}>
            <Search
              onSubmit={(search) =>
                push({
                  pathname: router.pathname,
                  query: { ...router.query, search },
                })
              }
            />
            <Flex gap={4}>
              <ViewOptions />
              <PageOptions />
            </Flex>
          </Flex>
          {display}
        </Flex>
      </Layout>
    </>
  );
};

export default UsersPage;
