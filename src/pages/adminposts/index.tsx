import Link from "next/link";
import { NextPage } from "next";
import { buildPath, fileData } from "helpers/readWriteFiles";
import { admin_post_schema } from "helpers/types/postTypes";

const AdminPostsPage = (props: admin_post_schema) => {
  const { post } = props;

  return (
    <>
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
    </>
  );
};

export default AdminPostsPage;

export async function getStaticProps() {
  const path = buildPath("adminPost.json");

  const data = fileData(path);

  return {
    props: {
      post: data,
    },
  };
}
