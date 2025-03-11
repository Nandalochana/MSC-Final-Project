import { z } from "zod";


export const TaskResponseSchema = z.object({
  data: z.object({
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

  })
});


export const DeleteTaskResponseSchema = z.object({
  message: z.string()
});


export const CommentsCreateRequestSchema = z.object({
  taskId: z.string(),
  userId: z.string(),
  comment: z.string(),
  totalPrice: z.number(),
  status: z.string()
});


export const CommentsCreateResponseSchema = z.object({
  data: z.object({
    taskId: z.string(),
    userId: z.string(),
    comment: z.string(),
    totalPrice: z.number(),
    status: z.string()
  })
});

export const CommentsResponseSchema = z.object({
  _id: z.string(),
  taskId: z.object({
    _id: z.string(),
    createdUserId: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
  }),
  userId: z.object({
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
  }).optional(),
  comment: z.string(),
  totalPrice: z.number().optional(),
  status: z.string(),
  __v: z.number()
});

export const CommentsResSchema = z.object({
  data: z.array(CommentsResponseSchema),
});