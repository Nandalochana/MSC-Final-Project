import { Badge, Tooltip, List, Typography, Button, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useNotificationStore } from "../../store/notification-store";
import { useMarkNotificationAsRead } from "./api"; // Import the refactored hook
import { useNotification } from "../../utils/useNotification";

const { Text } = Typography;

interface NotificationProps {
  currentUserId: string;
}

export const Notification = ({ currentUserId }: NotificationProps) => {
  const { notifications, setNotifications, clearNotifications } = useNotificationStore();
  const { mutateAsync: markNotificationAsRead } = useMarkNotificationAsRead(); // Hook for marking notifications as read
  useNotification(currentUserId); // Custom hook to handle socket notifications
  const handleNotificationClick = async (item: { id: string; userId: string; content: string }) => {
    try {
      const response = await markNotificationAsRead({ id: item.id, userId: item.userId }); // Call the refactored hook
      console.log("Notification updated:", response); // Log the updated notification

      // Remove the clicked notification from the store and sessionStorage
      const updatedNotifications = notifications.filter((notification) => notification.id !== item.id);
      setNotifications(updatedNotifications); // Update the store
      sessionStorage.setItem("notificationsList", JSON.stringify(updatedNotifications)); // Update sessionStorage
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleReadAll = async () => {
    try {
      // Send a request for each notification
      await Promise.all(
        notifications.map(async (item) => {
          await markNotificationAsRead({ id: item.id, userId: item.userId });
        })
      );

      console.log("All notifications marked as read");

      // Clear notifications from the store and sessionStorage
      clearNotifications();
      sessionStorage.removeItem("notificationsList");
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const notificationContent = (
    <div style={{ minWidth: 220 }}>
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        size="middle"
      >
        <Space
          align="center"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <Text strong style={{ color: "white" }}>Notifications</Text>
          {notifications.length > 0 && (
            <Button
              type="link"
              size="small"
              onClick={handleReadAll} // Call handleReadAll on click
              style={{ color: "#1890ff", padding: 0 }}
            >
              Read All
            </Button>
          )}
        </Space>

        {notifications.length > 0 ? (
          <List
            size="small"
            dataSource={notifications}
            renderItem={(item: { id: string; userId: string; content: string }, index) => (
              <List.Item
                key={index}
                style={{
                  padding: "4px 0", // Adjust padding for better alignment
                  display: "block", // Ensure the item spans the full width
                  cursor: "pointer",
                }}
                onClick={() => handleNotificationClick(item)} // Add click handler
              >
                <Text style={{ color: "white", textAlign: "left", display: "block" }}>
                  {item.content}
                </Text>
              </List.Item>
            )}
          />
        ) : (
          <Text style={{ color: "white" }}>No new notifications</Text>
        )}
      </Space>
    </div>
  );

  return (
    <Tooltip
      color="#001529"
      placement="bottomRight"
      title={notificationContent}
    >
      <Badge count={notifications.length} size="small" offset={[0, 5]}>
        <BellOutlined style={{ fontSize: "20px", cursor: "pointer", color: "white" }} />
      </Badge>
    </Tooltip>
  );
};
