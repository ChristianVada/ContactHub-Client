import { z } from "zod"

const phoneNumberRegex = /^\d{10,11}$/

const PhoneSchema = z
  .string()
  .nonempty()
  .refine((value) => phoneNumberRegex.test(value), {
    message: "Invalid phone number format. Should be 10 or 11 numbers",
  })

export const CreateContactSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email().nonempty("Email é obrigatório"),
  telephone: PhoneSchema,
})

export type ICreateContact = z.infer<typeof CreateContactSchema>
