import { useParams, Link } from "react-router-dom"

function OrderSuccess() {
  const { id } = useParams()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-1">Thank you for shopping with ShopNest</p>
      <p className="text-gray-400 text-sm mb-8">Order ID: {id}</p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
        <Link
          to="/myorders"
          className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50"
        >
          View My Orders
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess