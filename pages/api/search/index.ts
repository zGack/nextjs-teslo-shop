
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { msg: string }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(400).json({ msg: 'You must specify the search query' })
}