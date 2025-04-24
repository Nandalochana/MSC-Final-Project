import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { FreelancerTaskAPI, UpdateStatusResponse } from "./query-slice";

interface ErrorResponse {
  message: string;
}

type UpdateStatusInput = {
  id: string;
  // status: string;
};


export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof UpdateStatusResponse>, AxiosError<ErrorResponse>, UpdateStatusInput>({
    mutationFn: async (data: UpdateStatusInput) => {
      return FreelancerTaskAPI.updateFreelancerTaskStatus(data);
    },
    onSuccess: () => {

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["freelancerTaskStatus"] });
    },
    onError: (error) => {
      console.error("Error deleting:", error.response?.data.message);
    },
  });
}


export function useUpdateTaskBuyerStatus() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof UpdateStatusResponse>, AxiosError<ErrorResponse>, UpdateStatusInput>({
    mutationFn: async (data: UpdateStatusInput) => {
      return FreelancerTaskAPI.updateBuyerTaskStatus(data);
    },
    onSuccess: () => {

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["buyerTaskStatus"] });
    },
    onError: (error) => {
      console.error("Error deleting:", error.response?.data.message);
    },
  });
}