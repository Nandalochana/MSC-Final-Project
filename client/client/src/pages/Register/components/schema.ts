import { z } from "zod";

export const BaseRegisterFormSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First Name is required" }),
  lastName: z.string().trim().min(1, { message: "Last Name is required" }),
  email: z
    .string()
    .min(1, "Email is required")
    .trim()
    .email({ message: "Invalid Email" })
    .toLowerCase(),
  address1: z.string().trim().min(1, { message: "Address is required" }),
  address2: z.string().trim(),
  address3: z.string().trim(),
  telephoneNr: z.string().min(1, { message: "Telephone Number is required" }),
  mobileNr: z.string().min(1, { message: "Mobile Number is required" }),
  profileImg: z.string().min(1, { message: "Profile Image is required" }),
  // profileImg: z
  //   .any()
  //   .refine((file) => file instanceof File, { message: "File is required" })
  //   .refine(
  //     (file) =>
  //       file &&
  //       [
  //         "image/png",
  //         "image/jpeg",
  //         "image/jpg",
  //         "image/svg+xml",
  //         "image/gif",
  //       ].includes(file.type),
  //     { message: "Invalid image file type" }
  //   ),
  password: z.string().trim().min(1, { message: "Password is required" }),
  role: z.string().min(1, { message: "Role is required" }),
});

export const RegisterFormSchema = BaseRegisterFormSchema.extend({
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: "Confirm password is required" }),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords don't match",
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;

export type RegisterFieldName = keyof RegisterFormType;

export const RegisterAPIResponseSchema = z.object({
  user: z.object({
    _id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    profileImg: z.string(),
    address1: z.string(),
    address2: z.string(),
    address3: z.string(),
    telephoneNr: z.string(),
    mobileNr: z.string(),
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
  token: z.string()
});
