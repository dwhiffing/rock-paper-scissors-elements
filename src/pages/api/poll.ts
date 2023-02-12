import { getAppData } from '@/utils/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ players: any; challenges: any }>,
) {
  res.status(200).json(await getAppData())
}
