import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BookingManagementAPI } from "./query-slice";
import { BookingDeleteInfoSchemaType, BookingUpdateInfoSchemaType } from "./schema";

interface ErrorResponse {
  message: string;
}

interface UpdateBookingInput {
  bookingId: string;
}

interface DeleteBookingInput {
  bookingId: string;
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation<BookingUpdateInfoSchemaType, AxiosError<ErrorResponse>, UpdateBookingInput>({
    mutationFn: async (data: UpdateBookingInput) => {
      await BookingManagementAPI.UpdateBookingStatus({ bookingId: data.bookingId });
      return { bookingId: data.bookingId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.error("Error updating booking status:", error.response?.data);
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation<BookingDeleteInfoSchemaType, AxiosError<ErrorResponse>, DeleteBookingInput>({
    mutationFn: async (data: DeleteBookingInput) => {
      await BookingManagementAPI.DeleteBooking({ bookingId: data.bookingId });
      return { bookingId: data.bookingId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.error("Error deleting booking:", error.response?.data);
    },
  });
}
