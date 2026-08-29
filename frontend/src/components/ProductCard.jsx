import { Link } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition group">

      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <div className="relative bg-gray-100 h-56 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-110 transition"
            />
          ) : (
            <span className="text-7xl group-hover:scale-110 transition">📦</span>
          )}
        </div>
      </Link>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute top-3 right-3 bg-white rounded-full w-9 h-9 shadow flex items-center justify-center hover:text-red-500 ${
          isInWishlist(product._id) ? "text-red-500" : ""
        }`}
      >
        {isInWishlist(product._id) ? "♥" : "♡"}
      </button>

      {/* Product Information */}
      <div className="p-5">

        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg mt-1 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-500">★★★★★</span>
          <span className="text-sm text-gray-500">
            ({product.numReviews || 0})
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductCard