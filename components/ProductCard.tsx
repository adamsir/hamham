import Image from 'next/image'
import type { Product } from "../pages/api/products";

export default (content: Product) => (
  <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
    <a className="block relative h-48 rounded overflow-hidden">
      <Image
        src={content.image}
        alt={content.name}
        layout="fill"
        className="object-contain object-center w-full h-full block"
      />
    </a>
    <div className="mt-4">
      <h2 className="text-gray-900 title-font text-lg font-medium">{content.name}</h2>
      <p className="mt-1">{content.price.full} {content.price.currency}</p>
    </div>
  </div>
)