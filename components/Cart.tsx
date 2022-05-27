import { useEffect } from 'react'
import type { Product } from '../pages/api/products'
import useStore from '../stores/order'
import ProductAction from './ProductAction'

export default () => {
  const {items, setItems, clearItems, totalPrice } = useStore()


  if (!useStore.getState().items.length) {
    return (
      <div>Cart is empty</div>
    )
  }

  return (
    <>
      {items.map((product: Product) => (
        <div className="p-4">
          <div>{product.name}</div>
          <div>{product.quantity} ks</div>
          <div><ProductAction {...product} /></div>
        </div>
      ))}
      <div className='mt-4'>
        <button onClick={() => {clearItems()}}>Vyprázdnit košík</button>
        total price {totalPrice}
      </div>
    </>
  )
}
