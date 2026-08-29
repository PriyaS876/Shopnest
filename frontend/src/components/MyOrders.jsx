import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }

    API.get("/orders/myorders", config)
      .then((res) => {
        setOrders(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">Please login to view your orders</p>
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
          Login
        </Link>
      </div>
    )
  }

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading orders...</p>
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">You have no orders yet</p>
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          ← Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">My Orders</h2>

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono text-sm">{order._id}</p>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-2 border-t pt-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="font-bold text-lg">Total: ₹{order.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders