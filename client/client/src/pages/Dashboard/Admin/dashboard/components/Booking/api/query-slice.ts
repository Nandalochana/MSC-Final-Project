import { z } from "zod";
import {
  BookingInfoRequestSchema,
  BookingInfoResponseSchema,
  BookingUpdateInfoSchema,
  BookingUpdateResponseSchema,
  BookingDeleteInfoSchema,
  BookingDeleteResponseSchema,
} from "./schema";
import { API_ENDPOINT } from "../../../../../../../lib/utils/endpoints-constant";
import { api } from "../../../../../../../lib/utils/api";

const LoadAllBookingsRequest = BookingInfoRequestSchema;
const BookingRespose = BookingInfoResponseSchema;
const BookingUpdateInfoRequest = BookingUpdateInfoSchema;
const BookingUpdateResponseResponse = BookingUpdateResponseSchema;
const BookingDeleteInfoRequest = BookingDeleteInfoSchema;
const BookingDeleteResponseResponse = BookingDeleteResponseSchema;

const LoadAllBookings = api<
  z.infer<typeof LoadAllBookingsRequest>,
  z.infer<typeof BookingRespose>
>({
  method: "GET",
  path: API_ENDPOINT.BOOKING_SLOT_USER,
  requestSchema: LoadAllBookingsRequest,
  responseSchema: BookingRespose,
});

const UpdateBookingStatus = api<
  z.infer<typeof BookingUpdateInfoRequest>,
  z.infer<typeof BookingUpdateResponseResponse>
>({
  path: (params) => `${API_ENDPOINT.BOOKING_SLOTS_STATUS}/${params.bookingId}`,
  method: "PUT",
  requestSchema: BookingUpdateInfoRequest,
  responseSchema: BookingUpdateResponseSchema,
  type: "private",
});

const DeleteBooking = api<
  z.infer<typeof BookingDeleteInfoRequest>,
  z.infer<typeof BookingDeleteResponseResponse>
>({
  path: (params) => `${API_ENDPOINT.BOOKING_SLOTS}/${params.bookingId}`,
  method: "DELETE",
  requestSchema: BookingDeleteInfoRequest,
  responseSchema: BookingDeleteResponseSchema,
  type: "private",
});

export const BookingManagementAPI = {
  LoadAllBookings,
  UpdateBookingStatus,
  DeleteBooking,
};
