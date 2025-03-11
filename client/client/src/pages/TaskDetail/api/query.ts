import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { TaskDetailsAPI } from "./query-slice";
import { CommentsCreateResponseSchema, TaskResponseSchema } from "../components/schema";

interface ErrorResponse {
  message: string;
}

type UpdateTaskInput = {
  taskId: string;
  createdUserId: string;
  title: string;
  description: string;
  status: string;
};

interface AddCommentInput {
  taskId: string;
  userId: string;
  comment: string;
  totalPrice: number;
  status: string;
}

// Define the mutation hook to delete a task
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof TaskResponseSchema>, AxiosError<ErrorResponse>, UpdateTaskInput>({
    mutationFn: async (data: UpdateTaskInput) => {
      return TaskDetailsAPI.updateTask(data);
    },
    onSuccess: () => {

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["taskDetails"] });
    },
    onError: (error) => {
      console.error("Error deleting task:", error.response?.data.message);
    },
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof CommentsCreateResponseSchema>,
    AxiosError<ErrorResponse>,
    AddCommentInput
  >({
    mutationFn: async (input) => {
      return TaskDetailsAPI.createComment(input);
    },
    onSuccess: (newTask) => {
      // Update the userProfiles query cache with the new category
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["comments"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, newTask], 
          };
        }
        return { data: [newTask] };
      });

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      console.error("Error adding comment:", error.response?.data.message);
    },
  });
}

