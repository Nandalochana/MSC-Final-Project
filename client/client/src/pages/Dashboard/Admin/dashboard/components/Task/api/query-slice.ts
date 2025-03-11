import { z } from "zod";
import { TaskInfoResponseSchema, TaskInfoRequestSchema, TaskUpdateInfoSchema, TaskUpdateResponseSchema, TaskDeleteInfoSchema, TaskDeleteResponseSchema } from "./schema";
import { API_ENDPOINT } from "../../../../../../../lib/utils/endpoints-constant";
import { api } from "../../../../../../../lib/utils/api";

const LoadAllTasksRequest = TaskInfoRequestSchema;
const RegisterResponse = TaskInfoResponseSchema;
const TaskUpdateInfoRequest = TaskUpdateInfoSchema;
const TaskUpdateResponseResponse = TaskUpdateResponseSchema;
const TaskDeleteInfoRequest = TaskDeleteInfoSchema;
const TaskDeleteResponseResponse = TaskDeleteResponseSchema;

const LoadAllTasks = api<
  z.infer<typeof LoadAllTasksRequest>,
  z.infer<typeof RegisterResponse>
>({
  method: "GET",
  path: API_ENDPOINT.TASKS,
  requestSchema: LoadAllTasksRequest,
  responseSchema: RegisterResponse
});

const UpdateTaskStatus = api<
  z.infer<typeof TaskUpdateInfoRequest>,
  z.infer<typeof TaskUpdateResponseResponse>
>({
  path: (params) => `${API_ENDPOINT.TASK_STATUS}/${params.taskId}`,
  method: "PUT",
  requestSchema: TaskUpdateInfoRequest,
  responseSchema: TaskUpdateResponseSchema,
  type: "private"
});

const DeleteTask = api<
  z.infer<typeof TaskDeleteInfoRequest>,
  z.infer<typeof TaskDeleteResponseResponse>
>({
  path: (params) => `${API_ENDPOINT.TASKS}/${params.taskId}`,
  method: "DELETE",
  requestSchema: TaskDeleteInfoRequest,
  responseSchema: TaskDeleteResponseSchema,
  type: "private"
});

export const TaskManagementAPI = {
  LoadAllTasks,
  UpdateTaskStatus,
  DeleteTask,
};
