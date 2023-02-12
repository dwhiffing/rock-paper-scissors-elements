import type { NextApiRequest, NextApiResponse } from 'next'
import { purge } from '@/utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  await purge()

  res.status(200).json({ message: 'Success' })
}
