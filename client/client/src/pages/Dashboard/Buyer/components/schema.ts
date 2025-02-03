import { z } from "zod";

export const ProfileSchema = z.object({
  _id: z.string(),
  profileName: z.string(),
  address: z.string(),
  rating: z.number().min(0).max(5),
  imageUrl: z.string().url(),
});

export const ProfilesResponseSchema = z.array(ProfileSchema);
