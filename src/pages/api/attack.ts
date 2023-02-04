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
  const { attacker, attackee, attackerHand, wager } = JSON.parse(req.body)
  const existingChallenge = await prisma.challenge.findFirst({
    where: { attackerId: attackee, attackeeId: attacker, winnerIndex: null },
  })
  const existingChallenge2 = await prisma.challenge.findFirst({
    where: { attackerId: attacker, attackeeId: attackee, winnerIndex: null },
  })
  if (!existingChallenge && !existingChallenge2) {
    await prisma.challenge.create({
      data: {
        attackerHand,
        wager: +wager,
        attackee: { connect: { address: attackee } },
        attacker: { connect: { address: attacker } },
      },
    })
  }
  res.status(200).json({ message: 'Success' })
}
