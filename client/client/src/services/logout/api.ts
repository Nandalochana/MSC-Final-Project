import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";
import { api } from "../../lib/utils/api";
import { API_ENDPOINT } from "../../lib/utils/endpoints-constant";
// import { useUserStore } from "../../store/user-store";
import { LogoutAPIRequestSchema, LogoutAPIResponseSchema } from "./schema";
// import { Routes } from "../../lib/utils/routes-constants";

const LogoutRequest = LogoutAPIRequestSchema;

const LogoutResponse = LogoutAPIResponseSchema;

interface ErrorResponse {
  message: string;
}

const logout = api<
  z.infer<typeof LogoutRequest>,
  z.infer<typeof LogoutResponse>
>({
  method: "POST",
  path: API_ENDPOINT.SIGN_OUT,
  requestSchema: LogoutRequest,
  responseSchema: LogoutResponse,
});

export function useLogOut() {
  // const navigate = useNavigate();

  // const { removeCredentials } = useUserStore();
  return useMutation<
    z.infer<typeof LogoutAPIResponseSchema>,
    AxiosError<ErrorResponse>
  >({
    mutationFn: logout,
    onSuccess: (data) => {
      const { message } = data;
      console.log('message', message);
      // removeCredentials();
      // navigate(Routes.SIGNIN);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      console.log('errorMessage', errorMessage);
    },
  });
}