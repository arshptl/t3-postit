import Link from "next/link";
import { trpc } from "../../utils/trpc";
// import { createSSGHelpers } from '@trpc/react/ssg';
// import {
//   GetStaticPaths,
//   GetStaticPropsContext,
//   InferGetStaticPropsType,
// } from 'next';
// import { appRouter } from "@/server/router";
// import { createContext } from "@/server/router/context";
// import superjson from 'superjson';


function PostListingPage() {
  
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data?.map((post) => {
        return (
          <article key={post.id}>
            <p>{post.title}</p>
            <Link href={`/posts/${post.id}`}>Read post</Link>
          </article>
        );
      })}
    </div>
  );
}

export default PostListingPage;

// const fetchAllPosts = () => {
  // const { data, isLoading } = trpc.useQuery(["posts.posts"]);
  // return data;
// }

// export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>,) {
//   // const { data, isLoading } = trpc?.useQuery(["posts.posts"]);
//   const ssg = await createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//     transformer: superjson, // optional - adds superjson serialization
//   });

//   await ssg.fetchQuery("posts.posts");

//   // console.log(fetchAllPosts());
  
//   return {
//     props: {
//       posts: ssg.dehydrate(),
//     },
//   };
// }
