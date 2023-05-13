
import { db } from '@/database';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/db';
import { IProduct } from '../../../interfaces/products';

type Data = 
  | { msg: string }
  | IProduct[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  
  switch( req.method ) {
    case 'GET':
      return searchProducts( req, res )

    default: 
      return res.status(400).json({
        msg: 'Bad request'
      })
  }
}

const searchProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  
  let { query = ''} = req.query;

  if ( query.length === 0 ) {
    return res.status(400).json({
      msg: 'You must specify the search query'
    })
  }

  query = query.toString().toLowerCase();

  await db.connect();
  
  const products = await Product.find({
    $text: { $search: query }
  })
  .select('title images price inStock slug -_id')
  .lean();

  await db.disconnect();

  return res.status(200).json(products)
}
