import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import API from "../services/api"

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  })

  const user = JSON.parse(localStorage.getItem("user"))

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setError("")

    if (!user) {
      navigate("/login")
      return
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty")
      return
    }

    setLoading(true)

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }

    try {
      // Step 1: Create Razorpay order
      const { data: razorpayOrder } = await API.post(
        "/payment/create-order",
        { amount: cartTotal },
        config
      )

      // Step 2: Open Razorpay checkout popup
      const options = {
        key: "rzp_test_TVdygynNZmDhvc", // apna Razorpay Key ID yahan daalo
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "ShopNest",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            // Step 3: Verify payment
            const verifyRes = await API.post(
              "/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              config
            )

            if (verifyRes.data.verified) {
              // Step 4: Create actual order in our database
              const orderItems = cartItems.map((item) => ({
                product: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
              }))

              const orderRes = await API.post(
                "/orders",
                { orderItems, shippingAddress: address, totalPrice: cartTotal },
                config
              )

              clearCart()
              navigate(`/order-success/${orderRes.data._id}`)
            } else {
              setError("Payment verification failed")
            }
          } catch (err) {
            setError("Payment verification failed")
          }
        },
        prefill: {
          name: address.fullName,
          contact: address.phone,
        },
        theme: {
          color: "#2563eb",
        },
      }

      const razorpayInstance = new window.Razorpay(options)
      razorpayInstance.open()
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to initiate payment")
      setLoading(false)
    }
  }

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
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-10">

        <form onSubmit={handlePlaceOrder} className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4">Shipping Address</h3>

          {error && (
            <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
              {error}
            </p>
          )}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>

        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout