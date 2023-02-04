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
    await prisma.challenge.update({
      where: { id },
      data: { attackeeHand, winnerIndex: 1 },
    })
  } else {
    await prisma.challenge.delete({
      where: { id },
    })
  }
  res.status(200).json({ message: 'Success' })
}
