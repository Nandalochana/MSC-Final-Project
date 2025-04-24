import { useEffect, useState } from "react";
import { message, Button, Tag, Spin, Modal, Rate } from "antd";
import dayjs from "dayjs";
import {
  useGetUpcomingBookingsBuyer,
  useGetUpcommingBookings,
  useUpdateBookingStatus,
  useUpdateBookingBuyerStatus,
  useSubmitRating,
} from "./api/query";
import { useUserStore } from "../../store/user-store";
import {
  BarcodeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EuroCircleOutlined,
} from "@ant-design/icons";
import { FreelancerBookingAPI } from "./api/query-slice";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const UpcommingBookingsPage: React.FC = () => {
  const { user } = useUserStore();
  const isBuyer = user?.loginInfo?.userRoleId?.role === "Buyer";

  const queryClient = useQueryClient();


  const updateBookingStatus = useUpdateBookingStatus();
  const updateBookingBuyerStatus = useUpdateBookingBuyerStatus();
  const submitRating = useSubmitRating();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getBookings = isBuyer ? useGetUpcomingBookingsBuyer() : useGetUpcommingBookings();
  const { mutate, data, isError, error, isLoading } = getBookings;

  const [updatingBooking, setUpdatingBooking] = useState<string | null>(null);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [rating, setRating] = useState(0);


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
    message.error(`Error fetching upcoming bookings: ${error.message}`);
    return null;
  }

  // Fetch rate details
  const {
    data: ratingDetails,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery({
    queryKey: ["ratingDetails", user?.user?._id],
    enabled: !!user?.user?._id,
    queryFn: () =>
      FreelancerBookingAPI.getRatingsByFreelancer({ freelancerId: user?.user?._id as string }),
  });

  // Function to get the latest rating for a booking
  const getLatestRating = (bookingId: string) => {
    const ratingsForBooking = ratingDetails?.data.filter(
      (rating) => rating.taskOrBookingId === bookingId
    );
    if (ratingsForBooking && ratingsForBooking.length > 0) {
      ratingsForBooking.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      return ratingsForBooking[0];
    }
    return null;
  };

  // Function to update booking status
  const handleUpdateStatus = async (
    bookingId: string,
    status: "confirmed" | "cancelled" | "completed"
  ) => {
    setUpdatingBooking(bookingId);
    const updateStatusMutation = isBuyer
      ? updateBookingBuyerStatus
      : updateBookingStatus;
    updateStatusMutation.mutate(
      { bookingId, status },
      {
        onSuccess: () => {
          message.success(`Booking ${status} successfully!`);
          mutate({
            userId: user?.user?._id || "",
            ...(isBuyer && { buyerId: user.user._id }),
            date: dayjs().toISOString(),
          });
          if (status === "completed" && isBuyer) {
            setCurrentBookingId(bookingId);
            setRatingModalVisible(true);
          }
        },
        onError: (err) => {
          message.error(`Failed to update status: ${err.message}`);
        },
        onSettled: () => {
          setUpdatingBooking(null);
        },
      }
    );
  };

  // Function to submit rating
  const handleRatingSubmit = () => {
    if (currentBookingId) {
      submitRating.mutate(
        {
          taskOrBookingId: currentBookingId,
          rating,
          buyerId: user?.user?._id || "",
          freelancerId:
            data?.data.find((booking) => booking._id === currentBookingId)?.userId || "",
          type: "Booking",
        },
        {
          onSuccess: () => {
            message.success("Rating submitted successfully!");
  
            // Update local ratings state
            setRatings((prevRatings) => ({
              ...prevRatings,
              [currentBookingId]: rating, // Store the rating for this booking
            }));
  
            setRatingModalVisible(false);
            setRating(0);
            setCurrentBookingId(null);

            queryClient.invalidateQueries({ queryKey: ["ratingDetails"] });
          },
          onError: (err) => {
            message.error(`Failed to submit rating: ${err.message}`);
          },
        }
      );
    }
  };

  const toggleDetails = (bookingId: string) => {
    setExpandedBookingId((prev) => (prev === bookingId ? null : bookingId)); // Toggle expanded state
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="h-24 flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md">
        <h1 className="text-xl font-semibold">Upcoming Bookings</h1>
      </section>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          {data?.data?.map((booking) => {
            const bookingDate = dayjs(booking.date).format("MMM D, YYYY");
            const startTime = dayjs(booking.timeSlot.start).format("hh:mm A");
            const endTime = dayjs(booking.timeSlot.end).format("hh:mm A");

            const totalMinutes = dayjs(booking.timeSlot.end).diff(
              dayjs(booking.timeSlot.start),
              "minute"
            );
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const formattedDuration = `${hours}h ${minutes}m`;

            const isCancelled = booking.freelancerStatus === "cancelled";

            // Find the latest rating for this booking
            const latestRating = getLatestRating(booking._id);

            return (

              <div>

                <div
                  key={booking._id}
                  className={`shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-start justify-between mb-3 border-l-4 ${
                    isCancelled
                      ? "border-red-500 bg-red-50"
                      : booking.buyerStatus === "completed"
                      ? "border-green-500 bg-green-50"
                      : "border-blue-500 hover:border-indigo-500 bg-white"
                  } transition`}
                >
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
                      <p className="text-gray-600 font-medium text-sm">
                        {booking._id}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <ClockCircleOutlined className="text-lg" />
                      <p className="text-sm">{formattedDuration}</p>
                    </div>
                  </div>
  
                  <div className="flex flex-col items-center sm:items-start">
                  {isBuyer && booking.buyerStatus === "completed" && (
                      <div className="flex flex-col items-center">
                        {latestRating ? (
                          <div className="flex flex-col items-center">
                            {/* <span className="text-sm font-medium text-gray-600">Your Rating</span> */}
                            <Rate disabled allowHalf value={latestRating.rating} className="text-lg" />
                            <Button
                              type="primary"
                              onClick={() => {
                                setCurrentBookingId(booking._id);
                                setRating(latestRating.rating);
                                setRatingModalVisible(true);
                              }}
                              className="flex items-center space-x-2 mt-2"
                            >
                              Edit Rating
                            </Button>
                          </div>
                        ) : (
                          <Button
                            type="primary"
                            onClick={() => {
                              setCurrentBookingId(booking._id);
                              setRating(0); // Reset rating when opening modal for new rating
                              setRatingModalVisible(true);
                            }}
                            className="flex items-center space-x-2"
                          >
                            Rate Experience
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
  
                  {/* Right Side - Price & Status */}
                  <div className="flex flex-col items-center sm:items-end">
                    <div className="flex items-center space-x-2 text-indigo-600 text-lg font-semibold">
                      <EuroCircleOutlined />
                      <p>{booking.totalPrice.toFixed(2)} €</p>
                    </div>
  
                    {/* Status Tags */}
                    {!isBuyer && booking.freelancerStatus !== "pending" && (
                      <Tag
                        color={
                          booking.freelancerStatus === "cancelled"
                            ? "red"
                            : booking.freelancerStatus === "completed"
                            ? "green"
                            : "blue"
                        }
                      >
                        {booking.freelancerStatus.toUpperCase()}
                      </Tag>
                    )}
  
                    {isBuyer &&
                      booking.buyerStatus &&
                      booking.buyerStatus !== "pending" &&
                      booking.buyerStatus !== "confirmed" && (
                        <Tag
                          color={
                            booking.buyerStatus === "completed" ? "green" : "blue"
                          }
                        >
                          {booking.buyerStatus.toUpperCase()}
                        </Tag>
                      )}
  
                    {/* Action Buttons */}
                    {isBuyer
                      ? booking.freelancerStatus === "confirmed" &&
                        booking.buyerStatus !== "completed" && (
                          <div className="mt-2 flex space-x-2">
                            <Button
                              type="primary"
                              onClick={() =>
                                handleUpdateStatus(booking._id, "completed")
                              }
                              disabled={!!updatingBooking}
                              loading={updatingBooking === booking._id}
                            >
                              Complete
                            </Button>
                          </div>
                        )
                      : booking.freelancerStatus !== "confirmed" &&
                        booking.freelancerStatus !== "cancelled" && (
                          <div className="mt-2 flex space-x-2">
                            <Button
                              type="primary"
                              onClick={() =>
                                handleUpdateStatus(booking._id, "confirmed")
                              }
                              disabled={!!updatingBooking}
                              loading={updatingBooking === booking._id}
                            >
                              Confirm
                            </Button>
                            <Button
                              type="default"
                              danger
                              onClick={() =>
                                handleUpdateStatus(booking._id, "cancelled")
                              }
                              disabled={!!updatingBooking}
                              loading={updatingBooking === booking._id}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
  
                    {/* Cancelled Message for Buyer */}
                    {isBuyer && isCancelled && (
                      <div className="mt-2 text-xs text-red-500 font-medium">
                        This booking has been canceled
                      </div>
                    )}
                  </div>
  
                  <button
                    onClick={() => toggleDetails(booking._id)}
                    className="mt-4 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    {expandedBookingId === booking._id ? "Hide Details" : "View Details"}
                  </button>
                </div>
  
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
            )
          })}

          
        </div>
      )}
      {/* Rating Modal */}
      <Modal
        title="Based on your expectations, how would you rate the quality of this delivery?"
        open={ratingModalVisible}
        onOk={handleRatingSubmit}
        onCancel={() => setRatingModalVisible(false)}
        okText="Submit Rating"
        cancelText="Cancel"
      >
        <div className="flex flex-col items-start">
          <Rate allowHalf value={rating} onChange={setRating} className="text-4xl" />
          <div className="flex justify-center gap-3 mt-4">
      </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpcommingBookingsPage;