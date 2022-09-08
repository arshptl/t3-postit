import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "@/utils/trpc";
import { useUserContext } from "@/context/user.context";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

const Home: NextPage = () => {
  const user = useUserContext();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <div>Welcome back {user.email}!</div>
      <Link href="/posts/new">Create Post</Link>
    </>
  );
};

export default Home;
