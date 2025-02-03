import { z } from "zod";

import { api } from "../../../lib/utils/api";
import { LoginAPIResponseSchema, LoginFormSchema } from "../components/schema";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";

const LoginRequest = LoginFormSchema;

const LoginResponse = LoginAPIResponseSchema;

const login = api<
  z.infer<typeof LoginRequest>,
  z.infer<typeof LoginResponse>
>({
  method: "POST",
  path: API_ENDPOINT.SIGN_IN,
  requestSchema: LoginRequest,
  responseSchema: LoginResponse,
  type: "public"
});

export const LoginAPI = {
  login,
};
