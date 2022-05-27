import Image from 'next/image'
import type { Product } from "../pages/api/products";
import useStore from '../stores/order';



export default (content: Product) => {
  const {items, addItem } = useStore()

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <div className="border-2 p-4">
        <a className="block relative h-48 rounded overflow-hidden">
          <Image
            src={content.image}
            alt={content.name}
            layout="fill"
            className="object-contain object-center w-full h-full block"
          />
        </a>
        <div className="mt-4">
          <h2 className="text-gray-900 text-lg min-h-[90px]">{content.name}</h2>
          <p className="mt-1 text-xl font-bold">{content.price.full} {content.price.currency}</p>
        </div>
        <div className="mt-4">
          <button onClick={() => addItem(content, 1)} className="inline-flex items-center border-2 border-gray-700 py-1 px-3 hover:bg-gray-200 rounded text-base font-semibold text-black mt-4 md:mt-0">Do bříška</button>
        </div>
      </div>
    </div>
  )
}