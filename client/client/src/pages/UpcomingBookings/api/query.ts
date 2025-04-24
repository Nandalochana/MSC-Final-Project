import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { FreelancerBookingAPI, RatingsResponse, UpcommingBookingResSchema, UpdateStatusResponse } from "./query-slice";

interface ErrorResponse {
  message: string;
}

type AddTimeSlotsInput = {
  userId: string;
  date: string;
};

type UpdateStatusInput = {
  bookingId: string;
  status: string;
};

type RatingsInput = {
  buyerId: string;
  freelancerId: string;
  type: string;
  rating: number;
  taskOrBookingId: string;
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


export function useSubmitRating() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof RatingsResponse>,
    AxiosError<ErrorResponse>,
    RatingsInput
  >({
    mutationFn: async (input) => {
      return FreelancerBookingAPI.submitRating(input);
    },
    onSuccess: (ratingData) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["ratings"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, ratingData], 
          };
        }
        return { data: [ratingData] }; // Initialize the data array if it doesn't exist
      });

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}


export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof UpdateStatusResponse>, AxiosError<ErrorResponse>, UpdateStatusInput>({
    mutationFn: async (data: UpdateStatusInput) => {
      return FreelancerBookingAPI.updateFreelancerStatus(data);
    },
    onSuccess: () => {

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["freelancerStatus"] });
    },
    onError: (error) => {
      console.error("Error deleting:", error.response?.data.message);
    },
  });
}


export function useUpdateBookingBuyerStatus() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof UpdateStatusResponse>, AxiosError<ErrorResponse>, UpdateStatusInput>({
    mutationFn: async (data: UpdateStatusInput) => {
      return FreelancerBookingAPI.updateBuyerStatus(data);
    },
    onSuccess: () => {

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["buyerStatus"] });
    },
    onError: (error) => {
      console.error("Error deleting:", error.response?.data.message);
    },
  });
}