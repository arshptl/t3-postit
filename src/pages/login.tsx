import { trpc } from "@/utils/trpc";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserInput } from "@/schema/user.schema";
import Router, { useRouter } from "next/router";

const RegisterPage = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [inputError, setInputError] = useState(false);
  const { handleSubmit, register } = useForm<createUserInput>();

  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const onSubmit = (values: createUserInput) => {
    mutate(values);
  };

  function verifyToken() {
    return <p>Verifying...</p>;
  }

  const hash = router.asPath.split("");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        {success && <p>check your mail</p>}
        <h1>Login</h1>
        <input
          type="email"
          placeholder="jane.doe@gmail.com"
          {...register("email")}
        />
        <br />
        <button>Login</button>
      </form>
      <Link href="/register">Register</Link>
    </>
  );
};

export default RegisterPage;
