import { z } from "zod";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";
import { api } from "../../../lib/utils/api";


export const GetPastBookingsRequest = z.object({
  userId: z.string(),
  date: z.string(),
});


export const PastBookingResSchema = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      userId: z.string(),
      date: z.string(),
      timeSlot: z.object({
        start: z.string(),
        end: z.string(),
        _id: z.string(),
      }),
      buyerId: z.string(),
      status: z.string(),
      hourlyRate: z.number(),
      totalPrice: z.number(),
    })
  ),
});


const getPastBookings = api<
  z.infer<typeof GetPastBookingsRequest>,
  z.infer<typeof PastBookingResSchema>
>({
  path: API_ENDPOINT.PAST_BOOKINGS,
  method: "POST",
  requestSchema: GetPastBookingsRequest,
  responseSchema: PastBookingResSchema,
  type: "private",
});


const getPastBookingsBuyer = api<
  z.infer<typeof GetPastBookingsRequest>,
  z.infer<typeof PastBookingResSchema>
>({
  path: API_ENDPOINT.PAST_BOOKINGS_BY_BUYER,
  method: "POST",
  requestSchema: GetPastBookingsRequest,
  responseSchema: PastBookingResSchema,
  type: "private",
});



export const FreelancerBookingAPI = {
  getPastBookings,
  getPastBookingsBuyer
};