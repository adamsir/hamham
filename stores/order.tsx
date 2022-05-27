import create from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../pages/api/products'

type OrderStore = {
  items: Product[];
  totalPrice: number;
  setItems: (items: Product[]) => void;
  addItem: (item: Product, quantity: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  clearItems: () => void;
}

const addItem = (items: Product[], item: Product, quantity: number): Product[] => {
  let orderItems = items.filter((orderItem) => orderItem.id !== item.id)

  return [
    ...orderItems,
    {
      ...item,
      quantity
    }
  ]
}

const updateItemQuantity = (items: Product[], id: number, quantity: number): Product[] => {
  let orderItems = items.map((product) => {
    if (product.id === id) {
      product.quantity = quantity
    }

    return product
  })

  /* @todo fix ts(2532) */
  orderItems = orderItems.filter((product) => product?.quantity > 0)

  return orderItems
}

const clearItems = () => []

const useStore = create<OrderStore>()(persist((set, get): OrderStore => ({
  items: [],
  totalPrice: 0,
  setItems: (items: Product[]) =>
    set((state) => ({
      ...state,
      items,
    })),
  addItem: (item: Product, quantity: number) =>
    set((state) => ({
      ...state,
      items: addItem(state.items, item, quantity)
    })),
  updateItemQuantity: (id: number, quantity: number) =>
    set((state) => ({
      ...state,
      items: updateItemQuantity(state.items, id, quantity)
    })),
  clearItems: () =>
    set((state) => ({
      ...state,
      items: clearItems()
    }))
}), {
  name: 'hamham-store',
  getStorage: () => localStorage
}))


export default useStore
