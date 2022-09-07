// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { userRouter } from "./user.router";
import { postRouter } from "./post.router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("users.", userRouter)
  .merge("posts.", postRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
