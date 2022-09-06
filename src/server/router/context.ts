// // src/server/router/context.ts
// import * as trpc from "@trpc/server";
// import * as trpcNext from "@trpc/server/adapters/next";
// import { prisma } from "../db/client";

// /**
//  * Replace this with an object if you want to pass things to createContextInner
//  */
// type CreateContextOptions = Record<string, never>;

// /** Use this helper for:
//  * - testing, where we dont have to Mock Next.js' req/res
//  * - trpc's `createSSGHelpers` where we don't have req/res
//  **/
// export const createContextInner = async (opts: CreateContextOptions) => {
//   return {
//     prisma,
//   };
// };

// /**
//  * This is the actual context you'll use in your router
//  * @link https://trpc.io/docs/context
//  **/
// export const createContext = async (
//   opts: trpcNext.CreateNextContextOptions
// ) => {
//   return await createContextInner({});
// };

// type Context = trpc.inferAsyncReturnType<typeof createContext>;

// export const createRouter = () => trpc.router<Context>();

import { verifyJwt } from "@/utils/jwt";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { NextApiRequest } from "next";
import { prisma } from "../db/client";

interface CtxUser {
  id: String;
  email: String;
  name: String;
  iat: String;
  exp: number;
}

const getUserFromRequest = (req: NextApiRequest) => {
  const token = req.cookies.token;
  console.log("token:", token);

  if (token) {
    try {
      const verified = verifyJwt<CtxUser>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
};

export const createContext = (opts: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req;
  const res = opts?.res;

  const user = getUserFromRequest(opts.req);
  return {
    req,
    res,
    prisma,
    user,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
