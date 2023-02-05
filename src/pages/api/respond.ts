import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { id, attackeeHand } = JSON.parse(req.body)

  const challenge = await prisma.challenge.findUnique({ where: { id } })
  if (!challenge) {
    res.status(500).json({ message: 'Error' })
    return
  }

  const attacker = await prisma.player.findUnique({
    where: { address: challenge.attackerId },
  })
  const attackee = await prisma.player.findUnique({
    where: { address: challenge.attackeeId },
  })

  if (!attackee || !attacker || attackee?.balance < challenge.wager) {
    return res.status(200).json({ message: 'Error' })
  }

  if (!attackeeHand) {
    await prisma.challenge.delete({ where: { id } })
    return res.status(200).json({ message: 'Reject' })
  }

  const attackerHand = challenge.attackerHand.split(',').map(Number)

  let outcome = 0
  for (let i = 0; i < 5; i++) {
    const a = attackerHand[i]
    const b = attackeeHand[i]
    const a1 = (a + 1) % 5
    const a2 = (a + 2) % 5
    const _outcome = a === b ? 0 : b === a1 || b === a2 ? 1 : -1
    outcome += _outcome
  }

  let attackerBalance = attacker?.balance || 0
  let attackeeBalance = (attackee?.balance || 0) - challenge.wager

  if (outcome === 0) {
    attackeeBalance += challenge.wager
    attackerBalance += challenge.wager
  } else if (outcome > 0) {
    attackerBalance += challenge.wager * 2
  } else {
    attackeeBalance += challenge.wager * 2
  }

  await prisma.player.update({
    where: { address: challenge.attackerId },
    data: { balance: attackerBalance },
  })

  await prisma.player.update({
    where: { address: challenge.attackeeId },
    data: { balance: attackeeBalance },
  })

  await prisma.challenge.update({
    where: { id },
    data: { attackeeHand: attackeeHand.join(','), outcome },
  })
  res.status(200).json({ message: 'Success' })
}
