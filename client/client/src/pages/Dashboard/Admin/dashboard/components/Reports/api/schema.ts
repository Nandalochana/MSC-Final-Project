import { z } from "zod";

export const TaskInfoRequestSchema = z.void();


export const TaskInfoResponseSchema = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      title: z.string(),
      description: z.string(),
      status: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      __v: z.number(),
      createdUserId: z.object({
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
        hourlyRate: z.number(),
      }),
    })
  ),
});

export type TaskInfoResponseSchemaType = z.infer<typeof TaskInfoResponseSchema>;
export type TaskInfoRequestSchemaType = z.infer<typeof TaskInfoRequestSchema>;