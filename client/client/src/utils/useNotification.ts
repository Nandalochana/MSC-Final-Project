import { useEffect, useRef } from "react";

type NotificationItem = {
  id: string;
  userId: string;
  content: string;
};

import { io } from "socket.io-client";
import { useUserStore } from "../store/user-store";
import { useNotificationStore } from "../store/notification-store";

const socket = io("http://localhost:4000");

export const useNotification = (currentUserId: string) => {
  const { user } = useUserStore();
  const { notifications, setNotifications, clearNotifications } = useNotificationStore();
  const notificationsRef = useRef<NotificationItem[]>([]); // Use a ref to store notifications

  useEffect(() => {
    console.log("Connecting to socket.io server..." + currentUserId);

    // Load cached notifications from sessionStorage
    const cachedNotifications = sessionStorage.getItem("notificationsList");
    if (cachedNotifications) {
      const parsedNotifications = JSON.parse(cachedNotifications);
      if (parsedNotifications.length === 0) {
        sessionStorage.removeItem("notificationsList"); // Clear storage if empty
        clearNotifications(); // Use the store's clear function
      } else {
        setNotifications(parsedNotifications);
        notificationsRef.current = parsedNotifications; // Update the ref
      }
    }

    socket.on("notification", (content: { id: string; userId: string; content: string }) => {
      console.log("Received id:", content.id);
      console.log("Received userId:", content.userId);
      console.log("Received content:", content.content);

      // Only update notifications if the userId matches the current user's ID
      if (content.userId === user?.user._id) {
        const updatedNotifications = [
          ...notificationsRef.current,
          { id: content.id, userId: content.userId, content: content.content }
        ].filter((item): item is NotificationItem => item !== undefined);

        // Update state and cache
        notificationsRef.current = updatedNotifications; // Update the ref
        setNotifications(updatedNotifications);
        sessionStorage.setItem("notificationsList", JSON.stringify(updatedNotifications));
        console.log("Updated notifications:", updatedNotifications); // Log updated notifications
      }
    });

    return () => {
      socket.off("notification");
    };
  }, [user, currentUserId, setNotifications, clearNotifications]); // Added clearNotifications to dependencies

  console.log("Current notifications values:", notifications); // Log notifications on every render

  return notifications;
};
