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

export const UpdateContactSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  telephone: PhoneSchema,
})

export type IUpdateContact = z.infer<typeof UpdateContactSchema>
