import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TaskManagementAPI } from "./query-slice";
import { TaskDeleteInfoSchemaType, TaskUpdateInfoSchemaType } from "./schema";

interface ErrorResponse {
  message: string;
}

interface UpdateTaskInput {
  taskId: string;
}

interface DeleteTaskInput {
  taskId: string;
}


export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation<TaskUpdateInfoSchemaType, AxiosError<ErrorResponse>, UpdateTaskInput>({
    mutationFn: async (data: UpdateTaskInput) => {
      await TaskManagementAPI.UpdateTaskStatus({ taskId: data.taskId });
      return { taskId: data.taskId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error updating task status:", error.response?.data);
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<TaskDeleteInfoSchemaType, AxiosError<ErrorResponse>, DeleteTaskInput>({
    mutationFn: async (data: DeleteTaskInput) => {
      await TaskManagementAPI.DeleteTask({ taskId: data.taskId });
      return { taskId: data.taskId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error deleting task:", error.response?.data);
    },
  });
}