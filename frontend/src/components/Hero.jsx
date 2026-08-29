function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div>
            <p className="text-blue-200 font-semibold mb-4">
              NEW COLLECTION 2026
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Discover Products
              <span className="block text-yellow-300">
                You'll Love
              </span>
            </h1>

            <p className="mt-6 text-lg text-blue-100 max-w-lg">
              Shop the latest fashion, electronics, lifestyle products
              and more — all in one place.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Shop Now
              </button>

              <button className="border border-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
                Explore Products
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 text-center">
              <div className="text-8xl mb-4">
                🛍️
              </div>

              <h2 className="text-2xl font-bold">
                Shop Smart
              </h2>

              <p className="text-blue-100 mt-2">
                Quality products. Great prices.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero