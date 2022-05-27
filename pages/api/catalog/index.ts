// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

async function fetchData(url: string) {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await fetchData('https://www.rohlik.cz/locales/cs-CZ/product.json?v=2022-05-26_13-34-14-787');

    res.status(200).json(result)
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}
