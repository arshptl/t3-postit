import { trpc } from "@/utils/trpc";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { createUserInput } from "@/schema/user.schema";
import Router, { useRouter } from "next/router";

const RegisterPage = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<createUserInput>();

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  const onSubmit = (values: createUserInput) => {
    mutate(values);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>
        <input
          type="email"
          placeholder="jane.doe@gmail.com"
          {...register("email")}
        />
        <br />
        <input type="text" placeholder="Arsh" {...register("name")} />
        <button type="submit">Register</button>
      </form>
      <Link href="/login">Login</Link>
    </>
  );
};

export default RegisterPage;
