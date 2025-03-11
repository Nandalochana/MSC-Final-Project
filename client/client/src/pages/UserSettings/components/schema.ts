import { z } from "zod";

export const UserDetailsResponseSchema = z.object({
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
  })

});

export const TaskResponseSchema = z.object({
  data: z.object({
    _id: z.string(),
    createdUserId: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
  })
});


export const SingleTaskResponseSchema = z.object({
  _id: z.string(),
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
  }),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),

});


export const TasksResSchema = z.object({
  data: z.array(SingleTaskResponseSchema),
});