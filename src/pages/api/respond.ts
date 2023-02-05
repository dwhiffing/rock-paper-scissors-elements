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

  if (attackeeHand) {
    const challenge = await prisma.challenge.findUnique({ where: { id } })
    if (!challenge) {
      res.status(500).json({ message: 'Error' })
      return
    }
    const attackerHand = challenge.attackerHand.split(',').map(Number)

    let winnerIndex = 0
    for (let i = 0; i < 5; i++) {
      const a = attackerHand[i]
      const b = attackeeHand[i]
      let outcome = 0
      if (a !== b) {
        if (b === (a + 1) % 5 || b === (a + 2) % 5) {
          outcome = 1
        } else {
          outcome = -1
        }
      }
      winnerIndex += outcome
    }

    await prisma.challenge.update({
      where: { id },
      data: { attackeeHand: attackeeHand.join(','), winnerIndex },
    })
  } else {
    await prisma.challenge.delete({
      where: { id },
    })
  }
  res.status(200).json({ message: 'Success' })
}
