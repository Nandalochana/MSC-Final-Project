import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { UserInfoReponseSchema} from "./schema";
import { UserManagementAPI } from "./query-slice";

interface ErrorResponse {
  message: string;
}

export function loadUsers() {
 
  return useMutation<
    z.infer<typeof UserInfoReponseSchema>,
    AxiosError<ErrorResponse>
  >({
    mutationFn: async () => {
      console.log("Payload being sent to API:");
      return UserManagementAPI.LoadAllUsers();
    },
    onSuccess: (data) => {
      console.log('sucess', data);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    },
  });
}
