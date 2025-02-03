import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { RegisterAPIResponseSchema, RegisterFormType } from "../components/schema";
import { RegisterAPI } from "./query-slice";
import { useUserStore } from "../../../store/user-store";
// import { useNavigate } from "react-router";

interface ErrorResponse {
  message: string;
}

export function useSignUp() {
  // const navigate = useNavigate();
  const { setCredentials } = useUserStore();
  
  return useMutation<
    z.infer<typeof RegisterAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    Omit<RegisterFormType, "confirmPassword">
  >({
    mutationFn: async (user) => {
      console.log("Payload being sent to API:", user);
      return RegisterAPI.register(user);
    },
    onSuccess: (data) => {
      console.log('success', data);
      setCredentials({
        accessToken: data.token,
        user: data.user,
        loginInfo: data.loginInfo,
      });
      

      if (data.loginInfo.userRoleId.role === "Freelancer") {
        window.location.href = "/freelancer/profiles";
      } else if (data.loginInfo.userRoleId.role === "Buyer") {
        window.location.href = "/buyer";
      }



    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    },
  });
}
