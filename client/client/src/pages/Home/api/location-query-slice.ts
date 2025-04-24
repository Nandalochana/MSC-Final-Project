import { z } from "zod";
import { api } from "../../../lib/utils/api";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";

export const LocationRequestSchema = z.object({
  userId: z.string(),
  status: z.enum(["ACTIVE"]),
  latitude: z.number(),
  longitude: z.number(),
});

export const LocationResponseSchema = z.string();

const sendLocation = api<
  z.infer<typeof LocationRequestSchema>,
  z.infer<typeof LocationResponseSchema>
>({
    path: API_ENDPOINT.LOCATIONS,
    method: "POST",
    requestSchema: LocationRequestSchema,
    responseSchema: LocationResponseSchema,
    type: "private",
});

export const LocationAPI = {
  sendLocation,
};
