import { z } from "zod";

export const BookingInfoRequestSchema = z.void();

export const BookingUpdateInfoSchema = z.object({
  bookingId: z.string(),
});

export const BookingUpdateResponseSchema = z.object({
  _id: z.string().optional(), // Marked as optional
  userId: z
    .object({
      _id: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(), 
  date: z.string().optional(),
  timeSlot: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
      _id: z.string().optional(),
    })
    .optional(), 
  buyerId: z
    .object({
      _id: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(), 
  status: z.string().optional(), 
  hourlyRate: z.number().optional(),
  totalPrice: z.number().optional(), 
  taskInfo: z.string().optional(),
  description: z.string().optional(), 
  contactInfo: z.string().optional(), 
  location: z.string().optional(), 
  buyerStatus: z.string().optional(),
  freelancerStatus: z.string().optional(), 
  __v: z.number().optional(), 
});

export const BookingDeleteInfoSchema = z.object({
  bookingId: z.string(),
});

export const BookingDeleteResponseSchema = z.object({
  message: z.string(),
});

export const BookingInfoResponseSchema = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      userId:  z.object({
        _id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
      }),
      date: z.string(),
      timeSlot: z.object({ start: z.string(), end: z.string() }),
      buyerId: z.object({
        _id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
      }),
      status: z.string(),
      hourlyRate: z.number(),
      totalPrice: z.number(),
      taskInfo: z.string(),
      description: z.string(),
      contactInfo: z.string(),
      location: z.string(),
      buyerStatus: z.string(),
      freelancerStatus: z.string(),
      __v: z.number(),
    })
  ),
});

export type BookingInfoResponseSchemaType = z.infer<typeof BookingInfoResponseSchema>;
export type BookingInfoRequestSchemaType = z.infer<typeof BookingInfoRequestSchema>;
export type BookingUpdateInfoSchemaType = z.infer<typeof BookingUpdateInfoSchema>;
export type BookingUpdateResponseSchemaType = z.infer<typeof BookingUpdateResponseSchema>;
export type BookingDeleteInfoSchemaType = z.infer<typeof BookingDeleteInfoSchema>;
export type BookingDeleteResponseSchemaType = z.infer<typeof BookingDeleteResponseSchema>;
