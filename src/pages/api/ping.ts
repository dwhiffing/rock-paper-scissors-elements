import type { NextApiRequest, NextApiResponse } from 'next'
import { touchOrCreatePlayer } from '@/utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  await touchOrCreatePlayer(req.query.address as string)

  res.status(200).json({ message: 'Success' })
}
