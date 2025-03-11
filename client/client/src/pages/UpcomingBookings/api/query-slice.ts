import { z } from "zod";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";
import { api } from "../../../lib/utils/api";


export const GetUpcommingBookingsRequest = z.object({
  userId: z.string(),
  date: z.string(),
});


export const UpcommingBookingResSchema = z.object({
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
      buyerStatus: z.string(),
      freelancerStatus: z.string(),
    })
  ),
});


const getUpcommingBookings = api<
  z.infer<typeof GetUpcommingBookingsRequest>,
  z.infer<typeof UpcommingBookingResSchema>
>({
  path: API_ENDPOINT.UPCOMING_BOOKINGS,
  method: "POST",
  requestSchema: GetUpcommingBookingsRequest,
  responseSchema: UpcommingBookingResSchema,
  type: "private",
});

const getUpcomingBookingsBuyer = api<
  z.infer<typeof GetUpcommingBookingsRequest>,
  z.infer<typeof UpcommingBookingResSchema>
>({
  path: API_ENDPOINT.UPCOMING_BOOKINGS_BY_BUYER,
  method: "POST",
  requestSchema: GetUpcommingBookingsRequest,
  responseSchema: UpcommingBookingResSchema,
  type: "private",
});



export const FreelancerBookingAPI = {
  getUpcommingBookings,
  getUpcomingBookingsBuyer
};