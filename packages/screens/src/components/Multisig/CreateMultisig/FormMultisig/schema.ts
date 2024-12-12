import { z } from 'zod'

export const createPowersSchema = () =>
  z.object({
    powers: z.array(
      z.object({
        addressOwner: z.string().min(1, 'Wallet address is required'),
        vote: z.string().min(1, 'Required'),
      }),
    ),
  })

export type CreatePowersSchemaType = z.infer<ReturnType<typeof createPowersSchema>>
