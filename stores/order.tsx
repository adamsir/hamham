import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Product } from '../pages/api/products'

const storeMiddleware = f => devtools(persist(f))

type OrderStore = {
  items: Product[];
  setItems: (items: Product[]) => void;
  addItem: (item: Product, quantity: number) => void;
  clearItems: () => void;
  /* updateItem: (id: number, quantity: number) => void; */
}

const addItem = (items: Product[], item: Product, quantity: number): Product[] => [
  ...items,
  {
    ...item,
    quantity
  }
]

const clearItems = () => []

const useStore = create<OrderStore>()(persist((set, get): OrderStore => ({
  items: [],
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
  clearItems: () =>
    set((state) => ({
      ...state,
      items: clearItems()
    }))
}), {
  name: 'bla',
  getStorage: () => localStorage
}))


export default useStore