import { z } from "zod";
import { FreelanceResSchema } from "../components/schema";
import { api } from "../../../../lib/utils/api";
import { API_ENDPOINT } from "../../../../lib/utils/endpoints-constant";
import { DeleteTimeResponseSchema, TimesResSchema } from "../../../BookingCalendar/components/schema";



const GetFilteredFreelancersRequest = z.object({
  name: z.string().optional(),
  profiles: z.array(z.string()).optional(),
});

const GetFilteredFreelancersResponse = FreelanceResSchema;

const GetFreelancerTimeRequest = z.object({
  freelancerId: z.string().min(1, "ID is required"),
});
const GetFreelancerTimeResponse = TimesResSchema;

const BookingRequest = z.object({
  freelancerSlotId: z.string(),
  userId: z.string(),
  buyerId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  hourlyRate: z.number(),
  totalPrice: z.number()
});

export const BookingResponse = z.object({
  data: z.object({
    userId: z.string(),
    date: z.string(),
    timeSlot: z.object({
      start: z.string(),
      end: z.string(),
      _id: z.string()
    }),
    buyerId: z.string(),
    status: z.string(),
    hourlyRate: z.number(),
    totalPrice: z.number(),
    buyerStatus: z.string(),
    freelancerStatus: z.string(),
    _id: z.string(),
    __v: z.number()
  }),
});

const GetBuyerTimeRequest = z.object({
  buyerId: z.string().min(1, "ID is required"),
});

const GetBuyerTimeResponse = z.object({
  data: z.array(z.object({
    _id: z.string(),
    __v: z.number(),
    userId: z.string(),
    date: z.string(),
    buyerId: z.string(),
    timeSlot: z.object({
      start: z.string(),
      end: z.string(),
      _id: z.string()
    }),
    hourlyRate: z.number(),
    totalPrice: z.number(),
    status: z.string(),
  }))
});

export const BookingUpdateSchema = z.object({
  bookingId: z.string().min(1, "Task ID is required"),
});

const DeleteTimeSlotRequest = z.object({
  bookingId: z.string().min(1, "ID is required"),
});


const getFreelancers = api<
  z.infer<typeof GetFilteredFreelancersRequest>,
  z.infer<typeof GetFilteredFreelancersResponse>
>({
  path: API_ENDPOINT.FREELANCERS,
  method: "GET",
  requestSchema: GetFilteredFreelancersRequest,
  responseSchema: GetFilteredFreelancersResponse,
  type: "private",
});


const getFreelancerTimeSlots = api<
  z.infer<typeof GetFreelancerTimeRequest>,
  z.infer<typeof GetFreelancerTimeResponse>
>({
  path: ({ freelancerId }) => `${API_ENDPOINT.FREELANCER_TIMES}/${freelancerId}`,
  method: "GET",
  requestSchema: GetFreelancerTimeRequest,
  responseSchema: GetFreelancerTimeResponse,
  type: "private",
});


const getTimeSlotsByBuyer = api<
  z.infer<typeof GetBuyerTimeRequest>,
  z.infer<typeof GetBuyerTimeResponse>
>({
  path: ({ buyerId }) => `${API_ENDPOINT.BOOKING_SLOTS_BUYER}/${buyerId}`,
  method: "GET",
  requestSchema: GetBuyerTimeRequest,
  responseSchema: GetBuyerTimeResponse,
  type: "private",
});


const bookTimeSlots = api<
  z.infer<typeof BookingRequest>,
  z.infer<typeof BookingResponse>
>({
  path: API_ENDPOINT.BOOKING_SLOTS,
  method: "POST",
  requestSchema: BookingRequest,
  responseSchema: BookingResponse,
  type: "private",
});


const updateBooking = api<
  z.infer<typeof BookingUpdateSchema>,
  z.infer<typeof BookingResponse>
>({
  path: (params) => `${API_ENDPOINT.BOOKING_SLOTS}/${params.bookingId}`,
  method: "PUT",
  requestSchema: BookingUpdateSchema,
  responseSchema: BookingResponse,
   type: "private"
});


const deleteBooking = api<
  z.infer<typeof DeleteTimeSlotRequest>,
  z.infer<typeof DeleteTimeResponseSchema>
>({
  path:  (params) => `${API_ENDPOINT.BOOKING_SLOTS}/${params.bookingId}`,
    method: "DELETE",
    requestSchema: DeleteTimeSlotRequest,
    responseSchema: DeleteTimeResponseSchema,
    type: "private",
});


export const BuyerAPI = {
  getFreelancers,
  getFreelancerTimeSlots,
  bookTimeSlots,
  getTimeSlotsByBuyer,
  updateBooking,
  deleteBooking
};