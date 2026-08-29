
import { useCart } from "../context/CartContext"
import { Link, useNavigate } from "react-router-dom"

function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">Your cart is empty 🛒</p>
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          ← Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Your Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                📦
              </div>
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center bg-white p-6 rounded-xl shadow">
        <span className="text-xl font-bold">Total: ₹{cartTotal}</span>
        <button
  onClick={() => navigate("/checkout")}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  Proceed to Checkout
</button>
      </div>
    </div>
  )
}

export default Cart