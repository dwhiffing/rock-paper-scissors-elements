import type { NextApiRequest, NextApiResponse } from 'next'
import { getChallenge, revealChallenge } from '@/utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  const { id, reveal } = JSON.parse(req.body)

  const challenge = await getChallenge(id)
  if (!challenge) return res.status(500).json({ message: 'Error' })

  await revealChallenge(challenge, reveal === 1 ? 1 : 0)
  res.status(200).json({ message: 'Success' })
}
