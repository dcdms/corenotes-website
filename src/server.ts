import type { AppType } from '@corenotes/server'
import { hc } from 'hono/client'

export const server = hc<AppType>(process.env.NEXT_PUBLIC_API_BASE_URL!, {
  init: { credentials: 'include' },
})
