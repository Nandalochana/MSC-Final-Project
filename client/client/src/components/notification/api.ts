import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/utils/api"; // Assuming `api` is a utility function for API calls
import { z } from "zod";
import { API_ENDPOINT } from "../../lib/utils/endpoints-constant";

// Define the request schema
const MarkNotificationRequest = z.object({
  id: z.string(),
  userId: z.string(),
});

// Define the response schema

const MarkNotificationResponse = z.object({
  _id: z.string(), // Notification ID
  userId: z.string(), // User ID
  content: z.string(), // Notification content
  status: z.string(), // Notification status (e.g., active/inactive)
  createdAt: z.string(), // Creation timestamp in ISO format
  __v: z.number(), // Version key
});

// API function
const markNotificationAsRead = api<
  z.infer<typeof MarkNotificationRequest>,
  z.infer<typeof MarkNotificationResponse>
>({
  method: "PUT",
  path: ({ id, userId }) => `${API_ENDPOINT.NOTIFICATION_READ}/${id}/user/${userId}`, // Dynamic path
  requestSchema: MarkNotificationRequest,
  responseSchema: MarkNotificationResponse,
  type: "private",
});

// Hook to use the mutation
export const useMarkNotificationAsRead = () => {
  return useMutation<
    z.infer<typeof MarkNotificationResponse>, // Response type
    Error, // Error type
    z.infer<typeof MarkNotificationRequest> // Request type
  >({
    mutationFn: async (data) => markNotificationAsRead(data), // Ensure the function is properly invoked
  });
};
