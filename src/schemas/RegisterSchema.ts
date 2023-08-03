import { z } from "zod"

const phoneNumberRegex = /^\d{10,11}$/

const PhoneSchema = z
  .string()
  .nonempty()
  .refine((value) => phoneNumberRegex.test(value), {
    message: "Invalid phone number format. Should be 10 or 11 numbers",
  })

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  telephone: PhoneSchema,
})

export type IRegisters = z.infer<typeof RegisterSchema>
