import Checkout from "./components/Checkout"
import OrderSuccess from "./components/OrderSuccess"
import MyOrders from "./components/MyOrders"
import AdminOrders from "./components/AdminOrders"

import AdminPanel from "./components/AdminPanel"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Categories from "./components/Categories"
import Products from "./components/Products"
import Login from "./components/Login"
import Register from "./components/Register"
import Cart from "./components/Cart"
import Wishlist from "./components/Wishlist"
import ProductDetail from "./components/ProductDetail"


function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:id" element={<OrderSuccess />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Routes>
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App