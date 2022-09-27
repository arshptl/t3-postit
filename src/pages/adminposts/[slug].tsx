import { buildPath, fileData } from "helpers/readWriteFiles";
import React from "react";

import { single_admin_post_schema } from "helpers/types/postTypes";

const SingleAdminPost = (props: single_admin_post_schema) => {
  const { post } = props;

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.des}</p>
    </>
  );
};

export default SingleAdminPost;

export async function getStaticProps(context: any) {
  const { params } = context;

  const postId = params.slug;

  const path = buildPath("adminPost.json");
  const data = fileData(path);

  const post = data.find((post: any) => post.id === postId);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const path = buildPath("adminPost.json");
  const data = await fileData(path);

  const pids = data.map((post: any) => post.id);

  const pathWithParams = pids.map((id: string) => ({
    params: { slug: id },
  }));

  return {
    paths: pathWithParams,
    fallback: false,
  };
}
