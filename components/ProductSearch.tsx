import { useEffect, useState } from 'react';
import type { OrderItem } from '../pages/api/products';
import ProductCardInline from './ProductCardInline';

const ProductSearch = ({ searchContext }: { searchContext: any[] }) => {
  const [searchData, setSearchData] = useState(searchContext)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    setSearchData(searchContext)
  }, [searchContext])

  console.log(searchData)

  const onChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value.toLowerCase()
    setQuery(value)

    if (value.length > 1) {
      const results = searchData.filter((item) => item.name.toLowerCase().indexOf(value) > -1)
      setSuggestions(results)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const onKeyDown = (event: { keyCode: number; }) => {
    if (event.keyCode === 27) {
      setShowSuggestions(false)
      setQuery('')
      setSuggestions([])
    }
  }

  const onFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const onBlur = () => {
    setShowSuggestions(false)
    setQuery('')
  }

  const ResultsView = () => {
    return (
      <div className={`absolute top-12 w-full max-h-[90vh] overflow-overlay bg-white ${showSuggestions ? 'z-[110] drop-shadow-lg' : 'z-30'}`}>
        <div className="flex flex-col">
          {suggestions.map((suggestion: OrderItem) => (
            <div key={suggestion.id} className="w-full px-6">
              <ProductCardInline  {...suggestion} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const Backdrop = () => (
    <div onClick={onBlur} className={`bg-white fixed w-full h-screen top-24 md:top-0 left-0 ${showSuggestions ? 'z-[100]' : 'z-20'}`} ></div>
  )

  return (
    <>
      <div className={`relative ${showSuggestions ? 'z-[110]' : 'z-30'}`}>
        <div className="w-full">
          <input placeholder="Banány, hrozny, jablko" type="text" name="search" id="mainSearch"
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

export default ProductSearch