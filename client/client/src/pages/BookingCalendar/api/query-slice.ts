import { z } from "zod";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";
import { api } from "../../../lib/utils/api";
import { DeleteTimeResponseSchema, singleTimesResSchema, TimesResSchema } from "../components/schema";

const GetAllTimeSlotsRequest = z.void();

export const CreateTimesRequest = z.object({
  userId: z.string(),
  date: z.string(),
  available: z.boolean(),
  status: z.string(),
  timeSlots: z.array(
    z.object({
      _id: z.string().optional(),
      start: z.string(),
      end: z.string(),
    })
  ),
});

const DeleteTimeSlotRequest = z.object({
  timeSlotId: z.string(),
});

const getTimeSlots = api<
  z.infer<typeof GetAllTimeSlotsRequest>,
  z.infer<typeof TimesResSchema>
>({
  path: API_ENDPOINT.TIME_SLOTS,
  method: "GET",
  requestSchema: GetAllTimeSlotsRequest,
  responseSchema: TimesResSchema,
  type: "private",
});


const addTimeSlots = api<
  z.infer<typeof CreateTimesRequest>,
  z.infer<typeof singleTimesResSchema>
>({
  path: API_ENDPOINT.TIME_SLOTS,
  method: "POST",
  requestSchema: CreateTimesRequest,
  responseSchema: singleTimesResSchema,
  type: "private",
});


const deleteTimeSlot = api<
  z.infer<typeof DeleteTimeSlotRequest>,
  z.infer<typeof DeleteTimeResponseSchema>
>({
  path:  (params) => `${API_ENDPOINT.TIME_SLOTS}/${params.timeSlotId}`,
    method: "DELETE",
    requestSchema: DeleteTimeSlotRequest,
    responseSchema: DeleteTimeResponseSchema,
    type: "private",
});

export const FreelancerAPI = {
  addTimeSlots,
  getTimeSlots,
  deleteTimeSlot
};