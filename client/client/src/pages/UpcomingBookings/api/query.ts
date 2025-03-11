import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { FreelancerBookingAPI, UpcommingBookingResSchema } from "./query-slice";

interface ErrorResponse {
  message: string;
}

type AddTimeSlotsInput = {
  userId: string;
  date: string;
};

export function useGetUpcommingBookings() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof UpcommingBookingResSchema>,
    AxiosError<ErrorResponse>,
    AddTimeSlotsInput
  >({
    mutationFn: async (input) => {
      return FreelancerBookingAPI.getUpcommingBookings(input);
    },
    onSuccess: (newTimeSlot) => {
      console.log("Fetch result:", newTimeSlot); // Print the fetch result
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


export function useGetUpcomingBookingsBuyer() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof UpcommingBookingResSchema>,
    AxiosError<ErrorResponse>,
    AddTimeSlotsInput
  >({
    mutationFn: async (input) => {
      return FreelancerBookingAPI.getUpcomingBookingsBuyer(input);
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
