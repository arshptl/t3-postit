import z, { TypeOf } from "zod";

export const createPostSchema = z.object({
  title: z.string().max(256, "The title length can't be more than 256"),
  body: z.string().min(10),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;

export const getSinglePostSchema = z.object({
  postId: z.string().uuid(),
});
