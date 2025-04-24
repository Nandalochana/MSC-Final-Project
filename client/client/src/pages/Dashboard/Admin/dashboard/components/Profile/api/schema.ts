import { z } from "zod";

export const ProfileInfoRequestSchema = z.void();

export const ProfileInfoResponseSchema = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      profileName: z.string(),
      status: z.string(),
      __v: z.number(),
    })
  ),
});

export const ProfileUpdateInfoSchema = z.object({
  profileId: z.string(),
});

export const ProfileDeleteInfoSchema = z.object({});

export const ProfileUpdateResponseSchema = z.object({
  data: z.object({
    _id: z.string(),
    profileName: z.string(),
    status: z.string(),
    __v: z.number(),
  }),
});

export type ProfileInfoResponseSchemaType = z.infer<typeof ProfileInfoResponseSchema>;
export type ProfileInfoRequestSchemaType = z.infer<typeof ProfileInfoRequestSchema>;
export type ProfileUpdateInfoSchemaType = z.infer<typeof ProfileUpdateInfoSchema>;
export type ProfileUpdateResponseSchemaType = z.infer<typeof ProfileUpdateResponseSchema>;
export type ProfileDeleteInfoSchemaType = z.infer<typeof ProfileDeleteInfoSchema>;
