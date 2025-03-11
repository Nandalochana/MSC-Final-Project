import { z } from "zod";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { LoginAPIResponseSchema, LoginFormType } from "../components/schema";
import { LoginAPI } from "./query-slice";
import { useUserStore } from "../../../store/user-store";
import { useNavigate } from "react-router";
import { Routes } from "../../../lib/utils/routes-constants";


interface ErrorResponse {
  message: string;
}

export function useSignIn() {
  const navigate = useNavigate();
  const { setCredentials } = useUserStore();
  return useMutation<
    z.infer<typeof LoginAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    LoginFormType
  >({
    mutationFn: (user) => LoginAPI.login(user),
    onSuccess: (data) => {
      // const { payload, message } = data;

      console.log('data', data)

      setCredentials({
        accessToken: data.token,
        user: data.user,
        loginInfo: data.loginInfo,
      });
      navigate(Routes.PROFILE);
     console.log('success', data);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    },
  });
}
