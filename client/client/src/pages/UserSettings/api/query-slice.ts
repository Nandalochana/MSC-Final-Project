import { z } from "zod";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";
import { api } from "../../../lib/utils/api";
import { TaskResponseSchema, TasksResSchema, UserDetailsResponseSchema } from "../components/schema";

const GetUserDetailsRequest = z.object({
  userId: z.string().min(1, "User ID is required"),
});
const GetUserDetailsResponse = UserDetailsResponseSchema;

export const userProfileRequestSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  address1: z.string().optional(),
  address2: z.string().optional(),
  address3: z.string().optional(),
  mobileNr: z.string().min(10, "Mobile Number must be at least 10 digits"),
  telephoneNr: z.string().optional(),
});

export const taskRequestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  createdUserId: z.string(),
  status: z.string(),
});

const GetOfferedTasksRequest = z.object({
  userId: z.string().min(1, "User ID is required"),
});

const GetCreatedTasksRequest = z.object({
  createdUserId: z.string().min(1, "User ID is required"),
});

const TaskResponse = TaskResponseSchema;


const GetAllTaskRequest = z.void();
const GetAllTaskResponse = TasksResSchema;


const GetTasksByUserId = z.object({
  userId: z.string()
});


const GetOfferedTasksResponse = z.object({
  data: z.array(
    z.object({
      buyerStatus: z.string(),
      freelancerStatus: z.string(),
      _id: z.string(),
      taskId: z.object({
        _id: z.string(),
        createdUserId: z.string(),
        title: z.string(),
        description: z.string(),
        status: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        __v: z.number(),
      }),
      offerUserId: z.string(),
      totalPrice: z.number(),
      status: z.string(),
      offerStatus: z.string(),
      __v: z.number(),
    })
  )
});

const GetCreatedTasksResponse = z.object({
  data: z.array(
    z.object({
      buyerStatus: z.string(),
      freelancerStatus: z.string(),
      _id: z.string(),
      taskId: z.object({
        _id: z.string(),
        createdUserId: z.string(),
        title: z.string(),
        description: z.string(),
        status: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        __v: z.number(),
      }),
      offerUserId: z.string(),
      totalPrice: z.number(),
      status: z.string(),
      offerStatus: z.string(),
      __v: z.number(),
    })
  )
});

const getUserDetails = api<
  z.infer<typeof GetUserDetailsRequest>,
  z.infer<typeof GetUserDetailsResponse>
>({
  path: ({ userId }) => `${API_ENDPOINT.USER}/${userId}`,
  method: "GET",
  requestSchema: GetUserDetailsRequest,
  responseSchema: GetUserDetailsResponse,
});

const updateUserDetails = api<
  z.infer<typeof userProfileRequestSchema>,
  z.infer<typeof GetUserDetailsResponse>
>({
  path: (params) => `${API_ENDPOINT.USER}/${params.userId}`,
  method: "PUT",
  requestSchema: userProfileRequestSchema,
  responseSchema: GetUserDetailsResponse,
   type: "private"
});

const createTask = api<
  z.infer<typeof taskRequestSchema>,
  z.infer<typeof TaskResponse>
>({
  path: API_ENDPOINT.TASKS,
  method: "POST",
  requestSchema: taskRequestSchema,
  responseSchema: TaskResponse,
   type: "private"
});

const getAllTasks = api<
  z.infer<typeof GetAllTaskRequest>,
  z.infer<typeof GetAllTaskResponse>
>({
  path: API_ENDPOINT.TASKS,
  method: "GET",
  requestSchema: GetAllTaskRequest,
  responseSchema: GetAllTaskResponse,
   type: "private"
});

const getUserCreatedTasks = api<
  z.infer<typeof GetTasksByUserId>,
  z.infer<typeof GetAllTaskResponse>
>({
  path: API_ENDPOINT.USET_TASKS,
  method: "GET",
  requestSchema: GetTasksByUserId,
  responseSchema: GetAllTaskResponse,
   type: "private"
});

const getOfferedTasks = api<
  z.infer<typeof GetOfferedTasksRequest>,
  z.infer<typeof GetOfferedTasksResponse>
>({
  path: ({ userId }) => `${API_ENDPOINT.TASKS_OFFERED}/${userId}`,
  method: "GET",
  requestSchema: GetOfferedTasksRequest,
  responseSchema: GetOfferedTasksResponse,
});


const getCreatedTasks = api<
  z.infer<typeof GetCreatedTasksRequest>,
  z.infer<typeof GetCreatedTasksResponse>
>({
  path: ({ createdUserId }) => `${API_ENDPOINT.TASKS_CREATED}/${createdUserId}`,
  method: "GET",
  requestSchema: GetCreatedTasksRequest,
  responseSchema: GetCreatedTasksResponse,
});




export const UserDetailsAPI = {
  getUserDetails,
  updateUserDetails,
  createTask,
  getAllTasks,
  getUserCreatedTasks,
  getOfferedTasks,
  getCreatedTasks
};