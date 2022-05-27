import { useEffect } from 'react'
import type { Product } from '../pages/api/products'
import useStore from '../stores/order'
import ProductAction from './ProductAction'
import ProductCardInline from './ProductCardInline'

export default () => {
  const {items, setItems, clearItems, totalPrice } = useStore()


  if (!useStore.getState().items.length) {
    return (
      <div>Jsem tak hladový.</div>
    )
  }

  return (
    <div className="relative">
      {items.map((product: Product) => (
        <ProductCardInline {...product} />
      ))}
      <button className="py-4" onClick={clearItems}>Vyprázdnit košík</button>
      <div className="sticky -bottom-4 left-0 py-8 bg-white">
        <div className="flex justify-between">
          <div>Celková cena</div>
          <div className="font-bold text-right">{totalPrice} Kč</div>
        </div>
      </div>
    </div>
  )
}
