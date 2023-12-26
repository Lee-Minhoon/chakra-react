import { useGetPost } from "@/apis";
import { PostCard } from "@/containers";
import { useLayout } from "@/hooks";
import { queryParser } from "@/utils";
import Head from "next/head";
import { useRouter } from "next/router";

const PostPage = () => {
  const { Layout } = useLayout();

  const router = useRouter();
  const { data: post } = useGetPost(queryParser.toNumber(router.query.id));

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PostCard post={post} />
      </Layout>
    </>
  );
};

export default PostPage;
