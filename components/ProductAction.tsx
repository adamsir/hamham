import type { OrderItem } from "../pages/api/products";
import useStore from '../stores/order';

const ProductAction = (product: OrderItem) => {
  const { items, addItem, updateItemQuantity } = useStore()

  /* @todo refactor */
  const orderItem = items[items.findIndex(_item => _item.id === product.id)]

  const quantity = orderItem?.quantity ?? 0

  const CTAButton = () => (
    <button onClick={() => addItem(product, 1)} className="inline-flex items-center border-2 border-gray-700 py-1 px-3 hover:bg-gray-200 rounded text-base font-semibold text-black mt-4 md:mt-0">Do košíku</button>
  )

  const QuantityButton = () => (
    <div className="flex flex-row justify-center items-center">
      <button onClick={() => updateItemQuantity(product.id, quantity-1)} className="inline-flex items-center border-2 border-gray-700 py-1 px-3 hover:bg-gray-200 rounded text-base font-semibold text-black mt-4 md:mt-0">-</button>
      <div className="mx-2 w-8 text-center">{quantity}</div>
      <button onClick={() => updateItemQuantity(product.id, quantity+1)} className="inline-flex items-center border-2 border-gray-700 py-1 px-3 hover:bg-gray-200 rounded text-base font-semibold text-black mt-4 md:mt-0">+</button>
    </div>
  )

  return (
    <>
      {quantity > 0 
        ? <QuantityButton />
        : <CTAButton />
      }
    </>
  )
}

export default ProductAction