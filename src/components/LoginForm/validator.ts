import { z } from "zod"

export const schema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type LoginData = z.infer<typeof schema>
