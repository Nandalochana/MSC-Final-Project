import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .trim()
    .email({ message: "Invalid Email" })
    .toLowerCase(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export type LoginFieldName = keyof LoginFormType;

export const LoginAPIResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    _id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    profileImg: z.string(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    address3: z.string().optional(),
    telephoneNr: z.string().optional(),
    mobileNr: z.string().optional(),
    status: z.string(),
    __v: z.number(),
  }),
  loginInfo: z.object({
    email: z.string().email(),
    password: z.string(),
    userRoleId: z.object({
      _id: z.string(),
      role: z.string(),
      __v: z.number(),
    }),
    status: z.string(),
    _id: z.string(),
    __v: z.number(),
  }),
});

export type LoginAPIResponseType = z.infer<typeof LoginAPIResponseSchema>;
