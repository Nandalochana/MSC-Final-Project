import { create } from "zustand";

export interface NotificationItem {
  id: string;
  userId: string;
  content: string;
}

interface NotificationStore {
  notifications: NotificationItem[]; // Store full notification objects
  setNotifications: (notifications: NotificationItem[]) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }), // Set full notification objects
  clearNotifications: () => set({ notifications: [] }), // Clear all notifications
}));
