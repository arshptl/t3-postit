import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "@/utils/trpc";
import { useUserContext } from "@/context/user.context";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

const Home: NextPage = () => {
  // const { data, error, isLoading } = trpc.useQuery(["users.me"]);

  // console.log(data);

  // if (isLoading) {
  //   return <p>Loading..</p>;
  // }

  // if (error) {
  //   return <div>{JSON.stringify(error)}</div>;
  // }

  const user = useUserContext();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <div>Welcome back {JSON.stringify(user.name)}!</div>
      <Link href="/posts/new">Create Post</Link>
    </>
  );
  // return (
  //   <>
  //     <Head>
  //       <title>t3-postit</title>
  //       <meta name="description" content="Generated by create-t3-app" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <main className="container mx-auto flex flex-col p-4">
  //       <div className="pt-6 text-2xl text-blue-500 flex w-full">
  //         <div>Index</div>
  //       </div>
  //     </main>
  //   </>
  // );
};

export default Home;
