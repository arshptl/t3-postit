import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

//TYPE
export type createUserInput = z.TypeOf<typeof createUserSchema>;

export const requestOtpSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default("/"),
});

//TYPE
export type requestOtpInput = z.TypeOf<typeof requestOtpSchema>;

export const verifyOtpSchema = z.object({
  hash: z.string(),
});
