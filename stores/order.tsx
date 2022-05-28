import create from 'zustand'
import { persist } from 'zustand/middleware'
import type { OrderItem } from '../pages/api/products'

type OrderStore = {
  items: OrderItem[];
  totalPrice: number;
  setItems: (items: OrderItem[]) => void;
  addItem: (item: OrderItem, quantity: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  clearItems: () => void;
}

const _round = (num: number): number => {
  const n = Number((Math.abs(num) * 100).toPrecision(15))
  return Math.round(n) / 100 * Math.sign(num)
}

const addItem = (items: OrderItem[], item: OrderItem, quantity: number): OrderItem[] => {
  let orderItems = items.filter((orderItem) => orderItem.id !== item.id)

  return [
    ...orderItems,
    {
      ...item,
      quantity
    }
  ]
}

const updateItemQuantity = (items: OrderItem[], id: number, quantity: number): OrderItem[] => {
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

const updateTotalPrice = (items: OrderItem[], totalPrice: number): number => {
  let sum = items.reduce((acc, product) => {
    return acc + (product.price.full * product?.quantity)
  }, 0)

  return _round(sum)
}

const useStore = create<OrderStore>()(persist((set, get): OrderStore => ({
  items: [],
  totalPrice: 0,
  setItems: (items: OrderItem[]) =>
    set((state) => ({
      ...state,
      items,
    })),
  addItem: (item: OrderItem, quantity: number) =>
    set((state) => ({
      ...state,
      items: addItem(state.items, item, quantity),
      totalPrice: _round(state.totalPrice + item.price.full)
    })),
  updateItemQuantity: (id: number, quantity: number) =>
    set((state) => ({
      ...state,
      items: updateItemQuantity(state.items, id, quantity),
      totalPrice: updateTotalPrice(state.items, state.totalPrice)
    })),
  clearItems: () =>
    set((state) => ({
      ...state,
      items: [],
      totalPrice: 0
    }))
}), {
  name: 'hamham-store',
  getStorage: () => localStorage
}))


export default useStore
