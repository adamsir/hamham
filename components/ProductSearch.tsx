import { useEffect, useState } from 'react';
import { Product } from '../pages/api/products';
import ProductCard from './ProductCard';
import ProductCardInline from './ProductCardInline';

export default ({ searchContext }) => {
  const [searchData, setSearchData] = useState(searchContext)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    setSearchData(searchContext)
  })

  console.log(searchData)

  const onChange = (event) => {
    const value = event.target.value.toLowerCase()
    setQuery(value)

    if (value.length > 0) {
      const results = searchData.filter((item) => item.name.toLowerCase().indexOf(value) > -1)
      setSuggestions(results)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const onKeyDown = (event) => {
    if (event.keyCode === 27) {
      setShowSuggestions(false)
      setQuery('')
      setSuggestions([])
    }
  }

  const onFocus = (event) => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const ResultsView = () => {
    return (
      <div className="absolute top-12 w-full z-10">
        <div className="flex flex-col">
          {suggestions.map((suggestion: Product) => (
            <div className="w-96 z-50">
              <ProductCardInline {...suggestion} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const Backdrop = () => (
    <div onClick={() => setShowSuggestions(false)} className="bg-white backdrop-blur-[128px] bg-opacity-60 fixed w-screen h-screen top-0 left-0 z-40"></div>
  )

  return (
    <>
      <div className="relative z-50">
        <div className="w-96">
        <input placeholder="Banány, hrozny, jablko" type="text" name="search" id="" 
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown} 
        value={query} 
        className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        {showSuggestions && <ResultsView />}
      </div>
      {showSuggestions && <Backdrop />}
    </>
  )
}