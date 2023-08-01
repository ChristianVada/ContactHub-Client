import { z } from "zod"

const phoneNumberRegex = /^\(\d{2}\)\d-\d{4}-\d{4}$/

const PhoneSchema = z
  .string()
  .nonempty()
  .refine((value) => phoneNumberRegex.test(value), {
    message: "Invalid phone number format. Should be (XX)X-XXXX-XXXX",
  })

export const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email().nonempty("Email é obrigatório"),
  telephone: PhoneSchema,
})

export type CreateContact = z.infer<typeof schema>
