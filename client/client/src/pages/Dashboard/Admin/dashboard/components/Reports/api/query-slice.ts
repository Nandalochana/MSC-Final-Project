import { z } from "zod";
import { TaskInfoResponseSchema, TaskInfoRequestSchema} from "./schema";
import { API_ENDPOINT } from "../../../../../../../lib/utils/endpoints-constant";
import { api } from "../../../../../../../lib/utils/api";

const LoadAllTasksRequest = TaskInfoRequestSchema;
const RegisterResponse = TaskInfoResponseSchema;

const LoadAllTasks = api<
  z.infer<typeof LoadAllTasksRequest>,
  z.infer<typeof RegisterResponse>
>({
  method: "GET",
  path: API_ENDPOINT.TASK_ALL,
  requestSchema: LoadAllTasksRequest,
  responseSchema: RegisterResponse
});


export const ReportAPI = {
  LoadAllTasks,
};
