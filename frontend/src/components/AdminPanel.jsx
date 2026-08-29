import { useState, useEffect } from "react"
import API from "../services/api"

function AdminPanel() {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))

  const fetchProducts = () => {
    API.get("/products").then((res) => setProducts(res.data))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    }

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, formData, config)
        setMessage("Product updated successfully!")
      } else {
        await API.post("/products", formData, config)
        setMessage("Product added successfully!")
      }
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      })
      setEditingId(null)
      fetchProducts()
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong")
    }
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    })
    setEditingId(product._id)
  }

  const handleDelete = async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    }
    try {
      await API.delete(`/products/${id}`, config)
      fetchProducts()
    } catch (err) {
      setMessage(err.response?.data?.message || "Delete failed")
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Access denied. Admins only.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Admin Panel</h2>

      {message && (
        <p className="bg-blue-100 text-blue-700 p-3 rounded mb-6">{message}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10 grid sm:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 sm:col-span-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 sm:col-span-2"
          rows="3"
        />

        <button
          type="submit"
          className="sm:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h3 className="text-2xl font-bold mb-4">All Products</h3>
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow border border-gray-100"
          >
            <div>
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-500">
                {product.category} — ₹{product.price} — Stock: {product.stock}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel