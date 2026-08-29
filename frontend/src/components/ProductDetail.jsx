import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import API from "../services/api"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [reviewError, setReviewError] = useState("")
  const [reviewMsg, setReviewMsg] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  const fetchProduct = () => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }

  const fetchReviews = () => {
    API.get(`/reviews/${id}`).then((res) => setReviews(res.data))
  }

  useEffect(() => {
    fetchProduct()
    fetchReviews()
  }, [id])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    setReviewError("")
    setReviewMsg("")

    if (!user) {
      setReviewError("Please login to write a review")
      return
    }

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }

    try {
      await API.post(`/reviews/${id}`, { rating, comment }, config)
      setComment("")
      setRating(5)
      setReviewMsg("Review submitted!")
      fetchReviews()
      fetchProduct()
    } catch (err) {
      setReviewError(err.response?.data?.message || "Failed to submit review")
    }
  }

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Product not found</p>
        <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow p-8">

        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-9xl">📦</span>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">{product.category}</p>
          <h1 className="text-3xl font-bold mt-1">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-yellow-500">
              {"★".repeat(Math.round(product.rating || 0))}
              {"☆".repeat(5 - Math.round(product.rating || 0))}
            </span>
            <span className="text-sm text-gray-500">
              ({product.numReviews || 0} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mt-5">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-5 leading-relaxed">
            {product.description}
          </p>

          <p className="text-sm text-gray-500 mt-4">
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            )}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-14 h-14 border border-gray-300 rounded-lg flex items-center justify-center text-2xl hover:border-red-400 ${
                isInWishlist(product._id) ? "text-red-500 border-red-400" : "text-gray-600"
              }`}
            >
              {isInWishlist(product._id) ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {/* Write a Review */}
        <form onSubmit={handleReviewSubmit} className="mb-8 border-b pb-8">
          <h3 className="font-semibold mb-3">Write a Review</h3>

          {reviewError && (
            <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3">{reviewError}</p>
          )}
          {reviewMsg && (
            <p className="bg-green-100 text-green-700 text-sm p-2 rounded mb-3">{reviewMsg}</p>
          )}

          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Share your thoughts about this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-5">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{review.user?.name}</span>
                  <span className="text-yellow-500 text-sm">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail