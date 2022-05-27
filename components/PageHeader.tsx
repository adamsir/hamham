import { useEffect, useState } from "react"
import useStore from "../stores/order"
import Cart from "./Cart"

export default () => {
  const { totalPrice } = useStore()
  const [showCart, setShowCart] = useState(false)

  const CartView = () => (
    <div className="absolute top-18 right-0 sm:w-96 p-4 rounded-md rounded-tr-none z-20 shadow-lg bg-white md:max-h-[70vh] overflow-y-scroll border-2">
      <Cart />
    </div>
  )

  const toggleCartView = (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setShowCart(!showCart)
  }

  return (
    <header className="text-gray-600 body-font sticky top-0 bg-white z-10 backdrop-blur-lg bg-opacity-80">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">Hamham</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">Ovoce a zelenina</a>
        </nav>
        <div className="relative bg-white">
          <button onClick={toggleCartView} className="inline-flex items-center bg-gray-100 border-0 py-4 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 z-30">
            <img src="icon-bag.svg" className="w-4 h-4" />
            <span className="ml-4">{totalPrice} Kč</span>
          </button>
          {showCart && <CartView />}
        </div>
      </div>
    </header>
  )
}