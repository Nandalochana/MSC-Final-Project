
import { z } from "zod";

// export const availability = pgTable("availability", {
//   id: serial("id").primaryKey(),
//   date: timestamp("date").notNull(),
//   isAvailable: boolean("is_available").notNull(),
//   timeSlots: text("time_slots").array().notNull(),
// });

// export const insertAvailabilitySchema = createInsertSchema(availability).pick({
//   date: true,
//   isAvailable: true,
//   timeSlots: true,
// });


export const SingleTimeSlotsResponseSchema = z.object({
  _id: z.string(),
  __v: z.number(),
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
  }),
  date: z.string(),
  available: z.boolean(),
  status: z.string(),
  timeSlots: z.array(
    z.object({
      _id: z.string(),
      start: z.string(),
      end: z.string(),
    })
  ),

});

export const singleTimesResSchema = z.object({
  data: z.object({
    _id: z.string(),
    __v: z.number(),
    userId: z.string(),
    date: z.string(),
    available: z.boolean(),
    status: z.string(),
    timeSlots: z.array(
      z.object({
        _id: z.string(),
        start: z.string(),
        end: z.string(),
      })
    ),
  })
});


export const TimesResSchema = z.object({
  data: z.array(SingleTimeSlotsResponseSchema),
});

export const DeleteTimeResponseSchema = z.object({
  message: z.string()
});


// export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
// export type Availability = typeof availability.$inferSelect;
