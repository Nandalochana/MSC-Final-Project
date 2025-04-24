import { z } from "zod";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";
import { api } from "../../../lib/utils/api";


export const GetUpcommingBookingsRequest = z.object({
  userId: z.string(),
  date: z.string(),
});

export const UpdateStatusRequest = z.object({
  bookingId: z.string(),
  status: z.string(),
});

export const SubmitRatingsRequest = z.object({
  buyerId: z.string(),
  freelancerId: z.string(),
  type: z.string(),
  rating: z.number(),
  taskOrBookingId: z.string(),
});

export const GetFreelancerRatingsRequest = z.object({
  freelancerId: z.string(),
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
      taskInfo: z.string(),
      description: z.string(),
      contactInfo: z.string(),
      location: z.string(),
      buyerStatus: z.string(),
      freelancerStatus: z.string(),
    })
  ),
});

export const UpdateStatusResponse = z.object({
  data: z.object({
    buyerStatus: z.string(),
    freelancerStatus: z.string(),
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
    __v: z.number(),

  })
});

export const RatingsResponse = z.object({
  data: z.object({
    _id: z.string(),
    buyerId: z.string(),
    freelancerId: z.string(),
    type: z.string(),
    rating: z.number(),
    taskOrBookingId: z.string(),
  })
});

export const RatingsByFreelancerResponse = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      buyerId: z.string(),
      freelancerId: z.string(),
      createdDate: z.string(),
      type: z.string(),
      rating: z.number(),
      taskOrBookingId: z.string(),
    })
  )
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


const updateFreelancerStatus = api<
  z.infer<typeof UpdateStatusRequest>,
  z.infer<typeof UpdateStatusResponse>
>({
  path: ({ bookingId }) => `/bookingSlots/${bookingId}/freelancerStatus`,
  method: "PUT",
  requestSchema: UpdateStatusRequest,
  responseSchema: UpdateStatusResponse,
  type: "private",
});

const updateBuyerStatus = api<
  z.infer<typeof UpdateStatusRequest>,
  z.infer<typeof UpdateStatusResponse>
>({
  path: ({ bookingId }) => `/bookingSlots/${bookingId}/buyerStatus`,
  method: "PUT",
  requestSchema: UpdateStatusRequest,
  responseSchema: UpdateStatusResponse,
  type: "private",
});


const submitRating = api<
  z.infer<typeof SubmitRatingsRequest>,
  z.infer<typeof RatingsResponse>
>({
  path: API_ENDPOINT.RATINGS,
  method: "POST",
  requestSchema: SubmitRatingsRequest,
  responseSchema: RatingsResponse,
  type: "private",
});


const getRatingsByFreelancer = api<
  z.infer<typeof GetFreelancerRatingsRequest>,
  z.infer<typeof RatingsByFreelancerResponse>
>({
  path: ({ freelancerId }) => `${API_ENDPOINT.RATINGS_BY_FREELANCER}/${freelancerId}`,
  method: "GET",
  requestSchema: GetFreelancerRatingsRequest,
  responseSchema: RatingsByFreelancerResponse,
});

export const FreelancerBookingAPI = {
  getUpcommingBookings,
  getUpcomingBookingsBuyer,
  updateFreelancerStatus,
  updateBuyerStatus,
  submitRating,
  getRatingsByFreelancer
};