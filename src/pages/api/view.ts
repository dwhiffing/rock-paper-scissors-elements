import type { NextApiRequest, NextApiResponse } from 'next'
import { getChallenge, viewChallenge } from '@/utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  const { id, address } = JSON.parse(req.body)

  const challenge = await getChallenge(id)
  if (!challenge || typeof challenge.outcome !== 'number') {
    return res.status(500).json({ message: 'Error' })
  }

  await viewChallenge(challenge, address)

  res.status(200).json({ message: 'Success' })
}
