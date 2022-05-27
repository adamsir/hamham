// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import productsData from './products.json'

type Product = {
  name:  string;
  id:    number;
  image: string;
  price: Price;
  quantity?: number;
}

interface Price {
  full:     number;
  currency: string;
}

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type OrderItem = WithRequired<Product, 'quantity'>

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(productsData)
}
