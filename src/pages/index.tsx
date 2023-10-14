import { useGetUsers, usePostUser } from "@/apis";
import Head from "next/head";

export default function Home() {
  const { data: users } = useGetUsers();
  const { mutate } = usePostUser();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => mutate({ name: "user" })}>Create</button>
      {users && (
        <div>
          {users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      )}
    </>
  );
}
