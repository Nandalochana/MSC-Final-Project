import { z } from "zod";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";
import { api } from "../../../lib/utils/api";
import { BaseRegisterFormSchema, RegisterAPIResponseSchema } from "../components/schema";

const RegisterRequest = BaseRegisterFormSchema;

const RegisterResponse = RegisterAPIResponseSchema;

const register = api<
  z.infer<typeof RegisterRequest>,
  z.infer<typeof RegisterResponse>
>({
  method: "POST",
  path: API_ENDPOINT.SIGN_UP,
  requestSchema: RegisterRequest,
  responseSchema: RegisterResponse,
  type:"public"
});

export const RegisterAPI = {
  register,
};
