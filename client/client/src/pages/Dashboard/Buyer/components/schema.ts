import { z } from "zod";

export const ProfileSchema = z.object({
  _id: z.string(),
  profileName: z.string(),
  address: z.string(),
  rating: z.number().min(0).max(5),
  imageUrl: z.string().url(),
});

export const ProfilesResponseSchema = z.array(ProfileSchema);


export const SingleFreelanceResponseSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profileImg: z.string(),
  address1: z.string(),
  address2: z.string(),
  address3: z.string(),
  telephoneNr: z.string(),
  mobileNr: z.string(),
  rating: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  score: z.number(),
  status: z.string(),
  __v: z.number(),
});


export const FreelanceResSchema = z.object({
  data: z.array(SingleFreelanceResponseSchema),
});