import type { NextApiRequest, NextApiResponse } from 'next'
import { getChallenge, finalizeChallenge } from '@/utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  const { id, reveal } = JSON.parse(req.body)

  const challenge = await getChallenge(id)
  if (!challenge) return res.status(500).json({ message: 'Error' })

  await finalizeChallenge(challenge, reveal === 1 ? 1 : 0)
  res.status(200).json({ message: 'Success' })
}
