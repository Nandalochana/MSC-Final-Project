import { z } from "zod";

export const LogoutAPIRequestSchema = z.void();

export const LogoutAPIResponseSchema = z.object({
  message: z.string()
});