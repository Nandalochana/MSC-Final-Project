import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { UserDetailsAPI } from "./query-slice";
import { TaskResponseSchema, UserDetailsResponseSchema } from "../components/schema";

interface ErrorResponse {
  message: string;
}

type UpdateUserInput = {
  userId: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  address3: string;
  mobileNr: string;
  telephoneNr: string;
};

type CreateTaskInput = {
  createdUserId: string;
  title: string;
  description: string;
  status: string;
};


// Define the mutation hook to delete a profile
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof UserDetailsResponseSchema>, AxiosError<ErrorResponse>, UpdateUserInput>({
    mutationFn: async (data: UpdateUserInput) => {
      return UserDetailsAPI.updateUserDetails(data);
    },
    onSuccess: () => {

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
    onError: (error) => {
      console.error("Error deleting profile:", error.response?.data.message);
    },
  });
}


export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof TaskResponseSchema>,
    AxiosError<ErrorResponse>,
    CreateTaskInput
  >({
    mutationFn: async (input) => {
      return UserDetailsAPI.createTask(input);
    },
    onSuccess: (newTask) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["tasks"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, newTask],
          };
        }
        return { data: [newTask] };
      });

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error adding category:", error.response?.data.message);
    },
  });
}