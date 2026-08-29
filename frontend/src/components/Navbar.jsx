import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Navbar() {
  
  const [user, setUser] = useState(null)
  const [searchInput, setSearchInput] = useState("")
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const isAdmin = user && user.role === "admin"

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }
  const handleSearch = (e) => {
  e.preventDefault()
  if (searchInput.trim()) {
    navigate(`/?search=${searchInput}`)
  }
}

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopNest
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Products
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Categories
          </a>
        </div>

        {/* Search */}
        {/* Search */}
<form onSubmit={handleSearch} className="hidden md:block">
  <input
    type="text"
    placeholder="Search products..."
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</form>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link to="/wishlist" className="relative text-gray-700 hover:text-red-500 text-xl">
  ♡
  {wishlistCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {wishlistCount}
    </span>
  )}
</Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 text-xl">
  🛒
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>

          
              {user ? (
  <div className="flex items-center gap-3">
    {isAdmin && (
      <Link
        to="/admin"
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
      >
        Admin
      </Link>
    )}
    {isAdmin && (
  <Link
    to="/admin/orders"
    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
  >
    Orders
  </Link>
)}
    <span className="text-gray-700 font-semibold hidden md:block">
      Hi, {user.name}
    </span>
    <button
      onClick={handleLogout}
      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
    >
      Logout
    </button>
  </div>
) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar