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
  const address = req.query.address as string
  const player = await prisma.player.findUnique({ where: { address } })
  if (player) {
    await prisma.player.update({
      where: { address },
      data: { lastOnlineAt: new Date() },
    })
  } else {
    await prisma.player.create({ data: { address, balance: 100 } })
  }
  res.status(200).json({ message: 'Success' })
}
