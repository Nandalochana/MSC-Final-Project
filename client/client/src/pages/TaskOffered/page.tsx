import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { UserDetailsAPI } from "../UserSettings/api/query-slice";
import { useUserStore } from "../../store/user-store";
import TaskItem from "./components/TaskItem";
import { useUpdateTaskBuyerStatus, useUpdateTaskStatus } from "./api/query";
import { message, Modal, Rate } from "antd";
import { useSubmitRating } from "../UpcomingBookings/api/query";
import { FreelancerBookingAPI } from "../UpcomingBookings/api/query-slice";

export const TaskOffered: FC = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const isBuyer = user?.loginInfo?.userRoleId?.role === "Buyer";

  const updateTaskStatus = useUpdateTaskStatus();
  const updateTaskBuyerStatus = useUpdateTaskBuyerStatus();

  const submitRating = useSubmitRating();

  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [rating, setRating] = useState(0);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  // Query to Fetch Tasks based on user role
  const {
    data: taskDetails,
    isLoading: isTasksLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [isBuyer ? "tasksCreated" : "tasksOffered", user?.user?._id],
    enabled: !!user?.user?._id,
    queryFn: () =>
      isBuyer
        ? UserDetailsAPI.getCreatedTasks({ createdUserId: user?.user?._id as string })
        : UserDetailsAPI.getOfferedTasks({ userId: user?.user?._id as string }),
  });

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

    console.log('ratingDetails', ratingDetails)
  
    // Function to get the latest rating for a booking
    const getLatestRating = (taskId: string) => {
      console.log('taskId', taskId)
      const ratingsForBooking = ratingDetails?.data.filter(
        (rating) => rating.taskOrBookingId === taskId
      );
      if (ratingsForBooking && ratingsForBooking.length > 0) {
        ratingsForBooking.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        return ratingsForBooking[0];
      }
      return null;
    };


  const handleUpdateStatus = (id: string, status: string) => {
    const updateStatusMutation = isBuyer ? updateTaskBuyerStatus : updateTaskStatus;
    updateStatusMutation.mutate(
      { id },
      {
        onSuccess: () => {
          message.success(`Task ${status} successfully!`);
          queryClient.invalidateQueries({ queryKey: [isBuyer ? "tasksCreated" : "tasksOffered", user?.user?._id].filter(Boolean) });
        },
        onError: (err) => {
          message.error(`Failed to update status: ${err.message}`);
        },
      }
    );
  };

  const handleOpenRatingModal = (taskId: string) => {
    setCurrentTaskId(taskId);
    setRatingModalVisible(true);
  };

  const handleRatingSubmit = () => {
    if (currentTaskId) {
      submitRating.mutate(
        {
          taskOrBookingId: currentTaskId,
          rating,
          buyerId: user?.user?._id || "",
          freelancerId:
            taskDetails?.data.find((task) => task._id === currentTaskId)?.offerUserId || "",
          type: "Task",
        },
        {
          onSuccess: () => {
            message.success("Rating submitted successfully!");

            // Update local ratings state
            setRatings((prevRatings) => ({
              ...prevRatings,
              [currentTaskId]: rating, // Store the rating for this booking
            }));

            setRatingModalVisible(false);
            setRating(0);
            setCurrentTaskId(null);

            queryClient.invalidateQueries({ queryKey: ["ratingDetails"] });
          },
          onError: (err) => {
            message.error(`Failed to submit rating: ${err.message}`);
          },
        }
      );
    }
  };

  if (isTasksLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700 font-medium">
            Page is loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-700">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen">
      {/* Header Section */}
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Offered Tasks</h1>
      </section>

      <div className="flex h-screen container mx-auto my-5">
        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>

            {Array.isArray(taskDetails?.data) && taskDetails?.data.length === 0 ? (
              <p className="text-gray-500">No tasks added yet.</p>
            ) : (
              <div className="">
                {taskDetails?.data && (
                  <TaskItem
                    tasks={taskDetails.data}
                    isLoading={isTasksLoading}
                    isBuyer={isBuyer}
                    onUpdateStatus={handleUpdateStatus}
                    onOpenRatingModal={handleOpenRatingModal}
                    getLatestRating={getLatestRating}
                    setRating={setRating}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

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