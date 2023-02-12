import { createChallenge } from '@/utils/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  const { attacker, attackee, attackerHand, wager } = JSON.parse(req.body)

  try {
    await createChallenge(attacker, attackee, +wager, attackerHand)

    res.status(200).json({ message: 'Success' })
  } catch (e: any) {
    return res.status(400).json({ message: e?.message })
  }
}
