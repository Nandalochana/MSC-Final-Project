import { useEffect, useState } from "react";
import { message } from "antd";
import dayjs from "dayjs";
import { useGetPastBookings, useGetPastBookingsBuyer } from "./api/query";
import { useUserStore } from "../../store/user-store";
import {
  BarcodeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EuroCircleOutlined,
} from "@ant-design/icons";

const CompletedBookingsPage = () => {
  const { user } = useUserStore();
  const isBuyer = user?.loginInfo?.userRoleId?.role === "Buyer";

  // Select the correct API hook based on role
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getBookings = isBuyer ? useGetPastBookingsBuyer() : useGetPastBookings();
  const { mutate, data, isError, error } = getBookings;

  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.user?._id) {
      mutate({
        userId: user.user._id,
        ...(isBuyer && { buyerId: user.user._id }),
        date: dayjs().toISOString(),
      });
    }
  }, [user?.user?._id, isBuyer, mutate]);

  if (isError) {
    message.error(`Error fetching completed bookings: ${error.message}`);
    return null;
  }

  const toggleDetails = (bookingId: string) => {
    setExpandedBookingId((prev) => (prev === bookingId ? null : bookingId)); // Toggle expanded state
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="h-24 flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md">
        <h1 className="text-xl font-semibold">Completed Bookings</h1>
      </section>

      {/* Bookings List */}
      <div className="container mx-auto p-4 space-y-6">
        {data?.data?.map((booking) => {
          // Format date & time
          const bookingDate = dayjs(booking.date).format("MMM D, YYYY");
          const startTime = dayjs(booking.timeSlot.start).format("hh:mm A");
          const endTime = dayjs(booking.timeSlot.end).format("hh:mm A");

          // Calculate duration in hours and minutes
          const totalMinutes = dayjs(booking.timeSlot.end).diff(dayjs(booking.timeSlot.start), "minute");
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;
          const formattedDuration = `${hours}h ${minutes}m`;

          return (
            <div key={booking._id}>
              {/* Booking Summary */}
              <div className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between border-l-4 border-blue-500 hover:border-indigo-500 transition">
                {/* Left Side - Date & Time */}
                <div className="flex items-center space-x-3 text-gray-700">
                  <CalendarOutlined className="text-xl text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{bookingDate}</p>
                    <p className="text-xs text-gray-500">
                      {startTime} - {endTime}
                    </p>
                  </div>
                </div>

                {/* Center - Booking ID & Duration */}
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center space-x-2">
                    <BarcodeOutlined className="text-lg text-gray-500" />
                    <p className="text-gray-600 font-medium text-sm">{booking._id}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <ClockCircleOutlined className="text-lg" />
                    <p className="text-sm">{formattedDuration}</p>
                  </div>
                </div>

                {/* Right Side - Price */}
                <div className="flex items-center space-x-2 text-indigo-600 text-lg font-semibold">
                  <EuroCircleOutlined />
                  <p>{booking.totalPrice.toFixed(2)} €</p>
                </div>

                {/* Toggle Details Button */}
                <button
                  onClick={() => toggleDetails(booking._id)}
                  className="mt-4 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  {expandedBookingId === booking._id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Additional Details */}
              {expandedBookingId === booking._id && (
                <div className="mt-2 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Task Details</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Task Info:</strong> {booking.taskInfo}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Description:</strong> {booking.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Contact Info:</strong> {booking.contactInfo}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {booking.location}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompletedBookingsPage;