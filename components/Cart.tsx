import { useEffect } from 'react'
import type { Product } from '../pages/api/products'
import useStore from '../stores/order'

export default () => {
  const {items, setItems, clearItems } = useStore()


  if (!useStore.getState().items.length) {
    return (
      <div>Cart is empty</div>
    )
  }

  return (
    <>
      {items.map((product: Product) => (
        <div>{product.name}</div>
      ))}
      <div className='mt-4'>
        <button onClick={() => {clearItems()}}>Vyprázdnit košík</button>
      </div>
    </>
  )
}
