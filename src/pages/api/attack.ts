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
  const { attacker, attackee } = JSON.parse(req.body)
  // const challenge = await prisma.challenge.findUnique({
  //   where: {id: attackee},
  // })
  // if (!challenge) {

  console.log(req.body)
  await prisma.challenge.create({
    data: {
      attackerHand: '01234',
      wager: 2,
      attackee: { connect: { address: attackee } },
      attacker: { connect: { address: attacker } },
    },
  })
  // }
  res.status(200).json({ message: 'Success' })
}
