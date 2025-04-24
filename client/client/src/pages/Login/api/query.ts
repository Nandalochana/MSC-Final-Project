import { z } from "zod";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { LoginAPIResponseSchema, LoginFormType } from "../components/schema";
import { LoginAPI } from "./query-slice";
import { useUserStore } from "../../../store/user-store";
import { useNavigate } from "react-router";
import { Routes } from "../../../lib/utils/routes-constants";
import { useNotificationStore } from "../../../store/notification-store";

// Define the schema for the notifications API response
const NotificationsAPIResponseSchema = z.array(
  z.object({
    _id: z.string(),
    userId: z.string(),
    content: z.string(),
  })
);

interface ErrorResponse {
  message: string;
}

export function useSignIn() {
  const navigate = useNavigate();
  const { setCredentials } = useUserStore();

  const fetchNotifications = async (userId: string) => {
    const response = await LoginAPI.notification({ userId }); // Use the notification method
    console.log("Notification API response:", response); // Log the response result

    // Transform the response to extract only the `content` field
    try {
      const parsedResponse = NotificationsAPIResponseSchema.parse(response);
      interface Notification {
        id: string;
        userId: string;
        content: string;
      }

      const notificationContents: Notification[] = parsedResponse.map((notification) => ({
        id: notification._id,
        userId: notification.userId,
        content: notification.content,
      }));
      console.log("Parsed notifications:", notificationContents); // Log the parsed notifications
      return notificationContents;
    } catch (error) {
      console.error("Error parsing notifications API response:", error);
      throw new Error("Failed to parse notifications response");
    }
  };

  return useMutation<
    z.infer<typeof LoginAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    LoginFormType
  >({
    mutationFn: (user) => LoginAPI.login(user),
    onSuccess: async (data) => {
      console.log("data", data);

      setCredentials({
        accessToken: data.token,
        user: data.user,
        loginInfo: data.loginInfo,
      });

      // Fetch notifications for the logged-in user
      const notifications = await fetchNotifications(data.user._id);
      console.log("Fetched notifications:", notifications); // Log the fetched notifications
      sessionStorage.setItem("notificationsList", JSON.stringify(notifications));
      useNotificationStore.getState().setNotifications(notifications); // Update the store with full objects
      
      // Navigate based on user role
      const role = data.loginInfo?.userRoleId?.role;
      if (role === "Freelancer") {
        navigate("/freelancer");
      } else if (role === "Buyer") {
        navigate("/buyer");
      } else if (role === "Admin") {
        navigate("/admin");
      } else {
        // no role found, navigate to a default page or show an error
      }
      console.log("success", data);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    },
  });
}
