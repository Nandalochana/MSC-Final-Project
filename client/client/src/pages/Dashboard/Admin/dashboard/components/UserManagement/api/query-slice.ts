import { z } from "zod";
import { UserInfoReponseSchema, UserInfoRequestSchema, UserUpdateInfoSchema, UserUpdateResponseSchema, UserDeleteInfoSchema, UserDeleteResponseSchema, userProfileRequestSchema, userProfileResponseSchema} from "./schema";
import { API_ENDPOINT } from "../../../../../../../lib/utils/endpoints-constant";
import { api } from "../../../../../../../lib/utils/api";
import { UserRole } from "../User-Table";

const LoadAllUsersRequest = UserInfoRequestSchema;
const RegisterResponse = UserInfoReponseSchema;
const UserUpdateInfoRequest = UserUpdateInfoSchema;
const UserUpdateResponseResponse = UserUpdateResponseSchema;
const UserDeleteInfoRequest = UserDeleteInfoSchema;
const UserDeleteResponseResponse = UserDeleteResponseSchema;

const LoadAllUsers = api<
  z.infer<typeof LoadAllUsersRequest>,
  z.infer<typeof RegisterResponse>
>({
  method: "GET",
  path: API_ENDPOINT.USERS_WITH_LOGIN_INFO,
  requestSchema: LoadAllUsersRequest,
  responseSchema: RegisterResponse
});

const UpdateUserStatus = api<
  z.infer<typeof UserUpdateInfoRequest>,
  z.infer<typeof UserUpdateResponseResponse>
>({
  path: (params) => `${API_ENDPOINT.USER_STATUS}/${params.userId}`,
  method: "PUT",
  requestSchema: UserUpdateInfoRequest,
  responseSchema: UserUpdateResponseSchema,
  type: "private"
});

const DeleteUser = api<
  z.infer<typeof UserDeleteInfoRequest>,
  z.infer<typeof UserDeleteResponseResponse>
>({
  path: (params) => `${API_ENDPOINT.USER}/${params.userId}`,
  method: "DELETE",
  requestSchema: UserDeleteInfoRequest,
  responseSchema: UserDeleteResponseSchema,
  type: "private"
});

const UpdateUserRole = api<
  z.infer<typeof userProfileRequestSchema>,
  z.infer<typeof userProfileResponseSchema>
>({
  path: API_ENDPOINT.LOGININFO_ROLE_UPDATE,
  method: "POST",
  requestSchema: userProfileRequestSchema,
  responseSchema: userProfileResponseSchema,
  type: "private"
});

export const UserManagementAPI = {
  LoadAllUsers,
  UpdateUserStatus,
  DeleteUser,
  UpdateUserRole, 
};
