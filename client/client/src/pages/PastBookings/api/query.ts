import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { FreelancerBookingAPI, PastBookingResSchema } from "./query-slice";

interface ErrorResponse {
  message: string;
}

type AddTimeSlotsInput = {
  userId: string;
  date: string;
};

export function useGetPastBookings() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof PastBookingResSchema>,
    AxiosError<ErrorResponse>,
    AddTimeSlotsInput
  >({
    mutationFn: async (input) => {
      return FreelancerBookingAPI.getPastBookings(input);
    },
    onSuccess: (newTimeSlot) => {
      console.log("Fetch result:", newTimeSlot); 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["past-bookings"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, newTimeSlot], 
          };
        }
        return { data: [newTimeSlot] }; // Initialize the data array if it doesn't exist
      });

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["past-bookings"] });
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}



export function useGetPastBookingsBuyer() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof PastBookingResSchema>,
    AxiosError<ErrorResponse>,
    AddTimeSlotsInput
  >({
    mutationFn: async (input) => {
      return FreelancerBookingAPI.getPastBookingsBuyer(input);
    },
    onSuccess: (newTimeSlot) => {
      console.log("Fetch result:", newTimeSlot);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["past-bookings"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, newTimeSlot], 
          };
        }
        return { data: [newTimeSlot] }; // Initialize the data array if it doesn't exist
      });

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["past-bookings"] });
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}