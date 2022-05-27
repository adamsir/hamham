import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import PageHeader from '../components/PageHeader'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import type { Product } from './api/products'
import Cart from '../components/Cart'
import ProductSearch from '../components/ProductSearch'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/products', fetcher)
  /* const { data, error } = useSWR('/api/catalog', fetcher) */

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <PageHeader />
      <div className="flex justify-center">
        <ProductSearch searchContext={data} />
      </div>
      <PageHero />

      {/* <div>
        (data)
        <div>
          <PrettyPrintJson data={data} />
        </div>
      </div> */}

      <div className="flex min-h-screen flex-col items-center justify-center py-2">

        <Head>
          <title>Hamham — Jídlo u vás rychleji než šunka</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-xl font-bold">
            Nejoblíbenější
          </h1>

          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {data.map((product: Product) => (
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="flex h-24 w-full items-center justify-center border-t">
          <a
            className="flex items-center justify-center gap-2"
            href="//github.com/adamsir"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adam Šír
          </a>
        </footer>
      </div>
    </>
  )
}

export default Home
