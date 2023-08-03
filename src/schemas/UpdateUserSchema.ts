import { z } from "zod"

const phoneNumberRegex = /^\d{10,11}$/

const PhoneSchema = z
  .string()
  .optional()
  .refine((value) => {
    if (value === undefined || value.trim() === "") {
      return true
    }
    return phoneNumberRegex.test(value)
  }, "Invalid phone number format. Should be 10 or 11 numbers")

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  telephone: PhoneSchema,
  password: z.string().optional(),
})

export type IUpdateUser = z.infer<typeof UpdateUserSchema>
