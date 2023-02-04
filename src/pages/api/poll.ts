import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Data = {
  players: any
  challenges: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const players = await prisma.player.findMany()
  const challenges = await prisma.challenge.findMany()
  res.status(200).json({ players, challenges })
}
