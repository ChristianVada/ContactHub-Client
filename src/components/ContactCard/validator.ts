import { z } from "zod"

const phoneNumberRegex = /^\(\d{2}\)\d-\d{4}-\d{4}$/

const PhoneSchema = z
  .string()
  .optional()
  .refine((value) => {
    if (value === undefined || value.trim() === "") {
      return true
    }
    return phoneNumberRegex.test(value)
  }, "Invalid phone number format. Should be (XX)X-XXXX-XXXX")

export const schema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  telephone: PhoneSchema,
})

export type UpdateData = z.infer<typeof schema>
