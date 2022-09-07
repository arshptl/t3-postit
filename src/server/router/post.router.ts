import { createPostSchema, getSinglePostSchema } from "@/schema/post.schema";
import * as trpc from "@trpc/server";
import { createRouter } from "./context";

export const postRouter = createRouter()
    .mutation("create-post", {
        input: createPostSchema,
        async resolve({ input, ctx }) {
            // get the valid user
            if (!ctx.user) {
                new trpc.TRPCError({
                    code: "FORBIDDEN",
                    message: "Cannot create post while logged out!",
                });
            }

            const post = await ctx.prisma.post.create({
                data: {
                    ...input,
                    user: {
                        connect: {
                            id: ctx.user?.id as string,
                        },
                    },
                },
            });

            return post;    
        },
    })
    .query("posts", {
        resolve({ctx}) { 
            return ctx.prisma.post.findMany();
        },
    })
    .query("single-post", {
        input: getSinglePostSchema,
        resolve({ input, ctx }) { 
            return ctx.prisma.post.findUnique({
                where: {
                    id: input.postId,
                }
            })
        },
    });
