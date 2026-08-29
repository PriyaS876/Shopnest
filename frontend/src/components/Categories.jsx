import { useNavigate } from "react-router-dom"

const categories = [
  { name: "Fashion", icon: "👗", description: "Trending styles" },
  { name: "Electronics", icon: "💻", description: "Latest gadgets" },
  { name: "Shoes", icon: "👟", description: "Step in style" },
  { name: "Beauty", icon: "💄", description: "Beauty essentials" },
  { name: "Home", icon: "🏠", description: "Make it yours" },
  { name: "Gaming", icon: "🎮", description: "Level up" },
]

function Categories() {
  const navigate = useNavigate()

  const handleClick = (categoryName) => {
    navigate(`/?category=${categoryName}`)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-10">
          <p className="text-blue-600 font-semibold">EXPLORE</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Shop By Category
          </h2>
          <p className="text-gray-500 mt-3">
            Find everything you need in one place
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleClick(category.name)}
              className="group cursor-pointer border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {category.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Categories