import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { FreelanceResSchema } from "../components/schema";
import { BuyerAPI } from "./query-slice";

interface ErrorResponse {
  message: string;
}

type FilterUsersInput = {
  name: string;
  category: string;
};

export function useFilterUsers(options = {}) {
  return useMutation<z.infer<typeof FreelanceResSchema>, AxiosError<ErrorResponse>, FilterUsersInput>({
    mutationFn: async (data: FilterUsersInput) => BuyerAPI.getFreelancers(data),
    ...options, // Allow passing custom options like onSuccess
  });
}
