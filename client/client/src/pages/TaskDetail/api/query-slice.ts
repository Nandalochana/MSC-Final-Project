import { z } from "zod";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";
import { api } from "../../../lib/utils/api";
import { CommentsCreateRequestSchema, CommentsCreateResponseSchema, CommentsResSchema, DeleteTaskResponseSchema, TaskResponseSchema } from "../components/schema";

const GetTaskDetailsRequest = z.object({
  taskId: z.string().min(1, "User ID is required"),
});
const GetTaskDetailsResponse = TaskResponseSchema;

export const TaskRequestSchema = z.object({
  taskId: z.string().min(1, "Task ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  createdUserId: z.string(),
  status: z.string(),
});


const CreateCommentsRequest = CommentsCreateRequestSchema;

const SelectOfferRequest = z.object({
  taskId: z.string().min(1, "Task ID is required"),
  offerUserId: z.string().min(1, "User ID is required"),
  commentId: z.string().min(1, "Comment ID is required"),
});

const SelectOfferResponse = z.object({
  message: z.string(),
});

const getTaskDetails = api<
  z.infer<typeof GetTaskDetailsRequest>,
  z.infer<typeof GetTaskDetailsResponse>
>({
  path: ({ taskId }) => `${API_ENDPOINT.TASKS}/${taskId}`,
  method: "GET",
  requestSchema: GetTaskDetailsRequest,
  responseSchema: GetTaskDetailsResponse,
   type: "private"
});

const updateTask = api<
  z.infer<typeof TaskRequestSchema>,
  z.infer<typeof GetTaskDetailsResponse>
>({
  path: (params) => `${API_ENDPOINT.TASKS}/${params.taskId}`,
  method: "PUT",
  requestSchema: TaskRequestSchema,
  responseSchema: GetTaskDetailsResponse,
   type: "private"
});

const deleteTask = api<
  z.infer<typeof GetTaskDetailsRequest>,
  z.infer<typeof DeleteTaskResponseSchema>
>({
  path: (params) => `${API_ENDPOINT.TASKS}/${params.taskId}`,
  method: "DELETE",
  requestSchema: GetTaskDetailsRequest,
  responseSchema: DeleteTaskResponseSchema,
   type: "private"
});

const createComment = api<
  z.infer<typeof CreateCommentsRequest>,
  z.infer<typeof CommentsCreateResponseSchema>
>({
  method: "POST",
  path: API_ENDPOINT.COMMENTS,
  requestSchema: CreateCommentsRequest,
  responseSchema: CommentsCreateResponseSchema,
  type: "private"
});

const getComments = api<
  z.infer<typeof GetTaskDetailsRequest>,
  z.infer<typeof CommentsResSchema>
>({
  method: "GET",
  path: (params) => `${API_ENDPOINT.COMMENTS_TASK}/${params.taskId}`,
  requestSchema: GetTaskDetailsRequest,
  responseSchema: CommentsResSchema,
  type: "private"
});

const selectOffer = api<
  z.infer<typeof SelectOfferRequest>,
  z.infer<typeof SelectOfferResponse>
>({
  path: API_ENDPOINT.TASK_OFFER,
  method: "POST",
  requestSchema: SelectOfferRequest,
  responseSchema: SelectOfferResponse,
  type: "private",
});

export const TaskDetailsAPI = {
  getTaskDetails,
  updateTask,
  deleteTask,
  createComment,
  getComments,
  selectOffer
};