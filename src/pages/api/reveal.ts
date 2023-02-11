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
  const { id, reveal } = JSON.parse(req.body)

  console.log(id, reveal, typeof reveal, +reveal)
  const challenge = await prisma.challenge.findUnique({ where: { id } })
  if (!challenge) {
    res.status(500).json({ message: 'Error' })
    return
  }

  await prisma.challenge.update({
    where: { id },
    data: { reveal: reveal === 1 ? 1 : 0 },
  })
  res.status(200).json({ message: 'Success' })
}
