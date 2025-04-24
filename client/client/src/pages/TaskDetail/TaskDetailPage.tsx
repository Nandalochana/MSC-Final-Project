import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskDetailsAPI } from "./api/query-slice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateComment, useUpdateTask } from "./api/query"; // Import API calls
import { useUserStore } from "../../store/user-store";
import { useDeleteTask } from "../Dashboard/Admin/dashboard/components/Task/api/query";
import { notification } from "antd";

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState("");
  const [commentDescription, setCommentDescription] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUserStore();

  const deleteTask = useDeleteTask();

  // Fetch task details
  const {
    data: taskDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["taskDetails", id],
    enabled: !!id,
    queryFn: () => TaskDetailsAPI.getTaskDetails({ taskId: id as string }),
  });

  // Fetch comments
  const {
    data: comments,
    isError: isErrorComments,
    error: errorComments,
  } = useQuery({
    queryKey: ["comments", id],
    enabled: !!id,
    queryFn: () => TaskDetailsAPI.getComments({ taskId: id as string }),
  });

  if (isErrorComments) {
    notification.error({
      message: 'Error',
      description: `An error occurred while fetching comments: ${errorComments?.message}`,
    });
  }

  console.log('Comments data:', comments);

  const updateTaskMutation = useUpdateTask();
  //   const addCommentMutation = useAddComment();

  // Check if the user is the task creator
  const isTaskCreator = user?.user._id === taskDetails?.data.createdUserId._id;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      createdUserId: taskDetails?.data.createdUserId._id || "",
      title: taskDetails?.data.title || "",
      description: taskDetails?.data.description || "",
      status: taskDetails?.data.status || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (isTaskCreator) {
        updateTaskMutation.mutate({
          taskId: id as string,
          ...values,
        });
        setIsEditing(false);
      }
    },
  });

  const handleDelete = (taskId: string) => {
    console.log(`Delete task with id: ${taskId}`);
    deleteTask.mutate({ taskId });
    navigate('/task')
  };

  const addComment = useCreateComment();

  const handleAddComment = async () => {
    try {
      await addComment.mutateAsync({ taskId: id as string, userId: user?.user._id || "", comment: commentDescription, totalPrice, status: formik.values.status });
      setCommentDescription("");
      setTotalPrice(0);
    } catch (error: unknown) {
      console.log('error', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while adding the comment. Please try again.',
      });
    }
  };

  const selectOfferMutation = useMutation({
    mutationFn: async ({ taskId, offerUserId, commentId }: { taskId: string; offerUserId: string; commentId: string }) => {
      console.log('info:', { taskId, offerUserId, commentId });
      return TaskDetailsAPI.selectOffer({ taskId, offerUserId, commentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["taskDetails", id] });
    },
    onError: (error) => {
      notification.error({
        message: 'Error',
        description: `An error occurred while selecting the offer: ${error.message}`,
      });
    },
  });

  const handleSelectOffer = (taskId: string, offerUserId: string, commentId: string) => {
    selectOfferMutation.mutate({ taskId, offerUserId, commentId });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-700 font-medium">Loading task details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-600 font-semibold">
          Oops! Something went wrong: {error?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Task Details</h1>
      </section>

      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
        <form onSubmit={formik.handleSubmit}>
          <input
            type="hidden"
            name="createdUserId"
            value={formik.values.createdUserId}
          />

          <input
            type="hidden"
            name="status"
            value={formik.values.status}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-1">
                Created By
              </label>
              <p className="text-gray-500 text-sm italic">
                {taskDetails?.data.createdUserId.firstName}
              </p>
            </div>

            {/* Other Fields (Title, Description, Status) */}
            {["title", "description"].map((field) => (
              <div key={field}>
                <label className="block text-base font-semibold text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                {isEditing && isTaskCreator ? (
                  <>
                    <input
                      name={field}
                      value={formik.values[field as keyof typeof formik.values]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {formik.touched[field as keyof typeof formik.values] &&
                      formik.errors[field as keyof typeof formik.values] && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors[field as keyof typeof formik.values]}
                        </p>
                      )}
                  </>
                ) : (
                  <p className="text-gray-700 break-all">
                    {formik.values[field as keyof typeof formik.values]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            {isTaskCreator && isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${formik.isValid && formik.dirty
                      ? "opacity-100"
                      : "opacity-50"
                    }`}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {isTaskCreator && taskDetails?.data.status === 'active' &&(
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => taskDetails?.data._id && handleDelete(taskDetails.data._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
                {
                  isTaskCreator && !(taskDetails?.data.status === 'active') && (
                    <div className="absolute right-3 top-3 px-4 py-2 bg-yellow-500 text-white rounded-lg">
                      This is Already Offered
                    </div>
                  )
                }
              </>
            )}
          </div>
        </form>

        {/* Comment Section */}
        {<div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Comments</h2>

          {/* Existing Comments */}
          <div className="mt-2 space-y-3">
            {comments?.data?.length ?? 0 > 0 ? (
              comments?.data?.map(
                (comment: { _id: string, comment: string, totalPrice?: number, userId?: { _id: string, firstName: string, lastName: string } }, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-200 p-3 rounded-lg text-gray-800 relative"
                  >
                    <p>{comment.comment}</p>
                    {comment.totalPrice !== undefined && (
                      <p className="text-xs text-gray-500 mt-1">
                        Total Price: €{comment.totalPrice}
                      </p>
                    )}
                    {comment.userId && (
                      <p className="text-xs text-gray-500 mt-1">
                        By: {comment.userId.firstName} {comment.userId.lastName}
                      </p>
                    )}
                    {isTaskCreator && taskDetails?.data.status === 'active' &&
                      <button
                        type="button"
                        className="absolute right-3 top-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        onClick={() => handleSelectOffer(id as string, comment.userId?._id as string, comment._id)}
                      >
                        Select An Offer
                      </button>
                    }
                  </div>

                )
              )
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>

          {/* Add New Comment */}
          {!isTaskCreator && taskDetails?.data.status !== 'offered' && <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={commentDescription}
              onChange={(e) => setCommentDescription(e.target.value)}
              placeholder="Add a comment description..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="relative w-full">
              <input
                type="number"
                value={totalPrice}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
                placeholder="Total Price"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 pr-10"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
            </div>
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          }
        </div>}
      </div>
    </div>
  );
};

export default TaskDetailPage;
