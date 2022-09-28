import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "@/utils/trpc";
import { useUserContext } from "@/context/user.context";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { buildPath, fileData } from "helpers/readWriteFiles";
import { admin_post_schema } from "helpers/types/postTypes";

const Home: NextPage<admin_post_schema> = (props) => {
  const { post } = props;
  const user = useUserContext();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <div>Welcome back {user.email}!</div>
      <Link href="/posts/new">Create Post</Link>
      <h1>Posts</h1>
      <div>
        {post?.map((post: any) => {
          return (
            <article key={post.id}>
              <p>{post.title}</p>
              <Link href={`/adminposts/${post.id}`}>Read post</Link>
            </article>
          );
        })}
      </div>
      <Link href="/adminposts">See all posts</Link>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const path = buildPath("adminPost.json");

  const data = fileData(path);

  return {
    props: {
      post: data,
    },
  };
}
