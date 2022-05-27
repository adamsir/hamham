import Image from 'next/image'
import type { Product } from "../pages/api/products";
import ProductAction from './ProductAction';

export default (item: Product) => (
  <div className="flex flex-col border-2 p-4 bg-white">
    <div className="flex flex-row">
      <a className="block relative w-16 h-16 rounded overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          className="object-contain object-center w-full h-full block"
        />
      </a>
      <div className="mt-4 ml-4">
        <h2 className="text-gray-900 text-md">{item.name}</h2>
        <div className="mt-4">
          <p className="mt-1 text-md font-bold">{item.price.full} {item.price.currency}</p>
        </div>
      </div>
    </div>
    <div className="flex justify-end">
      <div className="mt-4">
        <ProductAction {...item} />
      </div>
    </div>
  </div>
)