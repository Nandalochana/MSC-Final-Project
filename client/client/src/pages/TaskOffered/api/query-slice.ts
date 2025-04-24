import { z } from "zod";
import { api } from "../../../lib/utils/api";


export const GetUpcommingBookingsRequest = z.object({
  userId: z.string(),
  date: z.string(),
});

export const UpdateStatusRequest = z.object({
  id: z.string(),
  // status: z.string(),
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
      buyerStatus: z.string(),
      freelancerStatus: z.string(),
    })
  ),
});

export const UpdateStatusResponse = z.object({
  data: z.object({
    _id: z.string(),
    taskId: z.string(),
    offerUserId: z.string(),
    totalPrice: z.number(),
    offerStatus: z.string(),
    buyerStatus: z.string(),
    freelancerStatus: z.string(),
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


const updateFreelancerTaskStatus = api<
  z.infer<typeof UpdateStatusRequest>,
  z.infer<typeof UpdateStatusResponse>
>({
  path: ({ id }) => `/taskOffereds/${id}/freelancerStatus`,
  method: "PUT",
  requestSchema: UpdateStatusRequest,
  responseSchema: UpdateStatusResponse,
  type: "private",
});


const updateBuyerTaskStatus = api<
  z.infer<typeof UpdateStatusRequest>,
  z.infer<typeof UpdateStatusResponse>
>({
  path: ({ id }) => `/taskOffereds/${id}/buyerStatus`,
  method: "PUT",
  requestSchema: UpdateStatusRequest,
  responseSchema: UpdateStatusResponse,
  type: "private",
});

export const FreelancerTaskAPI = {
  updateFreelancerTaskStatus,
  updateBuyerTaskStatus,
};