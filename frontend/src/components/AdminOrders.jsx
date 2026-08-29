import { useEffect, useState } from "react"
import API from "../services/api"

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem("user"))

  const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  }

  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  }

  const fetchOrders = () => {
    API.get("/orders", config)
      .then((res) => {
        setOrders(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus }, config)
      fetchOrders()
    } catch (err) {
      console.error(err)
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Access denied. Admins only.</p>
      </div>
    )
  }

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading orders...</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono text-sm">{order._id}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Customer: {order.user?.name} ({order.user?.email})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between items-center text-sm">
                <div className="text-gray-500">
                  <p>{order.shippingAddress?.fullName}, {order.shippingAddress?.phone}</p>
                  <p>{order.shippingAddress?.address}, {order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p>
                </div>
                <p className="font-bold text-lg">Total: ₹{order.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminOrders