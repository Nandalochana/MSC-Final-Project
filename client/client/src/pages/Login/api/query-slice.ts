import { z } from "zod";
import axios from "axios";

import { api } from "../../../lib/utils/api";
import { LoginAPIResponseSchema, LoginFormSchema } from "../components/schema";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";

const LoginRequest = LoginFormSchema;

const LoginResponse = LoginAPIResponseSchema;

// Define the request schema (if needed, otherwise use an empty object)
const NotificationRequestSchema = z.object({
  userId: z.string(), // Define userId as a required string
});

// Define the response schema
const NotificationResponseSchema = z.array(
  z.object({
    _id: z.string(),        // Unique identifier for the notification
    userId: z.string(),     // ID of the user the notification belongs to
    content: z.string(),    // Notification content
    status: z.string(),     // Status of the notification (e.g., active)
    createdAt: z.string(),  // Creation timestamp in ISO format
    __v: z.number(),        // Version key
  })
);

const login = api<
  z.infer<typeof LoginRequest>,
  z.infer<typeof LoginResponse>
>({
  method: "POST",
  path: API_ENDPOINT.SIGN_IN,
  requestSchema: LoginRequest,
  responseSchema: LoginResponse,
  type: "public"
});


const notification = api<
  z.infer<typeof NotificationRequestSchema>,
  z.infer<typeof NotificationResponseSchema>
>({
  method: "GET",
  path:  (params) => `${API_ENDPOINT.NOTIFICATION}/${params.userId}`,
  requestSchema: NotificationRequestSchema,
  responseSchema: NotificationResponseSchema,
  type: "private",
});

export const LoginAPI = {
  login,
  notification,
};
