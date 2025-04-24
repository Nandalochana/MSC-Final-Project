import { z } from "zod";


//profile schema
export const SingleProfileSchema = z.object({
  _id: z.string(),
  profileName: z.string(),
  status: z.string(),
});

export const ProfilesSchema = z.object({
  data: z.array(SingleProfileSchema),
});

//user profile schema
export const SingleUserProfileSchema = z.object({
  _id: z.string(),
  profileId: z.object({
    _id: z.string(),
    profileName: z.string(),
    status: z.string(),
    __v: z.number(),
  }),
  userId: z.object({
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
  rating: z.number(),
});



//user profile schema
export const SingleProfileSchemaAll = z.object({
  _id: z.string(),
  profileId: z.object({
    _id: z.string(),
    profileName: z.string(),
    status: z.string(),
    __v: z.number(),
  }),
  userId: z.object({
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
  })
});


export const ProfilesSchemaAll = z.object({
  data: z.array(SingleProfileSchemaAll),
});




export const UserProfilesSchema = z.object({
  data: z.array(SingleUserProfileSchema),
});

export const UserProfileAddRequestSchema = z.object({
  profileId: z.string(),
  userId: z.string(),
});

export const UserProfileAddResponseSchema = z.object({
  _id: z.string(),
  profileId: z.string(),
  userId: z.string(),
});

export const DeleteProfileResponseSchema = z.object({
  message: z.string()
});



export type ProfileType = z.infer<typeof UserProfilesSchema>;
export type ProfileRequestType = z.infer<typeof UserProfileAddRequestSchema>;
