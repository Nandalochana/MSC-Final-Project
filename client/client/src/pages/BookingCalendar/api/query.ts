import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { FreelancerAPI } from "./query-slice";
import { DeleteTimeResponseSchema, singleTimesResSchema } from "../components/schema";

interface ErrorResponse {
  message: string;
}

type AddTimeSlotsInput = {
  userId: string;
  date: string;
  available: boolean,
  status: string,
  timeSlots: Array<{ start: string; end: string }>;
};

export function useAddTimeSlots() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof singleTimesResSchema>,
    AxiosError<ErrorResponse>,
    AddTimeSlotsInput
  >({
    mutationFn: async (input) => {
      return FreelancerAPI.addTimeSlots(input);
    },
    onSuccess: (newTimeSlot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["timeSlots"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, newTimeSlot], 
          };
        }
        return { data: [newTimeSlot] }; // Initialize the data array if it doesn't exist
      });

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["timeSlots"] });
    },
    onError: (error) => {
      
      console.error(error.response?.data.message);
    },
  });
}


export function useDeleteTimeSlot() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof DeleteTimeResponseSchema>, AxiosError<ErrorResponse>, string>({
    mutationFn: async (timeSlotId: string) => {
      return FreelancerAPI.deleteTimeSlot({ timeSlotId: timeSlotId}); 
    },
    onSuccess: (_, timeSlotId) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["timeSlots"], (oldData: any) => {
        if (!oldData?.data) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((profile: { _id: string }) => profile._id !== timeSlotId),
        };
      });

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["timeSlots"] });
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}