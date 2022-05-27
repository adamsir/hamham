import Image from 'next/image'
import type { Product } from "../pages/api/products";
import ProductAction from './ProductAction';

export default (item: Product) => (
  <div className="border-2 p-4">
    <a className="block relative h-48 rounded overflow-hidden">
      <Image
        src={item.image}
        alt={item.name}
        layout="fill"
        className="object-contain object-center w-full h-full block"
      />
    </a>
    <div className="mt-4">
      <h2 className="text-gray-900 text-lg min-h-[90px]">{item.name}</h2>
      <p className="mt-1 text-xl font-bold">{item.price.full} {item.price.currency}</p>
    </div>
    <div className="mt-4">
      <ProductAction {...item} />
    </div>
  </div>
)