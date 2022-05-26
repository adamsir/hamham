// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import productsData from './products.json'

export type Product = {
  name:  string;
  id:    number;
  image: string;
  price: Price;
}

export interface Price {
  full:     number;
  currency: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(productsData)
}
