import type { NextApiRequest, NextApiResponse } from 'next'
import * as utils from '@/utils/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  const { id, attackeeHand } = JSON.parse(req.body)

  const challenge = await utils.getChallenge(id)
  if (!challenge)
    return res.status(500).json({ message: 'Challenge does not exist' })

  const attackeeBalance = await utils.getPlayerBalance(challenge.attackeeId)
  const shouldReject = !attackeeHand || attackeeBalance < challenge.wager

  if (shouldReject) {
    await utils.rejectChallenge(challenge)

    return res.status(200).json({ message: 'Challenge rejected' })
  }

  await utils.respondToChallenge(challenge, attackeeHand)

  res.status(200).json({ message: 'Success' })
}
