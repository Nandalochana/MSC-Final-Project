import { z } from "zod";
import { Role } from "../../../../../../../lib/utils/role-enum";

export const UserInfoRequestSchema = z.void();

export const UserUpdateInfoSchema = z.object({
  userId: z.string(),
});

export const userProfileRequestSchema = z.object({
  userId: z.string(),
  role : z.string(),
});

export const userProfileResponseSchema = z.string();

export const UserUpdateResponseSchema = z.object({
  data: z.object({
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
});

export const UserDeleteInfoSchema = z.object({
  userId: z.string(),
});

export const UserDeleteResponseSchema = z.object({
  message: z.string(),
});

export const UserInfoReponseSchema = z.object({
  data: z.array(
    z.object({
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
      loginInfo: z.object({
        _id: z.string(),
        email: z.string(),
        password: z.string(),
        userRoleId: z.object({
          _id: z.string(),
          role: z.string(),
          __v: z.number(),
        }),
        userId: z.string(),
        status: z.string(),
        __v: z.number(),
      }).nullable(),
    })
  ),
});

export type UserInfoReponseSchemaType = z.infer<typeof UserInfoReponseSchema>;
export type UserInfoRequestSchemaType = z.infer<typeof UserInfoRequestSchema>;
export type UserUpdateInfoSchemaType = z.infer<typeof UserUpdateInfoSchema>;
export type UserUpdateResponseSchemaType = z.infer<typeof UserUpdateResponseSchema>;
export type UserDeleteInfoSchemaType = z.infer<typeof UserDeleteInfoSchema>;
export type UserDeleteResponseSchemaType = z.infer<typeof UserDeleteResponseSchema>;
export type userProfileRequestSchemaType = z.infer<typeof userProfileRequestSchema>;