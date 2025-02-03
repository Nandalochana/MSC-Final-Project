import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormType } from "./schema";
import { useSignIn } from "../api/query";
import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";

export const LoginForm: FC = () => {
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    setError
  } = methods;

  const signIn = useSignIn();

  const onSubmit = async (data: LoginFormType) => {
    try {
      await signIn.mutateAsync(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", {
          type: "manual",
          message: error.message, // Display the error message in the form
        });
      } else {
        setError("root", {
          type: "manual",
          message: "An unexpected error occurred", // Fallback for unexpected error types
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-2 space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
          errors={errors}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          placeholder="Password"
          errors={errors}
        />

        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}

        <Button type="submit">Sign In</Button>
      </form>
    </FormProvider>
  );
};
