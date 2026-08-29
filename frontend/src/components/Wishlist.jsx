import { Link } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">Your wishlist is empty ♡</p>
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          ← Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Your Wishlist</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow border border-gray-100"
          >
            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-5xl mb-4">
              📦
            </div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-500 text-sm mb-4">₹{item.price}</p>

            <div className="flex gap-2">
              <button
                onClick={() => addToCart(item)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="text-red-500 hover:text-red-700 px-3"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist