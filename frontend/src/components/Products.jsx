import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "./ProductCard"
import API from "../services/api"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get("category")
  const searchQuery = searchParams.get("search")

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching products:", err)
        setLoading(false)
      })
  }, [])

  let filteredProducts = products

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    )
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const clearFilter = () => {
    setSearchParams({})
  }

  const heading = searchQuery
    ? `Results for "${searchQuery}"`
    : selectedCategory
    ? `${selectedCategory} Products`
    : "Featured Products"

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-blue-600 font-semibold">
              {searchQuery ? "SEARCH" : selectedCategory ? selectedCategory.toUpperCase() : "TRENDING NOW"}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              {heading}
            </h2>
          </div>

          {(selectedCategory || searchQuery) && (
            <button
              onClick={clearFilter}
              className="text-blue-600 font-semibold hover:underline"
            >
              Clear Filter ✕
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default Products