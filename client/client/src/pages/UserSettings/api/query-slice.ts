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

const TaskResponse = TaskResponseSchema;


const GetAllTaskRequest = z.void();
const GetAllTaskResponse = TasksResSchema;


const GetTasksByUserId = z.object({
  userId: z.string()
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


export const UserDetailsAPI = {
  getUserDetails,
  updateUserDetails,
  createTask,
  getAllTasks,
  getUserCreatedTasks
};