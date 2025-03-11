import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { FreelanceResSchema } from "../components/schema";
import { BookingResponse, BuyerAPI } from "./query-slice";
import { DeleteTimeResponseSchema } from "../../../BookingCalendar/components/schema";

interface ErrorResponse {
  message: string;
}

type FilterUsersInput = {
  name: string;
  category: string;
};

type AddTimeSlotsInput = {
  freelancerSlotId: string;
  userId: string;
  buyerId: string;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  totalPrice: number;
};

type UpdateBookingInput = {
  bookingId: string;
};

export function useFilterUsers(options = {}) {
  return useMutation<z.infer<typeof FreelanceResSchema>, AxiosError<ErrorResponse>, FilterUsersInput>({
    mutationFn: async (data: FilterUsersInput) => BuyerAPI.getFreelancers(data),
    ...options, // Allow passing custom options like onSuccess
  });
}


export function useBookingTimeSlots() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof BookingResponse>,
    AxiosError<ErrorResponse>,
    AddTimeSlotsInput
  >({
    mutationFn: async (input) => {
      return BuyerAPI.bookTimeSlots(input);
    },
    onSuccess: (newTimeSlot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["bookingTimes"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, newTimeSlot], 
          };
        }
        return { data: [newTimeSlot] }; // Initialize the data array if it doesn't exist
      });

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["bookingTimes"] });
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}


export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof BookingResponse>, AxiosError<ErrorResponse>, UpdateBookingInput>({
    mutationFn: async (data: UpdateBookingInput) => {
      return BuyerAPI.updateBooking(data);
    },
    onSuccess: () => {

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["bookingTimes"] });
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}


export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof DeleteTimeResponseSchema>, AxiosError<ErrorResponse>, string>({
    mutationFn: async (bookingId: string) => {
      return BuyerAPI.deleteBooking({ bookingId: bookingId}); 
    },
    onSuccess: (_, bookingId) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["bookingTimes"], (oldData: any) => {
        if (!oldData?.data) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((booking: { _id: string }) => booking._id !== bookingId),
        };
      });

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["bookingTimes"] });
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}